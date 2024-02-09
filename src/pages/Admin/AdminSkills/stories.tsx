import type { Meta, StoryObj } from '@storybook/react'
import { HttpResponse, http } from 'msw'
import mock from 'shared/mocks/skillsPageMock/result.json'
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
      handlers: [
        http.get('*/skills-page/user-id/*', () => {
          return HttpResponse.json({})
        })
      ]
    }
  }
}

export const WithData: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('*/skills-page/user-id/*', () => {
          return HttpResponse.json(mock)
        })
      ]
    }
  }
}
