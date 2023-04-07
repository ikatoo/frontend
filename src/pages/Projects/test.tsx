import { render, waitFor } from '@testing-library/react'
import { describe } from 'vitest'
import { Projects } from '.'
import projectsMock from '../../mocks/projectsMock'

describe('Projects Page', () => {
  test('renders the projects page with data from the server', async () => {
    const { container } = render(<Projects />)

    await waitFor(() => {
      expect(container.childElementCount).toBe(1)
      const wrapper = container.firstChild
      expect(wrapper?.childNodes).toHaveLength(projectsMock.length)
      for (let index = 0; index < projectsMock.length; index++) {
        const projectElement = wrapper?.childNodes[index].firstChild
        expect(projectElement).toHaveAttribute(
          'href',
          projectsMock[index].githubLink
        )
        const image = projectElement?.firstChild?.firstChild
        expect(image).toHaveAttribute('src', projectsMock[index].snapshot)
        const cardElement = image?.nextSibling
        const titleOfCardElement = cardElement?.firstChild
        expect(titleOfCardElement).toHaveTextContent(
          projectsMock[index].description.title
        )
        const lastUpdateElement = titleOfCardElement?.nextSibling
        expect(lastUpdateElement).toHaveTextContent(
          projectsMock[index].description.subTitle
        )
        const descriptionElement = lastUpdateElement?.nextSibling
        expect(descriptionElement).toHaveTextContent(
          projectsMock[index].description.content
        )
      }
    })
  })
})
