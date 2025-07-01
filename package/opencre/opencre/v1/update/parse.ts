import { UUID } from '@auditmation/types-core-js';
import { getLogger } from '@auditmation/util-logger';
import fs from 'fs';
import yml from 'js-yaml';
import path from 'path';
import { cwd } from 'process';


const unmapped = new Set<string>();
const data = require('./all_cres.json').data;
const logger = getLogger('general');

const elementsLinks = {};

const standardFunctionMappings: Record<string, (x: string) => string> = {
  "NIST 800-53 v5": (x) => `nist.80053.rev5.framework/${x.split(' ')[0].toLowerCase().replace(' ', '').replace('(', '_').replace(')', '')}`,
  "Cloud Controls Matrix": (x) => `csa.ccm.v4_0_12.framework/${x.toLowerCase().replace(/\&/g, '_')}`,
  "ASVS": (x) => `owasp.asvs.v4_0_3.framework/${x.toLowerCase().slice(1)}`,
  "SAMM": (x) => `owasp.samm.v1_0.framework/${x.toLowerCase()}`,
  "ISO 27001": (x) => `iso.27001.2013.framework/${x.toLowerCase()}`,
  "NIST SSDF": (x) => `nist.800218.v1_1.framework/${x.toLowerCase().replace(/\./g, '_')}`,
  "CWE": (x) => `CWE-${x}`,
  "CAPEC": (x) => `CAPEC-${x}`,
  "OWASP Web Security Testing Guide (WSTG)": (x) => `owasp.wstg.v5.benchmark/${x.toLowerCase()}`
}

interface Document {
  doctype: string;
  hyperlink: string;
  name: string;
  section?: string;
  sectionID?: string;
}


function linkToPackageCode(document: Document, elementId: string): string {
  const mapping = standardFunctionMappings[document.name];
  if (mapping) {
    const mappedName = mapping(document.sectionID || document.section || document.name);
    const [packageName, element] = mappedName.split('/');
    if (element == undefined) {
      return mappedName;
    }
    if (!elementsLinks[packageName]) {
      elementsLinks[packageName] = [];
    }
    elementsLinks[packageName].push([element, elementId]);
    return mappedName;
  }
  unmapped.add(document.name);
  return `${document.name}/${document.sectionID || document.section}`
}

function saveYML(elementPath: string, data: any,) {
  if (!data) {
    logger.warning('No content to save for file:', elementPath);
    return;
  }
  if (fs.existsSync(elementPath)) {
    const existingData = yml.load(fs.readFileSync(elementPath, 'utf8')) as any;
    data.id = existingData ? existingData.id : data.id;
    fs.unlinkSync(elementPath);
  }
  fs.writeFileSync(elementPath, yml.dump(data, { indent: 2, lineWidth: -1 }));
}

function main() {
  data.forEach((e: any) => {
    const demonstrates = e.links
      .filter(l => l.document.doctype == 'Standard')
      .map((l: any) => linkToPackageCode(l.document, e.id))


    const links = demonstrates.length > 0 ? { demonstrates } : undefined;
    const element = {
      id: UUID.generateV4().toString(),
      name: e.name,
      description: e.description || e.name,
      externalId: e.id,
      elementType: 'cre',
      links,
      parent: e.links.find((l: any) => l.ltype === 'Contains')?.document.id || undefined
    };
    saveYML(path.join(__dirname, '../elements', `${element.externalId}.yml`), element);
  })
  logger.info('Unmapped standards:', unmapped);
  logger.info('Elements links:', elementsLinks);
  Object.entries(elementsLinks).forEach(([packageName, elements]) => {
    const packageData = {
      elements: (elements as [string, string][]).map(([element, elementId]) => ({
        id: UUID.generateV4().toString(),
        targetElement: elementId,
        sourceElement: element,
        relationshipType: 'intersects',
        strengthOfRelationship: 5,
      }))
    };
    saveYML(cwd() + `/${packageName}.yml`, packageData);
  });
  logger.info('All done!');

}
main();