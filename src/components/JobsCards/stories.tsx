import type { Meta, StoryObj } from '@storybook/react'
import skillsPageMock from 'shared/mocks/skillsPageMock/result.json'
import { Job } from 'src/types/SkillsPage'
import JobsCards from '.'

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
