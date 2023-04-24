import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { AdminAbout } from '.'
import aboutPageMock from '../../../mocks/aboutPageMock'
import mockAboutService from '../../../mocks/msw/services/mockAboutService'

describe('ADMIN: About page', () => {
  test('should render all fields', async () => {
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { skills, description, ...fields } = aboutPageMock

    await waitFor(async () => {
      expect(screen.getByRole('form')).toHaveFormValues(fields)
      expect(screen.getByPlaceholderText('Descrição')).toHaveTextContent(
        description
      )
      expect(
        screen
          .getAllByTestId('tag-testid')
          .map((skill) => ({ title: skill.textContent }))
      ).toEqual(skills)
    })
  })
})
