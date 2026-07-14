#!/usr/bin/env node
// Synct een whitelist van pure domeinmodules uit ../factuurt/src/domain/
// naar src/domain/. Output is pipeline-eigendom: src/domain/ wordt eerst
// volledig leeggemaakt, handmatige wijzigingen overleven een sync dus nooit.
import { mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = resolve(ROOT, '../factuurt/src/domain')
const TARGET = join(ROOT, 'src/domain')

/** Paden relatief t.o.v. ../factuurt/src/domain — uitbreiden = hier toevoegen. */
export const WHITELIST = [
  'factuur/btwCalculator.ts',
  'factuur/factuur-berekening.ts',
  'shared/afrond.ts',
  'shared/format.ts',
]

export function withHeader(source, relPath) {
  return (
    `// GEGENEREERD door scripts/sync-domain.mjs — NIET BEWERKEN.\n` +
    `// Bron: ../factuurt/src/domain/${relPath}\n` +
    `// Wijzig de bron in factuurt en draai \`npm run sync:domain\`.\n\n` +
    source
  )
}

export function syncDomain({ source = SOURCE, target = TARGET } = {}) {
  if (!existsSync(source)) {
    throw new Error(`Bron niet gevonden: ${source} — staat ../factuurt naast dit project?`)
  }
  rmSync(target, { recursive: true, force: true })
  for (const rel of WHITELIST) {
    const from = join(source, rel)
    if (!existsSync(from)) throw new Error(`Whitelist-bestand ontbreekt in bron: ${rel}`)
    const to = join(target, rel)
    mkdirSync(dirname(to), { recursive: true })
    writeFileSync(to, withHeader(readFileSync(from, 'utf8'), rel))
  }
  return WHITELIST.length
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const n = syncDomain()
  console.log(`sync:domain — ${n} bestanden gesynct naar src/domain/`)
}
