import { expect, test } from '@playwright/test'
import skillsPageMock from 'shared/mocks/skillsPageMock/result.json' assert { type: 'json' }
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

  test('should save new skills page', async ({ page }) => {
    await page.route(`${process.env.VITE_API_URL}/skills`, (route) => {
      route.fulfill({ status: 200, json: {} })
    })

    await page.goto(_URL)
    await authorize(page)

    const title = page.getByLabel('Título')
    const description = page.getByPlaceholder('Descrição', { exact: true })
    const saveButton = page.getByRole('button', { name: 'Salvar' })

    await title.fill(skillsPageMock.title)
    await title.press('Tab')

    await description.fill(skillsPageMock.description)
    await description.press('Tab')

    await page.route(`${process.env.VITE_API_URL}/skills-page`, (route) => {
      route.fulfill({ status: 201 })
    })
    await saveButton.click()

    await expect(page.getByText('Success on create skills page.')).toBeVisible()
  })

  test('should complete update skills page data', async ({ page }) => {
    const newData: Omit<typeof skillsPageMock, 'id' | 'projects'> = {
      title: 'new title',
      description: 'new description'
    }

    await page.goto(_URL)
    await authorize(page)

    await page.route(
      `${process.env.VITE_API_URL}/skills-page`,
      async (route) => {
        await route.fulfill({ json: skillsPageMock, status: 200 })
      }
    )

    const title = page.getByLabel('Título')
    const description = page.getByPlaceholder('Descrição', { exact: true })
    const updateButton = page.getByRole('button', { name: 'Atualizar' })

    await page.waitForResponse(`${process.env.VITE_API_URL}/skills-page`)

    await expect(title).toHaveValue(skillsPageMock.title)

    await title.fill(newData.title)
    await title.press('Tab')
    await description.fill(newData.description)
    await description.press('Tab')
    await updateButton.click()

    await expect(page.getByText('Success on update skills page.')).toBeVisible()
  })

  test('should partial update skills page data', async ({ page }) => {
    const newData = {
      title: 'new title'
    }

    await page.goto(_URL)
    await authorize(page)

    await page.route(
      `${process.env.VITE_API_URL}/skills-page`,
      async (route) => {
        await route.fulfill({ json: skillsPageMock, status: 200 })
      }
    )

    const title = page.getByLabel('Título')
    const updateButton = page.getByRole('button', { name: 'Atualizar' })

    await page.waitForResponse(`${process.env.VITE_API_URL}/skills-page`)

    await expect(title).toHaveValue(skillsPageMock.title)
    await title.fill(newData.title)
    await title.press('Tab')
    await updateButton.click()

    await expect(page.getByText('Success on update skills page.')).toBeVisible()
  })
})
