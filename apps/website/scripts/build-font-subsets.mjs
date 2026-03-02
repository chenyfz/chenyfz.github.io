import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, unlinkSync, writeFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = resolve(appRoot, 'public/fonts/subsets');
const manifestJsonPath = resolve(outputDir, 'font-subsets-manifest.json');
const manifestTsPath = resolve(appRoot, 'src/generated/font-subsets-manifest.ts');

const sourceFonts = {
  oppo: resolve(appRoot, 'public/fonts/OPPO Sans 4.0.ttf'),
  zhuque: resolve(appRoot, 'public/fonts/ZhuqueFangsong-Regular.ttf')
};

const i18nRoot = resolve(appRoot, 'src/i18n');

const ascii = Array.from({ length: 95 }, (_, index) => String.fromCharCode(index + 32)).join('');

function hasPrebuiltSubsets() {
  if (!existsSync(manifestJsonPath)) {
    return false;
  }

  const manifest = JSON.parse(readFileSync(manifestJsonPath, 'utf8'));

  return Object.keys(localeInputs).every((locale) => {
    const entry = manifest[locale];
    if (!entry || !entry.oppoSans400 || !entry.zhuqueFangsong400) {
      return false;
    }

    const oppoPath = resolve(outputDir, entry.oppoSans400);
    const zhuquePath = resolve(outputDir, entry.zhuqueFangsong400);
    return existsSync(oppoPath) && existsSync(zhuquePath);
  });
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

function hashFile(filePath) {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex').slice(0, 8);
}

function removeExistingSubsetOutputs() {
  if (!existsSync(outputDir)) {
    return;
  }

  const entries = readdirSync(outputDir, { withFileTypes: true });
  const subsetPattern = /^(oppo-sans-400|zhuque-fangsong-400)-.*\.woff2$/;

  for (const entry of entries) {
    if (!entry.isFile() || !subsetPattern.test(entry.name)) {
      continue;
    }

    unlinkSync(resolve(outputDir, entry.name));
  }
}

function generateHashedSubset({ input, locale, familyPrefix, textFile }) {
  const tmpOutput = resolve(tmpdir(), `website-font-subset-${familyPrefix}-${locale}-${Date.now()}.woff2`);
  subsetFont({ input, output: tmpOutput, textFile });

  const hash = hashFile(tmpOutput);
  const fileName = `${familyPrefix}-${locale}.${hash}.woff2`;
  const outputPath = resolve(outputDir, fileName);
  renameSync(tmpOutput, outputPath);

  return fileName;
}

function writeManifest(manifest) {
  writeFileSync(manifestJsonPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  mkdirSync(dirname(manifestTsPath), { recursive: true });
  const source = [
    '// This file is auto-generated by scripts/build-font-subsets.mjs',
    `export const fontSubsetsManifest = ${JSON.stringify(manifest, null, 2)} as const;`,
    '',
    'export type FontSubsetLocale = keyof typeof fontSubsetsManifest;'
  ].join('\n');

  writeFileSync(manifestTsPath, `${source}\n`, 'utf8');
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
  removeExistingSubsetOutputs();

  const manifest = {};

  for (const [locale, inputFiles] of Object.entries(localeInputs)) {
    const localeSourceText = inputFiles.map((filePath) => extractQuotedText(filePath)).join('');
    const localeText = toCharacterSet(localeSourceText);
    const textFile = resolve(tmpdir(), `website-i18n-font-subset-${locale}.txt`);
    writeFileSync(textFile, localeText, 'utf8');

    const oppo400 = instantiateWeight({ input: sourceFonts.oppo, weight: 400, locale });
    const oppoSans400 = generateHashedSubset({
      input: oppo400,
      familyPrefix: 'oppo-sans-400',
      locale,
      textFile
    });

    const zhuqueFangsong400 = generateHashedSubset({
      input: sourceFonts.zhuque,
      familyPrefix: 'zhuque-fangsong-400',
      locale,
      textFile
    });

    manifest[locale] = { oppoSans400, zhuqueFangsong400 };

    console.log(`Generated font subsets for locale: ${locale} (from ${inputFiles.length} i18n files)`);
  }

  writeManifest(manifest);
}

run();
