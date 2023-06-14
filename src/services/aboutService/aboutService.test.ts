import { describe, test, vi } from 'vitest'

import aboutPageMock from 'shared/mocks/aboutPageMock/result.json'
import aboutService from '.'
import api from '../api'

describe('About page fetch data', () => {
  test('should get about page data', async () => {
    api.get = vi.fn().mockResolvedValue({ data: aboutPageMock, status: 200 })
    const result = await aboutService.get()

    expect(result?.data).toEqual(aboutPageMock)
    expect(result?.status).toEqual(200)
  })

  test('should create about page data', async () => {
    api.post = vi.fn().mockResolvedValue({ data: {}, status: 201 })
    const result = await aboutService.create(aboutPageMock)

    expect(result?.status).toEqual(201)
  })

  test('should update about page data', async () => {
    api.patch = vi.fn().mockResolvedValue({ data: {}, status: 204 })
    const result = await aboutService.patch(aboutPageMock)

    expect(result?.status).toEqual(204)
  })

  test('should delete about page data', async () => {
    api.delete = vi.fn().mockResolvedValue({ data: {}, status: 204 })
    const result = await aboutService.delete()

    expect(result?.status).toEqual(204)
  })
})
