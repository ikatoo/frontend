import { browser, $, expect } from '@wdio/globals'

const _URL = '/signin'

describe('ADMIN - SignIn Page', () => {
  const authorize = async () => {
    const actualUrl = await browser.getUrl()

    if (actualUrl.includes('/signin')) {
      await $('#email').setValue('teste@teste.com')
      await $('#password').setValue('teste')
      await $('#signin').click()
    }
  }

  it('has components', async () => {
    await browser.url(_URL)

    const logo = $('aria/Logotipo')
    const email = $('#email')
    const password = $('#password')
    const recoveryLink = $('a=Recupere sua senha aqui.')
    const signInButton = $('button=ENTRAR')
    const LoginGroup = $('fieldset=Login com')
    const googleButton = $('aria/Login com Google')
    const linkedinButton = $('aria/Login com Linkedin')
    const emailButton = $('aria/Login via email')

    await expect(logo).toBeDisplayed()
    await expect(email).toBeDisplayed()
    await expect(password).toBeDisplayed()
    await expect(recoveryLink).toBeDisplayed()
    await expect(signInButton).toBeDisplayed()
    await expect(signInButton).toBeDisabled()
    await expect(LoginGroup).toBeDisplayed()
    await expect(googleButton).toBeDisplayed()
    await expect(linkedinButton).toBeDisplayed()
    await expect(emailButton).toBeDisplayed()
  })

  it('redirect to signin page on access protected route without authentication', async () => {
    await browser.url('/admin/about')

    await expect(browser).toHaveTitle(
      'iKatoo - Software Developer - Authentication'
    )
  })

  it('do sign in and redirect to admin', async () => {
    const baseUrl = new URL(await browser.getUrl()).origin
    await browser.url(_URL)
    await authorize()

    await expect(browser).toHaveUrl(baseUrl + '/admin/about')
  })

  it('redirect to preview url after authentication', async () => {
    const baseUrl = new URL(await browser.getUrl()).origin
    await browser.url('/admin/skills')
    await authorize()

    await expect(browser).toHaveUrl(baseUrl + '/admin/skills')
    await expect(browser).toHaveTitle(
      'iKatoo - Software Developer - Edit Skills Page'
    )
  })
})
