import { expect, test } from '@playwright/test'
import axios from 'axios'
import aboutPageMock from 'shared/mocks/aboutPageMock/result.json' assert { type: 'json' }
import { authorize } from 'src/helpers/playwrightUtils'

const _URL = '/admin'

test.describe('ADMIN - About page', () => {
  test('has page title', async ({ page }) => {
    await page.goto(_URL)
    await authorize(page)

    await expect(page).toHaveTitle(
      /ikatoo - software developer - Edit About Page/i
    )
  })

  test('should save new about page', async ({ page, context }) => {
    await page.goto(_URL)
    await authorize(page)

    await page.waitForURL('http://localhost:3000/admin/about')
    const accessToken = `${
      (await context.storageState()).origins[0].localStorage[0].value
    }`
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    axios.delete(process.env.VITE_API_URL + '/about-page')
    await page.reload({ waitUntil: 'networkidle' })

    const title = page.getByPlaceholder('Título')
    const description = page.getByPlaceholder('Descrição', { exact: true })
    const url = page.getByPlaceholder('https://dominio.com/imagem.png')
    const alt = page.getByPlaceholder('Descrição da imagem')

    await title.fill('new title')
    await description.fill('new description')
    await url.fill('new url')
    await alt.fill('new alt')
    await page.getByRole('button', { name: 'Salvar' }).click()
    await expect(page.getByText('Success on create about page.')).toBeVisible()
  })

  test('should complete update about page', async ({ page }) => {
    const newData: Omit<typeof aboutPageMock, 'id'> = {
      title: 'new title',
      description: 'new description',
      image: {
        url: 'new url',
        alt: 'new alt'
      }
    }

    await page.goto(_URL)
    await authorize(page)

    const title = page.getByPlaceholder('Título')
    const description = page.getByPlaceholder('Descrição', { exact: true })
    const updateButton = page.getByRole('button', { name: 'Atualizar' })

    await title.fill(newData.title)
    await description.fill(newData.description)

    await updateButton.click()

    await expect(page.getByText('Success on update about page.')).toBeVisible()
  })

  test('should partial update about page', async ({ page }) => {
    page.goto(_URL)
    await authorize(page)

    await page.route(
      `${process.env.VITE_API_URL}/about-page`,
      async (route) => {
        await route.fulfill({ json: aboutPageMock, status: 200 })
      }
    )

    const description = page.getByPlaceholder('Descrição', { exact: true })
    const updateButton = page.getByRole('button', { name: 'Atualizar' })

    await description.fill('new description')
    await updateButton.click()

    await expect(page.getByText('Success on update about page.')).toBeVisible()
  })
})
