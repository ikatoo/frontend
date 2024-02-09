import { describe, expect, test, vi } from 'vitest'

import contactPageMock from 'shared/mocks/contactPageMock/result.json'
import contactService from '.'
import api from '../api'

describe('contact page fetch data', () => {
  test('should get contact page data', async () => {
    api.get = vi.fn().mockResolvedValue({ data: contactPageMock, status: 200 })
    const result = await contactService.get()

    expect(result?.data).toEqual(contactPageMock)
    expect(result?.status).toEqual(200)
  })

  test('should create contact page data', async () => {
    api.post = vi.fn().mockResolvedValue({ data: {}, status: 201 })
    const result = await contactService.create({
      ...contactPageMock,
      userId: 1
    })

    expect(result?.status).toEqual(201)
  })

  test('should update contact page data', async () => {
    api.patch = vi.fn().mockResolvedValue({ data: {}, status: 204 })
    const result = await contactService.patch(contactPageMock)

    expect(result?.status).toEqual(204)
  })

  test('should delete contact page data', async () => {
    api.delete = vi.fn().mockResolvedValue({ data: {}, status: 204 })
    const result = await contactService.delete()

    expect(result?.status).toEqual(204)
  })
})
