import { render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it } from 'vitest'
import MobileMenu from '.'
import { mockedMenu } from '../stories'

describe('Menu Component', () => {
  it('should render menu on desktop', async () => {
    const { getByText, getByLabelText, container } = render(
      <MemoryRouter initialEntries={[`/`]}>
        <MobileMenu links={mockedMenu.links} social={mockedMenu.social} />
      </MemoryRouter>
    )

    const mobileMenu = await waitFor(() => getByLabelText(/mobile menu/i))
    const logotipo = await waitFor(() => getByLabelText(/logotipo/i))
    const sobre = await waitFor(() => getByText(/sobre/i))
    const habilidades = await waitFor(() => getByText(/habilidades/i))

    expect(mobileMenu).toBeInTheDocument()
    expect(logotipo).toBeInTheDocument()
    expect(sobre).toHaveClass('text-mck_aqua')
    expect(habilidades).toHaveClass('text-gray-500')
    expect(habilidades).not.toHaveClass('text-mck_aqua')
    expect(container).toMatchSnapshot()
  })
})
