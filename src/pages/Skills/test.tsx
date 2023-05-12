import { render, waitFor } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { Skills } from '.'
import skillsPageMock from '../../mocks/skillsPageMock'
import api from '../../services/api'

describe('Skills Page', () => {
  test('renders the skill page with data from the server', async () => {
    api.get = vi.fn().mockResolvedValue({ data: skillsPageMock })

    const { container } = render(<Skills />)

    await waitFor(() => {
      expect(container.childElementCount).toBe(1)
      const wrapper = container.firstChild
      const leftColumn = wrapper?.firstChild
      expect(leftColumn).toHaveTextContent(skillsPageMock.title)
      expect(leftColumn).toHaveTextContent(
        skillsPageMock.description.slice(3, 10)
      )
      const rightColumn = leftColumn?.nextSibling
      const studyBlock = rightColumn?.firstChild
      expect(studyBlock).toHaveTextContent(/estudo/i)
      for (const skill of skillsPageMock.skills) {
        expect(studyBlock).toHaveTextContent(skill.skillTitle)
      }
      const lastJobsBlock = studyBlock?.nextSibling
      const lastJobsTitle = lastJobsBlock?.firstChild
      expect(lastJobsTitle).toHaveTextContent(/Últimos Trabalhos/i)
      const jobsWrapper = lastJobsTitle?.nextSibling
      expect(jobsWrapper?.childNodes).toHaveLength(
        skillsPageMock.lastJobs.length
      )
      for (let index = 0; index < skillsPageMock.lastJobs.length; index++) {
        const job = skillsPageMock.lastJobs[index]
        const jobElement = jobsWrapper?.childNodes[index]
        expect(jobElement).toHaveTextContent(job.jobTitle)
        expect(jobElement).toHaveTextContent(job.jobDescription)
        expect(jobElement).toHaveTextContent(job.yearMonthStart)
        expect(jobElement?.firstChild?.firstChild).toHaveAttribute(
          'href',
          job.link
        )
      }
    })
  })
})
