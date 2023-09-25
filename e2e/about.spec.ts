import { expect, test } from '@playwright/test'
import aboutPageMock from 'shared/mocks/aboutPageMock/result.json' assert { type: 'json' }

const _URL = '/'

test.describe('About page', () => {
  test('should show about page on root path', async ({ page }) => {
    await page.route(`${process.env.VITE_API_URL}/about`, (route) => {
      route.fulfill({ status: 200, json: aboutPageMock })
    })
    await page.goto(_URL)

    await expect(page).toHaveTitle(/ikatoo - software developer/i)
    await expect(page).toHaveURL('/about')
  })
})
