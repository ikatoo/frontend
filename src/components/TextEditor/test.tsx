import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import TextEditor from '.'
import theme from '../../theme'
import userEvent from '@testing-library/user-event'

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
})
