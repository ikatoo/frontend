import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import skillsPageMock from 'src/mocks/skillsPageMock'
import api from 'src/services/api'
import { describe, expect, test, vi } from 'vitest'
import { AdminSkills } from '.'
import skillsService from 'src/services/skillsService'

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

  test('should render all fields', () => {
    api.get = vi.fn().mockResolvedValue({})

    render(<AdminSkills />)

    const title = screen.getByLabelText('Título')
    const description = screen.getByLabelText('Descrição')
    const skills = screen.getByLabelText('Habilidades')
    const jobsFieldset = screen.getByRole('group')
    const jobTitle = screen.getByLabelText('Nome da empresa ou projeto')
    const jobStart = screen.getByLabelText('Início')
    const jobEnd = screen.getByLabelText('Fim')
    const jobLink = screen.getByLabelText('Link para referência')
    const jobDescription = screen.getByLabelText('Breve Descrição')
    const addJob = screen.getByRole('button', {
      name: /adicionar trabalho/i
    })

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(skills).toBeInTheDocument()
    expect(jobsFieldset).toContain(/últimos trabalhos/i)
    expect(jobTitle).toBeInTheDocument()
    expect(jobStart).toBeInTheDocument()
    expect(jobEnd).toBeInTheDocument()
    expect(jobLink).toBeInTheDocument()
    expect(jobDescription).toBeInTheDocument()
    expect(addJob).toHaveAttribute('disabled')
  })

  test('should load data at render', async () => {
    api.get = vi.fn().mockResolvedValue({
      data: skillsPageMock
    })

    render(<AdminSkills />)

    const { title, skills, description, lastJobs } = skillsPageMock

    const form = screen.getByRole('form')

    await waitFor(() => {
      expect(form).toHaveFormValues({ title, description })
    })

    expect(
      screen
        .getAllByTestId('tag-testid')
        .map((skill) => ({ skillTitle: skill.textContent }))
    ).toEqual(skills)

    const jobsElements = screen.getAllByTestId('job-testid')
    const jobs = jobsElements.map((job) => {
      const jobTitle = job.getElementsByTagName('h1').item(0)?.textContent
      const jobDescription = job
        .getElementsByClassName('overflow-clip text-xs font-medium')
        .item(0)?.textContent
      const h2 = job.getElementsByTagName('h2').item(0)?.textContent
      const yearMonthStart = h2?.split(' | ')[0]
      const yearMonthEnd =
        h2?.split(' | ')[1] === 'Hoje' ? undefined : h2?.split(' | ')[1]
      const link = job.getElementsByTagName('a').item(0)?.getAttribute('href')

      return { jobTitle, jobDescription, yearMonthStart, yearMonthEnd, link }
    })
    expect(jobs).toEqual(lastJobs)
  })

  test.skip('should change focus on press tab key', () => {
    api.get = vi.fn().mockResolvedValue({})

    render(<AdminSkills />)

    const title = screen.getByLabelText('Título')
    const description = screen.getByLabelText('Descrição')
    const skills = screen.getByLabelText('Habilidades')
    const jobTitle = screen.getByLabelText('Nome da empresa ou projeto')
    const jobStart = screen.getByLabelText('Início')
    const jobEnd = screen.getByLabelText('Fim')
    const jobLink = screen.getByLabelText('Link para referência')
    const jobDescription = screen.getByLabelText('Breve Descrição')
    const addJob = screen.getByRole('button', {
      name: /adicionar trabalho/i
    })

    const submitButton = screen.getByRole('button', { name: /salvar/i })
    const clearButton = screen.getByRole('button', {
      name: /limpar formulário/i
    })

    expect(title).toHaveFocus()
    userEvent.tab()
    expect(description).toHaveFocus()
    userEvent.tab()
    expect(skills).toHaveFocus()
    userEvent.tab()
    expect(jobTitle).toHaveFocus()
    userEvent.tab()
    expect(jobStart).toHaveFocus()
    userEvent.tab()
    expect(jobEnd).toHaveFocus()
    userEvent.tab()
    expect(jobLink).toHaveFocus()
    userEvent.tab()
    expect(jobDescription).toHaveFocus()
    userEvent.tab()
    expect(addJob).toHaveFocus()
    userEvent.tab()
    expect(submitButton).toHaveFocus()
    userEvent.tab()
    expect(clearButton).toHaveFocus()
  })

  test('should clear fields of the last jobs group on add jobs', async () => {
    skillsService.get = vi.fn().mockResolvedValue({})

    render(<AdminSkills />)

    const jobTitleInput = screen.getByLabelText('Nome da empresa ou projeto')
    const jobStartInput = screen.getByLabelText('Início')
    const jobEndInput = screen.getByLabelText('Fim')
    const jobLinkInput = screen.getByLabelText('Link para referência')
    const jobDescriptionInput = screen.getByLabelText('Breve Descrição')
    const addJobButton = screen.getByRole('button', {
      name: 'ADICIONAR TRABALHO'
    })

    const job = skillsPageMock.lastJobs[1]

    const jobStartArray = job.yearMonthStart.split(' - ')
    const jobEndArray = job.yearMonthEnd?.split(' - ')

    userEvent.type(jobTitleInput, job.jobTitle)
    userEvent.type(
      jobStartInput,
      jobStartArray.reverse().toString().replaceAll(',', '/')
    )
    jobEndArray &&
      userEvent.type(
        jobEndInput,
        jobEndArray.reverse().toString().replaceAll(',', '/')
      )
    userEvent.type(jobLinkInput, job.link)
    userEvent.type(jobDescriptionInput, job.jobDescription)
    userEvent.click(addJobButton)

    expect(jobTitleInput).toHaveValue('')
    expect(jobStartInput).toHaveValue('')
    expect(jobEndInput).toHaveValue('')
    expect(jobLinkInput).toHaveValue('')
    expect(jobDescriptionInput).toHaveValue('')
  })

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
