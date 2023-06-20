import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import projectsPageMock from 'shared/mocks/projectsMock/result.json'
import api from 'src/services/api'
import projectsService from 'src/services/projectsService'
import { describe, expect, test, vi } from 'vitest'
import { AdminProjects } from '.'
import Alert from '../../../components/Alert'
import { AlertProvider } from '../../../hooks/useAlert'

describe('ADMIN: projects page', () => {
  test('should render all fields', () => {
    api.get = vi.fn().mockResolvedValue({})

    render(<AdminProjects />)

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
      data: projectsPageMock
    })

    render(<AdminProjects />)

    const { skills, description, ...fields } = projectsPageMock

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

    render(<AdminProjects />)

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
          <AdminProjects />
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

    userEvent.type(titleInput, projectsPageMock.title)
    userEvent.type(descriptionInput, projectsPageMock.description)
    userEvent.type(illustrationALTInput, projectsPageMock.illustrationALT)
    userEvent.type(illustrationURLInput, projectsPageMock.illustrationURL)
    projectsPageMock.skills.forEach((skill) => {
      userEvent.type(skillsInput, `${skill.title},`)
    })

    await waitFor(() => {
      expect(screen.queryAllByTestId('tag-testid')).toHaveLength(
        projectsPageMock.skills.length
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
          <AdminProjects />
        </AlertProvider>
      )
    })

    userEvent.type(
      screen.getByRole('textbox', { name: /título/i }),
      projectsPageMock.title
    )
    userEvent.type(
      screen.getByRole('textbox', { name: /descrição/i }),
      projectsPageMock.description
    )
    userEvent.type(
      screen.getByRole('textbox', { name: /imagem alt/i }),
      projectsPageMock.illustrationALT
    )
    userEvent.type(
      screen.getByRole('textbox', { name: /imagem url/i }),
      projectsPageMock.illustrationURL
    )
    projectsPageMock.skills.forEach((skill) => {
      userEvent.type(
        screen.getByRole('textbox', { name: /habilidades/i }),
        `${skill.title},`
      )
    })

    api.post = vi.fn().mockResolvedValue({})
    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: /salvar/i }))
      expect(
        screen.getByText('Success on create projects page.')
      ).toBeInTheDocument()
    })

    expect(api.post).toBeCalledTimes(1)
    expect(api.post).toHaveBeenCalledWith('/projects', projectsPageMock)
  })

  test('should show update message when submit a new data', async () => {
    projectsService.get = vi
      .fn()
      .mockResolvedValue({ data: projectsPageMock, status: 200 })

    render(
      <AlertProvider>
        <Alert />
        <AdminProjects />
      </AlertProvider>
    )

    await waitFor(() => {
      expect(screen.queryAllByTestId('tag-testid')).toHaveLength(
        projectsPageMock.skills.length
      )
    })

    projectsService.patch = vi.fn().mockResolvedValue({ data: {}, status: 204 })
    userEvent.click(screen.getByRole('button', { name: /atualizar/i }))

    expect(
      screen.getByText('Success on update projects page.')
    ).toBeInTheDocument()
  })

  test('should call path function with a new data', async () => {
    projectsService.get = vi
      .fn()
      .mockResolvedValue({ data: projectsPageMock, status: 200 })

    const newprojectsPageMock = {
      title: 'new title',
      description: 'new description',
      illustrationALT: 'new image alt',
      illustrationURL: 'new image url',
      skills: [
        ...projectsPageMock.skills.filter(
          (skill) => skill.title !== 'javascript'
        ),
        { title: 'ci/cd' }
      ]
    }

    render(
      <AlertProvider>
        <Alert />
        <AdminProjects />
      </AlertProvider>
    )

    await waitFor(() => {
      expect(screen.queryAllByTestId('tag-testid')).toHaveLength(
        projectsPageMock.skills.length
      )
    })

    const title = screen.getByRole('textbox', { name: /título/i })
    userEvent.clear(title)
    userEvent.type(title, newprojectsPageMock.title)

    const description = screen.getByRole('textbox', { name: /descrição/i })
    userEvent.clear(description)
    userEvent.type(description, newprojectsPageMock.description)

    const imageALT = screen.getByRole('textbox', { name: /imagem alt/i })
    userEvent.clear(imageALT)
    userEvent.type(imageALT, newprojectsPageMock.illustrationALT)

    const imageURL = screen.getByRole('textbox', { name: /imagem url/i })
    userEvent.clear(imageURL)
    userEvent.type(imageURL, newprojectsPageMock.illustrationURL)

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

    projectsService.patch = vi.fn().mockResolvedValue({ data: {}, status: 204 })
    userEvent.click(screen.getByRole('button', { name: /atualizar/i }))

    await waitFor(() => {
      expect(projectsService.patch).toHaveBeenCalledTimes(1)
    })
    expect(projectsService.patch).toHaveBeenCalledWith(newprojectsPageMock)
  })

  test('should clear all text inputs', async () => {
    projectsService.get = vi
      .fn()
      .mockResolvedValue({ data: projectsPageMock, status: 200 })
    render(<AdminProjects />)

    await waitFor(() => {
      expect(screen.queryAllByTestId('tag-testid')).toHaveLength(
        projectsPageMock.skills.length
      )
    })

    const clearButton = screen.getByRole('button', {
      name: 'Limpar Formulário'
    })

    userEvent.click(clearButton)

    await waitFor(() => {
      expect(screen.getByLabelText('Título')).toHaveValue('')
      expect(screen.getByLabelText('Descrição')).toHaveValue('')
      expect(screen.getByLabelText('Habilidades')).toHaveValue('')
      expect(screen.getByLabelText('Imagem URL')).toHaveValue('')
      expect(screen.getByLabelText('Imagem ALT')).toHaveValue('')
    })
  })

  test('should set focus on first text input after click on clear button', async () => {
    projectsService.get = vi
      .fn()
      .mockResolvedValue({ data: projectsPageMock, status: 200 })
    render(<AdminProjects />)

    await waitFor(() => {
      expect(screen.queryAllByTestId('tag-testid')).toHaveLength(
        projectsPageMock.skills.length
      )
    })

    const clearButton = screen.getByRole('button', {
      name: 'Limpar Formulário'
    })

    userEvent.click(clearButton)

    await waitFor(() => {
      expect(screen.getByLabelText('Título')).toHaveFocus()
    })
  })
})
