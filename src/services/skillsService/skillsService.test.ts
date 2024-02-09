/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, test, vi } from 'vitest'

import skillsPageMock from 'shared/mocks/skillsPageMock/result.json'
import skillsService from '.'
import api from '../api'

describe('skills page fetch data', () => {
  test('should get skills page data', async () => {
    api.get = vi.fn().mockResolvedValue({ data: skillsPageMock, status: 200 })
    const result = await skillsService.get()

    expect(result?.data).toEqual(skillsPageMock)
    expect(result?.status).toEqual(200)
  })

  test('should create skills page data', async () => {
    api.post = vi.fn().mockResolvedValue({ data: {}, status: 201 })
    const { projects, ...data } = skillsPageMock
    const result = await skillsService.create(data)

    expect(result?.status).toEqual(201)
  })

  test('should update skills page data', async () => {
    api.patch = vi.fn().mockResolvedValue({ data: {}, status: 204 })
    const { projects, ...data } = skillsPageMock
    const result = await skillsService.patch(data)

    expect(result?.status).toEqual(204)
  })

  test('should delete skills page data', async () => {
    api.delete = vi.fn().mockResolvedValue({ data: {}, status: 204 })
    const result = await skillsService.delete()

    expect(result?.status).toEqual(204)
  })
})
