import { Page } from '@playwright/test'

export const authorize = async (page: Page) => {
  await page.route(
    `${process.env.VITE_API_URL}/auth/verify-token`,
    async (route) => {
      await route.fulfill({ status: 200, json: { accessToken: 'valid-token' } })
    }
  )
}
