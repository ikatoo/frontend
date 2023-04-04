import { describe, test } from 'vitest'

import skillsService from '.'
import { mockSkillsPageData } from '../../pages/Skills/mock'

describe('skills page fetch data', () => {
  test('should get skills page data', async () => {
    const result = await skillsService.get()

    expect(result?.data).toEqual(mockSkillsPageData)
    expect(result?.status).toEqual(200)
  })

  test('should create skills page data', async () => {
    const result = await skillsService.create(mockSkillsPageData)

    expect(result?.status).toEqual(201)
  })

  test('should update skills page data', async () => {
    const result = await skillsService.patch(mockSkillsPageData)

    expect(result?.status).toEqual(204)
  })
})
