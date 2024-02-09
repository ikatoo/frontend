import { expect, test } from '@playwright/test'
import axios from 'axios'
import { randomBytes } from 'crypto'
import { authorize } from 'src/helpers/playwrightUtils'

const _URL = '/admin/skills'

test.describe('ADMIN - Skills page', () => {
  test('has page title', async ({ page }) => {
    await page.goto(_URL)
    await authorize(page)

    await expect(page).toHaveURL(_URL)
    await expect(page).toHaveTitle(
      /ikatoo - software developer - Edit Skills Page/i
    )
  })

  test('should save new skills page', async ({ page, context }) => {
    const randomTestId = randomBytes(10).toString('hex')
    await page.goto(_URL)
    await authorize(page)

    await page.waitForURL('http://localhost:3000/admin/skills')
    const accessToken = `${
      (await context.storageState()).origins[0].localStorage[0].value
    }`
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    axios.delete(process.env.VITE_API_URL + '/skills-page')
    await page.reload({ waitUntil: 'networkidle' })

    await page.getByLabel('Título').fill('new title' + randomTestId)
    await page
      .getByPlaceholder('Descrição', { exact: true })
      .fill('new desc' + randomTestId)
    await page.getByRole('button', { name: 'Salvar' }).click()

    await expect(page.getByText('Success on create skills page.')).toBeVisible()
  })

  test('should complete update skills page data', async ({ page }) => {
    const randomTestId = randomBytes(10).toString('hex')
    const newData = {
      title: 'new title' + randomTestId,
      description: 'new description' + randomTestId
    }

    await page.goto(_URL)
    await authorize(page)
    await page.waitForLoadState()

    const title = page.getByLabel('Título')
    const description = page.getByPlaceholder('Descrição', { exact: true })

    await title.fill(newData.title)
    await description.fill(newData.description)
    await page.getByRole('button', { name: 'Atualizar' }).click()

    await expect(page.getByText('Success on update skills page.')).toBeVisible()
  })

  test('should partial update skills page data', async ({ page }) => {
    const randomTestId = randomBytes(10).toString('hex')
    const newData = {
      title: 'new title' + randomTestId,
      description: 'new description' + randomTestId
    }

    await page.goto(_URL)
    await authorize(page)
    await page.waitForLoadState()

    const title = page.getByLabel('Título')

    await title.fill(newData.title)
    await page.getByRole('button', { name: 'Atualizar' }).click()

    await expect(page.getByText('Success on update skills page.')).toBeVisible()
  })
})
