import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { AdminAbout } from '.'
import env from '../../../helpers/env'
import aboutPageMock from '../../../mocks/aboutPageMock'

describe('ADMIN: About page', () => {
  test('should render all fields', () => {
    render(<AdminAbout />)

    expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/habilidades/i)).toBeInTheDocument()
    expect(screen.getByRole('group')).toContain(/images/i)
    expect(screen.getByLabelText(/imagem url/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/imagem alt/i)).toBeInTheDocument()
  })

  test('should load data at render', () => {
    const server = setupServer(
      rest.get(`${env.VITE_API_URL}/about`, (_req, res, ctx) => {
        return res(ctx.status(200), ctx.json(aboutPageMock))
      })
    )
    server.listen({ onUnhandledRequest: 'error' })

    render(<AdminAbout />)

    const titleInput = screen.getByPlaceholderText(/título/i)
    // const descriptionInput = screen.getByPlaceholderText('Descrição')
    // const skills = screen
    //   .queryAllByTestId('tag-testid')
    //   .map((element) => ({ title: element.textContent }))
    // const illustrationALTInput = screen.getByPlaceholderText(
    //   'Uma breve descrição da imagem'
    // )
    // const illustrationURLTInput = screen.getByPlaceholderText(
    //   'https://domain.com/image.jpg'
    // )

    expect(titleInput).toHaveValue(aboutPageMock.title)
  })
})
