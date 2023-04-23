import { beforeEach, describe, expect, test } from 'vitest'

import projectsService from '.'
import projectsHandler from '../../mocks/handlers/projectsHandler'
import { mswServer } from '../../mocks/msw/mswServer'
import projectsMock from '../../mocks/projectsMock'

describe('projects page fetch data', () => {
  beforeEach(() => {
    mswServer.use(...projectsHandler)
  })

  test('should get projects page data', async () => {
    const result = await projectsService.get()

    expect(result?.data).toEqual(projectsMock)
    expect(result?.status).toEqual(200)
  })

  test('should create projects page data', async () => {
    const result = await projectsService.create(projectsMock[0])

    expect(result?.status).toEqual(201)
  })

  test('should update projects page data', async () => {
    const result = await projectsService.patch(7, projectsMock[1])

    expect(result?.status).toEqual(204)
  })

  test('should delete project data', async () => {
    const result = await projectsService.delete(7)

    expect(result?.status).toEqual(204)
  })

  test('should get project by id', async () => {
    const result = await projectsService.getByID(7)

    expect(result?.data).toEqual(projectsMock[1])
    expect(result?.status).toEqual(200)
  })

  test('should get projects with like title', async () => {
    const result = await projectsService.getByTitle('titl')

    expect(result?.data).toEqual(projectsMock)
    expect(result?.status).toEqual(200)
  })
})
