import { render, screen, waitFor } from '@testing-library/react'
import { About } from '.'
import { describe, vi } from 'vitest'
import aboutPageMock from '../../mocks/aboutPageMock'

vi.mock('../../components/IconCloud')

describe('About Page', () => {
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
