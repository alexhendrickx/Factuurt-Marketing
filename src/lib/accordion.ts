/** Single-open reducer: klik op een open item sluit het; anders opent dat item. */
export function toggleAccordion(current: number | null, index: number): number | null {
  return current === index ? null : index
}

/** Deterministische, botsvrije ids voor header-knop en panel van item `index`. */
export function accordionIds(baseId: string, index: number): { headerId: string; panelId: string } {
  return {
    headerId: `${baseId}-h-${index}`,
    panelId: `${baseId}-p-${index}`,
  }
}
