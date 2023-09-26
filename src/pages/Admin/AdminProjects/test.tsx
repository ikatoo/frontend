import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import projectsPageMock from 'shared/mocks/projectsMock/result.json'
import Alert from 'src/components/Alert'
import { stringToDateFormat } from 'src/helpers/date'
import { waitFor } from 'src/helpers/testUtils'
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
      id:
        projectsPageMock.find(
          (value) =>
            value.description.title ===
            card.getElementsByTagName('h1').item(0)?.textContent
        )?.id ?? 0,
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
    const mock = projectsPageMock[0]

    projectsService.get = vi.fn().mockResolvedValue({})
    projectsService.create = vi.fn().mockResolvedValue({ status: 201 })
    imageService.upload = vi.fn().mockImplementation(() => {
      return {
        data: {
          publicId: mockedPublicId,
          url: mockedUrl
        },
        status: 201
      }
    })

    await waitFor(() => {
      render(
        <AlertProvider>
          <Alert />
          <AdminProjects />
        </AlertProvider>
      )
    })

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
    const addProjectButton = screen.getByRole('button', {
      name: /adicionar/i
    })

    userEvent.click(addProjectButton)

    await waitFor(() => {
      expect(screen.getByText('Success on create project.')).toBeInTheDocument()
    })

    const projectElements = screen.getAllByRole('link')

    const projects: typeof projectsPageMock = projectElements.map((card) => ({
      id:
        projectsPageMock.find(
          (value) =>
            value.description.title ===
            card.getElementsByTagName('h1').item(0)?.textContent
        )?.id ?? 0,
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

  test('should clear all text inputs when click on clear button', async () => {
    const mockedPublicId = 'folder/test.png'
    const mockedUrl = `https://cloudservice.com/${mockedPublicId}`
    const mock = projectsPageMock[0]
    projectsService.get = vi.fn().mockResolvedValue({})
    imageService.upload = vi
      .fn()
      .mockImplementation(() => {
        return {
          data: {
            publicId: mockedPublicId,
            url: mockedUrl
          },
          status: 201
        }
      })
      .mockResolvedValue({})

    render(<AdminProjects />)

    const titleInput = screen.getByLabelText('Título')
    const lastUpdateInput = screen.getByLabelText('Última atualização')
    const descriptionInput = screen.getByLabelText('Breve Descrição')
    const dropArea = screen.getByText('Click or Drop & Down a file here')
    const linkInput = screen.getByLabelText('Link para referência')

    const clearButton = screen.getByRole('button', {
      name: 'Limpar Formulário'
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
      expect(screen.getByText('test.png - 0.000MB')).toBeInTheDocument()
    })

    userEvent.type(linkInput, mock.githubLink)
    userEvent.click(clearButton)

    await waitFor(() => {
      expect(titleInput).toHaveValue('')
      expect(titleInput).toHaveFocus()
      expect(lastUpdateInput).toHaveValue('')
      expect(descriptionInput).toHaveValue('')
      expect(
        screen.getByText('Click or Drop & Down a file here')
      ).toBeInTheDocument()
      expect(linkInput).toHaveValue('')
    })
  })

  test('should remove project', async () => {
    const mockToRemove = projectsPageMock[0]

    projectsService.get = vi.fn().mockResolvedValue({
      data: projectsPageMock,
      status: 200
    })
    projectsService.delete = vi.fn().mockResolvedValue({
      status: 204
    })

    render(
      <AlertProvider>
        <Alert />
        <AdminProjects />
      </AlertProvider>
    )

    await waitFor(() => {
      expect(screen.getAllByRole('link')).toHaveLength(projectsPageMock.length)
    })

    const removeButton = screen.getByLabelText(
      `remove project with title ${mockToRemove.description.title}`
    )
    userEvent.click(removeButton)

    await waitFor(() => {
      expect(screen.getByText('Success on remove project.')).toBeInTheDocument()
    })

    const projectElements = screen.getAllByRole('link')
    const otherProject = projectElements.find((projectElement) =>
      projectElement.textContent?.includes(
        projectsPageMock[1].description.title
      )
    )

    expect(
      screen.queryByText(mockToRemove.description.title)
    ).not.toBeInTheDocument()
    expect(projectElements).toHaveLength(1)
    expect(otherProject).toBeInTheDocument()
  })

  test('should edit project', async () => {
    const mockToEdit = projectsPageMock[0]
    const mockedNewLastUpdate = '07/2021'
    const mockedNewGithubLink = 'https://newlink.com/updated'

    projectsService.get = vi.fn().mockResolvedValue({
      data: projectsPageMock,
      status: 200
    })
    projectsService.patch = vi.fn().mockResolvedValue({
      status: 204
    })

    render(
      <AlertProvider>
        <Alert />
        <AdminProjects />
      </AlertProvider>
    )

    await waitFor(() => {
      expect(screen.getAllByRole('link')).toHaveLength(projectsPageMock.length)
    })

    const editButton = screen.getByLabelText(
      `edit project with title ${mockToEdit.description.title}`
    )
    userEvent.click(editButton)

    const titleInput = screen.getByLabelText('Título')
    const lastUpdateInput = screen.getByLabelText('Última atualização')
    const descriptionInput = screen.getByLabelText('Breve Descrição')
    const linkInput = screen.getByLabelText('Link para referência')
    const dropArea = screen.getByText('Click or Drop & Down a file here')
    const snapshotUrl = screen.getByAltText('Snapshot Thumbnail').parentElement
    const updateButton = screen.getByRole('button', {
      name: /atualizar/i
    })
    await waitFor(() => {
      expect(titleInput).toHaveValue(mockToEdit.description.title)
      expect(lastUpdateInput).toHaveValue(
        stringToDateFormat(mockToEdit.description.subTitle.split(': ')[1])
      )
      expect(descriptionInput).toHaveValue(mockToEdit.description.content)
      expect(linkInput).toHaveValue(mockToEdit.githubLink)
      expect(snapshotUrl).toHaveAttribute('href', mockToEdit.snapshot)
    })

    const file: DataTransferItem = {
      kind: 'file',
      type: 'image/png',
      getAsFile: vi
        .fn()
        .mockReturnValue(
          new File(['file'], 'new-image.png', { type: 'image/png' })
        ),
      getAsString: vi.fn(),
      webkitGetAsEntry: vi.fn()
    }

    userEvent.type(titleInput, ' title updated')
    userEvent.type(lastUpdateInput, mockedNewLastUpdate)
    userEvent.type(descriptionInput, ' description updated')
    fireEvent.drop(dropArea, {
      dataTransfer: {
        items: [file]
      }
    })
    userEvent.clear(linkInput)
    userEvent.type(linkInput, mockedNewGithubLink)

    userEvent.click(updateButton)

    await waitFor(() => {
      expect(screen.getByText('Success on update project.')).toBeInTheDocument()
    })

    const projectElements = screen.getAllByRole('link')
    const updatedProjectElement = projectElements.find((card) =>
      card.textContent?.includes(
        `${mockToEdit.description.title} title updated`
      )
    )

    expect(updatedProjectElement).toBeInTheDocument()
    expect(projectElements).toHaveLength(2)
  })
})
