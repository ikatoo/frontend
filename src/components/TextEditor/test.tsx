import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { waitFor } from 'src/helpers/testUtils'
import { describe, expect, test, vi } from 'vitest'
import TextEditor from '.'
import theme from '../../styles/theme'

describe('<TextEditor />', () => {
  test('should render the component with default properties', async () => {
    const value = 'test editor'
    const onChange = vi.fn()
    render(
      <TextEditor
        name="editor"
        initialValue={value}
        onEditorChange={onChange}
        label="Description"
      />
    )

    const label = screen.getByText('Description')
    const wrapper = label.parentElement
    const editor = screen.getByRole('textbox')

    expect(label).toBeInTheDocument()
    expect(label).toHaveStyle('color: #00021f')
    expect(wrapper).not.toHaveAttribute('disabled')
    expect(wrapper).not.toHaveAttribute('error')
    expect(editor).toBeInTheDocument()
  })

  test('should render components with white label color', () => {
    render(<TextEditor name="editor" label="teste" labelColor="white" />)

    const label = screen.getByText('teste')

    expect(label).toBeInTheDocument()
    expect(label).toHaveStyle('color: #FAFAFA')
  })

  test('should render components with error', () => {
    const error = 'this is error'
    render(<TextEditor name="editor" label="teste" error={error} />)

    const errorElement = screen.getByText(error)
    expect(errorElement).toBeInTheDocument()
    expect(errorElement).toHaveStyle({
      color: theme.colors.red,
      'font-size': theme.font.sizes.xsmall
    })
  })

  test('should gain focus when tab', async () => {
    render(
      <TextEditor
        name="editor"
        label="teste"
        initialValue="teste"
        tabIndex={1}
      />
    )

    const editorElement = screen.getByRole('textbox')

    expect(document.body).toHaveFocus()
    userEvent.tab()
    await waitFor(() => {
      expect(editorElement).toHaveFocus()
    })
  })

  test('should focused when click on label', async () => {
    render(
      <TextEditor
        name="editor"
        label="teste"
        initialValue="teste"
        tabIndex={1}
      />
    )

    const labelElement = screen.getByText('teste')
    const editorElement = screen.getByRole('textbox')

    userEvent.click(labelElement)
    await waitFor(() => {
      expect(editorElement).toHaveFocus()
    })
  })

  test('should call onChange function when change data in textbox', () => {
    const onChange = vi.fn()
    render(
      <TextEditor
        name="editor"
        label="teste"
        initialValue=""
        tabIndex={1}
        onEditorChange={onChange}
      />
    )

    const textareaElement = screen.getByRole('textbox')

    userEvent.click(textareaElement)
    expect(onChange).toHaveBeenCalledTimes(0)

    userEvent.keyboard('12345')
    expect(onChange).toHaveBeenCalledTimes(5)
  })
})
