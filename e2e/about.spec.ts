const _URL = '/'

describe('About page', () => {
  it('should show about page on root path', async () => {
    await browser.navigateTo(_URL)

    await expect(browser).toHaveTitle(/ikatoo - software developer/i)
    await expect(browser).toHaveURL('/about')
  })
})
