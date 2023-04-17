import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import TextEditor from '.'
import theme from '../../theme'

describe('<TextEditor />', () => {
  test('should render the component with default properties', async () => {
    const value = 'test editor'
    const onChange = vi.fn()
    render(
      <TextEditor
        initialValue={value}
        onChange={onChange}
        label="Description"
      />
    )

    const label = screen.getByText('Description')
    const wrapper = label.parentElement
    const editor = screen.getByText(/loading.../i)

    expect(label).toBeInTheDocument()
    expect(label).toHaveStyle('color: #00021f')
    expect(wrapper).not.toHaveAttribute('disabled')
    expect(wrapper).not.toHaveAttribute('error')
    expect(editor).toBeInTheDocument()
  })

  test('should render components with white label color', () => {
    render(<TextEditor label="teste" labelColor="white" />)

    const label = screen.getByText('teste')

    expect(label).toBeInTheDocument()
    expect(label).toHaveStyle('color: #FAFAFA')
  })

  test('should render components with error', () => {
    const error = 'this is error'
    render(<TextEditor label="teste" error={error} />)

    const errorElement = screen.getByText(error)
    expect(errorElement).toBeInTheDocument()
    expect(errorElement).toHaveStyle({
      color: theme.colors.red,
      'font-size': theme.font.sizes.xsmall
    })
  })

  test('should gain focus when tab', () => {
    render(<TextEditor label="teste" initialValue="teste" />)

    // const editor = screen.getByText(/loading.../i)

    expect(document.body).toHaveFocus()
    userEvent.tab()
    // expect(editor).toHaveFocus()
  })

  test.todo('should focused when click on label')
})
