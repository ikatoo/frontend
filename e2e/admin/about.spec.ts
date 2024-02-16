import axios from 'axios'
import { randomBytes } from 'crypto'
import { env } from 'process'
import aboutPageMock from 'shared/mocks/aboutPageMock/result.json'

describe('ADMIN - About page', () => {
  const baseURL = `${env.VITE_API_URL}`
  const API_URL =
    baseURL[baseURL.length - 1] === '/' ? baseURL.slice(0, -1) : baseURL
  const _URL = '/admin'
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

  it('has page title', async () => {
    await browser.url(_URL)
    await authorize()

    await expect(browser).toHaveTitle(
      /ikatoo - software developer - Edit About Page/i
    )
  })

  it('should save new about page', async () => {
    await browser.url(_URL)
    await authorize()

    const accessToken = await browser.execute(
      'return window.localStorage.accessToken'
    )
    api.defaults.headers.Authorization = `Bearer ${accessToken}`
    await api.delete('/about-page')
    await browser.refresh()

    await $('#title').setValue('new title')
    await $('#description').setValue('new title')
    await $('#illustrationURL').setValue('new url')
    await $('#illustrationALT').setValue('new alt')
    await $('#save').click()

    const alertElement = $('[role="alert"]')

    await expect(alertElement).toBeDisplayed()
    await expect(alertElement).toHaveText('Success on create about page.')
  })

  it('should complete update about page', async () => {
    const randomTestId = randomBytes(10).toString('hex')
    const mock = {
      title: `first title ${randomTestId}`,
      description: `first description ${randomTestId}`,
      image: {
        imageUrl: `image url ${randomTestId}`,
        imageAlt: `image alt ${randomTestId}`
      }
    }
    const newData: Omit<typeof aboutPageMock, 'id'> = {
      title: 'new title',
      description: 'new description',
      image: {
        url: 'new url',
        alt: 'new alt'
      }
    }

    await browser.url(_URL)
    await authorize()

    const accessToken = await browser.execute(
      'return window.localStorage.accessToken'
    )
    api.defaults.headers.Authorization = `Bearer ${accessToken}`
    const { data } = await api.get('/about-page/user-id/1')
    if (!data?.title) {
      await api.post('/about-page', mock)
    }

    await browser.refresh()

    await $('#title').setValue(newData.title)
    await $('#description').setValue(newData.description)
    await $('#update').click()

    const alert = $('[role="alert"]')

    await expect(alert).toBeDisplayed()
    await expect(alert).toHaveText('Success on update about page.')
  })

  it('should partial update about page', async () => {
    const randomTestId = randomBytes(10).toString('hex')
    const mock = {
      title: `first title ${randomTestId}`,
      description: `first description ${randomTestId}`,
      image: {
        imageUrl: `image url ${randomTestId}`,
        imageAlt: `image alt ${randomTestId}`
      }
    }
    await browser.url(_URL)
    await authorize()

    const accessToken = await browser.execute(
      'return window.localStorage.accessToken'
    )
    api.defaults.headers.Authorization = `Bearer ${accessToken}`
    const { data } = await axios.get(API_URL + '/about-page/user-id/1')
    if (!data?.title) {
      await axios.post(API_URL + '/about-page', mock)
    }
    await browser.refresh()

    await (await $('#description')).setValue('new description')
    await $('#update').click()

    const alert = $('[role="alert"]')

    await expect(alert).toBeDisplayed()
    await expect(alert).toHaveText('Success on update about page.')
  })
})
