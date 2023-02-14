import userEvent from '@testing-library/user-event'

import TagInput from '.'
import { act, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'

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
      <TagInput
        onInputChange={onInputChange}
        label="TagInput"
        name="TagInput"
      />
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

    act(() => {
      input.focus()
    })
    expect(input).toHaveFocus()

    userEvent.type(input, 'skill typed,')
  })
})
