// NIAP Protection Profiles → framework packages package/niap/<suite>/<version>/.
//
// Source: the XML NIAP authors every PP, PP-Module and Functional Package in
// (github.com/commoncriteria, Unlicense), pinned per document in sources.json. A run is a
// no-op for a document whose cached XML is unchanged; otherwise it regenerates that
// package, keeping every existing element and baseline `id`. See CLAUDE.md.
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import yml from 'js-yaml';
import { DOMParser } from '@xmldom/xmldom';

import { applyContentRules, descriptionViolations, MissingSummary } from '../../scf/scf/update/content-rules.js';

const ROOT = process.cwd();
const NIAP_DIR = path.resolve(ROOT, '..');
const CACHE_DIR = path.join(ROOT, 'cache');
const SUMMARIES = path.join(ROOT, 'summaries.json');
const WORKLIST = path.join(ROOT, 'missing-summaries.json');

const CC = 'https://niap-ccevs.org/cc/v1';
const XHTML = 'http://www.w3.org/1999/xhtml';

const CLASS_TYPE = 'class';
const SFR_TYPE = 'sfr';
const SAR_TYPE = 'sar';

interface Source {
  shortName: string;   // NIAP short name, e.g. PP_APP_v2.0
  ppId: number;        // NIAP catalog id: https://www.niap-ccevs.org/protectionprofiles/<ppId>
  suite: string;       // package/niap/<suite>
  version: string;     // package/niap/<suite>/<version>
  repo: string;        // github.com/commoncriteria/<repo>
  ref: string;         // branch or tag holding the published version
  file: string;        // path of the document's XML in the repo
}

// Requirement status in the XML → baseline. A component with no status is mandatory.
const STATUSES: Record<string, { code: string; name: string; description: string }> = {
  mandatory: { code: 'mandatory', name: 'Mandatory', description: 'requirements every conformant TOE must claim' },
  'sel-based': { code: 'selection_based', name: 'Selection-Based', description: 'requirements a TOE must claim when it makes the selection in another requirement that triggers them' },
  optional: { code: 'optional', name: 'Optional', description: 'requirements a TOE may claim' },
  objective: { code: 'objective', name: 'Objective', description: 'requirements NIAP expects to become mandatory in a future version; a TOE may claim them now' },
  'feat-based': { code: 'implementation_based', name: 'Implementation-Based', description: 'requirements a TOE must claim when it implements the feature they cover' },
  'impl-dep': { code: 'implementation_based', name: 'Implementation-Based', description: 'requirements a TOE must claim when it implements the feature they cover' }
};

const dump = (o: unknown) => yml.dump(o, { lineWidth: -1, noRefs: true });

function write(file: string, content: string): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

const idOf = (file: string): string | undefined => {
  if (!fs.existsSync(file)) return undefined;
  return (yml.load(fs.readFileSync(file, 'utf8')) as any)?.id;
};

// ---- XML helpers -------------------------------------------------------------------------

type El = Element;
const local = (n: Node) => (n as El).localName ?? n.nodeName;
const kids = (e: El, name?: string, ns = CC): El[] =>
  Array.from(e.childNodes).filter(n => n.nodeType === 1 && (!name || (local(n) === name && (n as El).namespaceURI === ns))) as El[];
const kid = (e: El, name: string, ns = CC) => kids(e, name, ns)[0];
const all = (e: Document | El, name: string): El[] => Array.from(e.getElementsByTagNameNS(CC, name));

// FCS_CKM.1 iteration AK → FCS_CKM.1/AK
function reqId(e: El): string {
  const id = (e.getAttribute('cc-id') || '').toUpperCase();
  const it = e.getAttribute('iteration');
  return it ? `${id}/${it}` : id;
}

// Element file code from the requirement id: FCS_CKM.1/AK → fcs_ckm_1_ak.
const codeOf = (requirementId: string) => requirementId.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

// Requirement element ids: FCS_RBG_EXT.1 → FCS_RBG_EXT.1.1 …; FCS_CKM.1/AK → FCS_CKM.1.1/AK;
// SARs number per element type: ADV_FSP.1.1D, ADV_FSP.1.2D, ADV_FSP.1.1C.
function elementIds(component: El, sar: boolean): string[] {
  const base = (component.getAttribute('cc-id') || '').toUpperCase();
  const it = component.getAttribute('iteration');
  const counts: Record<string, number> = {};
  return kids(component, sar ? 'a-element' : 'f-element').map(e => {
    const type = sar ? (e.getAttribute('type') || '') : '';
    counts[type] = (counts[type] ?? 0) + 1;
    return `${base}.${counts[type]}${type}${it ? `/${it}` : ''}`;
  });
}

// ---- rendering: CC XML (+ embedded XHTML) → markdown ------------------------------------

interface Ctx {
  doc: Document;
  byId: Map<string, El>;
  platforms: Map<string, string>;
}

const squash = (s: string) => s.replace(/[ \t\r\n]+/g, ' ');

// Inline text of a node: selections and assignments in CC notation, lists flattened.
function inline(n: Node, ctx: Ctx): string {
  if (n.nodeType === 3 || n.nodeType === 4) return squash(n.nodeValue ?? '');
  if (n.nodeType !== 1) return '';
  const e = n as El;
  const name = local(e);
  const inner = () => Array.from(e.childNodes).map(c => inline(c, ctx)).join('');
  if (e.namespaceURI === XHTML) {
    switch (name) {
      case 'b': case 'strong': return wrap('**', inner());
      case 'i': case 'em': return wrap('*', inner());
      case 'code': case 'tt': return wrap('`', inner());
      case 'br': return ' ';
      case 'li': return inner().trim();
      case 'ul': case 'ol': {
        const items = kids(e, 'li', XHTML);
        // Some PPs put list content straight in <ul> with no <li>; keep it as text.
        return items.length ? items.map(li => inline(li, ctx).trim()).join('; ') : ` ${inner().trim()}`;
      }
      case 'a': {
        const t = inner().trim();
        const href = e.getAttribute('href');
        return href && t ? `[${t}](${href})` : t || href || '';
      }
      default: return inner();
    }
  }
  switch (name) {
    case 'selectables': {
      const items = kids(e, 'selectable').map(s => inline(s, ctx).trim()).filter(Boolean);
      return `[**selection**${e.getAttribute('onlyone') === 'yes' ? ', choose one of' : ''}: ${items.join(', ')}]`;
    }
    case 'assignable': return `[**assignment**: ${inner().trim()}]`;
    case 'xref': case 'secref': case 'linkref': case 'sec-ref': return xref(e, ctx);
    case 'abbr': case 'no-link': return inner();
    case 'depends': case 'aactivity': case 'note': case 'ext-comp-def-title': return '';
    case '_': return e.getAttribute('type') === 'TOE' ? 'TOE' : inner();
    case 'management-function-set': return '';   // rendered as a block by blocks()
    default: return inner();
  }
}

const wrap = (m: string, s: string) => {
  const t = s.trim();
  // Emphasis around text that already carries emphasis would not render; keep the text.
  if (!t || t.includes('**') || (m === '*' && /(^|[^*])\*[^*]/.test(t))) return s;
  const lead = s.match(/^\s*/)![0];
  const tail = s.match(/\s*$/)![0];
  return `${lead}${m}${t}${m}${tail}`;
};

function xref(e: El, ctx: Ctx): string {
  const text = Array.from(e.childNodes).map(c => inline(c, ctx)).join('').trim();
  if (text) return text;
  const g = e.getAttribute('g');
  if (g) return g;
  const to = e.getAttribute('to') || e.getAttribute('ref') || '';
  const t = ctx.byId.get(to);
  if (!t) return to;
  if (local(t) === 'f-component' || local(t) === 'a-component') return reqId(t);
  if (local(t) === 'include-pkg') return packageName(t);
  if (local(t) === 'f-element') {
    const comp = t.parentNode as El;
    return elementIds(comp, false)[kids(comp, 'f-element').indexOf(t)] ?? to;
  }
  return t.getAttribute('title') || t.getAttribute('name') || to;
}

const testCount = new WeakMap<El, number>();

// Packages a PP includes by reference: name them the way NIAP's own rendering does.
const PACKAGE_NAMES: Record<string, string> = {
  ssh: 'Functional Package for Secure Shell (SSH)',
  tls: 'Functional Package for Transport Layer Security (TLS)',
  x509: 'Functional Package for X.509',
  vpnclient: 'PP-Module for VPN Client'
};

function packageName(pkg: El): string {
  const git = kid(pkg, 'git');
  const repo = (git ? kid(git, 'url')?.textContent ?? '' : '').trim().replace(/\/$/, '').split('/').pop()!.toLowerCase();
  const version = (git ? kid(git, 'branch')?.textContent ?? '' : '').trim().match(/(\d+(?:\.\d+)*)/)?.[1];
  const name = PACKAGE_NAMES[repo];
  if (!name) throw new Error(`included package ${repo} has no name in PACKAGE_NAMES`);
  return version ? `${name}, version ${version}` : name;
}

// Block markdown: paragraphs, lists, and selectables with linebreak="yes" as bullets.
function blocks(e: El, ctx: Ctx, indent = ''): string[] {
  const out: string[] = [];
  let para = '';
  const flush = () => {
    const t = para.replace(/[ \t]+/g, ' ').trim();
    // Punctuation closing a sentence that ended in a block list belongs on its last line.
    if (/^[.,;:]+$/.test(t) && out.length) out[out.length - 1] += t;
    else if (t) out.push(indent + t);
    para = '';
  };
  for (const n of Array.from(e.childNodes)) {
    if (n.nodeType !== 1) { para += inline(n, ctx); continue; }
    const c = n as El;
    const name = local(c);
    if (c.namespaceURI === XHTML && (name === 'p' || name === 'div')) {
      flush();
      out.push(...blocks(c, ctx, indent));
    } else if (c.namespaceURI === XHTML && name === 'br') {
      flush();
    } else if (c.namespaceURI === XHTML && (name === 'ul' || name === 'ol')) {
      flush();
      const items = kids(c, 'li', XHTML);
      if (!items.length) { para += inline(c, ctx); continue; }
      items.forEach((li, i) => {
        const marker = name === 'ol' ? `${i + 1}\\.` : '-';
        const [first, ...rest] = blocks(li, ctx, '');
        out.push(`${indent}- ${name === 'ol' ? `${marker} ` : ''}${first ?? ''}`.trimEnd(), ...rest.map(r => `${indent}    ${r}`));
      });
    } else if (c.namespaceURI === XHTML && name === 'table') {
      flush();
      out.push(...table(c, ctx).map(r => indent + r));
    } else if (name === 'selectables' && c.getAttribute('linebreak') === 'yes') {
      flush();
      out.push(`${indent}[**selection**${c.getAttribute('onlyone') === 'yes' ? ', choose one of' : ''}:`);
      for (const s of kids(c, 'selectable')) out.push(`${indent}- ${inline(s, ctx).trim()}`);
      out.push(`${indent}]`);
    } else if (name === 'management-function-set') {
      flush();
      out.push(...managementFunctions(c, ctx).map(r => indent + r));
    } else if (name === 'testlist') {
      flush();
      // Tests number across every testlist of one activity; a platform-specific test is
      // labelled by its platform instead.
      kids(c, 'test').forEach(t => {
        const on = kids(t, 'depends').map(d => ctx.platforms.get(d.getAttribute('ref') || '')).filter(Boolean);
        const [first, ...rest] = blocks(t, ctx, '');
        const n = (testCount.get(e) ?? 0) + (on.length ? 0 : 1);
        testCount.set(e, n);
        const label = on.length ? `**${on.join(', ')}:**` : `**Test ${n}:**`;
        out.push(`${indent}- ${label} ${first ?? ''}`.trimEnd(), ...rest.map(r => `${indent}    ${r}`));
      });
    } else if (['depends', 'aactivity', 'note', 'ext-comp-def-title', 'title'].includes(name) && c.namespaceURI === CC) {
      continue;
    } else {
      para += inline(c, ctx);
    }
  }
  flush();
  // keep lists tight, separate paragraphs
  const md: string[] = [];
  for (const line of out) {
    const isItem = /^\s*- /.test(line) || /^\s{4,}\S/.test(line) || /^\s*\][.,;:]*$/.test(line) || /^\|/.test(line);
    const prevItem = md.length && (/^\s*- /.test(md[md.length - 1]) || /^\s{4,}\S/.test(md[md.length - 1]) || /^\|/.test(md[md.length - 1]) || /\[\*\*selection\*\*[^\]]*:$/.test(md[md.length - 1]));
    if (md.length && !(isItem && prevItem)) md.push('');
    md.push(line);
  }
  return md;
}

function table(t: El, ctx: Ctx): string[] {
  const rows = Array.from(t.getElementsByTagNameNS(XHTML, 'tr')).map(tr =>
    Array.from(tr.childNodes).filter(n => n.nodeType === 1 && ['td', 'th'].includes(local(n)))
      .map(td => inline(td, ctx).replace(/\|/g, '\\|').trim()));
  if (!rows.length) return [];
  const width = Math.max(...rows.map(r => r.length));
  const pad = (r: string[]) => `| ${[...r, ...Array(width - r.length).fill('')].join(' | ')} |`;
  return [pad(rows[0]), `|${' --- |'.repeat(width)}`, ...rows.slice(1).map(pad)];
}

// FMT_SMF management functions: a numbered list, with each function's M/O/NA status per
// manager when the PP gives one.
function managementFunctions(set: El, ctx: Ctx): string[] {
  const managers = kids(set, 'manager').map(m => inline(m, ctx).trim());
  const out: string[] = [];
  kids(set, 'management-function').forEach((f, i) => {
    const text = kid(f, 'text');
    const marks = kids(f).filter(c => ['M', 'O', 'NA'].includes(local(c)));
    const status = marks.map((m, j) => `${managers[j] ?? ''} ${({ M: 'mandatory', O: 'optional', NA: 'n/a' } as any)[local(m)]}`.trim());
    out.push(`- ${i + 1}\\. ${(text ? inline(text, ctx) : '').trim()}${status.length && managers.length ? ` (${status.join('; ')})` : ''}`);
  });
  return out;
}

const md = (e: El | undefined, ctx: Ctx) => (e ? blocks(e, ctx).join('\n').replace(/\n{3,}/g, '\n\n').trim() : '');
const plain = (s: string) => s.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').replace(/`([^`]+)`/g, '$1')
  .replace(/\[([^\]]+)]\([^)]*\)/g, '$1').replace(/\s+/g, ' ').trim();

// ---- per-requirement content ---------------------------------------------------------------

function statusOf(e: El): string {
  const s = e.getAttribute('status');
  if (!s) return 'mandatory';
  if (!STATUSES[s]) throw new Error(`${reqId(e)}: unknown status ${s}`);
  return s;
}

// The requirement text: each element's "shall" statement under its element id.
function statementOf(component: El, sar: boolean, ctx: Ctx): { id: string; text: string }[] {
  const ids = elementIds(component, sar);
  return kids(component, sar ? 'a-element' : 'f-element').map((e, i) => ({ id: ids[i], text: md(kid(e, 'title'), ctx) }));
}

function backgroundOf(component: El, sar: boolean, ctx: Ctx, statements: { id: string; text: string }[]): string {
  const meta = [`**Requirement:** ${reqId(component)}`, `**Status:** ${STATUSES[statusOf(component)].name}`];
  const deps = kid(component, 'dependencies');
  const out = [meta.join(' · ')];
  for (const s of statements) out.push(`**${s.id}** ${s.text}`);
  const lead = sar ? directText(component, ctx) : '';
  if (lead) out.push(lead);
  if (deps) out.push(`**Dependencies:** ${plain(md(deps, ctx))}`);
  return out.join('\n\n') + '\n';
}

// Free text an a-component carries before its elements (the PP's explanation of the SAR).
function directText(e: El, ctx: Ctx): string {
  const tmp = e.cloneNode(true) as El;
  for (const c of Array.from(tmp.childNodes)) if (c.nodeType === 1 && ['a-element', 'f-element', 'depends'].includes(local(c))) tmp.removeChild(c);
  return md(tmp, ctx);
}

function guidanceOf(component: El, sar: boolean, ctx: Ctx, statements: { id: string; text: string }[]): string {
  const out: string[] = [];
  const els = kids(component, sar ? 'a-element' : 'f-element');
  const activities = (owner: El) => kids(owner, 'aactivity').flatMap(a => {
    const parts: string[] = [];
    const level = kids(a).length === 0 ? md(a, ctx) : '';
    if (level) parts.push(level);
    for (const [tag, label] of [['TSS', 'TSS'], ['Guidance', 'Guidance'], ['KMD', 'KMD'], ['Tests', 'Tests']] as const) {
      const body = md(kid(a, tag), ctx);
      if (body) parts.push(`*${label}:*\n\n${body}`);
    }
    if (!parts.length && kids(a).length) {
      const body = md(a, ctx);
      if (body) parts.push(body);
    }
    return parts;
  });

  els.forEach((e, i) => {
    const notes = kids(e, 'note').map(n => md(n, ctx)).filter(Boolean);
    const acts = activities(e);
    if (!notes.length && !acts.length) return;
    out.push(`**${statements[i].id}**`);
    for (const n of notes) out.push(`*Application note:* ${n}`);
    if (acts.length) out.push('**Evaluation activities**', ...acts);
  });
  const compActs = activities(component);
  if (compActs.length) out.push(`**Evaluation activities (${reqId(component)})**`, ...compActs);
  return out.length ? out.join('\n\n') + '\n' : '';
}

// ---- generation ------------------------------------------------------------------------------

interface Generated {
  files: Map<string, string>;
  missing: MissingSummary[];
  counts: { classes: number; sfrs: number; sars: number; baselines: number };
}

function generate(src: Source, xml: string, summaries: Record<string, string>): Generated {
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  const root = doc.documentElement;
  const byId = new Map<string, El>();
  for (const e of Array.from(doc.getElementsByTagName('*'))) {
    const id = e.getAttribute('id');
    if (id) byId.set(id, e);
  }
  const platforms = new Map<string, string>();
  for (const choice of all(doc, 'choice')) {
    for (const s of all(choice, 'selectable')) {
      const label = Array.from(s.getElementsByTagNameNS(XHTML, 'b'))[0];
      if (s.getAttribute('id')) platforms.set(s.getAttribute('id')!, plain(label ? label.textContent ?? '' : s.textContent ?? '').replace(/\s*:$/, ''));
    }
  }
  const ctx: Ctx = { doc, byId, platforms };

  const pkgDir = path.join(NIAP_DIR, src.suite, src.version);
  const elementsDir = path.join(pkgDir, 'elements');
  const files = new Map<string, string>();
  const missing: MissingSummary[] = [];
  const baselines = new Map<string, string[]>();
  const seen = new Set<string>();
  const counts = { classes: 0, sfrs: 0, sars: 0, baselines: 0 };

  const components = [...all(doc, 'f-component'), ...all(doc, 'a-component')]
    .filter(c => c.getAttribute('status') !== 'invisible');
  if (all(root, 'base-pp').length) throw new Error(`${src.shortName}: PP-Modules (base-pp sections) are not supported yet`);

  // Parent class element per requirement section ("Cryptographic Support (FCS)").
  const classOf = (c: El): { code: string; name: string } => {
    for (let p = c.parentNode as El | null; p && p.nodeType === 1; p = p.parentNode as El | null) {
      if (local(p) === 'section' && p.getAttribute('title')) {
        const title = p.getAttribute('title')!.replace(/^Class\s+([A-Z]{3}):\s*(.+)$/, '$2 ($1)');
        const abbr = title.match(/\(([A-Z]{3})\)\s*$/)?.[1] ?? (c.getAttribute('cc-id') || '').slice(0, 3).toUpperCase();
        return { code: abbr.toLowerCase(), name: title };
      }
    }
    const abbr = (c.getAttribute('cc-id') || '').slice(0, 3).toUpperCase();
    return { code: abbr.toLowerCase(), name: abbr };
  };

  const classes = new Map<string, string>();
  for (const c of components) {
    const sar = local(c) === 'a-component';
    const rid = reqId(c);
    const code = codeOf(rid);
    if (seen.has(code)) throw new Error(`${src.shortName}: element code collision ${code}`);
    seen.add(code);
    const cls = classOf(c);
    if (!classes.has(cls.code)) classes.set(cls.code, cls.name);

    const statements = statementOf(c, sar, ctx);
    if (!statements.length) throw new Error(`${rid}: no requirement elements`);
    const name = (c.getAttribute('name') || rid).replace(/\s*\([A-Z]{3}_[A-Z]{3}(_EXT)?\.\d+\)\s*$/, '').trim();

    // Description: the requirement verbatim when it is a single statement that fits;
    // otherwise a written summary keyed by element code (summaries.json).
    const text = statements.length === 1 ? plain(statements[0].text) : '';
    const rules = text && !/\[(selection|assignment)/.test(text) ? applyContentRules(text, {}) : null;
    const description = summaries[code] ?? rules?.description;
    if (!description) {
      missing.push({ code, hash: code, name: `${rid} ${name}`, externalId: rid, text: statements.map(s => `${s.id} ${plain(s.text)}`).join('\n') });
      continue;
    }
    if (descriptionViolations(description).length) throw new Error(`${rid}: description violates the element content rules: ${description}`);

    files.set(`elements/${code}.yml`, dump({
      id: idOf(path.join(elementsDir, `${code}.yml`)) ?? crypto.randomUUID(),
      name,
      description,
      elementType: sar ? SAR_TYPE : SFR_TYPE,
      externalId: rid,
      aliases: [code, rid],
      parent: cls.code
    }));
    files.set(`elements/${code}-background.md`, backgroundOf(c, sar, ctx, statements));
    const guidance = guidanceOf(c, sar, ctx, statements);
    if (guidance) files.set(`elements/${code}-guidance.md`, guidance);
    sar ? counts.sars++ : counts.sfrs++;

    const status = STATUSES[statusOf(c)].code;
    baselines.set(status, [...(baselines.get(status) ?? []), code]);
  }

  for (const [code, name] of classes) {
    if (seen.has(code)) throw new Error(`${src.shortName}: class code ${code} collides with a requirement`);
    files.set(`elements/${code}.yml`, dump({
      id: idOf(path.join(elementsDir, `${code}.yml`)) ?? crypto.randomUUID(),
      name,
      description: name,
      elementType: CLASS_TYPE,
      externalId: code.toUpperCase(),
      aliases: [code, code.toUpperCase()]
    }));
    counts.classes++;
  }

  const title = text(root, 'PPTitle') || root.getAttribute('name') || src.shortName;
  for (const [status, codes] of baselines) {
    const s = Object.values(STATUSES).find(v => v.code === status)!;
    const file = path.join(pkgDir, 'baselines', `${status}.yml`);
    files.set(`baselines/${status}.yml`, dump({
      id: idOf(file) ?? crypto.randomUUID(),
      name: `${src.shortName} ${s.name} Requirements`,
      description: `${title}: the ${s.description}.`,
      elements: Object.fromEntries(codes.map(code => [code, { mandatory: status === 'mandatory', parameters: [], requirements: [] }]))
    }));
    counts.baselines++;
  }
  return { files, missing, counts };
}

const text = (root: El, name: string) => {
  const e = all(root, name)[0];
  return e ? plain(e.textContent ?? '') : '';
};

// ---- package scaffold ------------------------------------------------------------------------

interface NiapPp { pp_name: string; pp_short_name: string; pp_date: string; pp_overview: string; tech_type: string }

async function niapRecord(src: Source): Promise<NiapPp> {
  const res = await fetch(`https://www.niap-ccevs.org/api/protection-profile/get_pp_by_id/?pp_id=${src.ppId}`);
  if (!res.ok) throw new Error(`${src.shortName}: NIAP catalog HTTP ${res.status}`);
  const pp = await res.json() as NiapPp;
  if (pp.pp_short_name !== src.shortName) throw new Error(`${src.shortName}: NIAP id ${src.ppId} is ${pp.pp_short_name}`);
  return pp;
}

const htmlText = (h: string) => h.replace(/<\/p>/gi, '\n').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/[ \t]+/g, ' ').trim();

// index.yml, package.json, .npmrc and build.gradle.kts are written once: they are published
// and hand-maintained after that (version bumps come from the publish workflow).
function scaffold(src: Source, pp: NiapPp, root: El): void {
  const pkgDir = path.join(NIAP_DIR, src.suite, src.version);
  const once = (rel: string, content: () => string) => {
    const file = path.join(pkgDir, rel);
    if (!fs.existsSync(file)) write(file, content());
  };
  const version = text(root, 'PPVersion') || src.version.replace(/^v/, '').replace(/_/g, '.');
  const overview = htmlText(pp.pp_overview).split('\n').map(s => s.trim()).filter(Boolean)[0] ?? pp.pp_name;
  const npmName = `@zerobias-org/framework-niap-${src.suite}-${src.version}`;
  once('index.yml', () => dump({
    id: crypto.randomUUID(),
    name: pp.pp_name,
    externalId: src.shortName,
    description: overview,
    standardType: 'framework',
    standardCategory: 'cyber',
    code: `niap_${src.suite}_${src.version}`,
    status: 'approved',
    url: `https://www.niap-ccevs.org/protectionprofiles/${src.ppId}`,
    version,
    external: true,
    internal: false,
    elementTypes: [
      { id: crypto.randomUUID(), code: CLASS_TYPE, name: 'Requirement Class', description: 'A Common Criteria requirement class (e.g. FCS Cryptographic Support, ADV Development)' },
      { id: crypto.randomUUID(), code: SFR_TYPE, name: 'Security Functional Requirement', description: 'A Security Functional Requirement (SFR) component the TOE must meet, with its evaluation activities', parent: CLASS_TYPE },
      { id: crypto.randomUUID(), code: SAR_TYPE, name: 'Security Assurance Requirement', description: 'A Security Assurance Requirement (SAR) component the evaluation must satisfy, with its evaluation activities', parent: CLASS_TYPE }
    ],
    mappingTypes: [SFR_TYPE, SAR_TYPE],
    tags: [],
    aliases: [src.shortName]
  }));
  once('package.json', () => JSON.stringify({
    name: npmName,
    version: '1.0.0',
    description: pp.pp_name,
    author: 'team@zerobias.com',
    license: 'ISC',
    type: 'module',
    repository: { type: 'git', url: 'git@github.com:zerobias-org/framework.git', directory: `package/niap/${src.suite}/${src.version}/` },
    scripts: { 'correct:deps': 'tsx ../../../../scripts/correctDeps.ts' },
    publishConfig: { registry: 'https://npm.pkg.github.com/' },
    files: ['index.yml', 'baselines/**', 'elements/**', 'mappings/**'],
    zerobias: { package: `niap.${src.suite}.${src.version}.framework`, 'import-artifact': 'framework', 'dataloader-version': '1.0.0' },
    dependencies: { [`@zerobias-org/suite-niap-${src.suite}`]: 'latest' }
  }, null, 2) + '\n');
  once('.npmrc', () => '@zerobias-org:registry=https://pkg.zerobias.org/\n//pkg.zerobias.org/:_authToken=${ZB_TOKEN}\n');
  once('build.gradle.kts', () => 'plugins { id("zb.content") }\n');
}

// ---- main ----------------------------------------------------------------------------------

async function fetchXml(src: Source): Promise<string> {
  const url = `https://raw.githubusercontent.com/commoncriteria/${src.repo}/${src.ref}/${src.file}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.text();
}

async function main(argv: string[]): Promise<void> {
  const force = argv.includes('--force');
  const only = argv.filter(a => !a.startsWith('--'));
  const sources: Source[] = JSON.parse(fs.readFileSync(path.join(ROOT, 'sources.json'), 'utf8'))
    .filter((s: Source) => !only.length || only.includes(`${s.suite}/${s.version}`) || only.includes(s.shortName));
  if (!sources.length) throw new Error(`no source matches ${only.join(' ')}`);
  const summaries: Record<string, Record<string, string>> = JSON.parse(fs.readFileSync(SUMMARIES, 'utf8'));
  const missing: (MissingSummary & { framework: string })[] = [];
  const results: [Source, Generated, string, El][] = [];

  for (const src of sources) {
    const xml = await fetchXml(src);
    const cached = path.join(CACHE_DIR, src.suite, `${src.version}.xml`);
    const pkgDir = path.join(NIAP_DIR, src.suite, src.version);
    if (!force && fs.existsSync(cached) && fs.readFileSync(cached, 'utf8') === xml && fs.existsSync(pkgDir)) {
      console.log(`${src.shortName}: unchanged — nothing to do`);
      continue;
    }
    const g = generate(src, xml, summaries[src.shortName] ?? {});
    missing.push(...g.missing.map(m => ({ ...m, framework: src.shortName })));
    results.push([src, g, xml, new DOMParser().parseFromString(xml, 'text/xml').documentElement]);
  }

  if (missing.length) {
    fs.writeFileSync(WORKLIST, JSON.stringify(missing, null, 2) + '\n');
    console.error(`${missing.length} requirements need a summary — wrote ${path.relative(ROOT, WORKLIST)}; nothing written to the packages`);
    process.exit(1);
  }

  fs.rmSync(WORKLIST, { force: true });
  for (const [src, g, xml, root] of results) {
    const pkgDir = path.join(NIAP_DIR, src.suite, src.version);
    const pp = await niapRecord(src);
    for (const dir of ['elements', 'baselines']) fs.rmSync(path.join(pkgDir, dir), { recursive: true, force: true });
    for (const [rel, content] of g.files) write(path.join(pkgDir, rel), content);
    scaffold(src, pp, root);
    write(path.join(CACHE_DIR, src.suite, `${src.version}.xml`), xml);
    const c = g.counts;
    console.log(`${src.shortName}: wrote ${c.sfrs} SFRs, ${c.sars} SARs, ${c.classes} classes, ${c.baselines} baselines to ${path.relative(ROOT, pkgDir)}`);
  }
}

main(process.argv.slice(2)).catch(e => {
  console.error(e);
  process.exit(1);
});
