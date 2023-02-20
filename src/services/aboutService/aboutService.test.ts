import { describe, test, vi } from 'vitest'

import aboutService from '.'
import { aboutPageMock } from '../../mocks/aboutPageMock'
import api from '../api'

vi.mock('../api')

api.get = vi.fn().mockResolvedValue({
  data: aboutPageMock
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

const postAndPutArgs = ['/about', aboutPageMock, headers]

describe('About page fetch data', () => {
  test('should get about page data', async () => {
    const result = await aboutService.get()

    expect(api.get).toBeCalledTimes(1)
    expect(api.get).toBeCalledWith('/about')
    expect(result).toEqual(aboutPageMock)
  })

  test('should create about page data without errors', async () => {
    await aboutService.create(aboutPageMock)

    expect(api.post).toBeCalledTimes(1)
    expect(api.post).toBeCalledWith(...postAndPutArgs)
  })

  test('should update about page data without errors', async () => {
    await aboutService.update(aboutPageMock)

    expect(api.put).toBeCalledTimes(1)
    expect(api.put).toBeCalledWith(...postAndPutArgs)
  })

  test('should delete about page data without errors', async () => {
    await aboutService.delete()

    expect(api.delete).toBeCalledTimes(1)
    expect(api.delete).toBeCalledWith('/about')
  })
})
