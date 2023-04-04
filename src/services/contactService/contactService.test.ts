import { describe, test } from 'vitest'

import contactService from '.'
import contactPageMock from '../../mocks/contactPageMock'

describe('contact page fetch data', () => {
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
