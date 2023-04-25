import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { About } from '.'
import aboutPageMock from '../../mocks/aboutPageMock'
import api from '../../services/api'

vi.mock('../../components/IconCloud')

describe('About Page', () => {
  test('renders the about page with data from the server', async () => {
    api.get = vi.fn().mockResolvedValue({ data: aboutPageMock })

    render(<About />)

    await waitFor(() => {
      expect(screen.getByText(aboutPageMock.title)).toBeInTheDocument()
      expect(
        screen.getByText(/Me chamo Milton Carlos Katoo/i)
      ).toBeInTheDocument()
    })
  })
})
