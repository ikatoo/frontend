import { browser, expect } from '@wdio/globals'

describe('About page', () => {
  const _URL = '/'

  it('should show about page on root path', async () => {
    await browser.url(_URL)
    const baseUrl = new URL(await browser.getUrl()).origin

    await expect(browser).toHaveTitle(/ikatoo - software developer/i)
    await expect(browser).toHaveUrl(baseUrl + '/about')
  })
})
