import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test } from 'vitest'
import { AdminAbout } from '.'
import env from '../../../helpers/env'
import { AlertProvider } from '../../../hooks/useAlert'
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

    const { skills, description, ...fields } = aboutPageMock

    await waitFor(() => {
      expect(screen.getByRole('form')).toHaveFormValues(fields)
    })

    expect(screen.getByPlaceholderText('Descrição')).toHaveTextContent(
      description
    )
    expect(
      screen
        .getAllByTestId('tag-testid')
        .map((skill) => ({ title: skill.textContent }))
    ).toEqual(skills)
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

  test('should call submit with data when save button is clicked', async () => {
    mswUse([
      { url: `${env.VITE_API_URL}/about`, method: 'get', status: 200 },
      { url: `${env.VITE_API_URL}/about`, method: 'post', status: 201 }
    ])
    render(
      <AlertProvider>
        <AdminAbout />
      </AlertProvider>
    )

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
    // const clearButton = screen.getByRole('button', {
    //   name: /limpar formulário/i
    // })

    userEvent.type(titleInput, aboutPageMock.title)
    userEvent.type(descriptionInput, aboutPageMock.description)
    userEvent.type(illustrationALTInput, aboutPageMock.illustrationALT)
    userEvent.type(illustrationURLInput, aboutPageMock.illustrationURL)
    aboutPageMock.skills.forEach((skill) => {
      userEvent.type(skillsInput, `${skill.title},`)
    })

    await waitFor(() => {
      expect(screen.queryAllByTestId('tag-testid')).toHaveLength(
        aboutPageMock.skills.length
      )
    })

    userEvent.click(submitButton)
  })

  test('should show save message when submit first data', () => {
    render(<AdminAbout />)
  })

  test('should show update message when submit a new data', () => {
    render(<AdminAbout />)
  })

  test('should clear all text inputs and set focus on first text input', () => {
    render(<AdminAbout />)
  })
})
