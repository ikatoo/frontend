import { render, screen } from '@testing-library/react'
import UploadInput from '.'

describe('<UploadInput />', () => {
  it('should render the component', () => {
    render(<UploadInput name="test" label="file here" />)
    const component = screen.getByText('file here')

    expect(component).toBeInTheDocument()
  })

  it('should render a disabled component', () => {
    render(<UploadInput disabled name="test" label="file here" />)
    const component =
      screen.getByText('file here').parentElement?.parentElement?.firstChild

    expect(component).toBeDisabled()
  })
  it.todo('should disabled upload button while input file is empty')
  it.todo('should update label with name and size of the choosed file')
  it.todo('should call function when choose file')
  it.todo('should call function when press upload button')
  it.todo(
    'should the label show an error message when the chosen file is not an image'
  )
  it.todo('should enable upload button when file is choose')
  it.todo(
    'should use native input interface when so is linux and navigator is edge'
  )
})
