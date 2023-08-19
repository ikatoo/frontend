import { expect, test } from '@playwright/test'
import skillsPageMock from 'shared/mocks/skillsPageMock/result.json' assert { type: 'json' }

const _URL = '/admin/skills'

test.describe('ADMIN - Skills page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(_URL)
  })

  test('has page title', async ({ page }) => {
    await expect(page).toHaveTitle(/ikatoo - software developer/i)
  })

  test('should call submit with data when save button is clicked', async ({
    page
  }) => {
    await page.route('*/**/skills', async (route) => {
      await route.fulfill()
    })

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

    await title.fill('Olá. Bem vindo❗')
    await title.press('Tab')

    await description.fill(
      '<p>Me chamo Milton Carlos Katoo, moro em Itapira, interior de São Paulo/Brasil. Pai de uma princesa e filho de excelente cozinheira Italiana e um saldoso Japonês faz tudo, sou um desenvolvedor full-stack que ama programação e desenvolvimento de software afim de melhorar a vida das pessoas.</p><p>Pessoa bem organizada, solucionador de problemas, funcionário independente com alta atenção aos detalhes. Gosto de animes, mangas, games, séries de TV e filmes. Pai orgulhoso de uma princesa, sou nascido em 1979 e sou innteressado em todo o espectro de programação.</p><a class="text-mck_aqua underline underline-offset-8" href="https://ikatoo.com.br/contact/" rel="contact"><span>🎉</span>Vamos fazer algo especial.</a><span>😄</span>'
    )
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

    expect(page.getByText('Success on create skills page.')).toBeDefined()
  })
})
