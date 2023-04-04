import { describe, test } from 'vitest'

import aboutService from '.'
import aboutPageMock from '../../mocks/aboutPageMock'

describe('About page fetch data', () => {
  test('should get about page data', async () => {
    const result = await aboutService.get()

    expect(result?.data).toEqual(aboutPageMock)
    expect(result?.status).toEqual(200)
  })

  test('should create about page data', async () => {
    const result = await aboutService.create(aboutPageMock)

    expect(result?.status).toEqual(201)
  })

  test('should update about page data', async () => {
    const result = await aboutService.patch(aboutPageMock)

    expect(result?.status).toEqual(204)
  })
})
