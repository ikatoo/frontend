import { describe, expect, test, vi } from 'vitest'

import projectsMock from 'shared/mocks/projectsMock/result.json'
import projectsService, { CreateProject } from '.'
import api from '../api'

describe('projects page fetch data', () => {
  test('should get projects page data', async () => {
    api.get = vi.fn().mockResolvedValue({ data: projectsMock, status: 200 })
    const result = await projectsService.getAll()

    expect(result?.data).toEqual(projectsMock)
    expect(result?.status).toEqual(200)
  })

  test('should create projects page data', async () => {
    api.post = vi.fn().mockResolvedValue({ data: {}, status: 201 })
    const data: CreateProject = projectsMock.map(
      ({ start, lastUpdate, ...project }) => ({
        start: new Date(start),
        lastUpdate: new Date(lastUpdate),
        ...project
      })
    )[0]
    const result = await projectsService.create(data)

    expect(result?.status).toEqual(201)
  })

  test('should update projects page data', async () => {
    api.patch = vi.fn().mockResolvedValue({ data: {}, status: 204 })
    const data: CreateProject = projectsMock.map(
      ({ start, lastUpdate, ...project }) => ({
        start: new Date(start),
        lastUpdate: new Date(lastUpdate),
        ...project
      })
    )[1]
    const result = await projectsService.patch(7, data)

    expect(result?.status).toEqual(204)
  })

  test('should delete project data', async () => {
    api.delete = vi.fn().mockResolvedValue({ data: {}, status: 204 })
    const result = await projectsService.delete(7)

    expect(result?.status).toEqual(204)
  })

  test('should get project by id', async () => {
    api.get = vi.fn().mockResolvedValue({ data: projectsMock[1], status: 200 })
    const result = await projectsService.getByID(7)

    expect(result?.data).toEqual(projectsMock[1])
    expect(result?.status).toEqual(200)
  })

  test('should get projects with like title', async () => {
    api.get = vi.fn().mockResolvedValue({ data: projectsMock, status: 200 })
    const result = await projectsService.getByTitle('titl')

    expect(result?.data).toEqual(projectsMock)
    expect(result?.status).toEqual(200)
  })
})
