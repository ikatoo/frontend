import { $, browser } from '@wdio/globals'
import axios from 'axios'
import { randomBytes } from 'crypto'
import { env } from 'process'

describe('ADMIN - Skills page', () => {
  const _URL = '/admin/skills'
  const baseURL = `${env.VITE_API_URL}`
  const API_URL =
    baseURL[baseURL.length - 1] === '/' ? baseURL.slice(0, -1) : baseURL
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const authorize = async () => {
    const actualUrl = await browser.getUrl()

    if (actualUrl.includes('/signin')) {
      await $('#email').setValue('teste@teste.com')
      await $('#password').setValue('teste')
      await $('#signin').click()
    }
  }

  const getAccessToken = async () =>
    `${await browser.execute('return window.localStorage.accessToken')}`

  it('has page title', async () => {
    await browser.url(_URL)
    await authorize()

    await expect(browser).toHaveTitle(
      /ikatoo - software developer - Edit Skills Page/i
    )
  })

  it('should save new skills page', async () => {
    const randomTestId = randomBytes(10).toString('hex')
    await browser.url(_URL)
    await authorize()

    const accessToken = await getAccessToken()
    api.defaults.headers.Authorization = `Bearer ${accessToken}`
    await api.delete('/skills-page')
    await browser.refresh()

    await $('#title').setValue('new title' + randomTestId)
    await $('#description').setValue('new desc' + randomTestId)
    await $('#save').click()

    const alertElement = $('[role="alert"]')

    await expect(alertElement).toBeDisplayed()
    await expect(alertElement).toHaveText('Success on create skills page.')
  })

  it('should complete update skills page data', async () => {
    const randomTestId = randomBytes(10).toString('hex')
    const newData = {
      title: 'new title' + randomTestId,
      description: 'new description' + randomTestId
    }

    await browser.url(_URL)
    await authorize()

    const accessToken = await getAccessToken()
    const { data } = await api.get('/skills-page/user-id/1')
    if (!data?.title) {
      api.defaults.headers.Authorization = `Bearer ${accessToken}`
      await api.post('/skills-page', {
        title: 'first title',
        description: 'first description'
      })
    }
    await browser.refresh()

    await $('#title').setValue(newData.title)
    await $('#description').setValue(newData.description)

    await $('#update').click()

    const alertElement = $('[role="alert"]')

    await expect(alertElement).toBeDisplayed()
    await expect(alertElement).toHaveText('Success on update skills page.')
  })

  it('should partial update skills page data', async () => {
    const randomTestId = randomBytes(10).toString('hex')
    const newData = {
      title: 'new title' + randomTestId,
      description: 'new description' + randomTestId
    }

    await browser.url(_URL)
    await authorize()

    const accessToken = await getAccessToken()
    const { data } = await api.get('skills-page/user-id/1')
    if (!data?.title) {
      api.defaults.headers.Authorization = `Bearer ${accessToken}`
      await api.post('/skills-page', {
        title: 'first title',
        description: 'first description'
      })
    }
    await browser.refresh()

    await $('#title').setValue(newData.title)
    await $('#update').click()

    const alertElement = $('[role="alert"]')

    await expect(alertElement).toBeDisplayed()
    await expect(alertElement).toHaveText('Success on update skills page.')
  })
})
