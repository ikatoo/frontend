import type { Meta, StoryObj } from '@storybook/react'
import skillsHandler from 'src/mocks/handlers/skillsHandler'
import { AdminSkills } from '../AdminSkills'

const meta: Meta<typeof AdminSkills> = {
  title: 'Pages/Privates/AdminSkills',
  component: AdminSkills
}

export default meta
type Story = StoryObj<typeof AdminSkills>

export const Default: Story = {
  render: () => (
    <div className="bg-mck_black_light">
      <AdminSkills />
    </div>
  )
}

export const WithData: Story = {
  render: () => (
    <div className="bg-mck_black_light">
      <AdminSkills />
    </div>
  )
}

WithData.parameters = {
  msw: {
    handlers: skillsHandler
  }
}
