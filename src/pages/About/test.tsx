import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { About } from '.'

const server = setupServer(
  rest.get('/about', (_req, res, ctx) => {
    return res(
      ctx.json({
        title: 'About Page',
        description: '<p>This is the about page.</p>',
        illustrationURL: 'https://example.com/image.jpg',
        illustrationALT: 'Example Image',
        skills: [{ title: 'Skill 1' }, { title: 'Skill 2' }]
      })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test.skip('renders the about page with data from the server', async () => {
  render(<About />)

  await waitFor(() => {
    expect(screen.getByText('About Page')).toBeInTheDocument()
    expect(screen.getByText('This is the about page.')).toBeInTheDocument()
    expect(screen.getByAltText('Example Image')).toHaveAttribute(
      'src',
      'https://example.com/image.jpg'
    )
    expect(screen.getByText('Skill 1')).toBeInTheDocument()
    expect(screen.getByText('Skill 2')).toBeInTheDocument()
  })
})
