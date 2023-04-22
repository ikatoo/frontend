import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, test } from 'vitest'
import { Contact } from '.'
import { mswServer } from '../../helpers/tests/mswServer'
import contactPageMock from '../../mocks/contactPageMock'
import contactHandler from '../../mocks/handlers/contactHandler'

describe('Contact Page', () => {
  beforeEach(() => {
    mswServer.use(...contactHandler)
  })

  test('renders the contact page with data from the server', async () => {
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
