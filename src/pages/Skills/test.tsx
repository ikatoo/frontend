import { render, screen } from '@testing-library/react'
import skillsPageMock from 'shared/mocks/skillsPageMock/result.json'
import projectsService from 'src/services/projectsService'
import skillsService from 'src/services/skillsService'
import { describe, test, vi } from 'vitest'
import { Skills } from '.'

describe('Skills Page', () => {
  test('renders the skill page with data from the server', async () => {
    const { projects, ...page } = skillsPageMock
    vi.spyOn(skillsService, 'get').mockImplementation(async () => ({
      data: {
        ...page,
        projects: projects.map(({ lastUpdate, start, ...project }) => ({
          ...project,
          lastUpdate: new Date(lastUpdate),
          start: new Date(start)
        }))
      },
      status: 200
    }))
    vi.spyOn(projectsService, 'getAll').mockImplementation(async () => ({
      status: 200,
      data: projects.map(({ lastUpdate, start, ...project }) => ({
        ...project,
        lastUpdate: new Date(lastUpdate),
        start: new Date(start)
      }))
    }))

    render(<Skills />)

    await screen.findByText(projects[1].title)

    expect(screen.getByText(page.title)).toBeInTheDocument()
    expect(screen.getByText(page.description)).toBeInTheDocument()
    expect(screen.getByText(projects[0].title)).toBeInTheDocument()
    expect(screen.getByText(projects[1].title)).toBeInTheDocument()
  })
})
