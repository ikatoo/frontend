import type { Meta, StoryObj } from '@storybook/react'
import skillsHandler from 'shared/msw/handlers/skillsHandler'
import { AdminSkills } from '../AdminSkills'

const meta: Meta<typeof AdminSkills> = {
  title: 'Pages/Privates/AdminSkills',
  component: AdminSkills,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>]
}

export default meta
type Story = StoryObj<typeof AdminSkills>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [skillsHandler[0]]
    }
  }
}

export const WithData: Story = {
  parameters: {
    msw: {
      handlers: [skillsHandler[1]]
    }
  }
}
