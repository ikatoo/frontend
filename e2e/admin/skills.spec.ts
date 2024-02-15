import { expect, request, test } from '@playwright/test'
import { randomBytes } from 'crypto'
import { authorize } from 'src/helpers/playwrightUtils'

const _URL = '/admin/skills'

const api = await request.newContext({
  baseURL: process.env.VITE_API_URL
})

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
    await api.delete('/skills-page', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    await page.reload({ waitUntil: 'networkidle' })

    await page.getByLabel('Título').fill('new title' + randomTestId)
    await page
      .getByPlaceholder('Descrição', { exact: true })
      .fill('new desc' + randomTestId)
    await page.getByRole('button', { name: 'Salvar' }).click()

    await expect(page.getByText('Success on create skills page.')).toBeVisible()
  })

  test('should complete update skills page data', async ({ page, context }) => {
    const randomTestId = randomBytes(10).toString('hex')
    const newData = {
      title: 'new title' + randomTestId,
      description: 'new description' + randomTestId
    }

    await page.goto(_URL)
    await authorize(page)

    await page.waitForURL('http://localhost:3000/admin/skills')
    const accessToken = `${
      (await context.storageState()).origins[0].localStorage[0].value
    }`
    const data = await (await api.get('skills-page/user-id/1')).json()
    if (!data?.title)
      await api.post('/skills-page', {
        data: {
          title: 'first title',
          description: 'first description'
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    await page.reload({ waitUntil: 'networkidle' })

    const title = page.getByLabel('Título')
    const description = page.getByPlaceholder('Descrição', { exact: true })

    await title.fill(newData.title)
    await description.fill(newData.description)

    await page.getByRole('button', { name: 'Atualizar' }).click()

    await expect(page.getByText('Success on update skills page.')).toBeVisible()
  })

  test('should partial update skills page data', async ({ page, context }) => {
    const randomTestId = randomBytes(10).toString('hex')
    const newData = {
      title: 'new title' + randomTestId,
      description: 'new description' + randomTestId
    }

    await page.goto(_URL)
    await authorize(page)

    await page.waitForURL('http://localhost:3000/admin/skills')
    const accessToken = `${
      (await context.storageState()).origins[0].localStorage[0].value
    }`
    const data = await (await api.get('skills-page/user-id/1')).json()
    if (!data?.title)
      await api.post('/skills-page', {
        data: {
          title: 'first title',
          description: 'first description'
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    await page.reload({ waitUntil: 'networkidle' })

    const title = page.getByLabel('Título')

    await title.fill(newData.title)
    await page.getByRole('button', { name: 'Atualizar' }).click()

    await expect(page.getByText('Success on update skills page.')).toBeVisible()
  })
})
