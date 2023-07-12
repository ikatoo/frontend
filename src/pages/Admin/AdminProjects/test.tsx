import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import projectsPageMock from 'shared/mocks/projectsMock/result.json'
import Alert from 'src/components/Alert'
import { stringToDateFormat } from 'src/helpers/date'
import { AlertProvider } from 'src/hooks/useAlert'
import imageService from 'src/services/imageService'
import projectsService from 'src/services/projectsService'
import { describe, expect, test, vi } from 'vitest'
import { AdminProjects } from '.'

vi.mock('src/components/ProgressBar', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock ProgressBar">{children}</div>
  }
}))

describe('ADMIN: projects page', () => {
  afterEach(() => {
    projectsService.get = vi.fn()
  })

  test('should render all fields', async () => {
    projectsService.get = vi.fn().mockResolvedValue({})

    render(<AdminProjects />)

    expect(screen.getByLabelText('Título')).toBeInTheDocument()
    expect(screen.getByLabelText('Última atualização')).toBeInTheDocument()
    expect(screen.getByLabelText('Breve Descrição')).toBeInTheDocument()
    expect(screen.getByLabelText('Link para referência')).toBeInTheDocument()
    const saveButton = screen.getByRole('button', {
      name: /adicionar/i
    })
    const clearButton = screen.getByRole('button', {
      name: /limpar formulário/i
    })
    expect(saveButton).toBeInTheDocument()
    expect(clearButton).toBeInTheDocument()
  })

  test('should load data at render', async () => {
    projectsService.get = vi.fn().mockResolvedValue({
      data: projectsPageMock,
      status: 200
    })

    render(<AdminProjects />)

    await waitFor(() => {
      expect(screen.getAllByRole('link')).toHaveLength(projectsPageMock.length)
    })

    const projectElements = screen.getAllByRole('link')

    const projects: typeof projectsPageMock = projectElements.map((card) => ({
      description: {
        title: card.getElementsByTagName('h1').item(0)?.textContent ?? '',
        subTitle: card.getElementsByTagName('h2').item(0)?.textContent ?? '',
        content:
          card.getElementsByTagName('h2').item(0)?.nextElementSibling
            ?.textContent ?? ''
      },
      githubLink: card.getAttribute('href') ?? '',
      snapshot:
        card.getElementsByTagName('img').item(0)?.getAttribute('src') ?? ''
    }))

    expect(projects).toEqual(projectsPageMock)
  })

  test('should change focus on press tab key', () => {
    projectsService.get = vi.fn().mockResolvedValue({})
    imageService.upload = vi.fn().mockResolvedValue({})

    render(<AdminProjects />)

    const titleInput = screen.getByRole('textbox', { name: 'Título' })
    const lastUpdateInput = screen.getByRole('textbox', {
      name: 'Última atualização'
    })
    const descriptionInput = screen.getByRole('textbox', {
      name: 'Breve Descrição'
    })
    const dropArea = screen.getByText('Click or Drop & Down a file here')
      .parentElement as HTMLElement

    const linkInput = screen.getByRole('textbox', {
      name: 'Link para referência'
    })
    const clearButton = screen.getByRole('button', {
      name: /limpar formulário/i
    })

    expect(titleInput).toHaveFocus()
    userEvent.tab()
    expect(lastUpdateInput).toHaveFocus()
    userEvent.tab()
    expect(descriptionInput).toHaveFocus()
    userEvent.tab()
    expect(dropArea).toHaveFocus()
    userEvent.tab()
    expect(linkInput).toHaveFocus()
    userEvent.tab()
    expect(clearButton).toHaveFocus()
  })

  test('should disable save button when empty fields', () => {
    projectsService.get = vi.fn().mockResolvedValue({})
    render(<AdminProjects />)
    const saveButton = screen.getByRole('button', {
      name: /adicionar/i
    })

    expect(saveButton).toBeDisabled()
  })

  test('should call post method with data when save button is clicked', async () => {
    const mockedPublicId = 'folder/test.png'
    const mockedUrl = `https://cloudservice.com/${mockedPublicId}`
    projectsService.get = vi.fn().mockResolvedValue({})
    projectsService.create = vi
      .fn()
      .mockResolvedValue({ data: {}, status: 201 })
    imageService.upload = vi.fn().mockImplementation(() => {
      return {
        data: {
          publicId: mockedPublicId,
          url: mockedUrl
        },
        status: 201
      }
    })
    const mock = projectsPageMock[0]

    render(
      <AlertProvider>
        <Alert />
        <AdminProjects />
      </AlertProvider>
    )

    const titleInput = screen.getByRole('textbox', { name: 'Título' })
    const lastUpdateInput = screen.getByRole('textbox', {
      name: 'Última atualização'
    })
    const descriptionInput = screen.getByRole('textbox', {
      name: 'Breve Descrição'
    })

    const dropArea = screen.getByText('Click or Drop & Down a file here')
      .parentElement as HTMLElement

    const linkInput = screen.getByRole('textbox', {
      name: 'Link para referência'
    })

    userEvent.type(titleInput, mock.description.title)
    userEvent.type(
      lastUpdateInput,
      stringToDateFormat(mock.description.subTitle.split(': ')[1])
    )
    userEvent.type(descriptionInput, mock.description.content)
    const file: DataTransferItem = {
      kind: 'file',
      type: 'image/png',
      getAsFile: vi
        .fn()
        .mockReturnValue(new File(['file'], 'test.png', { type: 'image/png' })),
      getAsString: vi.fn(),
      webkitGetAsEntry: vi.fn()
    }

    fireEvent.drop(dropArea, {
      dataTransfer: {
        items: [file]
      }
    })

    await waitFor(() => {
      expect(imageService.upload).toHaveBeenCalledTimes(1)
    })

    userEvent.type(linkInput, mock.githubLink)
    const saveButton = screen.getByRole('button', {
      name: /adicionar/i
    })

    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(screen.getByText('Últimos Trabalhos')).toBeInTheDocument()
    })

    const projectElements = screen.getAllByRole('link')

    const projects: typeof projectsPageMock = projectElements.map((card) => ({
      description: {
        title: card.getElementsByTagName('h1').item(0)?.textContent ?? '',
        subTitle: card.getElementsByTagName('h2').item(0)?.textContent ?? '',
        content:
          card.getElementsByTagName('h2').item(0)?.nextElementSibling
            ?.textContent ?? ''
      },
      githubLink: card.getAttribute('href') ?? '',
      snapshot:
        card.getElementsByTagName('img').item(0)?.getAttribute('src') ?? ''
    }))

    expect(projects[0]).toEqual({ ...mock, snapshot: mockedUrl })
  })

  test.todo('should show save message when submit first data', async () => {
    //   api.get = vi.fn().mockResolvedValue({})
    //   await waitFor(() => {
    //     render(
    //       <AlertProvider>
    //         <Alert />
    //         <AdminProjects />
    //       </AlertProvider>
    //     )
    //   })
    //   userEvent.type(
    //     screen.getByRole('textbox', { name: /título/i }),
    //     projectsPageMock.title
    //   )
    //   userEvent.type(
    //     screen.getByRole('textbox', { name: /descrição/i }),
    //     projectsPageMock.description
    //   )
    //   userEvent.type(
    //     screen.getByRole('textbox', { name: /imagem alt/i }),
    //     projectsPageMock.illustrationALT
    //   )
    //   userEvent.type(
    //     screen.getByRole('textbox', { name: /imagem url/i }),
    //     projectsPageMock.illustrationURL
    //   )
    //   projectsPageMock.skills.forEach((skill) => {
    //     userEvent.type(
    //       screen.getByRole('textbox', { name: /habilidades/i }),
    //       `${skill.title},`
    //     )
    //   })
    //   api.post = vi.fn().mockResolvedValue({})
    //   await waitFor(() => {
    //     userEvent.click(screen.getByRole('button', { name: /salvar/i }))
    //     expect(
    //       screen.getByText('Success on create projects page.')
    //     ).toBeInTheDocument()
    //   })
    //   expect(api.post).toBeCalledTimes(1)
    //   expect(api.post).toHaveBeenCalledWith('/projects', projectsPageMock)
  })

  test.todo('should show update message when submit a new data', async () => {
    //   projectsService.get = vi
    //     .fn()
    //     .mockResolvedValue({ data: projectsPageMock, status: 200 })
    //   render(
    //     <AlertProvider>
    //       <Alert />
    //       <AdminProjects />
    //     </AlertProvider>
    //   )
    //   await waitFor(() => {
    //     expect(screen.queryAllByTestId('tag-testid')).toHaveLength(
    //       projectsPageMock.skills.length
    //     )
    //   })
    //   projectsService.patch = vi.fn().mockResolvedValue({ data: {}, status: 204 })
    //   userEvent.click(screen.getByRole('button', { name: /atualizar/i }))
    //   expect(
    //     screen.getByText('Success on update projects page.')
    //   ).toBeInTheDocument()
  })

  test.todo('should call path function with a new data', async () => {
    //   projectsService.get = vi
    //     .fn()
    //     .mockResolvedValue({ data: projectsPageMock, status: 200 })
    //   const newprojectsPageMock = {
    //     title: 'new title',
    //     description: 'new description',
    //     illustrationALT: 'new image alt',
    //     illustrationURL: 'new image url',
    //     skills: [
    //       ...projectsPageMock.skills.filter(
    //         (skill) => skill.title !== 'javascript'
    //       ),
    //       { title: 'ci/cd' }
    //     ]
    //   }
    //   render(
    //     <AlertProvider>
    //       <Alert />
    //       <AdminProjects />
    //     </AlertProvider>
    //   )
    //   await waitFor(() => {
    //     expect(screen.queryAllByTestId('tag-testid')).toHaveLength(
    //       projectsPageMock.skills.length
    //     )
    //   })
    //   const title = screen.getByRole('textbox', { name: /título/i })
    //   userEvent.clear(title)
    //   userEvent.type(title, newprojectsPageMock.title)
    //   const description = screen.getByRole('textbox', { name: /descrição/i })
    //   userEvent.clear(description)
    //   userEvent.type(description, newprojectsPageMock.description)
    //   const imageALT = screen.getByRole('textbox', { name: /imagem alt/i })
    //   userEvent.clear(imageALT)
    //   userEvent.type(imageALT, newprojectsPageMock.illustrationALT)
    //   const imageURL = screen.getByRole('textbox', { name: /imagem url/i })
    //   userEvent.clear(imageURL)
    //   userEvent.type(imageURL, newprojectsPageMock.illustrationURL)
    //   const tagForRemove = screen.queryByText('javascript')
    //   const deleteSkillButton = tagForRemove?.lastElementChild as Element
    //   expect(deleteSkillButton).toHaveAttribute(
    //     'title',
    //     'Remove javascript skill.'
    //   )
    //   userEvent.click(deleteSkillButton)
    //   userEvent.type(
    //     screen.getByRole('textbox', { name: /habilidades/i }),
    //     `ci/cd,`
    //   )
    //   projectsService.patch = vi.fn().mockResolvedValue({ data: {}, status: 204 })
    //   userEvent.click(screen.getByRole('button', { name: /atualizar/i }))
    //   await waitFor(() => {
    //     expect(projectsService.patch).toHaveBeenCalledTimes(1)
    //   })
    //   expect(projectsService.patch).toHaveBeenCalledWith(newprojectsPageMock)
  })

  test.todo('should clear all text inputs', async () => {
    //   projectsService.get = vi
    //     .fn()
    //     .mockResolvedValue({ data: projectsPageMock, status: 200 })
    //   render(<AdminProjects />)
    //   await waitFor(() => {
    //     expect(screen.queryAllByTestId('tag-testid')).toHaveLength(
    //       projectsPageMock.skills.length
    //     )
    //   })
    //   const clearButton = screen.getByRole('button', {
    //     name: 'Limpar Formulário'
    //   })
    //   userEvent.click(clearButton)
    //   await waitFor(() => {
    //     expect(screen.getByLabelText('Título')).toHaveValue('')
    //     expect(screen.getByLabelText('Descrição')).toHaveValue('')
    //     expect(screen.getByLabelText('Habilidades')).toHaveValue('')
    //     expect(screen.getByLabelText('Imagem URL')).toHaveValue('')
    //     expect(screen.getByLabelText('Imagem ALT')).toHaveValue('')
    //   })
  })

  test.todo(
    'should set focus on first text input after click on clear button',
    async () => {
      //   projectsService.get = vi
      //     .fn()
      //     .mockResolvedValue({ data: projectsPageMock, status: 200 })
      //   render(<AdminProjects />)
      //   await waitFor(() => {
      //     expect(screen.queryAllByTestId('tag-testid')).toHaveLength(
      //       projectsPageMock.skills.length
      //     )
      //   })
      //   const clearButton = screen.getByRole('button', {
      //     name: 'Limpar Formulário'
      //   })
      //   userEvent.click(clearButton)
      //   await waitFor(() => {
      //     expect(screen.getByLabelText('Título')).toHaveFocus()
      //   })
    }
  )
})
