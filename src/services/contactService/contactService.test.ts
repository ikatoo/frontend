import { beforeEach, describe, expect, test } from 'vitest'

import contactService from '.'
import contactPageMock from '../../mocks/contactPageMock'
import contactHandler from '../../mocks/handlers/contactHandler'
import { mswServer } from '../../mocks/msw/mswServer'
import '../../mocks/msw/mswSetup'

describe('contact page fetch data', () => {
  beforeEach(() => {
    mswServer.use(...contactHandler)
  })

  test('should get contact page data', async () => {
    const result = await contactService.get()

    expect(result?.data).toEqual(contactPageMock)
    expect(result?.status).toEqual(200)
  })

  test('should create contact page data', async () => {
    const result = await contactService.create(contactPageMock)

    expect(result?.status).toEqual(201)
  })

  test('should update contact page data', async () => {
    const result = await contactService.patch(contactPageMock)

    expect(result?.status).toEqual(204)
  })

  test('should delete contact page data', async () => {
    const result = await contactService.delete()

    expect(result?.status).toEqual(204)
  })
})
