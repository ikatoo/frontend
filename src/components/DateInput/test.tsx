import { render, screen } from '@testing-library/react'
import DateInput from '.'

describe('<DateInput />', () => {
  it('should render the component', () => {
    render(<DateInput name="InitialDate" label="Initial Date" />)

    const element = screen.getByLabelText('Initial Date')

    expect(element).toBeInTheDocument()
  })
})
