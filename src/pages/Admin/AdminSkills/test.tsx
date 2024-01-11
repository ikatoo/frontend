vi.mock('src/services/api')

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import skillsPageMock from 'shared/mocks/skillsPageMock/result.json'
import Alert from 'src/components/Alert'
import { waitFor } from 'src/helpers/testUtils'
import { AlertProvider } from 'src/hooks/useAlert'
import api from 'src/services/api'
import authService from 'src/services/authService'
import skillsService from 'src/services/skillsService'
import { describe, expect, test, vi } from 'vitest'
import { AdminSkills } from '.'

describe('ADMIN: Skills page', () => {
  beforeEach(() => {
    api.get = vi.fn()
  })

  test('should render page with title', () => {
    api.get = vi.fn().mockResolvedValue({})

    render(<AdminSkills />)

    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveTextContent('Suas habilidades e experiências.')
  })

  test('should render all components', () => {
    api.get = vi.fn().mockResolvedValue({})

    render(<AdminSkills />)

    const title = screen.getByLabelText('Título')
    const description = screen.getByLabelText('Descrição')
    const save = screen.getByRole('button', {
      name: /salvar/i
    })
    const update = screen.queryByRole('button', {
      name: /atualizar/i
    })
    const clear = screen.getByRole('button', {
      name: /limpar/i
    })

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(save).toBeInTheDocument()
    expect(update).toBeNull()
    expect(clear).toBeInTheDocument()
  })

  test('should load data at render', async () => {
    api.get = vi.fn().mockResolvedValue({
      data: skillsPageMock,
      status: 200
    })
    api.post = vi.fn().mockResolvedValue({
      status: 200
    })

    render(<AdminSkills />)

    const { title, description } = skillsPageMock

    const form = screen.getByRole('form')

    await waitFor(() => {
      expect(form).toHaveFormValues({ title, description })
    })
  })

  test('should change focus on press tab key', async () => {
    api.get = vi.fn().mockResolvedValue({})

    await waitFor(() => {
      render(<AdminSkills />)
    })

    const title = screen.getByLabelText('Título')
    const description = screen.getByLabelText('Descrição')

    const submitButton = screen.getByRole('button', { name: /salvar/i })
    const clearButton = screen.getByRole('button', {
      name: 'Limpar'
    })

    await waitFor(() => {
      expect(title).toHaveFocus()
      userEvent.tab()
      expect(description).toHaveFocus()
      userEvent.tab()
      expect(submitButton).toHaveFocus()
      userEvent.tab()
      expect(clearButton).toHaveFocus()
    })
  })

  test('should show save message when submit data', async () => {
    skillsService.get = vi.fn().mockResolvedValue({})
    skillsService.create = vi.fn().mockResolvedValue({ data: {}, status: 201 })

    await waitFor(() => {
      render(
        <AlertProvider>
          <Alert />
          <AdminSkills />
        </AlertProvider>
      )
    })

    const titleInput = screen.getByLabelText('Título')
    const descriptionInput = screen.getByLabelText('Descrição')
    const saveButton = screen.getByRole('button', { name: /salvar/i })

    userEvent.type(titleInput, skillsPageMock.title)
    userEvent.type(descriptionInput, skillsPageMock.description)
    userEvent.click(saveButton)

    await waitFor(() => {
      expect(
        screen.getByText('Success on create skills page.')
      ).toBeInTheDocument()
      expect(skillsService.create).toHaveBeenCalledTimes(1)
    })
  })

  test('should show update message when submit a new data', async () => {
    skillsService.get = vi.fn().mockResolvedValue({
      data: skillsPageMock,
      status: 200
    })
    skillsService.patch = vi.fn().mockResolvedValue({ data: {}, status: 204 })

    const newSkillsPageMock = {
      title: 'new title',
      description: 'new description'
    }

    render(
      <AlertProvider>
        <Alert />
        <AdminSkills />
      </AlertProvider>
    )

    const titleInput = screen.getByLabelText('Título')
    const descriptionInput = screen.getByLabelText('Descrição')

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Atualizar' })
      ).toBeInTheDocument()
    })

    const updateButton = screen.getByRole('button', { name: 'Atualizar' })

    userEvent.type(titleInput, newSkillsPageMock.title)
    userEvent.type(descriptionInput, newSkillsPageMock.description)
    userEvent.click(updateButton)

    await waitFor(() => {
      expect(
        screen.getByText('Success on update skills page.')
      ).toBeInTheDocument()
    })
  })

  test('should clear all text inputs and set focus in the first text input when click on Clear Button', async () => {
    skillsService.get = vi.fn().mockResolvedValue({
      data: skillsPageMock,
      status: 200
    })
    authService.verifyToken = vi.fn().mockResolvedValueOnce({
      status: 200
    })

    render(<AdminSkills />)

    const titleInput = screen.getByLabelText('Título')
    const descriptionInput = screen.getByLabelText('Descrição')

    await waitFor(() => {
      expect(titleInput).toHaveValue(skillsPageMock.title)
      expect(descriptionInput).toHaveValue(skillsPageMock.description)
    })

    const clearButton = screen.getByRole('button', { name: 'Limpar' })
    userEvent.click(clearButton)

    const allInputText = screen.getAllByRole('textbox')
    allInputText.forEach((input) => {
      expect(input).toHaveValue('')
    })

    await waitFor(() => {
      expect(titleInput).toHaveFocus()
    })
  })
})
