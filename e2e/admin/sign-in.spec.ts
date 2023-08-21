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
      name: 'GOOGLE'
    })
    const linkedinButton = page.getByRole('button', {
      name: 'LINKEDIN'
    })
    const emailButton = page.getByRole('button', {
      name: 'E-MAIL'
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
})
