#!/usr/bin/env bash
# Groen-gate van de marketingsite — deterministisch script i.p.v. agent-spawn,
# zodat de build-loop hiervoor nul model-tokens betaalt behalve dit rapport.
#
# Gebruik:  bash scripts/gate.sh   (vanuit de projectroot of waar dan ook)
# Output:   VERDICT/TYPECHECK/LINT/TESTS/BUILD/FAILING/REGRESSED, compact.
# Exit:     0 = GREEN, 1 = RED, 2 = RED met regressie (harde stop).
# Manifest: .claude/state/test-manifest.json — baseline = laatste volledig
#           groene run; wordt alleen dan bijgewerkt.
# Volgorde en short-circuit: type-check → lint → tests → build; bij rood
# worden latere stappen als SKIPPED gerapporteerd, niet gedraaid.

set -u
cd "$(cd "$(dirname "$0")/.." && pwd)" || exit 1

if [ ! -f package.json ]; then
  echo "VERDICT: RED"
  echo "FOUT: geen package.json in $(pwd) — project nog niet gescaffold (M0)."
  exit 1
fi

mkdir -p .claude/state
LOG=.claude/state/gate-last.log
: > "$LOG"

first_error() { grep -m1 -iE 'error' "$LOG" | cut -c1-200; }

TC="pass"; LINT="SKIPPED"; TESTS_BLOCK=""; BUILD="SKIPPED"
EXIT=0

# 1. Typecheck (bij verdenking stale .next: één clean + retry, dan pas rood)
if ! npm run type-check >"$LOG" 2>&1; then
  if grep -q '\.next/' "$LOG" && npm run clean >/dev/null 2>&1; then
    npm run type-check >"$LOG" 2>&1 || { TC="fail ($(first_error))"; EXIT=1; }
  else
    TC="fail ($(first_error))"; EXIT=1
  fi
fi

# 2. Lint (0 errors vereist; warnings tellen, niet blokkeren)
if [ $EXIT -eq 0 ]; then
  if npm run lint >"$LOG" 2>&1; then
    W=$(grep -oiE '[0-9]+ warning' "$LOG" | grep -oE '[0-9]+' | head -1)
    LINT="pass (${W:-0} warnings)"
  else
    E=$(grep -oiE '[0-9]+ error' "$LOG" | grep -oE '[0-9]+' | head -1)
    LINT="fail (${E:-?} errors)"; EXIT=1
  fi
fi

# 3. Volledige testsuite + regressie-diff tegen het manifest
if [ $EXIT -eq 0 ]; then
  npx vitest run --passWithNoTests --reporter=json \
    --outputFile=.claude/state/vitest-last.json >"$LOG" 2>&1
  TESTS_BLOCK=$(node scripts/manifest-diff.mjs)
  RC=$?
  [ $RC -ge 1 ] && EXIT=$RC
fi

# 4. Productie-build (alleen als alles ervoor groen is)
if [ $EXIT -eq 0 ]; then
  if npm run build >"$LOG" 2>&1; then
    BUILD="pass"
  else
    BUILD="fail ($(first_error))"; EXIT=1
  fi
fi

# Baseline bevriezen op de laatste volledig groene run
[ $EXIT -eq 0 ] && node scripts/manifest-diff.mjs --update >/dev/null 2>&1

[ $EXIT -eq 0 ] && echo "VERDICT: GREEN" || echo "VERDICT: RED"
echo "TYPECHECK: $TC"
echo "LINT: $LINT"
if [ -n "$TESTS_BLOCK" ]; then echo "$TESTS_BLOCK"; else echo "TESTS: SKIPPED"; fi
echo "BUILD: $BUILD"
echo "(volledige log: $LOG)"
exit $EXIT
