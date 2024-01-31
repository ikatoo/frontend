/* eslint-disable @typescript-eslint/no-empty-function */
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import projectsPageMock from 'shared/mocks/projectsMock/result.json'
import Alert from 'src/components/Alert'
import { UserContext } from 'src/contexts/User/UserContext'
import { serverUse, waitFor } from 'src/helpers/testUtils'
import { AlertProvider } from 'src/hooks/useAlert'
import { describe, expect, test, vi } from 'vitest'
import { AdminProjects } from '.'

vi.mock('src/components/ProgressBar', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock ProgressBar">{children}</div>
  }
}))

describe('ADMIN: projects page', () => {
  const server = setupServer()

  afterEach(() => {
    vi.clearAllMocks()
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  test('should render all fields', async () => {
    serverUse(server, [
      http.get('*projects/user-id/*', () => {
        return HttpResponse.json([])
      })
    ])

    render(<AdminProjects />)

    expect(screen.getByLabelText('Título')).toBeInTheDocument()
    expect(
      screen.getByText('Click or Drop & Down a file here')
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Github')).toBeInTheDocument()
    expect(screen.getByLabelText('Repositório')).toBeInTheDocument()
    expect(screen.getByLabelText('Projeto')).toBeInTheDocument()
    expect(screen.getByLabelText('Início')).toBeInTheDocument()
    expect(screen.getByLabelText('Última atualização')).toBeInTheDocument()
    expect(screen.getByLabelText('Breve Descrição')).toBeInTheDocument()
    expect(
      screen.getByLabelText('Habilidades desenvolvidas')
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /adicionar/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /limpar formulário/i
      })
    ).toBeInTheDocument()
  })

  test('should load data at render', async () => {
    serverUse(server, [
      http.get('*projects/user-id/*', () => {
        return HttpResponse.json(
          projectsPageMock.map(({ start, lastUpdate, ...project }) => ({
            ...project,
            start: new Date(start),
            lastUpdate: new Date(lastUpdate)
          }))
        )
      })
    ])

    render(
      <UserContext.Provider
        value={{
          user: { id: 1 },
          avatar: {
            url: '',
            alt: ''
          },
          setUser: () => {},
          signOut: () => {},
          signIn: () => {}
        }}
      >
        <AdminProjects />
      </UserContext.Provider>
    )

    const projectElements = await screen.findAllByRole('link')

    expect(projectElements).toHaveLength(projectsPageMock.length)
    expect(projectElements[0]).toHaveTextContent(projectsPageMock[0].title)
    expect(projectElements[projectsPageMock.length - 1]).toHaveTextContent(
      projectsPageMock[projectsPageMock.length - 1].title
    )
  })

  test('should change focus on press tab key', () => {
    serverUse(server, [
      http.get('*projects/user-id/*', () => {
        return HttpResponse.json(
          projectsPageMock.map(({ start, lastUpdate, ...project }) => ({
            ...project,
            start: new Date(start),
            lastUpdate: new Date(lastUpdate)
          }))
        )
      })
    ])

    render(<AdminProjects />)

    expect(screen.getByRole('textbox', { name: 'Título' })).toHaveFocus()
    userEvent.tab()

    expect(
      screen.getByText('Click or Drop & Down a file here').parentElement
    ).toHaveFocus()
    userEvent.tab()

    expect(screen.getByRole('textbox', { name: 'Repositório' })).toHaveFocus()
    userEvent.tab()

    expect(screen.getByRole('textbox', { name: 'Projeto' })).toHaveFocus()
    userEvent.tab()

    expect(screen.getByRole('textbox', { name: 'Início' })).toHaveFocus()
    userEvent.tab()

    expect(
      screen.getByRole('textbox', { name: 'Última atualização' })
    ).toHaveFocus()
    userEvent.tab()

    expect(
      screen.getByRole('textbox', { name: 'Breve Descrição' })
    ).toHaveFocus()
    userEvent.tab()

    expect(
      screen.getByRole('textbox', { name: 'Habilidades desenvolvidas' })
    ).toHaveFocus()
    userEvent.tab()

    expect(
      screen.getByRole('button', { name: /LIMPAR FORMULÁRIO/i })
    ).toHaveFocus()
  })

  test('should disable save button when empty fields', () => {
    serverUse(server, [
      http.get('*projects/user-id/*', () => {
        return HttpResponse.json([])
      })
    ])

    render(<AdminProjects />)

    const saveButton = screen.getByRole('button', {
      name: /adicionar/i
    })

    expect(saveButton).toBeDisabled()
  })

  test('should call post method with data when save button is clicked', async () => {
    const mock = projectsPageMock[0]
    const githubRepository = mock.repositoryLink
      .replace('https://github.com/', '')
      .split('/')[0]
    const githubProject = mock.repositoryLink
      .replace('https://github.com/', '')
      .split('/')[1]

    serverUse(server, [
      http.get('*projects/user-id/*', () => {
        return HttpResponse.json([])
      }),
      http.post('*image*', () => {
        return HttpResponse.json({ url: mock.snapshot }, { status: 201 })
      }),
      http.get('https://api.github.com/repos/*', () => {
        return HttpResponse.json({
          created_at: mock.start,
          pushed_at: mock.lastUpdate
        })
      }),
      http.post('*project*', () => {
        return HttpResponse.json({ id: 2020 }, { status: 201 })
      })
    ])

    render(
      <AlertProvider>
        <Alert />
        <UserContext.Provider
          value={{
            user: { id: 1 },
            avatar: {
              url: '',
              alt: ''
            },
            setUser: () => {},
            signOut: () => {},
            signIn: () => {}
          }}
        >
          <AdminProjects />
        </UserContext.Provider>
      </AlertProvider>
    )

    const dropArea = screen.getByText('Click or Drop & Down a file here')
      .parentElement as HTMLElement

    userEvent.type(screen.getByRole('textbox', { name: 'Título' }), mock.title)
    userEvent.type(
      screen.getByRole('textbox', { name: 'Repositório' }),
      githubRepository
    )
    userEvent.type(
      screen.getByRole('textbox', { name: 'Projeto' }),
      githubProject
    )
    const startField = screen.getByRole('textbox', {
      name: 'Início'
    })
    if (!startField.textContent?.length) {
      userEvent.type(
        startField,
        new Date(mock.start).toLocaleDateString('pt-BR', {
          dateStyle: 'short'
        })
      )
    }
    const lastUpdateField = screen.getByRole('textbox', {
      name: 'Última atualização'
    })
    if (!lastUpdateField.textContent?.length) {
      userEvent.type(
        lastUpdateField,
        new Date(mock.lastUpdate).toLocaleDateString('pt-BR', {
          dateStyle: 'short'
        })
      )
    }
    userEvent.type(
      screen.getByRole('textbox', {
        name: 'Breve Descrição'
      }),
      mock.description
    )
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

    const addProjectButton = screen.getByRole('button', {
      name: /adicionar/i
    })

    await waitFor(() => {
      expect(addProjectButton).toBeEnabled()
    })

    userEvent.click(addProjectButton)

    const success = await screen.findByText('Success on create project.')

    expect(success).toBeInTheDocument()

    const projectElements = await screen.findAllByRole('link')
    const projects: typeof projectsPageMock = projectElements.map((card) => {
      const [start, lastUpdate] = `${
        card.getElementsByTagName('h2').item(0)?.textContent
      }`.split(' - ')

      return {
        id:
          projectsPageMock.find(
            (value) =>
              value.title ===
              card.getElementsByTagName('h1').item(0)?.textContent
          )?.id ?? 0,
        title: card.getElementsByTagName('h1').item(0)?.textContent ?? '',
        description: `${
          card.getElementsByTagName('h2').item(0)?.nextElementSibling
            ?.textContent
        }`,
        start,
        lastUpdate,
        repositoryLink: card.getAttribute('href') ?? '',
        snapshot:
          card.getElementsByTagName('img').item(0)?.getAttribute('src') ?? '',
        userId: mock.userId,
        skills: mock.skills
      }
    })

    expect(projects[0]).toEqual({
      ...mock,
      lastUpdate: new Date(mock.lastUpdate).toLocaleString('pt-BR', {
        month: '2-digit',
        year: 'numeric'
      }),
      start: new Date(mock.start).toLocaleString('pt-BR', {
        month: '2-digit',
        year: 'numeric'
      })
    })
  })

  test('should clear all text inputs when click on clear button', async () => {
    const mock = projectsPageMock[0]
    const githubRepository = mock.repositoryLink
      .replace('https://github.com/', '')
      .split('/')[0]
    const githubProject = mock.repositoryLink
      .replace('https://github.com/', '')
      .split('/')[1]

    server.use(
      http.get('*projects/user-id/*', () => {
        return HttpResponse.json([])
      }),
      http.get('https://api.github.com/repos/*', () => {
        return HttpResponse.json({
          created_at: mock.start,
          pushed_at: mock.lastUpdate
        })
      }),
      http.post('*/image*', () => {
        return HttpResponse.json(
          { data: { url: mock.snapshot } },
          { status: 201 }
        )
      })
    )
    server.listen({ onUnhandledRequest: 'error' })

    render(
      <UserContext.Provider
        value={{
          user: { id: 1 },
          avatar: {
            url: '',
            alt: ''
          },
          setUser: () => {},
          signOut: () => {},
          signIn: () => {}
        }}
      >
        <AdminProjects />
      </UserContext.Provider>
    )

    const titleInput = screen.getByLabelText('Título')
    const lastUpdateInput = screen.getByLabelText('Última atualização')
    const startInput = screen.getByLabelText('Início')
    const repoInput = screen.getByLabelText('Repositório')
    const projectInput = screen.getByLabelText('Projeto')
    const descriptionInput = screen.getByLabelText('Breve Descrição')
    const dropArea = screen.getByText('Click or Drop & Down a file here')

    const clearButton = screen.getByRole('button', {
      name: 'Limpar Formulário'
    })

    userEvent.type(titleInput, mock.title)
    userEvent.type(repoInput, githubRepository)
    userEvent.type(projectInput, githubProject)
    userEvent.type(
      startInput,
      new Date(mock.start).toLocaleDateString('pt-BR', {
        dateStyle: 'short'
      })
    )
    userEvent.type(
      lastUpdateInput,
      new Date(mock.lastUpdate).toLocaleDateString('pt-BR', {
        dateStyle: 'short'
      })
    )
    userEvent.type(descriptionInput, mock.description)
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

    userEvent.click(clearButton)

    await waitFor(() => {
      expect(titleInput).toHaveValue('')
      expect(titleInput).toHaveFocus()
      expect(lastUpdateInput).toHaveValue('')
      expect(descriptionInput).toHaveValue('')
    })
  })

  test('should remove project', async () => {
    const mockToRemove = projectsPageMock[1]

    serverUse(server, [
      http.get('*projects/user-id/*', () => {
        return HttpResponse.json(
          projectsPageMock.map(({ start, lastUpdate, ...project }) => ({
            ...project,
            start: new Date(start),
            lastUpdate: new Date(lastUpdate)
          }))
        )
      }),
      http.delete('*project/*', () => {
        return new HttpResponse(null, { status: 204 })
      })
    ])

    render(
      <AlertProvider>
        <Alert />
        <UserContext.Provider
          value={{
            user: { id: 1 },
            avatar: {
              url: '',
              alt: ''
            },
            setUser: () => {},
            signOut: () => {},
            signIn: () => {}
          }}
        >
          <AdminProjects />
        </UserContext.Provider>
      </AlertProvider>
    )

    await screen.findByText('Últimos Trabalhos')

    const removeButton = screen.getByLabelText(
      `remove project with title ${mockToRemove.title}`
    )
    userEvent.click(removeButton)

    const success = await screen.findByText('Success on remove project.')

    expect(success).toBeInTheDocument()

    const projectElements = screen.getAllByRole('link')
    const otherProject = projectElements.find(
      (projectElement) =>
        !projectElement.textContent?.includes(mockToRemove.title)
    )

    expect(screen.queryByText(mockToRemove.title)).not.toBeInTheDocument()
    expect(projectElements).toHaveLength(1)
    expect(otherProject).toBeInTheDocument()
  })

  test('should edit project', async () => {
    const mockToEdit = projectsPageMock[0]
    const mockedNewLastUpdate = '03/07/2021'

    serverUse(server, [
      http.get('*projects/user-id/*', () => {
        return HttpResponse.json(
          projectsPageMock.map(({ start, lastUpdate, ...project }) => ({
            ...project,
            start: new Date(start),
            lastUpdate: new Date(lastUpdate)
          }))
        )
      }),
      http.patch('*project/*', () => {
        return new HttpResponse(null, { status: 204 })
      }),
      http.post('*image*', () => {
        return HttpResponse.json(
          { url: 'https://newurl.com/image.jpg' },
          { status: 201 }
        )
      })
    ])

    render(
      <AlertProvider>
        <Alert />
        <UserContext.Provider
          value={{
            user: { id: 1 },
            avatar: {
              url: '',
              alt: ''
            },
            setUser: () => {},
            signOut: () => {},
            signIn: () => {}
          }}
        >
          <AdminProjects />
        </UserContext.Provider>
      </AlertProvider>
    )

    const editButton = await screen.findByLabelText(
      `edit project with title ${mockToEdit.title}`
    )
    userEvent.click(editButton)

    const titleInput = screen.getByLabelText('Título')
    const descriptionInput = screen.getByLabelText('Breve Descrição')
    const lastUpdateInput = screen.getByLabelText('Última atualização')
    const startInput = screen.getByLabelText('Início')
    const repoInput = screen.getByLabelText('Repositório')
    const projectInput = screen.getByLabelText('Projeto')
    const dropArea = screen.getByText('Click or Drop & Down a file here')
    const updateButton = screen.getByRole('button', {
      name: /atualizar/i
    })

    await waitFor(() => {
      expect(titleInput).toHaveValue(mockToEdit.title)
      expect(screen.getByAltText('Snapshot Thumbnail')).toHaveAttribute(
        'src',
        mockToEdit.snapshot
      )
      expect(repoInput).toHaveValue(
        mockToEdit.repositoryLink
          .replace('https://github.com/', '')
          .split('/')[0]
      )
      expect(projectInput).toHaveValue(
        mockToEdit.repositoryLink
          .replace('https://github.com/', '')
          .split('/')[1]
      )
      expect(startInput).toHaveValue(
        new Date(mockToEdit.start).toLocaleDateString('pt-BR', {
          dateStyle: 'short'
        })
      )
      expect(lastUpdateInput).toHaveValue(
        new Date(mockToEdit.lastUpdate).toLocaleDateString('pt-BR', {
          dateStyle: 'short'
        })
      )
      expect(descriptionInput).toHaveValue(mockToEdit.description)
      expect(screen.getAllByTestId('tag-testid')).toHaveLength(
        mockToEdit.skills.length
      )
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

    userEvent.click(updateButton)

    const successMessage = await screen.findByText('Success on update project.')

    expect(successMessage).toBeInTheDocument()
    expect(screen.queryByText(mockToEdit.title)).not.toBeInTheDocument()
    expect(
      screen.getByText(`${mockToEdit.title} title updated`)
    ).toBeInTheDocument()
  })
})
