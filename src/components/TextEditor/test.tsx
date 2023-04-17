import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import TextEditor from '.'

describe('<TextEditor />', () => {
  test('should render the component', async () => {
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
    expect(wrapper).not.toHaveAttribute('disabled')
    expect(wrapper).not.toHaveAttribute('error')
    expect(editor).toBeInTheDocument()
  })
})
