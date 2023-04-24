import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, test } from 'vitest'
import { AdminAbout } from '.'
import aboutPageMock from '../../../mocks/aboutPageMock'
import mswUse from '../../../mocks/msw/services/mswUse'

describe('ADMIN: About page', () => {
  beforeEach(() => {
    mswUse([{ url: `${env.VITE_API_URL}/about`, method: 'get', status: 200 }])
  })

  test('should render all fields', async () => {
    render(<AdminAbout />)

    expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/habilidades/i)).toBeInTheDocument()
    expect(screen.getByRole('group')).toContain(/images/i)
    expect(screen.getByLabelText(/imagem url/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/imagem alt/i)).toBeInTheDocument()
  })

  test('should load data at render', async () => {
    mswUse([
      {
        url: `${env.VITE_API_URL}/about`,
        method: 'get',
        status: 200,
        result: aboutPageMock
      }
    ])

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

  test('should change focus on press tab key', () => {
    render(<AdminAbout />)

    const titleInput = screen.getByRole('textbox', { name: /título/i })
    const descriptionInput = screen.getByRole('textbox', { name: /Descrição/i })
    const skillsInput = screen.getByRole('textbox', { name: /Habilidades/i })
    const illustrationURLInput = screen.getByRole('textbox', {
      name: /Imagem URL/i
    })
    const illustrationALTInput = screen.getByRole('textbox', {
      name: /Imagem ALT/i
    })
    const submitButton = screen.getByRole('button', { name: /salvar/i })
    const clearButton = screen.getByRole('button', {
      name: /limpar formulário/i
    })

    expect(titleInput).toHaveFocus()
    userEvent.tab()
    expect(descriptionInput).toHaveFocus()
    userEvent.tab()
    expect(skillsInput).toHaveFocus()
    userEvent.tab()
    expect(illustrationURLInput).toHaveFocus()
    userEvent.tab()
    expect(illustrationALTInput).toHaveFocus()
    userEvent.tab()
    expect(submitButton).toHaveFocus()
    userEvent.tab()
    expect(clearButton).toHaveFocus()
  })
})
