/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import aboutPageMock from 'shared/mocks/aboutPageMock/result.json'
import Alert from 'src/components/Alert'
import { serverUse, waitFor } from 'src/helpers/testUtils'
import { AlertProvider } from 'src/hooks/useAlert'
import { describe, expect, test, vi } from 'vitest'
import { AdminAbout } from '.'

const server = setupServer()

describe('ADMIN: About page', () => {
  afterEach(() => {
    vi.clearAllMocks()
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  test('should render all fields', () => {
    serverUse(server, [
      http.get('*/about-page/user-id/*', () => {
        return HttpResponse.json({})
      })
    ])

    render(<AdminAbout />)

    expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Imagem' })).toBeInTheDocument()
    expect(screen.getByLabelText(/url/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/alt/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Atualizar' })
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Limpar Formulário' })
    ).toBeInTheDocument()
  })

  test('should load data at render', async () => {
    serverUse(server, [
      http.get('*/about-page/user-id/*', () => {
        return HttpResponse.json(aboutPageMock)
      })
    ])

    render(<AdminAbout />)

    await waitFor(() => {
      expect(screen.getByLabelText(/título/i)).toHaveValue(aboutPageMock.title)
      expect(screen.getByLabelText(/Descrição/i)).toHaveValue(
        aboutPageMock.description
      )
      expect(screen.getByLabelText(/alt/i)).toHaveValue(aboutPageMock.image.alt)
      expect(screen.getByLabelText(/url/i)).toHaveValue(aboutPageMock.image.url)
    })
    expect(
      screen.getByRole('button', { name: /atualizar/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /limpar formulário/i })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /salvar/i })
    ).not.toBeInTheDocument()
  })

  test('should change focus on press tab key', () => {
    serverUse(server, [
      http.get('*/about-page/user-id/*', () => {
        return HttpResponse.json({})
      })
    ])

    render(<AdminAbout />)

    expect(screen.getByRole('textbox', { name: /título/i })).toHaveFocus()
    userEvent.tab()
    expect(screen.getByRole('textbox', { name: /Descrição/i })).toHaveFocus()
    userEvent.tab()
    expect(screen.getByRole('textbox', { name: /url/i })).toHaveFocus()
    userEvent.tab()
    expect(screen.getByRole('textbox', { name: /alt/i })).toHaveFocus()
    userEvent.tab()
    expect(screen.getByRole('button', { name: /salvar/i })).toHaveFocus()
    userEvent.tab()
    expect(
      screen.getByRole('button', {
        name: /limpar formulário/i
      })
    ).toHaveFocus()
  })

  test('should show success message when save data', async () => {
    serverUse(server, [
      http.get('*/about-page/user-id/*', () => {
        return HttpResponse.json({})
      }),
      http.post('*/about-page', () => {
        return new HttpResponse(null, { status: 201 })
      })
    ])

    render(
      <AlertProvider>
        <Alert />
        <AdminAbout />
      </AlertProvider>
    )

    const submitButton = screen.getByRole('button', { name: /salvar/i })

    userEvent.type(screen.getByLabelText(/título/i), aboutPageMock.title)
    userEvent.type(
      screen.getByLabelText(/Descrição/i),
      aboutPageMock.description
    )
    userEvent.type(screen.getByLabelText(/url/i), aboutPageMock.image.url)
    userEvent.type(screen.getByLabelText(/alt/i), aboutPageMock.image.alt)

    userEvent.click(submitButton)

    const successMessage = await screen.findByText(
      /Success on create about page./i
    )

    expect(successMessage).toBeInTheDocument()
  })

  test('should show update message when submit a new data', async () => {
    serverUse(server, [
      http.get('*/about-page/user-id/*', () => {
        return HttpResponse.json(aboutPageMock)
      }),
      http.patch('*/about-page', () => {
        return new HttpResponse(null, { status: 204 })
      })
    ])

    render(
      <AlertProvider>
        <Alert />
        <AdminAbout />
      </AlertProvider>
    )

    await waitFor(() => {
      expect(screen.getByLabelText(/título/i)).toHaveValue(aboutPageMock.title)
      expect(screen.getByLabelText(/Descrição/i)).toHaveValue(
        aboutPageMock.description
      )
      expect(screen.getByLabelText(/alt/i)).toHaveValue(aboutPageMock.image.alt)
      expect(screen.getByLabelText(/url/i)).toHaveValue(aboutPageMock.image.url)
    })

    const updateButton = screen.getByRole('button', {
      name: /atualizar/i
    })
    userEvent.click(updateButton)

    const successMessage = await screen.findByText(
      'Success on update about page.'
    )
    expect(successMessage).toBeInTheDocument()
  })

  test('should clear all text inputs', async () => {
    serverUse(server, [
      http.get('*/about-page/user-id/*', () => {
        return HttpResponse.json(aboutPageMock)
      })
    ])

    render(<AdminAbout />)

    const title = screen.getByLabelText(/Título/i)
    const description = screen.getByLabelText(/Descrição/i)
    const url = screen.getByLabelText(/url/i)
    const alt = screen.getByLabelText(/alt/i)

    await waitFor(() => {
      expect(title).toHaveValue(aboutPageMock.title)
      expect(description).toHaveValue(aboutPageMock.description)
      expect(url).toHaveValue(aboutPageMock.image.url)
      expect(alt).toHaveValue(aboutPageMock.image.alt)
    })

    const clearButton = screen.getByRole('button', {
      name: 'Limpar Formulário'
    })

    userEvent.click(clearButton)

    await waitFor(() => {
      expect(title).toHaveValue('')
      expect(description).toHaveValue('')
      expect(url).toHaveValue('')
      expect(alt).toHaveValue('')
      expect(title).toHaveFocus()
    })
  })
})
