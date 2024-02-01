import { render, screen } from '@testing-library/react'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import projectsMock from 'shared/mocks/projectsMock/result.json'
import { serverUse, waitFor } from 'src/helpers/testUtils'
import { describe, expect, test } from 'vitest'
import { Projects } from '.'

describe('Projects Page', () => {
  const server = setupServer()

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  test('renders the projects page with initial data', async () => {
    serverUse(server, [
      http.get('*/projects/user-id/*', () => {
        return HttpResponse.json(projectsMock)
      })
    ])

    render(<Projects />)

    await waitFor(() => {
      expect(screen.getAllByRole('link')).toHaveLength(projectsMock.length)
    })
  })
})
