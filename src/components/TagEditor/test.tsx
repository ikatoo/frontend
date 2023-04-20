import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TagEditor from '.'
import aboutPageMock from '../../mocks/aboutPageMock'

describe('<TagEditor />', () => {
  it('should render the component', () => {
    const title = 'Tags'
    render(
      <TagEditor name="tags" title={title} initalValue={aboutPageMock.skills} />
    )

    const inputElement = screen.getByRole('textbox')
    const tagsElement = screen.getByText(title)
    const tagElements = screen.queryAllByTestId('tag-testid')

    expect(inputElement).toBeInTheDocument()
    expect(tagsElement).toBeInTheDocument()

    expect(tagElements).toHaveLength(aboutPageMock.skills.length)
  })

  test('should remove tag when click in delete button', () => {
    render(
      <TagEditor name="tags" title="Tags" initalValue={aboutPageMock.skills} />
    )

    const tagForRemove = screen.queryByText('javascript')
    const buttonElement = tagForRemove?.lastElementChild

    buttonElement && userEvent.click(buttonElement)
    const tagElements = screen.queryAllByTestId('tag-testid')

    expect(tagForRemove).not.toBeInTheDocument()
    expect(tagElements).toHaveLength(aboutPageMock.skills.length - 1)
  })

  test('should add tag when key enter is pressed inner text input', () => {
    render(
      <TagEditor name="tags" title="Tags" initalValue={aboutPageMock.skills} />
    )
    const tagForAdd = 'new tag'
    const inputElement = screen.getByRole('textbox')
    const tagElements = screen.queryAllByTestId('tag-testid')

    expect(tagElements).toHaveLength(aboutPageMock.skills.length)
    userEvent.type(inputElement, tagForAdd)
    expect(inputElement).toHaveFocus()
    userEvent.type(inputElement, '{enter}')

    expect(screen.queryByText('new tag')).toBeInTheDocument()
  })

  test('should not add tag when this tag already exist', () => {
    const tags = [
      {
        title: 'new tag'
      }
    ]
    render(<TagEditor name="tags" title="Tags" initalValue={tags} />)
    const inputElement = screen.getByRole('textbox')
    const tagElements = screen.queryAllByTestId('tag-testid')

    expect(tagElements).toHaveLength(tags.length)
    userEvent.type(inputElement, `${tags[0].title}{enter}`)

    expect(screen.queryAllByTestId('tag-testid')).toHaveLength(1)
  })

  test('should not add tag when this is empty', async () => {
    render(<TagEditor name="tags" title="Tags" initalValue={[]} />)
    const inputElement = screen.getByRole('textbox')

    expect(screen.queryAllByTestId('tag-testid')).toHaveLength(0)

    userEvent.type(inputElement, '{enter}')
    expect(screen.queryAllByTestId('tag-testid')).toHaveLength(0)

    userEvent.type(inputElement, '  {enter}')
    expect(screen.queryAllByTestId('tag-testid')).toHaveLength(0)
  })
})
