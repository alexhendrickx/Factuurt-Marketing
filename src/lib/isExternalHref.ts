/**
 * Bepaalt of een href extern moet openen in een nieuw tabblad met beveiliging.
 * Externe links: absoluut HTTP(S). Interne links: relatief of #-fragment.
 */
export function shouldOpenExternal(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://')
}
