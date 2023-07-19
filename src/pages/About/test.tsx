import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { About } from '.'
import aboutPageMock from 'shared/mocks/aboutPageMock/result.json'
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

  test('shoud not render image wrapper if illustration url not exist', async () => {
    api.get = vi.fn().mockResolvedValue({
      data: {
        ...aboutPageMock,
        illustrationURL: aboutPageMock.illustrationURL
      }
    })

    render(<About />)

    await waitFor(() => {
      expect(screen.getByText(aboutPageMock.title)).toBeInTheDocument()
      expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })
  })

  test('shoud not render image wrapper if illustration url is empty', async () => {
    api.get = vi.fn().mockResolvedValue({
      data: { ...aboutPageMock, illustrationURL: undefined }
    })

    render(<About />)

    await waitFor(() => {
      expect(screen.getByText(aboutPageMock.title)).toBeInTheDocument()
      expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })
  })
})
