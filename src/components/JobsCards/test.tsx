import { render, screen, waitFor } from '@testing-library/react'
import JobsCards from '.'
import skillsPageMock from 'src/mocks/skillsPageMock'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('JobCards Component', () => {
  it('should render title and cards', () => {
    render(<JobsCards title="My Jobs" jobs={skillsPageMock.lastJobs} />)

    expect(screen.getByRole('heading', { name: 'My Jobs' })).toBeInTheDocument()
    expect(screen.getAllByTestId('job-testid')).toHaveLength(
      skillsPageMock.lastJobs.length
    )
  })

  it('should show remove button', () => {
    const removeJob = vi.fn()
    render(
      <JobsCards
        showRemoveButton
        removeJobFunction={removeJob}
        title="My Jobs"
        jobs={skillsPageMock.lastJobs}
      />
    )

    const removeButtons = screen.getAllByTestId('remove_button-testid')
    expect(removeButtons).toHaveLength(skillsPageMock.lastJobs.length)
  })

  it('should call function on remove button click', () => {
    const removeJob = vi.fn()
    render(
      <JobsCards
        showRemoveButton
        removeJobFunction={removeJob}
        title="My Jobs"
        jobs={skillsPageMock.lastJobs}
      />
    )

    const removeButtons = screen.getAllByTestId('remove_button-testid')
    const toRemove = removeButtons[1]

    userEvent.click(toRemove)

    waitFor(() => {
      expect(removeJob).toHaveBeenCalledTimes(1)
    })
  })
})
