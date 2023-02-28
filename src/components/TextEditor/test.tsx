import { render } from '@testing-library/react'
import TextEditor from '.'

describe('<TextEditor />', () => {
  it('should render the component', () => {
    render(
      <TextEditor
        initialValue={''}
        label="Descrição"
        labelColor="white"
        name="description"
        placeholder="Descrição"
        onChange={() => null}
        tabIndex={1}
      />
    )

    // const textEditor = screen.getAllByRole('textbox')
  })
})
