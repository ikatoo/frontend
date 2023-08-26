import { expect, test } from '@playwright/test'
import skillsPageMock from 'shared/mocks/skillsPageMock/result.json' assert { type: 'json' }
import { authorize } from 'src/helpers/playwrightUtils'

const _URL = '/admin/skills'

test.describe('ADMIN - Skills page', () => {
  test('has page title', async ({ page }) => {
    await page.goto(_URL)

    await expect(page).toHaveTitle(/ikatoo - software developer/i)
  })

  test('should save new skills page', async ({ page }) => {
    await authorize(page)

    await page.goto(_URL)

    const title = page.getByLabel('Título')
    const description = page.getByPlaceholder('Descrição', { exact: true })
    const skills = page.getByPlaceholder(
      'Press "," | "Enter" | "Shift+Enter" to add Habilidades'
    )
    const jobTitle = page.getByLabel('Nome da empresa ou projeto')
    const jobStart = page.getByLabel('Início')
    const jobEnd = page.getByLabel('Fim')
    const jobLink = page.getByLabel('Link para referência')
    const jobDescription = page.getByLabel('Breve Descrição')
    const addJobButton = page.getByRole('button', {
      name: 'ADICIONAR TRABALHO'
    })
    const saveButton = page.getByRole('button', { name: 'Salvar' })

    await title.fill(skillsPageMock.title)
    await title.press('Tab')

    await description.fill(skillsPageMock.description)
    await description.press('Tab')

    await skills.fill(
      skillsPageMock.skills.map((skill) => skill.skillTitle).toString()
    )
    await skills.press('Tab')

    for (let index = 0; index < skillsPageMock.lastJobs.length; index++) {
      const job = skillsPageMock.lastJobs[index]

      await jobTitle.fill(job.jobTitle)
      await jobTitle.press('Tab')

      const mockJobStart = `${job.yearMonthStart.split(' - ')[1]}/${
        job.yearMonthStart.split(' - ')[0]
      }`
      await jobStart.fill(mockJobStart)
      await jobStart.press('Tab')

      if (job.yearMonthEnd) {
        const mockJobEnd = `${job.yearMonthEnd.split(' - ')[1]}/${
          job.yearMonthEnd.split(' - ')[0]
        }`
        await jobEnd.fill(mockJobEnd)
      }
      await jobEnd.press('Tab')

      await jobLink.fill(job.link)
      await jobLink.press('Tab')

      await jobDescription.fill(job.jobDescription)
      await jobDescription.press('Tab')

      await addJobButton.click()
    }

    await saveButton.click()

    await expect(page.getByText('Success on create skills page.')).toBeVisible()
    await expect(saveButton).not.toBeVisible()
    await expect(page.getByRole('button', { name: 'Atualizar' })).toBeVisible()
  })

  test('should complete update skills page data', async ({ page }) => {
    const newData: typeof skillsPageMock = {
      title: 'new title',
      description: 'new description',
      lastJobs: [
        {
          jobTitle: 'job1',
          jobDescription: 'description of job1',
          link: 'http://link.job1.com',
          yearMonthStart: '2021 - 05',
          yearMonthEnd: '2021 - 06'
        },
        {
          jobTitle: 'job2',
          jobDescription: 'description of job2',
          link: 'http://link.job2.com',
          yearMonthStart: '2022 - 05',
          yearMonthEnd: '2022 - 06'
        }
      ],
      skills: [
        {
          skillTitle: 'skill1'
        },
        {
          skillTitle: 'skill2'
        },
        {
          skillTitle: 'skill3'
        }
      ]
    }
    await page.route(`${process.env.VITE_API_URL}/skills`, async (route) => {
      await route.fulfill({ json: skillsPageMock, status: 200 })
    })
    await authorize(page)

    await page.goto(_URL)

    const title = page.getByLabel('Título')
    const description = page.getByPlaceholder('Descrição', { exact: true })
    const skills = page.getByPlaceholder(
      'Press "," | "Enter" | "Shift+Enter" to add Habilidades'
    )
    const jobTitle = page.getByLabel('Nome da empresa ou projeto')
    const jobStart = page.getByLabel('Início')
    const jobEnd = page.getByLabel('Fim')
    const jobLink = page.getByLabel('Link para referência')
    const jobDescription = page.getByLabel('Breve Descrição')
    const addJobButton = page.getByRole('button', {
      name: 'ADICIONAR TRABALHO'
    })
    const updateButton = page.getByRole('button', { name: 'Atualizar' })
    expect(title).toHaveValue(skillsPageMock.title)
    await title.fill(newData.title)
    await title.press('Tab')
    await description.fill(newData.description)
    await description.press('Tab')
    await skills.fill(
      newData.skills.map((skill) => skill.skillTitle).toString()
    )
    await skills.press('Tab')
    for (let index = 0; index < newData.lastJobs.length; index++) {
      const job = newData.lastJobs[index]
      await jobTitle.fill(job.jobTitle)
      await jobTitle.press('Tab')
      const mockJobStart = `${job.yearMonthStart.split(' - ')[1]}/${
        job.yearMonthStart.split(' - ')[0]
      }`
      await jobStart.fill(mockJobStart)
      await jobStart.press('Tab')
      if (job.yearMonthEnd) {
        const mockJobEnd = `${job.yearMonthEnd.split(' - ')[1]}/${
          job.yearMonthEnd.split(' - ')[0]
        }`
        await jobEnd.fill(mockJobEnd)
      }
      await jobEnd.press('Tab')
      await jobLink.fill(job.link)
      await jobLink.press('Tab')
      await jobDescription.fill(job.jobDescription)
      await jobDescription.press('Tab')
      await addJobButton.click()
    }
    await updateButton.click()

    expect(page.getByText('Success on update skills page.')).toBeVisible()
  })

  test('should partial update skills page data', async ({ page }) => {
    const newData = {
      title: 'new title'
    }
    await page.route(`${process.env.VITE_API_URL}/skills`, async (route) => {
      await route.fulfill({ json: skillsPageMock, status: 200 })
    })
    await authorize(page)

    await page.goto(_URL)

    const title = page.getByLabel('Título')
    const updateButton = page.getByRole('button', { name: 'Atualizar' })

    expect(title).toHaveValue(skillsPageMock.title)
    await title.fill(newData.title)
    await title.press('Tab')
    await updateButton.click()

    expect(page.getByText('Success on update skills page.')).toBeVisible()
  })
})
