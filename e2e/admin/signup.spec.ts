import { browser, $, expect } from '@wdio/globals'

const _URL = '/signup'

const mockedUser = {
  name: 'Teste Name',
  email: 'teste@mail.com',
  password: 'secr3tp4ss0W1D'
}

describe('ADMIN - Signup Page', () => {
  it('has components', async () => {
    await browser.url(_URL)

    await expect($('aria/Logotipo')).toBeDisplayed()
    await expect($('#name')).toBeDisplayed()
    await expect($('#email')).toBeDisplayed()
    await expect($('#confirm-email')).toBeDisplayed()
    await expect($('#password')).toBeDisplayed()
    await expect($('#confirm-password')).toBeDisplayed()
    await expect($('a=Recupere sua senha aqui.')).toBeDisplayed()
    await expect($('a=Voltar a tela de login.')).toBeDisplayed()
    await expect($('button=CADASTRAR')).toBeDisplayed()
    await expect($('button=CADASTRAR')).toBeDisabled()
  })

  it('should alert when fail on create user', async () => {
    await browser.url(_URL)

    await $('#name').setValue(mockedUser.name)
    await $('#email').setValue(mockedUser.email)
    await $('#confirm-email').setValue(mockedUser.email)
    await $('#password').setValue(mockedUser.password)
    await $('#confirm-password').setValue(mockedUser.password)
    await $('button=CADASTRAR').click()

    const alertElement = $('[role="alert"]')
    await alertElement.waitForDisplayed()

    await expect(alertElement).toBeDisplayed()
    await expect(alertElement).toHaveText('Internal Server Error')
  })
})
