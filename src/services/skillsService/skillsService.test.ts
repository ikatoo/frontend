import { describe, test } from 'vitest'

import skillsService from '.'
import skillsPageMock from '../../mocks/skillsPageMock'

describe('skills page fetch data', () => {
  test('should get skills page data', async () => {
    const result = await skillsService.get()

    expect(result?.data).toEqual(skillsPageMock)
    expect(result?.status).toEqual(200)
  })

  test('should create skills page data', async () => {
    const result = await skillsService.create(skillsPageMock)

    expect(result?.status).toEqual(201)
  })

  test('should update skills page data', async () => {
    const result = await skillsService.patch(skillsPageMock)

    expect(result?.status).toEqual(204)
  })
})
