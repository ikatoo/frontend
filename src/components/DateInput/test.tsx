import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DateInput from '.'

describe('<DateInput />', () => {
  it('should render the component', () => {
    render(<DateInput name="InitialDate" label="Initial Date" />)

    const element = screen.getByLabelText('Initial Date')

    expect(element).toBeInTheDocument()
  })

  it('should close calendar when click on month', async () => {
    render(<DateInput name="InitialDate" label="Initial Date" />)

    const input = screen.getByRole('textbox')
    userEvent.click(input)
  })
})
