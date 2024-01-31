/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen } from '@testing-library/react'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import aboutPageMock from 'shared/mocks/aboutPageMock/result.json'
import { serverUse, waitFor } from 'src/helpers/testUtils'
import { describe, expect, test, vi } from 'vitest'
import { About } from '.'

vi.mock('../../components/IconCloud')

const server = setupServer()

describe('About Page', () => {
  test('renders the about page with data from the server', async () => {
    serverUse(server, [
      http.get('*/about-page/user-id/*', () => {
        return HttpResponse.json(aboutPageMock)
      })
    ])

    render(<About />)

    await waitFor(() => {
      expect(screen.getByText(aboutPageMock.title)).toBeInTheDocument()
      expect(
        screen.getByText(/Me chamo Milton Carlos Katoo/i)
      ).toBeInTheDocument()
    })
  })

  test('shoud not render image wrapper if illustration url not exist', async () => {
    serverUse(server, [
      http.get('*/about-page/user-id/*', () => {
        const { image: _, ...page } = aboutPageMock
        return HttpResponse.json({
          ...page
        })
      })
    ])

    render(<About />)

    await waitFor(() => {
      expect(screen.getByText(aboutPageMock.title)).toBeInTheDocument()
      expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })
  })

  test('shoud not render image wrapper if illustration url is empty', async () => {
    serverUse(server, [
      http.get('*/about-page/user-id/*', () => {
        return HttpResponse.json({
          ...aboutPageMock,
          image: { url: '', alt: '' }
        })
      })
    ])

    render(<About />)

    await waitFor(() => {
      expect(screen.getByText(aboutPageMock.title)).toBeInTheDocument()
      expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })
  })
})
