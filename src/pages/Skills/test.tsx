import { render, waitFor } from '@testing-library/react'
import { describe } from 'vitest'
import { Skills } from '.'
import skillsPageMock from '../../mocks/skillsPageMock'

describe('Skills Page', () => {
  test('renders the skill page with data from the server', async () => {
    const { container } = render(<Skills />)

    await waitFor(() => {
      expect(container.childElementCount).toBe(1)
      const wrapper = container.firstChild
      const leftColumn = wrapper?.firstChild
      expect(leftColumn).toHaveTextContent(skillsPageMock.title)
      expect(leftColumn).toHaveTextContent(
        skillsPageMock.description.slice(3, 10)
      )
    })
  })
})
