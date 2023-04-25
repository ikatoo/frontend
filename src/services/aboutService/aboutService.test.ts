import { beforeEach, describe, test } from 'vitest'

import aboutService from '.'
import aboutPageMock from '../../mocks/aboutPageMock'
import aboutHandler from '../../mocks/handlers/aboutHandler'
import { mswServer } from '../../mocks/msw/mswServer'
import '../../mocks/msw/mswSetup'

describe('About page fetch data', () => {
  beforeEach(() => {
    mswServer.use(...aboutHandler)
  })

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

  test('should delete about page data', async () => {
    const result = await aboutService.delete()

    expect(result?.status).toEqual(204)
  })
})
