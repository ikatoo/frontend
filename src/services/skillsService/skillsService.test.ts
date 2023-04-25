import { beforeEach, describe, expect, test } from 'vitest'

import skillsService from '.'
import skillsHandler from '../../mocks/handlers/skillsHandler'
import { mswServer } from '../../mocks/msw/mswServer'
import '../../mocks/msw/mswSetup'
import skillsPageMock from '../../mocks/skillsPageMock'

describe('skills page fetch data', () => {
  beforeEach(() => {
    mswServer.use(...skillsHandler)
  })

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

  test('should delete skills page data', async () => {
    const result = await skillsService.delete()

    expect(result?.status).toEqual(204)
  })
})
