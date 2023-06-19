import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import aboutPageMock from 'shared/mocks/aboutPageMock/result.json'
import aboutService from 'src/services/aboutService'
import api from 'src/services/api'
import { describe, expect, test, vi } from 'vitest'
import { AdminAbout } from '.'
import Alert from '../../../components/Alert'
import { AlertProvider } from '../../../hooks/useAlert'

describe('ADMIN: About page', () => {
  test('should render all fields', () => {
    api.get = vi.fn().mockResolvedValue({})

    render(<AdminAbout />)

    expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/habilidades/i)).toBeInTheDocument()
    expect(screen.getByRole('group')).toContain(/images/i)
    expect(screen.getByLabelText(/imagem url/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/imagem alt/i)).toBeInTheDocument()

    api.get = vi.fn()
  })

  test('should load data at render', async () => {
    api.get = vi.fn().mockResolvedValue({
      data: aboutPageMock
    })

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

    api.get = vi.fn()
  })

  test('should change focus on press tab key', () => {
    api.get = vi.fn().mockResolvedValue({})

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
    api.get = vi.fn().mockResolvedValue({})

    await waitFor(() => {
      render(
        <AlertProvider>
          <AdminAbout />
        </AlertProvider>
      )
    })

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

    api.post = vi.fn().mockResolvedValue({})

    await waitFor(() => {
      userEvent.click(submitButton)
    })
  })

  test('should show save message when submit first data', async () => {
    api.get = vi.fn().mockResolvedValue({})

    await waitFor(() => {
      render(
        <AlertProvider>
          <Alert />
          <AdminAbout />
        </AlertProvider>
      )
    })

    userEvent.type(
      screen.getByRole('textbox', { name: /título/i }),
      aboutPageMock.title
    )
    userEvent.type(
      screen.getByRole('textbox', { name: /descrição/i }),
      aboutPageMock.description
    )
    userEvent.type(
      screen.getByRole('textbox', { name: /imagem alt/i }),
      aboutPageMock.illustrationALT
    )
    userEvent.type(
      screen.getByRole('textbox', { name: /imagem url/i }),
      aboutPageMock.illustrationURL
    )
    aboutPageMock.skills.forEach((skill) => {
      userEvent.type(
        screen.getByRole('textbox', { name: /habilidades/i }),
        `${skill.title},`
      )
    })

    api.post = vi.fn().mockResolvedValue({})
    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: /salvar/i }))
      expect(
        screen.getByText('Success on create about page.')
      ).toBeInTheDocument()
    })

    expect(api.post).toBeCalledTimes(1)
    expect(api.post).toHaveBeenCalledWith('/about', aboutPageMock)
  })

  test('should show update message when submit a new data', async () => {
    aboutService.get = vi
      .fn()
      .mockResolvedValue({ data: aboutPageMock, status: 200 })

    render(
      <AlertProvider>
        <Alert />
        <AdminAbout />
      </AlertProvider>
    )

    await waitFor(() => {
      expect(screen.queryAllByTestId('tag-testid')).toHaveLength(
        aboutPageMock.skills.length
      )
    })

    aboutService.patch = vi.fn().mockResolvedValue({ data: {}, status: 204 })
    userEvent.click(screen.getByRole('button', { name: /atualizar/i }))

    expect(
      screen.getByText('Success on update about page.')
    ).toBeInTheDocument()
  })

  test('should call path function with a new data', async () => {
    aboutService.get = vi
      .fn()
      .mockResolvedValue({ data: aboutPageMock, status: 200 })

    const newAboutPageMock = {
      title: 'new title',
      description: 'new description',
      illustrationALT: 'new image alt',
      illustrationURL: 'new image url',
      skills: [
        ...aboutPageMock.skills.filter((skill) => skill.title !== 'javascript'),
        { title: 'ci/cd' }
      ]
    }

    render(
      <AlertProvider>
        <Alert />
        <AdminAbout />
      </AlertProvider>
    )

    await waitFor(() => {
      expect(screen.queryAllByTestId('tag-testid')).toHaveLength(
        aboutPageMock.skills.length
      )
    })

    const title = screen.getByRole('textbox', { name: /título/i })
    userEvent.clear(title)
    userEvent.type(title, newAboutPageMock.title)

    const description = screen.getByRole('textbox', { name: /descrição/i })
    userEvent.clear(description)
    userEvent.type(description, newAboutPageMock.description)

    const imageALT = screen.getByRole('textbox', { name: /imagem alt/i })
    userEvent.clear(imageALT)
    userEvent.type(imageALT, newAboutPageMock.illustrationALT)

    const imageURL = screen.getByRole('textbox', { name: /imagem url/i })
    userEvent.clear(imageURL)
    userEvent.type(imageURL, newAboutPageMock.illustrationURL)

    const tagForRemove = screen.queryByText('javascript')
    const deleteSkillButton = tagForRemove?.lastElementChild as Element
    expect(deleteSkillButton).toHaveAttribute(
      'title',
      'Remove javascript skill.'
    )
    userEvent.click(deleteSkillButton)
    userEvent.type(
      screen.getByRole('textbox', { name: /habilidades/i }),
      `ci/cd,`
    )

    aboutService.patch = vi.fn().mockResolvedValue({ data: {}, status: 204 })
    userEvent.click(screen.getByRole('button', { name: /atualizar/i }))

    await waitFor(() => {
      expect(aboutService.patch).toHaveBeenCalledTimes(1)
    })
    expect(aboutService.patch).toHaveBeenCalledWith(newAboutPageMock)
  })

  // test('should clear all text inputs and set focus on first text input', () => {
  //   render(<AdminAbout />)
  // })
})
