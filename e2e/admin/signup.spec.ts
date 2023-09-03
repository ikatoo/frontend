import { expect, test } from '@playwright/test'

const _URL = '/signup'

const mockedUser = {
  name: 'Teste Name',
  email: 'teste@mail.com',
  password: 'secr3tp4ss0W1D'
}

test.describe('ADMIN - Signup Page', () => {
  test('has components', async ({ page }) => {
    await page.goto(_URL)

    const logo = page.getByLabel('Logotipo')
    const name = page.getByLabel('Nome')
    const email = page.getByLabel('E-mail')
    const password = page.getByLabel('Senha', { exact: true })
    const confirmPassword = page.getByLabel('Confirmar Senha', { exact: true })
    const recoveryLink = page.getByRole('link', {
      name: 'Recupere sua senha aqui.'
    })
    const backToHomeLink = page.getByRole('link', {
      name: 'Voltar a tela de login.'
    })
    const signUpButton = page.getByRole('button', {
      name: 'CADASTRAR'
    })

    await expect(logo).toBeVisible()
    await expect(name).toBeVisible()
    await expect(email).toBeVisible()
    await expect(password).toBeVisible()
    await expect(confirmPassword).toBeVisible()
    await expect(recoveryLink).toBeVisible()
    await expect(backToHomeLink).toBeVisible()
    await expect(signUpButton).toBeVisible()
    await expect(signUpButton).not.toBeEnabled()
  })

  test('should redirect to admin root on signup with success', async ({
    page
  }) => {
    await page.goto(_URL)

    const name = page.getByLabel('Nome')
    const email = page.getByLabel('E-mail')
    const password = page.getByLabel('Senha', { exact: true })
    const confirmPassword = page.getByLabel('Confirmar Senha', { exact: true })
    const signupButton = page.getByRole('button', { name: 'CADASTRAR' })

    await name.fill(mockedUser.name)
    await name.press('Tab')

    await email.fill(mockedUser.email)
    await email.press('Tab')

    await password.fill(mockedUser.password)
    await password.press('Tab')

    await confirmPassword.fill(mockedUser.password)
    await confirmPassword.press('Tab')

    await page.route(`${process.env.VITE_API_URL}/user`, (route) => {
      route.fulfill({
        json: { accessToken: 'valid-access-token' },
        status: 201
      })
    })
    await page.route(
      `${process.env.VITE_API_URL}/auth/verify-token`,
      (route) => {
        route.fulfill({
          status: 201
        })
      }
    )
    await signupButton.click()

    await expect(page).toHaveURL('/admin')
  })

  test('should alert when fail on create user', async ({ page }) => {
    await page.goto(_URL)

    const name = page.getByLabel('Nome')
    const email = page.getByLabel('E-mail')
    const password = page.getByLabel('Senha', { exact: true })
    const confirmPassword = page.getByLabel('Confirmar Senha', { exact: true })
    const signupButton = page.getByRole('button', { name: 'CADASTRAR' })

    await name.fill(mockedUser.name)
    await name.press('Tab')

    await email.fill(mockedUser.email)
    await email.press('Tab')

    await password.fill(mockedUser.password)
    await password.press('Tab')

    await confirmPassword.fill(mockedUser.password)
    await confirmPassword.press('Tab')

    await page.route(`${process.env.VITE_API_URL}/user`, (route) => {
      route.fulfill({
        status: 500
      })
    })
    await signupButton.click()

    await expect(page.getByText('Internal Server Error')).toBeVisible()
  })
})
