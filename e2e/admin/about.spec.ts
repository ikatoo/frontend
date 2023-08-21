import { expect, test } from '@playwright/test'
import aboutPageMock from 'shared/mocks/aboutPageMock/result.json' assert { type: 'json' }

const _URL = '/admin/about'

test.describe('ADMIN - About page', () => {
  test('has page title', async ({ page }) => {
    await page.goto(_URL)

    await expect(page).toHaveTitle(/ikatoo - software developer/i)
  })

  test('should save new about page', async ({ page }) => {
    await page.route(`${process.env.VITE_API_URL}/about`, async (route) => {
      await route.fulfill({ status: 204 })
    })
    await page.goto(_URL)

    const title = page.getByPlaceholder('Título')
    const description = page.getByPlaceholder('Descrição', { exact: true })
    const skills = page.getByPlaceholder(
      'Press "," | "Enter" | "Shift+Enter" to add Habilidades'
    )
    const imageURL = page.getByPlaceholder('https://domain.com/image.jpg')
    const imageALT = page.getByPlaceholder('Uma breve descrição da imagem')
    const saveButton = page.getByRole('button', { name: 'Salvar' })

    await title.fill(aboutPageMock.title)
    await title.press('Tab')

    await description.fill(aboutPageMock.description)
    await description.press('Tab')

    for (let index = 0; index < aboutPageMock.skills.length; index++) {
      await skills.fill(aboutPageMock.skills[index].title)
      await skills.press(',')
    }
    await skills.press('Tab')

    await imageURL.fill(aboutPageMock.illustrationURL)
    await imageURL.press('Tab')

    await imageALT.fill(aboutPageMock.illustrationALT)
    await imageALT.press('Tab')

    await saveButton.click()

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
    await page.route(`${process.env.VITE_API_URL}/about`, async (route) => {
      await route.fulfill({ json: aboutPageMock, status: 200 })
    })
    await page.goto(_URL)

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
    await page.route(`${process.env.VITE_API_URL}/about`, async (route) => {
      await route.fulfill({ json: aboutPageMock, status: 200 })
    })
    page.goto(_URL)

    const description = page.getByPlaceholder('Descrição', { exact: true })
    const updateButton = page.getByRole('button', { name: 'Atualizar' })

    await description.fill('new description')
    await updateButton.click()

    await expect(page.getByText('Success on update about page.')).toBeVisible()
  })
})
