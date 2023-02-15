import userEvent from '@testing-library/user-event'

import TagInput from '.'
import { act, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import theme from '../../theme'

describe('<TagInput />', () => {
  it('Renders with Label', () => {
    render(<TagInput label="Label" name="Label" />)

    expect(screen.getByLabelText('Label')).toBeInTheDocument()
  })

  it('Renders without Label', () => {
    render(<TagInput name="username" />)

    expect(screen.queryByLabelText('Label')).not.toBeInTheDocument()
  })

  it('Renders with placeholder', () => {
    render(<TagInput name="username" placeholder="hey you" />)

    expect(screen.getByPlaceholderText('hey you')).toBeInTheDocument()
  })

  it('Changes its value when typing', async () => {
    const onInputChange = vi.fn()
    render(
      <TagInput onInputChange={onInputChange} label="Skills" name="skills" />
    )

    const input = screen.getByRole('textbox')
    const text = 'This is my new text'

    act(() => {
      userEvent.type(input, text)
    })

    await waitFor(() => {
      expect(input).toHaveValue(text)
      expect(onInputChange).toHaveBeenCalledTimes(text.length)
    })
    expect(onInputChange).toHaveBeenCalledWith(text)
  })

  it('Does not changes its value when disabled', async () => {
    const onInputChange = vi.fn()
    render(
      <TagInput
        onInputChange={onInputChange}
        label="TagInput"
        name="TagInput"
        disabled
      />
    )

    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()

    const text = 'This is my new text'

    act(() => {
      userEvent.type(input, text)
    })

    await waitFor(() => {
      expect(input).not.toHaveValue(text)
    })
    expect(onInputChange).not.toHaveBeenCalled()
  })

  it('Renders with error', () => {
    const { container } = render(
      <TagInput name="username" label="TagInput" error="Error message" />
    )

    expect(screen.getByText('Error message')).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('Is accessible by tab', () => {
    render(<TagInput label="TagInput" name="TagInput" />)

    const input = screen.getByLabelText('TagInput')
    expect(document.body).toHaveFocus()

    act(() => {
      userEvent.tab()
    })

    expect(input).toHaveFocus()
  })

  it('Is not accessible by tab when disabled', () => {
    render(<TagInput label="TagInput" name="TagInput" disabled />)

    const input = screen.getByLabelText('TagInput')
    expect(document.body).toHaveFocus()

    act(() => {
      userEvent.tab()
    })

    expect(input).not.toHaveFocus()
  })

  it('When typing comma circul the text with gray background up to previous comma', () => {
    render(<TagInput label="TagInput" name="TagInput" />)
    const input = screen.getByLabelText('TagInput')
    const text = 'skill typed'

    userEvent.type(input, `${text},`)

    const tag = screen.getByText(text)

    expect(tag).toBeInTheDocument()
    expect(tag).toHaveStyle(`
      background-color: ${theme.colors.gray};
      color: ${theme.colors.lightGray};
    `)
  })

  it('When typing backspace and input is empty, remove the last tag', () => {
    render(<TagInput label="TagInput" name="TagInput" />)
    const input = screen.getByLabelText('TagInput')
    const lastTag = 'last skill'

    userEvent.type(input, 'skill 1,')
    userEvent.type(input, 'skill 2,')
    userEvent.type(input, `${lastTag},`)

    const tags = screen.getAllByTestId('tag-test-id')
    expect(tags).toHaveLength(3)

    userEvent.type(input, '{backspace}')

    const tagsBefore = screen.getAllByTestId('tag-test-id')
    expect(tagsBefore).toHaveLength(2)
  })

  it('Click for remove a tag', () => {
    render(<TagInput label="TagInput" name="TagInput" />)
    const input = screen.getByLabelText('TagInput')
    const tagForRemove = 'remove skill'

    userEvent.type(input, 'skill 1,')
    userEvent.type(input, `${tagForRemove},`)
    userEvent.type(input, 'skill 3,')

    const tags = screen.getAllByTestId('tag-test-id')
    expect(tags).toHaveLength(3)

    const tagElementForRemove = screen.getByText(tagForRemove)
    const closeElement = tagElementForRemove.querySelector('svg')

    !!closeElement && userEvent.click(closeElement)

    const tagsBefore = screen.getAllByTestId('tag-test-id')
    expect(tagsBefore).toHaveLength(2)
    expect(screen.queryByText(tagForRemove)).not.toBeInTheDocument()
  })
})
