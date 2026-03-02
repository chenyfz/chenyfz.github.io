import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = resolve(appRoot, 'public/fonts/subsets');

const sourceFonts = {
  oppo: resolve(appRoot, 'public/fonts/OPPO Sans 4.0.ttf'),
  zhuque: resolve(appRoot, 'public/fonts/ZhuqueFangsong-Regular.ttf')
};

const i18nRoot = resolve(appRoot, 'src/i18n');

const ascii = Array.from({ length: 95 }, (_, index) => String.fromCharCode(index + 32)).join('');

function hasPrebuiltSubsets() {
  return expectedOutputs.every((output) => existsSync(output));
}

function collectTypeScriptFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectTypeScriptFiles(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.ts')) {
      files.push(fullPath);
    }
  }

  return files;
}

function discoverLocaleSources() {
  const tsFiles = collectTypeScriptFiles(i18nRoot);
  const localeFilePattern = /^[a-z]{2}(?:-[A-Z]{2})?\.ts$/;
  const localeToFiles = new Map();

  for (const filePath of tsFiles) {
    const fileName = basename(filePath);
    if (!localeFilePattern.test(fileName)) {
      continue;
    }

    const locale = basename(filePath, '.ts');
    const existing = localeToFiles.get(locale) ?? [];
    existing.push(filePath);
    localeToFiles.set(locale, existing);
  }

  const localeInputs = Object.fromEntries(
    [...localeToFiles.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([locale, files]) => [locale, files.sort()])
  );

  const locales = Object.keys(localeInputs);
  if (locales.length === 0) {
    throw new Error(`No locale source files found under: ${i18nRoot}`);
  }

  return localeInputs;
}

const localeInputs = discoverLocaleSources();

const expectedOutputs = Object.keys(localeInputs)
  .flatMap((locale) => [`oppo-sans-400-${locale}.woff2`, `zhuque-fangsong-400-${locale}.woff2`])
  .map((file) => resolve(outputDir, file));

function assertRequirements() {
  for (const [name, fontPath] of Object.entries(sourceFonts)) {
    if (!existsSync(fontPath)) {
      throw new Error(`Missing source font (${name}): ${fontPath}`);
    }
  }

  const probe = spawnSync('pyftsubset', ['--help'], { encoding: 'utf8' });
  const hasSubsetter = !probe.error && probe.status === 0;

  const instancerProbe = spawnSync('fonttools', ['varLib.instancer', '--help'], { encoding: 'utf8' });
  const hasInstancer = !instancerProbe.error && instancerProbe.status === 0;

  if (hasSubsetter && hasInstancer) {
    return true;
  }

  if (hasPrebuiltSubsets()) {
    console.warn('Skipping font subset generation because fonttools is unavailable. Using prebuilt subsets.');
    return false;
  }

  throw new Error('fonttools is required. Install with: python -m pip install fonttools brotli');
}

function extractQuotedText(filePath) {
  const source = readFileSync(filePath, 'utf8');
  const pattern = /(['"`])((?:\\.|(?!\1).)*)\1/gs;
  let match;
  const chunks = [];

  while ((match = pattern.exec(source))) {
    chunks.push(match[2]);
  }

  return chunks.join('');
}

function toCharacterSet(text) {
  const set = new Set((text + ascii + '\n\r\t').split(''));
  return [...set].sort((a, b) => a.codePointAt(0) - b.codePointAt(0)).join('');
}

function subsetFont({ input, output, textFile }) {
  const args = [
    input,
    '--flavor=woff2',
    `--output-file=${output}`,
    `--text-file=${textFile}`,
    '--layout-features=*',
    '--no-hinting'
  ];

  const run = spawnSync('pyftsubset', args, { stdio: 'pipe', encoding: 'utf8' });

  if (run.status !== 0) {
    const stderr = run.stderr?.trim();
    throw new Error(`pyftsubset failed for ${output}${stderr ? `\n${stderr}` : ''}`);
  }
}

function instantiateWeight({ input, weight, locale }) {
  const output = resolve(tmpdir(), `website-i18n-oppo-${locale}-${weight}.ttf`);
  const args = ['varLib.instancer', input, `wght=${weight}`, '--static', '--output', output];
  const run = spawnSync('fonttools', args, { stdio: 'pipe', encoding: 'utf8' });

  if (run.status !== 0) {
    const stderr = run.stderr?.trim();
    throw new Error(`fonttools varLib.instancer failed for wght=${weight}${stderr ? `\n${stderr}` : ''}`);
  }

  return output;
}

function run() {
  const canBuildSubsets = assertRequirements();
  if (!canBuildSubsets) {
    return;
  }

  mkdirSync(outputDir, { recursive: true });

  for (const [locale, inputFiles] of Object.entries(localeInputs)) {
    const localeSourceText = inputFiles.map((filePath) => extractQuotedText(filePath)).join('');
    const localeText = toCharacterSet(localeSourceText);
    const textFile = resolve(tmpdir(), `website-i18n-font-subset-${locale}.txt`);
    writeFileSync(textFile, localeText, 'utf8');

    const oppo400 = instantiateWeight({ input: sourceFonts.oppo, weight: 400, locale });
    subsetFont({
      input: oppo400,
      output: resolve(outputDir, `oppo-sans-400-${locale}.woff2`),
      textFile
    });

    subsetFont({
      input: sourceFonts.zhuque,
      output: resolve(outputDir, `zhuque-fangsong-400-${locale}.woff2`),
      textFile
    });

    console.log(`Generated font subsets for locale: ${locale} (from ${inputFiles.length} i18n files)`);
  }
}

run();
