import type { Meta, StoryObj } from '@storybook/react'
import skillsPageMock from 'src/mocks/skillsPageMock'
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
      <JobsCards showRemoveButton jobs={skillsPageMock.lastJobs} title="Jobs" />
    </>
  )
}
