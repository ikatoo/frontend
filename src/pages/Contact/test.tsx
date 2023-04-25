import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { Contact } from '.'
import contactPageMock from '../../mocks/contactPageMock'
import api from '../../services/api'

describe('Contact Page', () => {
  test('renders the contact page with data from the server', async () => {
    api.get = vi.fn().mockResolvedValue({ data: contactPageMock })

    const { container } = render(<Contact />)

    await waitFor(() => {
      expect(container.childElementCount).toBe(1)
      const wrapper = container.firstChild
      const leftColumn = wrapper?.firstChild
      expect(leftColumn).toHaveTextContent(contactPageMock.title)
      expect(leftColumn).toHaveTextContent(
        contactPageMock.description.slice(3, 10)
      )
      expect(screen.getByTestId('google-maps'))
    })
  })
})
