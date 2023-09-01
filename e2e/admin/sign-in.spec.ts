import { expect, test } from '@playwright/test'

const _URL = '/signin'

test.describe('ADMIN - SignIn Page', () => {
  test('has components', async ({ page }) => {
    await page.goto(_URL)

    const logo = page.getByLabel('Logotipo')
    const email = page.getByLabel('E-mail')
    const password = page.getByLabel('Senha')
    const recoveryLink = page.getByRole('link', {
      name: 'Recupere sua senha aqui.'
    })
    const signUpLink = page.getByRole('link', {
      name: 'Não tem conta? Cadastre-se aqui.'
    })
    const signInButton = page.getByRole('button', {
      name: 'ENTRAR'
    })
    const LoginGroup = page.getByRole('group')
    const googleButton = page.getByRole('button', {
      name: 'Login com Google'
    })
    const linkedinButton = page.getByRole('button', {
      name: 'Login com Linkedin'
    })
    const emailButton = page.getByRole('button', {
      name: 'Login via email'
    })

    await expect(logo).toBeVisible()
    await expect(email).toBeVisible()
    await expect(password).toBeVisible()
    await expect(recoveryLink).toBeVisible()
    await expect(signUpLink).toBeVisible()
    await expect(signInButton).toBeVisible()
    await expect(LoginGroup).toBeVisible()
    await expect(googleButton).toBeVisible()
    await expect(linkedinButton).toBeVisible()
    await expect(emailButton).toBeVisible()
  })

  test('redirect to signin page on access protected route without authentication', async ({
    page
  }) => {
    await page.goto('/admin/about')

    await expect(page).toHaveTitle(
      'iKatoo - Software Developer - Authentication'
    )
  })

  test('do sign in and redirect to home', async ({ page }) => {
    await page.goto(_URL)

    const email = page.getByLabel('E-mail')
    const password = page.getByLabel('Senha')
    const signInButton = page.getByRole('button', {
      name: 'ENTRAR'
    })

    await email.fill('user@email.com')
    await password.fill('password')

    page.route(`${process.env.VITE_API_URL}/auth`, async (route) => {
      await route.fulfill({ status: 200 })
    })

    const mock = {
      user: {
        id: '7',
        name: 'zé da silva',
        email: 'ze@dasilva.com'
      },
      accessToken: 'valid-access-token'
    }
    await page.route(
      `${process.env.VITE_API_URL}/auth/sign-in`,
      async (route) => {
        await route.fulfill({ status: 200, json: { data: mock } })
      }
    )

    await signInButton.click()

    await expect(page).toHaveURL('/about')
  })

  test('redirect to preview url after authentication', async ({ page }) => {
    await page.goto('/admin/skills')


  })
})