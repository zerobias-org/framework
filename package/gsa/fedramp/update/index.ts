// FedRAMP Consolidated Rules → framework package package/gsa/fedramp/20x.
// Output is idempotent: an unchanged upstream rule leaves its files untouched.
import assert from 'node:assert';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const SOURCE = 'https://raw.githubusercontent.com/FedRAMP/rules/main/fedramp-consolidated-rules.json';
const PKG = path.resolve(import.meta.dirname, '../20x');
const ELEMENTS = path.join(PKG, 'elements');
const BASELINES = path.join(PKG, 'baselines');
// Class D is listed in the source but FedRAMP has not finalized it (20x Phase 4).
// When it does, add 'd' here and delete it from NOT_READY.
const READY = ['a', 'b', 'c'];
const NOT_READY = ['d'];

type Element = { code: string; doc: Record<string, unknown>; background: string };
type Member = { code: string; classes: Record<string, boolean> };

const idOf = (file: string): string =>
  (fs.existsSync(file) && (yaml.load(fs.readFileSync(file, 'utf8')) as { id?: string })?.id) || crypto.randomUUID();
const dump = (o: unknown) => yaml.dump(o, { lineWidth: -1, noRefs: true });
const label = (c: string) => `Class ${c.toUpperCase()}`;

const clean = (s: string) =>
  s.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\*\*|`/g, '').replace(/\s+/g, ' ').trim();
function summary(s: string): string {
  const t = clean(s);
  return t.length < 200 ? t : `${t.slice(0, 195).replace(/\s+\S*$/, '')}...`;
}

function md(v: unknown, depth = 0): string[] {
  const pad = '  '.repeat(depth);
  if (Array.isArray(v)) return v.flatMap((x) => md(x, depth));
  if (v && typeof v === 'object') {
    return Object.entries(v).flatMap(([k, x]) =>
      x && typeof x === 'object' ? [`${pad}- ${k}:`, ...md(x, depth + 1)] : [`${pad}- ${k}: ${x}`]);
  }
  return [`${pad}- ${v}`];
}

function section(title: string, v: unknown): string[] {
  return v === undefined || (Array.isArray(v) && !v.length) ? [] : [`### ${title}`, '', ...md(v), ''];
}

// The per-rule detail fields, shared by a rule and each of its class variants.
function details(o: any): string[] {
  const out: string[] = [];
  if (o.timeframe_type) {
    const n = o.timeframe_num ?? [o.timeframe_num_min, o.timeframe_num_max].filter((x) => x != null).join('-');
    out.push(`**Timeframe:** ${n} ${o.timeframe_type}`, '');
  }
  const artifacts = o.artifacts ? [...(o.artifacts.all ?? []), ...(o.artifacts['20x'] ?? [])] : undefined;
  if (o.danger) out.push(`**Warning:** ${o.danger}`, '');
  out.push(
    ...section('Following information', [...(o.following_information ?? []), ...(o.following_information_bullets ?? [])]),
    ...section('Notes', [...(o.note ? [o.note] : []), ...(o.notes ?? [])]),
    ...section('Examples', o.examples),
    ...section('Corrective actions', o.corrective_actions),
    ...section('Notification', o.notification),
    ...section('Artifacts', artifacts),
    ...section('Related', o.related),
  );
  if (o.schema) out.push('### Schema', '', '```json', JSON.stringify(o.schema, null, 2), '```', '');
  if (o.reference) out.push(`**Reference:** ${o.reference_url ? `[${o.reference}](${o.reference_url})` : o.reference}`, '');
  return out;
}

function statement(o: any): string {
  return o.force ? `**${o.force}:** ${o.statement}` : o.statement;
}

function main(data: any) {
  const definitions = new Map<string, any>();
  for (const bucket of ['all', '20x']) {
    for (const d of Object.values<any>(data.FRD.data[bucket] ?? {})) {
      for (const t of [d.term, ...(d.alts ?? [])]) definitions.set(t.toLowerCase(), d);
    }
  }
  const unresolved = new Set<string>();

  const elements: Element[] = [];
  const members: Member[] = [];

  function addLeaf(id: string, type: string, parent: string, r: any, classes: string[], common: string[], mandatory: (c: string) => boolean) {
    const code = id.toLowerCase();
    const varies = r.varies_by_class ?? {};
    const terms = new Set<string>([...(r.terms ?? []), ...classes.flatMap((c) => varies[c]?.terms ?? [])]);
    const controls = [...new Set<string>([...(r.controls ?? []), ...classes.flatMap((c) => varies[c]?.controls ?? [])])];
    const lines = [
      ...(r.statement ? [statement(r), ''] : []),
      `**Applies to:** ${classes.map(label).join(', ')}${r.affects?.length ? ` (${r.affects.join(', ')})` : ''}`,
      '',
      ...common,
      ...details(r),
    ];
    for (const c of classes) {
      if (varies[c]) lines.push(`## ${label(c)}`, '', statement(varies[c]), '', ...details(varies[c]));
    }
    if (controls.length) lines.push('## SP 800-53 Rev 5 controls', '', controls.join(', '), '');
    const defined = [...terms].flatMap((t) => {
      const d = definitions.get(t.toLowerCase());
      if (!d) unresolved.add(t);
      return d ? [`- **${d.term}:** ${clean(d.definition)}`] : [];
    });
    if (defined.length) lines.push('## Defined terms', '', ...defined, '');
    elements.push({
      code,
      doc: {
        id: idOf(path.join(ELEMENTS, `${code}.yml`)),
        name: r.name,
        description: r.statement ? summary(r.statement) : summary(`${r.name}: the requirement varies by certification class, see the background.`),
        elementType: type,
        externalId: id,
        parent,
        aliases: [id],
      },
      background: `${lines.join('\n').trim()}\n`,
    });
    members.push({ code, classes: Object.fromEntries(classes.map((c) => [c, mandatory(c)])) });
  }

  function addFamily(code: string, type: string, externalId: string, name: string, description: string, background: string) {
    elements.push({
      code,
      doc: { id: idOf(path.join(ELEMENTS, `${code}.yml`)), name, description: summary(description), elementType: type, externalId, aliases: [externalId] },
      background: `${background.trim()}\n`,
    });
  }

  // Rules that are placeholders, not in effect for 20x, or outside a ready class are left out.
  for (const [key, fam] of Object.entries<any>(data.FRR)) {
    const info = fam.info;
    const effective = info['20x']?.effective ?? info.effective;
    if (info.status !== 'stable' || effective?.is === 'no') continue;
    const subsets = { ...info.subsets, ...info['20x']?.subsets };
    const before = elements.length;
    for (const bucket of ['all', '20x']) {
      for (const [subset, rules] of Object.entries<any>(fam.data[bucket] ?? {})) {
        const ap = subsets[subset]?.applicability;
        assert(ap, `${key}/${subset}: no applicability`);
        if (!ap.types.includes('20x')) continue;
        const base = ap.classes.map((c: string) => c.toLowerCase()).filter((c: string) => READY.includes(c));
        const common = [`**Audience:** ${subsets[subset].name}. ${subsets[subset].description}`, ''];
        for (const [id, r] of Object.entries<any>(rules)) {
          const classes = r.varies_by_class ? base.filter((c: string) => r.varies_by_class[c]) : base;
          if (!classes.length) continue;
          const parent = `frr-${key.toLowerCase()}`;
          addLeaf(id, 'frr', parent, r, classes, common, (c) => (r.varies_by_class?.[c] ?? r).force?.startsWith('MUST') ?? false);
        }
      }
    }
    if (elements.length > before) {
      const e = effective ?? {};
      addFamily(`frr-${key.toLowerCase()}`, 'frr_family', `FRR-${key}`, info.name, info.purpose,
        `${info.purpose}\n\n**Effective for 20x:** ${e.is ?? 'unspecified'}${e.current_status ? ` (${e.current_status})` : ''}\n`);
    }
  }

  let ksiTotal = 0;
  for (const theme of Object.values<any>(data.KSI)) {
    assert.equal(theme.status, 'stable', `${theme.id} is ${theme.status}`);
    const code = theme.id.toLowerCase();
    addFamily(code, 'ksi_family', theme.id, theme.name, `Key Security Indicators for ${theme.name}.`, `Key Security Indicators for ${theme.name}.`);
    for (const [id, k] of Object.entries<any>(theme.indicators)) {
      ksiTotal += 1;
      // A KSI with class variants applies only to the classes it lists; the source says not to infer the others.
      const classes = READY.filter((c) => !k.varies_by_class || k.varies_by_class[c]);
      addLeaf(id, 'ksi', code, k, classes, [], () => true);
    }
  }

  fs.mkdirSync(ELEMENTS, { recursive: true });
  fs.mkdirSync(BASELINES, { recursive: true });
  const live = new Set(elements.map((e) => e.code));
  for (const e of elements) {
    fs.writeFileSync(path.join(ELEMENTS, `${e.code}.yml`), dump(e.doc));
    fs.writeFileSync(path.join(ELEMENTS, `${e.code}-background.md`), e.background);
  }
  // Retire, never delete: a deleted file orphans the loaded row.
  for (const f of fs.readdirSync(ELEMENTS).filter((x) => x.endsWith('.yml'))) {
    if (live.has(f.slice(0, -4))) continue;
    const file = path.join(ELEMENTS, f);
    const doc = yaml.load(fs.readFileSync(file, 'utf8')) as Record<string, unknown>;
    if (!doc.deprecate) { fs.writeFileSync(file, dump({ ...doc, deprecate: true })); console.log(`retired ${f}`); }
  }

  const names: Record<string, string> = {
    a: 'mature providers entering the federal market',
    b: 'small-scale or light-use services',
    c: 'common enterprise services used across an agency',
  };
  for (const c of READY) {
    const file = path.join(BASELINES, `class_${c}.yml`);
    const list = members.filter((m) => c in m.classes);
    assert(list.length, `${label(c)} is empty`);
    fs.writeFileSync(file, dump({
      id: idOf(file),
      name: label(c),
      description: `FedRAMP 20x ${label(c)} Certification: ${names[c] ?? 'see the FedRAMP 20x rules'}.`,
      elements: Object.fromEntries(list.map((m) => [m.code, { mandatory: m.classes[c], parameters: [], requirements: [] }])),
    }));
  }
  // `skip: true` makes the dataloader ignore the file, so the baseline is reserved but never loaded.
  for (const c of NOT_READY) {
    const file = path.join(BASELINES, `class_${c}.yml`);
    fs.writeFileSync(file, dump({
      id: idOf(file),
      name: label(c),
      description: `FedRAMP 20x ${label(c)} Certification, not yet finalized by FedRAMP (20x Phase 4).`,
      skip: true,
      elements: {},
    }));
  }

  // Guard the weekly run against an upstream shape change quietly emptying the package.
  const count = (t: string) => elements.filter((e) => e.doc.elementType === t).length;
  assert.equal(count('ksi'), ksiTotal, 'every KSI must be emitted');
  assert(count('frr') > 0, 'no rules emitted');
  for (const e of elements) {
    assert((e.doc.description as string).length < 200, `${e.code}: description too long`);
    assert(!e.doc.parent || live.has(e.doc.parent as string), `${e.code}: missing parent`);
  }
  assert.equal(new Set(elements.map((e) => e.code)).size, elements.length, 'duplicate element code');

  console.log(`source ${data.info.version}: ${count('ksi')} KSIs, ${count('frr')} rules, ${count('frr_family')} rule families`);
  for (const c of READY) console.log(`${label(c)}: ${members.filter((m) => c in m.classes).length} elements`);
  if (unresolved.size) console.warn(`unresolved terms: ${[...unresolved].join(', ')}`);
}

const res = await fetch(SOURCE);
assert(res.ok, `${SOURCE}: HTTP ${res.status}`);
main(await res.json());
