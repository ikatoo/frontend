import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import { AdminAbout } from '.'
import Alert from '../../../components/Alert'
import { AlertProvider } from '../../../hooks/useAlert'
import api from 'src/services/api'
import aboutPageMock from 'mocks/aboutPageMock/result.json'

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
    api.post = vi.fn().mockResolvedValue({})

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
    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: /salvar/i }))
      expect(
        screen.getByText('Success on create about page.')
      ).toBeInTheDocument()
    })

    expect(api.post).toBeCalledTimes(1)
    expect(api.post).toHaveBeenCalledWith('/about', {
      data: aboutPageMock,
      headers: {
        Authorization: `bearer ${localStorage.getItem('IKATOO_AuthToken')}`,
        ContentType: 'application/json'
      }
    })
  })

  test.skip('should show update message when submit a new data', async () => {
    api.get = vi.fn().mockResolvedValue({ data: aboutPageMock })
    api.patch = vi.fn().mockResolvedValue({})

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

    userEvent.type(
      screen.getByRole('textbox', { name: /título/i }),
      newAboutPageMock.title
    )
    userEvent.type(
      screen.getByRole('textbox', { name: /descrição/i }),
      newAboutPageMock.description
    )
    userEvent.type(
      screen.getByRole('textbox', { name: /imagem alt/i }),
      newAboutPageMock.illustrationALT
    )
    userEvent.type(
      screen.getByRole('textbox', { name: /imagem url/i }),
      newAboutPageMock.illustrationURL
    )

    await waitFor(() => {
      expect(screen.queryAllByTestId('tag-testid')).toHaveLength(
        aboutPageMock.skills.length
      )
    })

    const tagForRemove = screen.queryByText('javascript')
    const deleteSkillButton = tagForRemove?.lastElementChild
    deleteSkillButton && userEvent.click(deleteSkillButton)
    expect(screen.queryAllByTestId('tag-testid')).toHaveLength(
      aboutPageMock.skills.length - 1
    )

    await waitFor(() => {
      expect(screen.queryByText('javascript')).not.toBeInTheDocument()
    })

    userEvent.type(
      screen.getByRole('textbox', { name: /habilidades/i }),
      `ci/cd,`
    )

    await waitFor(() => {
      expect(screen.getByRole('form')).toHaveFormValues(newAboutPageMock)
    })

    userEvent.click(screen.getByRole('button', { name: /atualizar/i }))

    expect(
      screen.getByText('Success on update about page.')
    ).toBeInTheDocument()

    expect(api.patch).toHaveBeenCalledTimes(1)

    await waitFor(() => {
      expect(api.patch).toBeCalledWith('/about', {
        data: newAboutPageMock,
        headers: {
          Authorization: `bearer ${localStorage.getItem('IKATOO_AuthToken')}`,
          ContentType: 'application/json'
        }
      })
    })
  })

  // test('should clear all text inputs and set focus on first text input', () => {
  //   render(<AdminAbout />)
  // })
})
