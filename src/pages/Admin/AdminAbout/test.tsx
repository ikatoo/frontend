import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { AdminAbout } from '.'
import aboutPageMock from '../../../mocks/aboutPageMock'
import mockAboutService from '../../../mocks/msw/services/mockAboutService'

describe('ADMIN: About page', () => {
  test('should render all fields', () => {
    mockAboutService(200)
    render(<AdminAbout />)

    expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/habilidades/i)).toBeInTheDocument()
    expect(screen.getByRole('group')).toContain(/images/i)
    expect(screen.getByLabelText(/imagem url/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/imagem alt/i)).toBeInTheDocument()
  })

  test('should load data at render', async () => {
    mockAboutService(200, aboutPageMock)

    render(<AdminAbout />)

    await waitFor(() => {
      screen.getByPlaceholderText(/título/i)
    })
    // const titleInput = screen.getByPlaceholderText(/título/i)
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

    // expect(titleInput).toHaveValue(aboutPageMock.title)
  })
})
