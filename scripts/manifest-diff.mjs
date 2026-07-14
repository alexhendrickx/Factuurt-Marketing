#!/usr/bin/env node
// Diff de laatste vitest-run tegen het manifest (baseline = laatste volledig
// groene run). Print de TESTS/FAILING/REGRESSED-regels van het gate-rapport.
// Exit: 0 = ok, 1 = failures, 2 = regressie. `--update` bevriest de baseline
// (alleen aanroepen na een volledig groene gate — doet gate.sh zelf).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const RESULTS = '.claude/state/vitest-last.json';
const MANIFEST = '.claude/state/test-manifest.json';
const update = process.argv.includes('--update');

if (!existsSync(RESULTS)) {
  console.log('TESTS: 0/0 (geen vitest-output — zie gate-last.log)');
  process.exit(1);
}

const run = JSON.parse(readFileSync(RESULTS, 'utf8'));
const cwd = process.cwd() + '/';
const current = {};
for (const file of run.testResults ?? []) {
  const rel = (file.name ?? '').replace(cwd, '');
  for (const t of file.assertionResults ?? []) {
    current[`${rel} > ${t.fullName}`] = t.status;
  }
}

const baseline = existsSync(MANIFEST)
  ? JSON.parse(readFileSync(MANIFEST, 'utf8'))
  : {};

const entries = Object.entries(current);
const failing = entries.filter(([, s]) => s === 'failed').map(([k]) => k);
const regressed = Object.entries(baseline)
  .filter(([, s]) => s === 'passed')
  .filter(([k]) => current[k] !== 'passed')
  .map(([k]) => `${k} (${current[k] ?? 'verdwenen'})`);

const passed = entries.filter(([, s]) => s === 'passed').length;
console.log(`TESTS: ${passed}/${entries.length}`);
console.log(`FAILING: ${failing.length ? failing.slice(0, 10).join(' | ') : 'geen'}`);
console.log(`REGRESSED: ${regressed.length ? regressed.slice(0, 10).join(' | ') : 'geen'}`);

if (update) writeFileSync(MANIFEST, JSON.stringify(current, null, 2) + '\n');
process.exit(regressed.length ? 2 : failing.length ? 1 : 0);
