import type { Meta, StoryObj } from '@storybook/react'
import skillsPageMock from 'src/mocks/skillsPageMock'
import JobsCards from '.'
import { Job } from 'src/types/SkillsPage'

const meta: Meta<typeof JobsCards> = {
  title: 'Components/JobsCards',
  component: JobsCards
}

export default meta
type Story = StoryObj<typeof JobsCards>

export const Default: Story = {
  render: () => (
    <>
      <JobsCards jobs={skillsPageMock.lastJobs} title="Jobs" />
    </>
  )
}

export const With_Remove_Button: Story = {
  render: () => (
    <>
      <JobsCards
        showRemoveButton
        removeJobFunction={(job: Job) => {
          console.log('job =', job)
        }}
        jobs={skillsPageMock.lastJobs}
        title="Jobs"
      />
    </>
  )
}
