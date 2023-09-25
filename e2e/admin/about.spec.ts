import { expect, test } from '@playwright/test'
import aboutPageMock from 'shared/mocks/aboutPageMock/result.json' assert { type: 'json' }
import { authorize } from 'src/helpers/playwrightUtils'

const _URL = '/admin/about'

test.describe('ADMIN - About page', () => {
  test('has page title', async ({ page }) => {
    await page.goto(_URL)
    await authorize(page)

    await expect(page).toHaveTitle(
      /ikatoo - software developer - Edit About Page/i
    )
  })

  test('should save new about page', async ({ page }) => {
    await page.goto(_URL)
    await authorize(page)

    await page.route(`${process.env.VITE_API_URL}/about`, async (route) => {
      await route.fulfill({ status: 200, json: {} })
    })

    await page.getByPlaceholder('Título').fill('new title')
    await page
      .getByPlaceholder('Descrição', { exact: true })
      .fill('new description')
    const skills = page.getByPlaceholder(
      'Press "," | "Enter" | "Shift+Enter" to add Habilidades'
    )

    for (let index = 1; index < 4; index++) {
      await skills.fill(`skill ${index}`)
      await skills.press(',')
    }

    await page
      .getByPlaceholder('https://domain.com/image.jpg')
      .fill('https://image.com/new.jpg')
    await page
      .getByPlaceholder('Uma breve descrição da imagem')
      .fill('new image')

    await page.route(`${process.env.VITE_API_URL}/about`, async (route) => {
      await route.fulfill({ status: 201 })
    })
    await page.getByRole('button', { name: 'Salvar' }).click()

    await expect(page.getByText('Success on create about page.')).toBeVisible()
  })

  test('should complete update about page', async ({ page }) => {
    const newData: typeof aboutPageMock = {
      title: 'new title',
      description: 'new description',
      skills: [
        {
          title: 'new skill 1'
        },
        {
          title: 'new skill 2'
        }
      ],
      illustrationALT: 'illustration alt',
      illustrationURL: 'https://ilustration.new'
    }

    await page.goto(_URL)
    await authorize(page)

    await page.route(`${process.env.VITE_API_URL}/about`, async (route) => {
      await route.fulfill({ json: aboutPageMock, status: 200 })
    })

    const title = page.getByPlaceholder('Título')
    const description = page.getByPlaceholder('Descrição', { exact: true })
    const skills = page.getByPlaceholder(
      'Press "," | "Enter" | "Shift+Enter" to add Habilidades'
    )
    const imageURL = page.getByPlaceholder('https://domain.com/image.jpg')
    const imageALT = page.getByPlaceholder('Uma breve descrição da imagem')
    const updateButton = page.getByRole('button', { name: 'Atualizar' })

    await title.fill(newData.title)
    await title.press('Tab')

    await description.fill(newData.description)
    await description.press('Tab')

    for (let index = 0; index < newData.skills.length; index++) {
      await skills.fill(newData.skills[index].title)
      await skills.press(',')
    }
    await skills.press('Tab')

    await imageURL.fill(newData.illustrationURL)
    await imageURL.press('Tab')

    await imageALT.fill(newData.illustrationALT)
    await imageALT.press('Tab')

    await updateButton.click()

    await expect(page.getByText('Success on update about page.')).toBeVisible()
  })

  test('should partial update about page', async ({ page }) => {
    page.goto(_URL)
    await authorize(page)

    await page.route(`${process.env.VITE_API_URL}/about`, async (route) => {
      await route.fulfill({ json: aboutPageMock, status: 200 })
    })

    const description = page.getByPlaceholder('Descrição', { exact: true })
    const updateButton = page.getByRole('button', { name: 'Atualizar' })

    await description.fill('new description')
    await updateButton.click()

    await expect(page.getByText('Success on update about page.')).toBeVisible()
  })
})
