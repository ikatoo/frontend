import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { NotFound } from '.'

describe('Not Found Page', () => {
  it('should render 404 page', () => {
    render(
      <MemoryRouter initialEntries={[`/`]}>
        <NotFound />
      </MemoryRouter>
    )

    expect(screen.getByText(/page not found/i)).toBeInTheDocument()
  })

  it('should have link go back to the home', () => {
    render(
      <MemoryRouter initialEntries={[`/`]}>
        <NotFound />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('link', { name: 'Go back to home.' })
    ).toHaveAttribute('href', '/')
  })
})
