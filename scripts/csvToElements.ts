import { promises as fs } from 'fs';
import { createReadStream } from 'fs';
import path from 'path';
import yaml from 'yaml';
import { randomUUID } from 'node:crypto';
import { parse } from 'csv-parse';

interface FrameworkElement {
  id: string;
  name: string;
  description: string;
  elementType: string;
  externalId: string;
  aliases: string[];
  parent?: string;
}

interface CsvRecord {
  externalId: string;
  name: string;
  description: string;
  elementType?: string;
  parent?: string;
}

interface CliOptions {
  csvFilePath: string;
  outputDirectory?: string;
  defaultElementType?: string;
  shouldSkipHeader?: boolean;
}

function parseCliArguments(): CliOptions {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    displayHelpText();
    process.exit(0);
  }

  const csvFilePath = args[0];
  const outputDirectory = getArgumentValue(args, '--output-dir') || path.join(process.cwd(), 'elements');
  const defaultElementType = getArgumentValue(args, '--element-type') || 'control';
  const shouldSkipHeader = !args.includes('--no-skip-header');

  return { csvFilePath, outputDirectory, defaultElementType, shouldSkipHeader };
}

function displayHelpText(): void {
  console.log(`
Usage: node csvToElements.ts <csv-file> [options]

Arguments:
  csv-file              Path to the CSV file

Options:
  --output-dir <dir>    Output directory for elements (default: ./elements)
  --element-type <type> Default element type (default: control)
  --skip-header         Skip first row as header (default: true)
  --help, -h            Show this help message

CSV Format:
  externalId,name:description
  or
  externalId,name,description
  or 
  externalId,name,description,elementType,parent
`);
}

function getArgumentValue(args: string[], flag: string): string | undefined {
  const flagIndex = args.indexOf(flag);
  return flagIndex !== -1 && flagIndex + 1 < args.length ? args[flagIndex + 1] : undefined;
}

async function parseCsvFile(csvFilePath: string, shouldSkipHeader: boolean): Promise<CsvRecord[]> {
  return new Promise((resolve, reject) => {
    const csvRecords: CsvRecord[] = [];
    let isFirstRow = true;

    createReadStream(csvFilePath)
      .pipe(parse({ 
        delimiter: ',',
        columns: false,
        skip_empty_lines: true,
        trim: true
      }))
      .on('data', (row: string[]) => {
        if (shouldSkipHeader && isFirstRow) {
          isFirstRow = false;
          return;
        }
        
        const csvRecord = parseCsvRow(row);
        if (csvRecord) {
          csvRecords.push(csvRecord);
        }
      })
      .on('end', () => resolve(csvRecords))
      .on('error', reject);
  });
}

function parseCsvRow(row: string[]): CsvRecord | null {
  if (row.length < 2) return null;

  const [externalId, nameOrNameDescription, description, elementType, parent] = row;
  
  if (!externalId?.trim()) return null;

  let elementName: string;
  let elementDescription: string;

  if (description) {
    elementName = nameOrNameDescription || '';
    elementDescription = description;
  } else {
    const nameDescriptionPair = nameOrNameDescription || '';
    const colonIndex = nameDescriptionPair.indexOf(':');
    if (colonIndex !== -1) {
      elementName = nameDescriptionPair.substring(0, colonIndex);
      elementDescription = nameDescriptionPair.substring(colonIndex + 1);
    } else {
      elementName = nameDescriptionPair;
      elementDescription = '';
    }
  }

  return {
    externalId: externalId.trim(),
    name: elementName.trim(),
    description: elementDescription.trim(),
    elementType: elementType?.trim(),
    parent: parent?.trim()
  };
}

function createFrameworkElement(csvRecord: CsvRecord, defaultElementType: string): FrameworkElement {
  const frameworkElement: FrameworkElement = {
    id: randomUUID(),
    name: csvRecord.name,
    description: csvRecord.description,
    elementType: csvRecord.elementType || defaultElementType,
    externalId: csvRecord.externalId,
    aliases: []
  };

  if (csvRecord.parent) {
    frameworkElement.parent = csvRecord.parent;
  }

  return frameworkElement;
}

function sanitizeFilename(filename: string): string {
  return filename.replace(/[./\\:*?"<>|]/g, "_");
}

async function writeElementsToFiles(elements: FrameworkElement[], outputDirectory: string): Promise<void> {
  await fs.mkdir(outputDirectory, { recursive: true });
  
  const writePromises = elements.map(async (element) => {
    const yamlFilename = `${sanitizeFilename(element.externalId)}.yml`;
    const yamlFilePath = path.join(outputDirectory, yamlFilename);
    const yamlContent = yaml.stringify(element);
    await fs.writeFile(yamlFilePath, yamlContent);
    console.log(`✓ ${yamlFilename}`);
  });

  await Promise.all(writePromises);
}

async function main(): Promise<void> {
  try {
    const cliOptions = parseCliArguments();
    
    console.log(`Reading CSV file: ${cliOptions.csvFilePath}`);
    const csvRecords = await parseCsvFile(cliOptions.csvFilePath, cliOptions.shouldSkipHeader!);
    
    if (csvRecords.length === 0) {
      console.error('No valid rows found in CSV file');
      process.exit(1);
    }

    console.log(`Processing ${csvRecords.length} rows...`);
    
    const frameworkElements = csvRecords.map(record => 
      createFrameworkElement(record, cliOptions.defaultElementType!)
    );
    
    console.log(`Writing ${frameworkElements.length} elements to: ${cliOptions.outputDirectory}`);
    await writeElementsToFiles(frameworkElements, cliOptions.outputDirectory!);
    
    console.log(`\n✅ Successfully created ${frameworkElements.length} elements`);
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    if (error.code === 'ENOENT') {
      console.error('CSV file not found. Please check the file path.');
    }
    process.exit(1);
  }
}

main();