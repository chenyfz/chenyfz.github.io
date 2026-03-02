#!/usr/bin/env node

import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const argv = process.argv.slice(2);
const defaultDir = 'public/search/services';

let targetDir = defaultDir;
let quality = '72-90';
let speed = '1';
let useOxipng = true;

for (const arg of argv) {
  if (arg.startsWith('--dir=')) targetDir = arg.slice('--dir='.length);
  else if (arg.startsWith('--quality=')) quality = arg.slice('--quality='.length);
  else if (arg.startsWith('--speed=')) speed = arg.slice('--speed='.length);
  else if (arg === '--no-oxipng') useOxipng = false;
  else if (arg === '--help' || arg === '-h') {
    console.log(`Usage: node ./scripts/optimize-service-pngs.mjs [options]\n\nOptions:\n  --dir=PATH        Target directory (default: ${defaultDir})\n  --quality=MIN-MAX pngquant quality range, e.g. 72-90\n  --speed=1..11     pngquant speed (1 slower/better, 11 faster)\n  --no-oxipng       Skip optional oxipng pass\n  -h, --help        Show this help`);
    process.exit(0);
  }
}

const absDir = resolve(process.cwd(), targetDir);
if (!existsSync(absDir) || !statSync(absDir).isDirectory()) {
  console.error(`Directory not found: ${absDir}`);
  process.exit(1);
}

function hasCommand(command) {
  const check = spawnSync('sh', ['-lc', `command -v ${command}`], { stdio: 'ignore' });
  return check.status === 0;
}

if (!hasCommand('pngquant')) {
  console.error('pngquant is required but not installed.');
  console.error('Install example: sudo apt-get install pngquant');
  process.exit(1);
}

const pngFiles = readdirSync(absDir)
  .filter((name) => name.toLowerCase().endsWith('.png'))
  .map((name) => join(absDir, name));

if (pngFiles.length === 0) {
  console.log('No PNG files found.');
  process.exit(0);
}

const beforeBytes = pngFiles.reduce((sum, file) => sum + statSync(file).size, 0);

for (const file of pngFiles) {
  const quant = spawnSync(
    'pngquant',
    ['--force', '--skip-if-larger', `--quality=${quality}`, `--speed=${speed}`, '--ext', '.png', file],
    { stdio: 'inherit' }
  );
  if (quant.status !== 0 && quant.status !== 98) {
    console.error(`pngquant failed for: ${file}`);
    process.exit(1);
  }
}

const canUseOxipng = useOxipng && hasCommand('oxipng');
if (canUseOxipng) {
  const oxi = spawnSync('oxipng', ['-o', '2', '--strip', 'safe', ...pngFiles], { stdio: 'inherit' });
  if (oxi.status !== 0) {
    console.error('oxipng failed.');
    process.exit(1);
  }
} else if (useOxipng) {
  console.log('oxipng not found, skipping optional second pass.');
}

const afterBytes = pngFiles.reduce((sum, file) => sum + statSync(file).size, 0);
const saved = beforeBytes - afterBytes;
const ratio = beforeBytes > 0 ? ((saved / beforeBytes) * 100).toFixed(2) : '0.00';

console.log(`Optimized ${pngFiles.length} PNG files in ${absDir}`);
console.log(`Before: ${beforeBytes} bytes`);
console.log(`After:  ${afterBytes} bytes`);
console.log(`Saved:  ${saved} bytes (${ratio}%)`);
