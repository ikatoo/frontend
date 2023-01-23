import { render, screen } from '@testing-library/react'

import Button from '.'
import { Github } from '@styled-icons/boxicons-logos'

describe('<Button />', () => {
  it('should render the component', () => {
    render(<Button />)
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('text-black')
    expect(button).toHaveClass('bg-gray-500')
  })

  it('should render primary button', () => {
    render(<Button styleType="primary" />)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('text-mck_aqua')
    expect(button).toHaveClass('bg-slate-800')
    expect(button).toHaveClass('hover:bg-mck_aqua')
    expect(button).toHaveClass('hover:text-slate-800')
    expect(button).toHaveClass('focus:bg-blue-700')
    expect(button).toHaveClass('active:bg-blue-800')
  })

  it('should render secondary button', () => {
    render(<Button styleType="secondary" />)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('text-white')
    expect(button).toHaveClass('bg-blue-800')
    expect(button).toHaveClass('hover:bg-mck_aqua')
    expect(button).toHaveClass('hover:text-slate-800')
    expect(button).toHaveClass('focus:bg-blue-700')
    expect(button).toHaveClass('active:bg-blue-800')
  })

  it('should render button with icon', () => {
    render(<Button icon={<Github data-testid="icon" />} />)

    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should render block button', () => {
    render(<Button block />)

    expect(screen.getByRole('button')).toHaveClass('w-full')
  })

  it('should render button and match with snapshot', () => {
    const { container } = render(<Button block />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
