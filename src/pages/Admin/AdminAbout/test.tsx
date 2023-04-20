import { render, screen } from '@testing-library/react'
import { AdminAbout } from '.'

describe('ADMIN: About page', () => {
  test('should render all fields', () => {
    render(<AdminAbout />)

    expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/habilidades/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/images/i)).toBeInTheDocument()
    // expect(screen.getByLabelText(/imagem/i)).toBeInTheDocument()
    // expect(screen.getByLabelText(/imagem url/i)).toBeInTheDocument()
    // expect(screen.getByRole('img')).toHaveAttribute(
    //   'src',
    //   aboutPageMock.illustrationURL
    // )
    // expect(screen.getByRole('img')).toHaveAttribute(
    //   'alt',
    //   aboutPageMock.illustrationURL
    // )
  })
})
