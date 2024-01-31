import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import TagEditor from '.'
import skillsPageMock from 'shared/mocks/skillsPageMock/result.json'
import { waitFor } from 'src/helpers/testUtils'

const mock = skillsPageMock.projects[1]

describe('<TagEditor />', () => {
  test('should render the component', () => {
    const title = 'Tags'
    const onChangeTags = vi.fn()
    render(
      <TagEditor
        name="tags"
        title={title}
        initalValue={mock.skills}
        onChangeTags={onChangeTags}
      />
    )

    const inputElement = screen.getByRole('textbox')
    const tagsElement = screen.getByText(title)
    const tagElements = screen.queryAllByTestId('tag-testid')

    expect(inputElement).toBeInTheDocument()
    expect(tagsElement).toBeInTheDocument()

    expect(tagElements).toHaveLength(mock.skills.length)
  })

  test('should remove tag when click in delete button', async () => {
    const onChangeTags = vi.fn()
    render(
      <TagEditor
        name="tags"
        title="Tags"
        initalValue={mock.skills}
        onChangeTags={onChangeTags}
      />
    )

    const titleForRemove = mock.skills[2].title
    const buttonElement = screen.getByTitle(`Remove ${titleForRemove} skill.`)

    userEvent.click(buttonElement)

    await waitFor(() => {
      expect(onChangeTags).toHaveBeenCalledTimes(1)
    })
    expect(screen.queryByText(titleForRemove)).not.toBeInTheDocument()
    expect(screen.getAllByTestId('tag-testid')).toHaveLength(
      mock.skills.length - 1
    )
  })

  test('should add tag when key enter is pressed inner text input', async () => {
    const onChange = vi.fn()
    render(
      <TagEditor
        name="tags"
        title="Tags"
        initalValue={mock.skills}
        onChangeTags={onChange}
      />
    )
    const tagForAdd = 'new tag'
    const inputElement = screen.getByRole('textbox')
    const tagElements = screen.queryAllByTestId('tag-testid')

    expect(tagElements).toHaveLength(mock.skills.length)
    userEvent.type(inputElement, tagForAdd)
    expect(inputElement).toHaveFocus()
    userEvent.type(inputElement, '{enter}')

    expect(screen.queryByText('new tag')).toBeInTheDocument()
    const newSkills = [...mock.skills, { title: 'new tag' }]
    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(newSkills)
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
