/** Vervangt de '{year}'-placeholder door een expliciet jaar (default: nu).
 *  Pure functie → deterministisch testbaar; geen hardcoded jaar in componenten. */
export function renderCopyright(
  template: string,
  year: number = new Date().getFullYear(),
): string {
  return template.replaceAll('{year}', String(year))
}
