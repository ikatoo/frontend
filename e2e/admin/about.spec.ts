import { test, expect } from '@playwright/test'

const _URL = '/admin/about'

test.describe('ADMIN - About page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(_URL)
  })

  test('has page title', async ({ page }) => {
    await expect(page).toHaveTitle(/ikatoo - software developer/i)
  })

  test('should call submit with data when save button is clicked', async ({
    page
  }) => {
    await page.getByPlaceholder('Título').fill('Olá. Bem vindo❗')
    await page.getByPlaceholder('Título').press('Tab')
    await page
      .getByPlaceholder('Descrição', { exact: true })
      .fill(
        '<p>Me chamo Milton Carlos Katoo, moro em Itapira, interior de São Paulo/Brasil. Pai de uma princesa e filho de excelente cozinheira Italiana e um saldoso Japonês faz tudo, sou um desenvolvedor full-stack que ama programação e desenvolvimento de software afim de melhorar a vida das pessoas.</p><p>Pessoa bem organizada, solucionador de problemas, funcionário independente com alta atenção aos detalhes. Gosto de animes, mangas, games, séries de TV e filmes. Pai orgulhoso de uma princesa, sou nascido em 1979 e sou innteressado em todo o espectro de programação.</p><a class="text-mck_aqua underline underline-offset-8" href="https://ikatoo.com.br/contact/" rel="contact"><span>🎉</span>Vamos fazer algo especial.</a><span>😄</span>'
      )
    await page.getByPlaceholder('Descrição', { exact: true }).press('Tab')
    await page
      .getByPlaceholder(
        'Press "," | "Enter" | "Shift+Enter" to add Habilidades'
      )
      .fill('playwright')
    await page
      .getByPlaceholder(
        'Press "," | "Enter" | "Shift+Enter" to add Habilidades'
      )
      .press('Tab')
    await page
      .getByPlaceholder('https://domain.com/image.jpg')
      .fill('https://example.com.br/image.jpg')
    await page.getByPlaceholder('https://domain.com/image.jpg').press('Tab')
    await page
      .getByPlaceholder('Uma breve descrição da imagem')
      .fill('description for image')
    await page.getByPlaceholder('Uma breve descrição da imagem').press('Enter')
  })
})
