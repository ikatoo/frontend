import { describe, test, vi } from 'vitest'

import skillsService from '.'
import { skillsPageMock } from '../../mocks/skillsPageMock'
import api from '../api'

vi.mock('../api')

api.get = vi.fn().mockResolvedValue({
  data: skillsPageMock
})

api.post = vi.fn()
api.put = vi.fn()
api.delete = vi.fn()

const headers = {
  headers: {
    Authorization: `bearer `,
    ContentType: 'application/json'
  }
}

const postAndPutArgs = ['/skills', skillsPageMock, headers]

describe('Skills page fetch data', () => {
  test('should get skills page data', async () => {
    const result = await skillsService.get()

    expect(api.get).toBeCalledTimes(1)
    expect(api.get).toBeCalledWith('/skills')
    expect(result).toEqual(skillsPageMock)
  })

  test('should create skills page data without errors', async () => {
    await skillsService.create(skillsPageMock)

    expect(api.post).toBeCalledTimes(1)
    expect(api.post).toBeCalledWith(...postAndPutArgs)
  })

  test('should update skills page data without errors', async () => {
    await skillsService.update(skillsPageMock)

    expect(api.put).toBeCalledTimes(1)
    expect(api.put).toBeCalledWith(...postAndPutArgs)
  })

  test('should delete skills page data without errors', async () => {
    await skillsService.delete()

    expect(api.delete).toBeCalledTimes(1)
    expect(api.delete).toBeCalledWith('/skills')
  })
})
