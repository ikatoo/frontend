import { Page } from '@playwright/test'

export const authorize = async (page: Page) => {
  await page.getByLabel('E-mail').fill('teste@teste.com')
  await page.getByLabel('Senha').fill('teste')

  await page
    .getByRole('button', {
      name: 'ENTRAR'
    })
    .click()
}
