import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import TextArea from '.'

describe('<TextArea />', () => {
  it('Renders with Label', () => {
    render(<TextArea label="Label" name="Label" />)

    expect(screen.getByLabelText('Label')).toBeInTheDocument()
  })

  it('Renders without Label', () => {
    render(<TextArea name="username" />)

    expect(screen.queryByLabelText('Label')).not.toBeInTheDocument()
  })

  it('Renders with placeholder', () => {
    render(<TextArea name="username" placeholder="hey you" />)

    expect(screen.getByPlaceholderText('hey you')).toBeInTheDocument()
  })

  it('Changes its value when typing', async () => {
    const onTextAreaChange = vi.fn()
    render(
      <TextArea
        onTextAreaChange={onTextAreaChange}
        label="TextArea"
        name="TextArea"
      />
    )

    const input = screen.getByRole('textbox')
    const text = 'This is my new text'

    act(() => {
      userEvent.type(input, text)
    })

    await waitFor(() => {
      expect(input).toHaveValue(text)
      expect(onTextAreaChange).toHaveBeenCalledTimes(text.length)
    })
    expect(onTextAreaChange).toHaveBeenCalledWith(text)
  })

  it('Does not changes its value when disabled', async () => {
    const onTextAreaChange = vi.fn()
    render(
      <TextArea
        onTextAreaChange={onTextAreaChange}
        label="TextArea"
        name="TextArea"
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
    expect(onTextAreaChange).not.toHaveBeenCalled()
  })

  it('Renders with error', () => {
    const { container } = render(
      <TextArea name="username" label="TextArea" error="Error message" />
    )

    expect(screen.getByText('Error message')).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('Is accessible by tab', () => {
    render(<TextArea label="TextArea" name="TextArea" />)

    const input = screen.getByLabelText('TextArea')
    expect(document.body).toHaveFocus()

    act(() => {
      userEvent.tab()
    })

    expect(input).toHaveFocus()
  })

  it('Is not accessible by tab when disabled', () => {
    render(<TextArea label="TextArea" name="TextArea" disabled />)

    const input = screen.getByLabelText('TextArea')
    expect(document.body).toHaveFocus()

    act(() => {
      userEvent.tab()
    })

    expect(input).not.toHaveFocus()
  })
})
