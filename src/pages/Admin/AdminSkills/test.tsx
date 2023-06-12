import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import skillsPageMock from 'mocks/skillsPageMock/result.json'
import api from 'src/services/api'
import { describe, expect, test, vi } from 'vitest'
import { AdminSkills } from '.'
import skillsService from 'src/services/skillsService'
import { AlertProvider } from 'src/hooks/useAlert'
import { stringToDateFormat } from 'src/helpers/date'
import Alert from 'src/components/Alert'

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

  test('should change focus on press tab key', () => {
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

    const submitButton = screen.getByRole('button', { name: /salvar/i })
    const clearButton = screen.getByRole('button', {
      name: 'Limpar'
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

  test('should add jobs when click on add job button', async () => {
    skillsService.get = vi.fn().mockResolvedValue({})
    skillsService.create = vi.fn().mockResolvedValue({ data: {}, status: 201 })
    skillsService.patch = vi.fn().mockResolvedValue({ data: {}, status: 204 })

    render(
      <AlertProvider>
        <AdminSkills />
      </AlertProvider>
    )

    const jobTitleInput = screen.getByLabelText('Nome da empresa ou projeto')
    const jobStartInput = screen.getByLabelText('Início')
    const jobEndInput = screen.getByLabelText('Fim')
    const jobLinkInput = screen.getByLabelText('Link para referência')
    const jobDescriptionInput = screen.getByLabelText('Breve Descrição')
    const addJobButton = screen.getByRole('button', {
      name: 'ADICIONAR TRABALHO'
    })
    const saveButton = screen.getByRole('button', { name: /salvar/i })

    skillsPageMock.lastJobs.forEach((job) => {
      userEvent.type(jobTitleInput, job.jobTitle)
      userEvent.type(jobStartInput, stringToDateFormat(job.yearMonthStart))
      job.yearMonthEnd &&
        userEvent.type(jobEndInput, stringToDateFormat(job.yearMonthEnd))
      userEvent.type(jobLinkInput, job.link)
      userEvent.type(jobDescriptionInput, job.jobDescription)
      userEvent.click(addJobButton)
    })

    userEvent.click(saveButton)

    expect(skillsService.create).toHaveBeenCalledWith({
      title: '',
      description: '',
      skills: [],
      lastJobs: skillsPageMock.lastJobs
    })
  })

  test('should call submit with data when save button is clicked', async () => {
    skillsService.get = vi.fn().mockResolvedValue({})
    skillsService.create = vi.fn().mockResolvedValue({ data: {}, status: 201 })
    skillsService.patch = vi.fn().mockResolvedValue({ data: {}, status: 201 })

    render(
      <AlertProvider>
        <AdminSkills />
      </AlertProvider>
    )

    const titleInput = screen.getByLabelText('Título')
    const descriptionInput = screen.getByLabelText('Descrição')
    const skillsInput = screen.getByLabelText('Habilidades')
    const jobTitleInput = screen.getByLabelText('Nome da empresa ou projeto')
    const jobStartInput = screen.getByLabelText('Início')
    const jobEndInput = screen.getByLabelText('Fim')
    const jobLinkInput = screen.getByLabelText('Link para referência')
    const jobDescriptionInput = screen.getByLabelText('Breve Descrição')
    const addJobButton = screen.getByRole('button', {
      name: 'ADICIONAR TRABALHO'
    })

    userEvent.type(titleInput, skillsPageMock.title)
    userEvent.type(descriptionInput, skillsPageMock.description)
    skillsPageMock.skills.forEach((skill) => {
      userEvent.type(skillsInput, `${skill.skillTitle},`)
    })
    skillsPageMock.lastJobs.forEach((job) => {
      userEvent.type(jobTitleInput, job.jobTitle)
      userEvent.type(jobStartInput, stringToDateFormat(job.yearMonthStart))
      job.yearMonthEnd &&
        userEvent.type(jobEndInput, stringToDateFormat(job.yearMonthEnd))
      userEvent.type(jobLinkInput, job.link)
      userEvent.type(jobDescriptionInput, job.jobDescription)
      userEvent.click(addJobButton)
    })

    await waitFor(() => {
      expect(screen.queryAllByTestId('tag-testid')).toHaveLength(
        skillsPageMock.skills.length
      )
    })

    await waitFor(() => {
      expect(screen.queryAllByTestId('job-testid')).toHaveLength(
        skillsPageMock.lastJobs.length
      )
    })

    const saveButton = screen.getByRole('button', { name: 'Salvar' })
    userEvent.click(saveButton)
    expect(skillsService.create).toHaveBeenCalledTimes(1)
    expect(skillsService.create).toHaveBeenCalledWith(skillsPageMock)

    const updateButton = screen.getByRole('button', { name: 'Atualizar' })
    userEvent.click(updateButton)
    expect(skillsService.patch).toHaveBeenCalledTimes(1)
    expect(skillsService.patch).toHaveBeenCalledWith(skillsPageMock)
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
    })
  })

  test('should show update message when submit a new data', async () => {
    skillsService.get = vi.fn().mockResolvedValue({
      data: skillsPageMock,
      status: 200
    })
    skillsService.create = vi.fn().mockResolvedValue({ data: {}, status: 201 })

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

  test('should clear all text inputs, skills tags, jobs cards and set focus in the first text input when click on Clear Button', async () => {
    skillsService.get = vi.fn().mockResolvedValue({
      data: skillsPageMock,
      status: 200
    })

    render(<AdminSkills />)

    const titleInput = screen.getByLabelText('Título')
    const descriptionInput = screen.getByLabelText('Descrição')

    await waitFor(() => {
      const skillTags = screen
        .getAllByTestId('tag-testid')
        .map((tag) => ({ skillTitle: tag.textContent }))
      expect(skillTags).toEqual(skillsPageMock.skills)

      const jobCards = screen.getAllByTestId('job-testid').map((card) => {
        const h2 = card
          .getElementsByTagName('h2')
          .item(0)
          ?.textContent?.split(' | ')
          .filter((value) => value !== 'Hoje')

        return {
          jobTitle: card.getElementsByTagName('h1').item(0)?.textContent,
          jobDescription: card.getElementsByTagName('h2').item(0)?.nextSibling
            ?.textContent,
          yearMonthStart:
            (!!h2 && h2[0]) ??
            card.getElementsByTagName('h2').item(0)?.textContent,
          yearMonthEnd: !!h2 && h2[1],
          link: card.getElementsByTagName('a').item(0)?.getAttribute('href')
        }
      })
      expect(jobCards).toEqual(skillsPageMock.lastJobs)
    })
    expect(titleInput).toHaveValue(skillsPageMock.title)
    expect(descriptionInput).toHaveValue(skillsPageMock.description)

    const clearButton = screen.getByRole('button', { name: 'Limpar' })
    userEvent.click(clearButton)

    const allInputText = screen.getAllByRole('textbox')
    allInputText.forEach((input) => {
      expect(input).toHaveValue('')
    })

    await waitFor(() => {
      const allSkillTags = screen.queryAllByTestId('tag-testid')
      const allJobCards = screen.queryAllByTestId('job-testid')
      expect(allSkillTags).toHaveLength(0)
      expect(allJobCards).toHaveLength(0)
      expect(titleInput).toHaveFocus()
    })
  })
})
