// NIST SP 800-63-4 conformance criteria → framework package package/nist/800_63/rev4/.
//
// Source: the OSCAL catalog NIST publishes on the 800-63-4 Implementation Resources site.
// The run is a no-op when the catalog is unchanged; otherwise it regenerates the package,
// keeping every existing element and baseline `id`. See CLAUDE.md.
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import yml from 'js-yaml';

import { applyContentRules, descriptionViolations, toMarkdown, textHash, MissingSummary } from '../../../scf/scf/update/content-rules.js';

const PAGE_URL = 'https://pages.nist.gov/800-63-4-Implementation-Resources/conformance/criteria.html';
const VERSION_DIR = 'rev4';
const PACKAGE_DIR = path.resolve(process.cwd(), '..', VERSION_DIR);
const CACHE_DIR = path.join(process.cwd(), 'cache');
const SUMMARIES = path.join(process.cwd(), 'summaries.json');
const WORKLIST = path.join(process.cwd(), 'missing-summaries.json');

const VOLUME_TYPE = 'volume';
const CRITERION_TYPE = 'criterion';

// OSCAL groups carry only the volume tag ("63A"); names are the volumes' published titles.
const VOLUMES: Record<string, { code: string; name: string; externalId: string; level?: string }> = {
  '63Base': { code: 'sp800_63', name: 'SP 800-63-4: Digital Identity Guidelines', externalId: 'SP 800-63-4' },
  '63A': { code: 'sp800_63a', name: 'SP 800-63A-4: Identity Proofing and Enrollment', externalId: 'SP 800-63A-4', level: 'IAL' },
  '63B': { code: 'sp800_63b', name: 'SP 800-63B-4: Authentication and Authenticator Management', externalId: 'SP 800-63B-4', level: 'AAL' },
  '63C': { code: 'sp800_63c', name: 'SP 800-63C-4: Federation and Assertions', externalId: 'SP 800-63C-4', level: 'FAL' }
};

const LEVEL_NAMES: Record<string, string> = {
  IAL: 'Identity Assurance Level',
  AAL: 'Authentication Assurance Level',
  FAL: 'Federation Assurance Level'
};

interface OscalPart { name: string; id?: string; prose?: string; props?: { name: string; value: string }[]; parts?: OscalPart[] }
interface OscalControl { id: string; title: string; props: { name: string; value: string; class?: string }[]; parts: OscalPart[] }
interface OscalGroup { id: string; title: string; controls: OscalControl[] }

const idOf = (file: string): string | undefined => {
  if (!fs.existsSync(file)) return undefined;
  return (yml.load(fs.readFileSync(file, 'utf8')) as any)?.id;
};

const dump = (o: unknown) => yml.dump(o, { lineWidth: -1, noRefs: true });

function write(file: string, content: string): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

// Element file code from the OSCAL id: IDPRF-1 → idprf_1, AAL3AVR-3.5 → aal3avr_3_5.
const codeOf = (oscalId: string) => oscalId.toLowerCase().replace(/[^a-z0-9]+/g, '_');

const prop = (c: OscalControl, cls: string) => c.props.find(p => p.class === cls)?.value ?? '';

function proseOf(part: OscalPart): string {
  return [part.prose ?? '', ...(part.parts ?? []).map(proseOf)].filter(Boolean).join('\n\n');
}

async function fetchCatalog(): Promise<{ file: string; body: Buffer }> {
  const page = await (await fetch(PAGE_URL)).text();
  const href = page.match(/href="([^"]+-oscal\.json)"/)?.[1];
  if (!href) throw new Error(`no OSCAL JSON link on ${PAGE_URL}`);
  const url = new URL(href, PAGE_URL).toString();
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return { file: path.basename(new URL(url).pathname), body: Buffer.from(await res.arrayBuffer()) };
}

function guidanceOf(c: OscalControl): string {
  const out: string[] = [];
  const guidance = c.parts.find(p => p.name === 'guidance');
  if (guidance?.prose) out.push(toMarkdown(guidance.prose).trim());
  const objective = c.parts.find(p => p.name === 'objective');
  if (objective) out.push('**Assessment objective**', toMarkdown(proseOf(objective)).trim());
  const methods = c.parts.filter(p => p.name === 'assessment-method' && p.prose);
  if (methods.length) {
    out.push('**Assessment methods**');
    out.push(methods.map(m => {
      const method = m.props?.find(p => p.name === 'method')?.value ?? '';
      return `- ${method}: ${m.prose!.replace(/\s*\n+\s*/g, ' ').trim()}`;
    }).join('\n'));
  }
  return out.join('\n\n') + '\n';
}

function backgroundOf(c: OscalControl, volume: string, statement: string): string {
  // The Base volume uses the xal-level marking for topics ("DIRM Step 1"), not levels.
  const meta = [
    `**Applies to:** ${prop(c, 'target')}`,
    `**${VOLUMES[volume].level ? 'Assurance level' : 'Topic'}:** ${prop(c, 'xal-level')}`,
    `**Section:** ${VOLUMES[volume].externalId} ${prop(c, 'index')}`
  ].join(' · ');
  return `${meta}\n\n${toMarkdown(statement)}`;
}

// The criterion's assurance-level marking as levels of its volume ("AAL2/AAl3" → AAL2, AAL3;
// "ALL" → every level). Topical markings ("Syncable", "RPs", the Base volume's DIRM steps)
// name no level and put the criterion in no baseline.
function levelsOf(marking: string, level: string | undefined): string[] {
  if (!level) return [];
  const all = [1, 2, 3].map(n => `${level}${n}`);
  if (marking.trim().toUpperCase() === 'ALL') return all;
  return marking.split('/').map(s => s.trim().toUpperCase()).filter(s => all.includes(s));
}

async function main(force: boolean): Promise<void> {
  const { file, body } = await fetchCatalog();
  const cached = path.join(CACHE_DIR, file);
  if (!force && fs.existsSync(cached) && fs.readFileSync(cached).equals(body) && fs.existsSync(PACKAGE_DIR)) {
    console.log(`${file} unchanged — nothing to do`);
    return;
  }

  const catalog = JSON.parse(body.toString('utf8')).catalog;
  const groups: OscalGroup[] = catalog.groups;
  const summaries: Record<string, string> = JSON.parse(fs.readFileSync(SUMMARIES, 'utf8'));
  const elementsDir = path.join(PACKAGE_DIR, 'elements');

  const files = new Map<string, string>();
  const missing: MissingSummary[] = [];
  const baselines = new Map<string, string[]>();
  const seen = new Set<string>();

  const statementOf = (c: OscalControl) => c.parts.find(p => p.name === 'statement')?.prose;
  const repeats = new Map<string, number>();
  for (const c of groups.flatMap(g => g.controls)) {
    const s = statementOf(c);
    if (s) repeats.set(textHash(s), (repeats.get(textHash(s)) ?? 0) + 1);
  }

  for (const g of groups) {
    const volume = VOLUMES[g.title];
    if (!volume) throw new Error(`unknown volume ${g.title}`);
    files.set(`elements/${volume.code}.yml`, dump({
      id: idOf(path.join(elementsDir, `${volume.code}.yml`)) ?? crypto.randomUUID(),
      name: volume.name,
      description: volume.name,
      elementType: VOLUME_TYPE,
      externalId: volume.externalId,
      aliases: [volume.code, volume.externalId]
    }));

    for (const c of g.controls) {
      const code = codeOf(c.id);
      if (seen.has(code) || Object.values(VOLUMES).some(v => v.code === code)) throw new Error(`element code collision: ${code}`);
      seen.add(code);

      const statement = statementOf(c);
      if (!statement) throw new Error(`${c.id}: no statement`);
      // NIST repeats some statements word for word across levels and sections (IAL1-17 =
      // IAL2-23). Their summaries are keyed by element code, so each names its own context;
      // a hash-keyed summary would land on every copy.
      const hash = textHash(statement);
      const own = summaries[code];
      const shared = (repeats.get(hash) ?? 0) > 1;
      const rules = applyContentRules(statement, own ? { [hash]: own } : shared ? {} : summaries);
      if (!rules) {
        // A repeated statement is listed under its code, so the summary is written per element.
        missing.push({ code, hash: shared ? code : hash, name: c.title, externalId: c.id, text: statement });
        continue;
      }
      if (descriptionViolations(rules.description).length) throw new Error(`${c.id}: description still violates the rules`);

      files.set(`elements/${code}.yml`, dump({
        id: idOf(path.join(elementsDir, `${code}.yml`)) ?? crypto.randomUUID(),
        name: c.title,
        description: rules.description,
        elementType: CRITERION_TYPE,
        externalId: c.id,
        aliases: [code, c.id],
        parent: volume.code
      }));
      files.set(`elements/${code}-background.md`, backgroundOf(c, g.title, statement));
      files.set(`elements/${code}-guidance.md`, guidanceOf(c));

      for (const level of levelsOf(prop(c, 'xal-level'), volume.level)) {
        baselines.set(level, [...(baselines.get(level) ?? []), code]);
      }
    }
  }

  if (missing.length) {
    const unique = [...new Map(missing.map(m => [m.hash, { ...m, framework: 'nist.800_63.rev4' }])).values()];
    fs.writeFileSync(WORKLIST, JSON.stringify(unique, null, 2) + '\n');
    console.error(`${unique.length} criteria need a summary — wrote ${path.relative(process.cwd(), WORKLIST)}; nothing written to the package`);
    process.exit(1);
  }

  for (const [level, codes] of [...baselines].sort()) {
    const family = level.slice(0, 3);
    const baselineFile = path.join(PACKAGE_DIR, 'baselines', `${level.toLowerCase()}.yml`);
    files.set(`baselines/${level.toLowerCase()}.yml`, dump({
      id: idOf(baselineFile) ?? crypto.randomUUID(),
      name: `SP 800-63-4 ${level} Baseline`,
      description: `Conformance criteria for ${LEVEL_NAMES[family]} ${level.slice(3)} (${level}): the criteria NIST marks ${level} or ALL.`,
      elements: Object.fromEntries(codes.map(code => [code, { mandatory: true, parameters: [], requirements: [] }]))
    }));
  }

  // Regenerate elements/ and baselines/ wholesale; ids were read above.
  for (const dir of ['elements', 'baselines']) fs.rmSync(path.join(PACKAGE_DIR, dir), { recursive: true, force: true });
  for (const [rel, content] of files) write(path.join(PACKAGE_DIR, rel), content);
  scaffold(catalog.metadata);

  fs.mkdirSync(CACHE_DIR, { recursive: true });
  for (const f of fs.readdirSync(CACHE_DIR)) fs.rmSync(path.join(CACHE_DIR, f));
  fs.writeFileSync(cached, body);
  console.log(`${file}: wrote ${seen.size} criteria, ${groups.length} volumes, ${baselines.size} baselines to ${path.relative(process.cwd(), PACKAGE_DIR)}`);
}

// index.yml, package.json, .npmrc and build.gradle.kts are written once: they are published
// and hand-maintained after that (version bumps come from the publish workflow).
function scaffold(metadata: { version: string }): void {
  const once = (rel: string, content: () => string) => {
    const file = path.join(PACKAGE_DIR, rel);
    if (!fs.existsSync(file)) write(file, content());
  };
  once('index.yml', () => dump({
    id: crypto.randomUUID(),
    name: 'NIST SP 800-63-4 - Digital Identity Guidelines Conformance Criteria',
    externalId: 'NIST SP 800-63-4',
    description: `Conformance criteria for NIST SP 800-63-4 Digital Identity Guidelines (Base, 63A, 63B and 63C volumes), conformance criteria v${metadata.version}`,
    standardType: 'framework',
    standardCategory: 'cyber',
    code: 'nist_800_63_rev4',
    status: 'approved',
    url: PAGE_URL,
    version: 'Rev. 4',
    external: true,
    internal: false,
    elementTypes: [
      { id: crypto.randomUUID(), code: VOLUME_TYPE, name: 'Volume', description: 'A volume of SP 800-63-4 (Base, 63A, 63B or 63C)' },
      { id: crypto.randomUUID(), code: CRITERION_TYPE, name: 'Conformance Criterion', description: 'A normative SP 800-63-4 requirement with its assessment objective and methods', parent: VOLUME_TYPE }
    ],
    mappingTypes: [CRITERION_TYPE],
    tags: [],
    aliases: []
  }));
  once('package.json', () => JSON.stringify({
    name: '@zerobias-org/framework-nist-800_63-rev4',
    version: '1.0.0',
    description: 'NIST SP 800-63-4 Digital Identity Guidelines Conformance Criteria',
    author: 'team@zerobias.com',
    license: 'ISC',
    type: 'module',
    repository: { type: 'git', url: 'git@github.com:zerobias-org/framework.git', directory: `package/nist/800_63/${VERSION_DIR}/` },
    scripts: { 'correct:deps': 'tsx ../../../../scripts/correctDeps.ts' },
    publishConfig: { registry: 'https://npm.pkg.github.com/' },
    files: ['index.yml', 'baselines/**', 'elements/**', 'mappings/**'],
    zerobias: { package: `nist.800_63.${VERSION_DIR}.framework`, 'import-artifact': 'framework', 'dataloader-version': '1.0.0' },
    dependencies: { '@zerobias-org/suite-nist-800_63': 'latest' }
  }, null, 2) + '\n');
  once('.npmrc', () => '@zerobias-org:registry=https://pkg.zerobias.org/\n//pkg.zerobias.org/:_authToken=${ZB_TOKEN}\n');
  once('build.gradle.kts', () => 'plugins { id("zb.content") }\n');
}

main(process.argv.includes('--force')).catch(e => {
  console.error(e);
  process.exit(1);
});
