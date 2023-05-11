import { render, screen, waitFor } from '@testing-library/react'
import api from 'src/services/api'
import { describe, expect, test, vi } from 'vitest'
import { AdminSkills } from '.'
import skillsPageMock from 'src/mocks/skillsPageMock'

describe('ADMIN: Skills page', () => {
  beforeEach(() => {
    api.get = vi.fn()
  })

  test('should render all fields', () => {
    api.get = vi.fn().mockResolvedValue({})

    render(<AdminSkills />)

    expect(screen.getByRole('textbox', { name: /título/i })).toBeInTheDocument()
    expect(screen.getByLabelText('Descrição')).toBeInTheDocument()
    expect(screen.getByLabelText(/habilidades/i)).toBeInTheDocument()
    expect(screen.getByRole('group')).toContain(/últimos trabalhos/i)
    expect(
      screen.getByRole('textbox', { name: /Nome da empresa ou projeto/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /início/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /fim/i })).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: 'Link para referência' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: /breve descrição/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /adicionar trabalho/i })
    ).toBeInTheDocument()
  })

  test('should load data at render', async () => {
    api.get = vi.fn().mockResolvedValue({
      data: skillsPageMock
    })

    render(<AdminSkills />)

    const { title, skills, description } = skillsPageMock

    await waitFor(() => {
      expect(screen.getByRole('form')).toHaveFormValues({ title, description })
    })

    expect(
      screen
        .getAllByTestId('tag-testid')
        .map((skill) => ({ skillTitle: skill.textContent }))
    ).toEqual(skills)
  })

  // test('should change focus on press tab key', () => {
  //   api.get = vi.fn().mockResolvedValue({})

  //   render(<AdminSkills />)

  //   const titleInput = screen.getByRole('textbox', { name: /título/i })
  //   const descriptionInput = screen.getByRole('textbox', { name: /Descrição/i })
  //   const skillsInput = screen.getByRole('textbox', { name: /Habilidades/i })
  //   const illustrationURLInput = screen.getByRole('textbox', {
  //     name: /Imagem URL/i
  //   })
  //   const illustrationALTInput = screen.getByRole('textbox', {
  //     name: /Imagem ALT/i
  //   })
  //   const submitButton = screen.getByRole('button', { name: /salvar/i })
  //   const clearButton = screen.getByRole('button', {
  //     name: /limpar formulário/i
  //   })

  //   expect(titleInput).toHaveFocus()
  //   userEvent.tab()
  //   expect(descriptionInput).toHaveFocus()
  //   userEvent.tab()
  //   expect(skillsInput).toHaveFocus()
  //   userEvent.tab()
  //   expect(illustrationURLInput).toHaveFocus()
  //   userEvent.tab()
  //   expect(illustrationALTInput).toHaveFocus()
  //   userEvent.tab()
  //   expect(submitButton).toHaveFocus()
  //   userEvent.tab()
  //   expect(clearButton).toHaveFocus()
  // })

  // test('should call submit with data when save button is clicked', async () => {
  //   api.get = vi.fn().mockResolvedValue({})

  //   await waitFor(() => {
  //     render(
  //       <AlertProvider>
  //         <AdminSkills />
  //       </AlertProvider>
  //     )
  //   })

  //   const titleInput = screen.getByRole('textbox', { name: /título/i })
  //   const descriptionInput = screen.getByRole('textbox', { name: /Descrição/i })
  //   // const skillsInput = screen.getByRole('textbox', { name: /Habilidades/i })
  //   // const illustrationURLInput = screen.getByRole('textbox', {
  //   //   name: /Imagem URL/i
  //   // })
  //   // const illustrationALTInput = screen.getByRole('textbox', {
  //   //   name: /Imagem ALT/i
  //   // })
  //   const submitButton = screen.getByRole('button', { name: /salvar/i })

  //   userEvent.type(titleInput, skillsPageMock.title)
  //   userEvent.type(descriptionInput, skillsPageMock.description)
  //   // userEvent.type(illustrationALTInput, skillsPageMock.illustrationALT)
  //   // userEvent.type(illustrationURLInput, skillsPageMock.illustrationURL)
  //   // skillsPageMock.skills.forEach((skill) => {
  //   //   userEvent.type(skillsInput, `${skill.title},`)
  //   // })

  //   await waitFor(() => {
  //     expect(screen.queryAllByTestId('tag-testid')).toHaveLength(
  //       skillsPageMock.skills.length
  //     )
  //   })

  //   api.post = vi.fn().mockResolvedValue({})

  //   await waitFor(() => {
  //     userEvent.click(submitButton)
  //   })
  // })

  // test('should show save message when submit first data', async () => {
  //   api.get = vi.fn().mockResolvedValue({})
  //   api.post = vi.fn().mockResolvedValue({})

  //   await waitFor(() => {
  //     render(
  //       <AlertProvider>
  //         <Alert />
  //         <AdminSkills />
  //       </AlertProvider>
  //     )
  //   })

  //   userEvent.type(
  //     screen.getByRole('textbox', { name: /título/i }),
  //     skillsPageMock.title
  //   )
  //   userEvent.type(
  //     screen.getByRole('textbox', { name: /descrição/i }),
  //     skillsPageMock.description
  //   )
  //   // userEvent.type(
  //   //   screen.getByRole('textbox', { name: /imagem alt/i }),
  //   //   skillsPageMock.illustrationALT
  //   // )
  //   // userEvent.type(
  //   //   screen.getByRole('textbox', { name: /imagem url/i }),
  //   //   skillsPageMock.illustrationURL
  //   // )
  //   // skillsPageMock.skills.forEach((skill) => {
  //   //   userEvent.type(
  //   //     screen.getByRole('textbox', { name: /habilidades/i }),
  //   //     `${skill.title},`
  //   //   )
  //   // })
  //   await waitFor(() => {
  //     userEvent.click(screen.getByRole('button', { name: /salvar/i }))
  //     expect(
  //       screen.getByText('Success on create skills page.')
  //     ).toBeInTheDocument()
  //   })

  //   expect(api.post).toBeCalledTimes(1)
  //   expect(api.post).toHaveBeenCalledWith('/skills', {
  //     data: skillsPageMock,
  //     headers: {
  //       Authorization: `bearer ${localStorage.getItem('IKATOO_AuthToken')}`,
  //       ContentType: 'application/json'
  //     }
  //   })
  // })

  // test.skip('should show update message when submit a new data', async () => {
  //   api.get = vi.fn().mockResolvedValue({ data: skillsPageMock })
  //   api.patch = vi.fn().mockResolvedValue({})

  //   const newSkillsPageMock = {
  //     title: 'new title',
  //     description: 'new description',
  //     illustrationALT: 'new image alt',
  //     illustrationURL: 'new image url'
  //     // skills: [
  //     //   ...skillsPageMock.skills.filter((skill) => skill.title !== 'javascript'),
  //     //   { title: 'ci/cd' }
  //     // ]
  //   }

  //   render(
  //     <AlertProvider>
  //       <Alert />
  //       <AdminSkills />
  //     </AlertProvider>
  //   )

  //   userEvent.type(
  //     screen.getByRole('textbox', { name: /título/i }),
  //     newSkillsPageMock.title
  //   )
  //   userEvent.type(
  //     screen.getByRole('textbox', { name: /descrição/i }),
  //     newSkillsPageMock.description
  //   )
  //   userEvent.type(
  //     screen.getByRole('textbox', { name: /imagem alt/i }),
  //     newSkillsPageMock.illustrationALT
  //   )
  //   userEvent.type(
  //     screen.getByRole('textbox', { name: /imagem url/i }),
  //     newSkillsPageMock.illustrationURL
  //   )

  //   await waitFor(() => {
  //     expect(screen.queryAllByTestId('tag-testid')).toHaveLength(
  //       skillsPageMock.skills.length
  //     )
  //   })

  //   const tagForRemove = screen.queryByText('javascript')
  //   const deleteSkillButton = tagForRemove?.lastElementChild
  //   deleteSkillButton && userEvent.click(deleteSkillButton)
  //   expect(screen.queryAllByTestId('tag-testid')).toHaveLength(
  //     skillsPageMock.skills.length - 1
  //   )

  //   await waitFor(() => {
  //     expect(screen.queryByText('javascript')).not.toBeInTheDocument()
  //   })

  //   userEvent.type(
  //     screen.getByRole('textbox', { name: /habilidades/i }),
  //     `ci/cd,`
  //   )

  //   await waitFor(() => {
  //     expect(screen.getByRole('form')).toHaveFormValues(newSkillsPageMock)
  //   })

  //   userEvent.click(screen.getByRole('button', { name: /atualizar/i }))

  //   expect(
  //     screen.getByText('Success on update skills page.')
  //   ).toBeInTheDocument()

  //   expect(api.patch).toHaveBeenCalledTimes(1)

  //   await waitFor(() => {
  //     expect(api.patch).toBeCalledWith('/skills', {
  //       data: newSkillsPageMock,
  //       headers: {
  //         Authorization: `bearer ${localStorage.getItem('IKATOO_AuthToken')}`,
  //         ContentType: 'application/json'
  //       }
  //     })
  //   })
  // })

  // test('should clear all text inputs and set focus on first text input', () => {
  //   render(<AdminSkills />)
  // })
})
