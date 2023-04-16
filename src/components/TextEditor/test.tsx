import { render } from '@testing-library/react'
import { describe, test } from 'vitest'
import TextEditor from '.'

describe('<TextEditor />', () => {
  test('should render the component', () => {
    render(<TextEditor name="testEditor" placeholder="editor" />)
  })
})
