import { expect, test } from '@playwright/test'

test('hero toont headline, subtitle en het dashboard-screenshot', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('img', { name: 'Het dashboard van Factuurt op een telefoon' })).toBeVisible()
})

test("hero-CTA's wijzen naar de juiste targets", async ({ page }) => {
  await page.goto('/')
  const primary = page.getByRole('link', { name: 'Start gratis' })
  const secondary = page.getByRole('link', { name: 'Bekijk hoe het werkt' })
  await expect(primary).toBeVisible()
  await expect(secondary).toHaveAttribute('href', '#workflow')
})

test('externe primaire CTA heeft target="_blank" en rel="noopener noreferrer" als href extern is', async ({
  page,
}) => {
  await page.goto('/')

  const primary = page.getByRole('link', { name: 'Start gratis' })
  const href = await primary.getAttribute('href')

  // Als href met http(s) begint (extern), moet target="_blank" en rel="noopener noreferrer" aanwezig zijn
  if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
    await expect(primary).toHaveAttribute('target', '_blank')
    await expect(primary).toHaveAttribute('rel', 'noopener noreferrer')
  }
})

test('interne secundaire CTA heeft geen target en rel attributen', async ({ page }) => {
  await page.goto('/')
  const secondary = page.getByRole('link', { name: 'Bekijk hoe het werkt' })

  // Secundaire CTA wijst naar #workflow (fragment, intern) en mag geen target/rel hebben
  await expect(secondary).toHaveAttribute('href', '#workflow')
  const target = await secondary.getAttribute('target')
  const rel = await secondary.getAttribute('rel')

  expect(target).toBeNull()
  expect(rel).toBeNull()
})
