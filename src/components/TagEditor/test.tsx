import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TagEditor from '.'
import aboutPageMock from '../../mocks/aboutPageMock'

describe('<TagEditor />', () => {
  it('should render the component', async () => {
    const title = 'Tags'
    render(
      <TagEditor name="tags" title={title} initalValue={aboutPageMock.skills} />
    )

    const inputElement = screen.getByRole('textbox')
    const tagsElement = screen.getByText(title)
    const tagElements = await screen.findAllByTestId('tag-testid')

    expect(inputElement).toBeInTheDocument()
    expect(tagsElement).toBeInTheDocument()

    expect(tagElements).toHaveLength(aboutPageMock.skills.length)
  })

  test('should remove tag when click in delete button', async () => {
    render(
      <TagEditor name="tags" title="Tags" initalValue={aboutPageMock.skills} />
    )

    const tagForRemove = await screen.findByText('javascript')
    const buttonElement = tagForRemove.lastElementChild

    buttonElement && userEvent.click(buttonElement)
    const tagElements = await screen.findAllByTestId('tag-testid')

    expect(tagForRemove).not.toBeInTheDocument()
    expect(tagElements).toHaveLength(aboutPageMock.skills.length - 1)
  })
})
