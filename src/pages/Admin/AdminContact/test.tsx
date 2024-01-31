/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, test, vi } from 'vitest'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import mock from 'shared/mocks/contactPageMock/result.json'
import Alert from 'src/components/Alert'
import { UserContext } from 'src/contexts/User/UserContext'
import { serverUse, waitFor } from 'src/helpers/testUtils'
import { AlertProvider } from 'src/hooks/useAlert'
import { AdminContact } from '.'

describe('ADMIN: contact page', () => {
  const server = setupServer()

  afterEach(() => {
    vi.clearAllMocks()
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  test('should render all elements', async () => {
    serverUse(server, [
      http.get('*/contact-page/user-id/*', () => {
        return HttpResponse.json({})
      })
    ])

    render(
      <AlertProvider>
        <Alert />
        <AdminContact />
      </AlertProvider>
    )
    await waitFor(() => {
      screen.getByText('Geolocalização não suportada.')
    })

    const title = screen.getByLabelText('Título')
    const description = screen.getByLabelText('Breve Descrição')
    const email = screen.getByLabelText('Email')
    const localization = screen.getByText('Localização').parentElement
    const saveButton = screen.getByRole('button', { name: 'Salvar' })

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(localization).toBeInTheDocument()
    expect(saveButton).toBeDisabled()
  })

  test('should load data at render', async () => {
    serverUse(server, [
      http.get('*/contact-page/user-id/*', () => {
        return HttpResponse.json(mock)
      })
    ])

    render(
      <AlertProvider>
        <Alert />
        <AdminContact />
      </AlertProvider>
    )

    const title = screen.getByLabelText('Título')
    const description = screen.getByLabelText('Breve Descrição')
    const email = screen.getByLabelText('Email')
    const localization = screen.getByText('Localização').parentElement

    await waitFor(() => {
      expect(title).toHaveValue(mock.title)
      expect(description).toHaveValue(mock.description)
      expect(email).toHaveValue(mock.email)
      expect(localization).toHaveTextContent(mock.localization.lat.toString())
      expect(localization).toHaveTextContent(mock.localization.lng.toString())
      expect(screen.getByRole('button', { name: 'Atualizar' })).toBeEnabled()
    })
  })

  test('should change focus on press tab key', async () => {
    serverUse(server, [
      http.get('*/contact-page/user-id/*', () => {
        return HttpResponse.json({})
      })
    ])

    render(
      <AlertProvider>
        <Alert />
        <AdminContact />
      </AlertProvider>
    )
    await waitFor(() => {
      screen.getByText('Geolocalização não suportada.')
    })

    const title = screen.getByLabelText('Título')
    const description = screen.getByLabelText('Breve Descrição')
    const email = screen.getByLabelText('Email')
    const localization = screen.getByText('Localização').nextElementSibling
    const clearButton = screen.getByRole('button', {
      name: 'Limpar Formulário'
    })

    expect(title).toHaveFocus()

    userEvent.tab()
    await waitFor(() => {
      expect(description).toHaveFocus()
    })

    userEvent.tab()
    await waitFor(() => {
      expect(email).toHaveFocus()
    })

    userEvent.tab()
    await waitFor(() => {
      expect(localization).toHaveFocus()
    })

    userEvent.tab()
    await waitFor(() => {
      expect(clearButton).toHaveFocus()
    })
  })

  test('should save data when save button is clicked', async () => {
    serverUse(server, [
      http.get('*/contact-page/user-id/*', () => {
        return HttpResponse.json({})
      }),
      http.post('*/contact-page', () => {
        return new HttpResponse(null, { status: 201 })
      })
    ])

    Object.assign(navigator, {
      geolocation: {
        getCurrentPosition: vi.fn().mockImplementation((...args: any[]) => {
          const position = {
            coords: {
              latitude: mock.localization.lat,
              longitude: mock.localization.lng
            }
          }
          args[0](position)
        })
      }
    })

    render(
      <UserContext.Provider
        value={{
          user: { id: 1 },
          avatar: {
            alt: '',
            url: ''
          },
          setUser: vi.fn(),
          signIn: vi.fn(),
          signOut: vi.fn()
        }}
      >
        <AlertProvider>
          <Alert />
          <AdminContact />
        </AlertProvider>
      </UserContext.Provider>
    )

    const title = screen.getByLabelText('Título')
    const description = screen.getByLabelText('Breve Descrição')
    const email = screen.getByLabelText('Email')
    const localization = screen.getByText('Localização')
      .parentElement as Element
    const saveButton = screen.getByRole('button', { name: 'Salvar' })

    userEvent.type(title, mock.title)
    userEvent.type(description, mock.description)
    userEvent.type(email, mock.email)

    await waitFor(() => {
      expect(localization).toHaveTextContent(mock.localization.lat.toString())
      expect(localization).toHaveTextContent(mock.localization.lng.toString())
    })

    userEvent.click(saveButton)

    await waitFor(() => {
      expect(screen.getByText('Success on create contact.')).toBeInTheDocument()
    })
  })

  test('should update data when update button is clicked', async () => {
    serverUse(server, [
      http.get('*/contact-page/user-id/*', () => {
        return HttpResponse.json(mock)
      }),
      http.patch('*/contact-page', () => {
        return new HttpResponse(null, { status: 204 })
      })
    ])

    Object.assign(navigator, {
      geolocation: {
        getCurrentPosition: vi.fn().mockImplementation((...args: any[]) => {
          const position = {
            coords: {
              latitude: mock.localization.lat,
              longitude: mock.localization.lng
            }
          }
          args[0](position)
        })
      }
    })

    render(
      <UserContext.Provider
        value={{
          user: { id: 1 },
          avatar: {
            alt: '',
            url: ''
          },
          setUser: vi.fn(),
          signIn: vi.fn(),
          signOut: vi.fn()
        }}
      >
        <AlertProvider>
          <Alert />
          <AdminContact />
        </AlertProvider>
      </UserContext.Provider>
    )

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Atualizar' })
      ).toBeInTheDocument()
    })

    const updateButton = screen.getByRole('button', { name: 'Atualizar' })

    userEvent.click(updateButton)

    await waitFor(() => {
      expect(screen.getByText('Success on update contact.')).toBeInTheDocument()
    })
  })

  test('should clear all text inputs when click on clear button', async () => {
    serverUse(server, [
      http.get('*/contact-page/user-id/*', () => {
        return HttpResponse.json(mock)
      })
    ])
    const mockedCoords = {
      latitude: -22.41778641933523,
      longitude: -46.83248345696965
    }
    Object.assign(navigator, {
      geolocation: {
        getCurrentPosition: vi.fn().mockImplementation((...args: any[]) => {
          const position = {
            coords: mockedCoords
          }
          args[0](position)
        })
      }
    })

    render(
      <UserContext.Provider
        value={{
          user: { id: 1 },
          avatar: {
            alt: '',
            url: ''
          },
          setUser: vi.fn(),
          signIn: vi.fn(),
          signOut: vi.fn()
        }}
      >
        <AlertProvider>
          <Alert />
          <AdminContact />
        </AlertProvider>
      </UserContext.Provider>
    )

    const title = screen.getByLabelText('Título')
    const description = screen.getByLabelText('Breve Descrição')
    const email = screen.getByLabelText('Email')
    const localization = screen.getByText('Localização').parentElement
    const clearButton = screen.getByRole('button', {
      name: 'Limpar Formulário'
    })

    await waitFor(() => {
      expect(title).toHaveValue(mock.title)
      expect(description).toHaveValue(mock.description)
      expect(email).toHaveValue(mock.email)
      expect(localization).toHaveTextContent(mock.localization.lat.toString())
      expect(localization).toHaveTextContent(mock.localization.lng.toString())
      expect(screen.getByRole('button', { name: 'Atualizar' })).toBeEnabled()
    })

    userEvent.click(clearButton)

    await waitFor(() => {
      expect(title).toHaveValue('')
      expect(description).toHaveValue('')
      expect(email).toHaveValue('')
      expect(localization).toHaveTextContent(mockedCoords.latitude.toString())
      expect(localization).toHaveTextContent(mockedCoords.longitude.toString())
      expect(title).toHaveFocus()
    })
  })
})
