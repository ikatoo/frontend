import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { About } from '.'
import { mswServer } from '../../helpers/tests/mswServer'
import aboutPageMock from '../../mocks/aboutPageMock'
import aboutHandler from '../../mocks/handlers/aboutHandler'

vi.mock('../../components/IconCloud')

describe('About Page', () => {
  beforeEach(() => {
    mswServer.use(...aboutHandler)
  })

  test('renders the about page with data from the server', async () => {
    render(<About />)

    await waitFor(() => {
      expect(screen.getByText(aboutPageMock.title)).toBeInTheDocument()
      expect(
        screen.getByText(/Me chamo Milton Carlos Katoo/i)
      ).toBeInTheDocument()
    })
  })
})
