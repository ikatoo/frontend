import type { Meta, StoryObj } from '@storybook/react'
import { Skills } from '.'
import { http, HttpResponse } from 'msw'
import env from 'src/helpers/env'

const meta: Meta<typeof Skills> = {
  title: 'Pages/Skills',
  component: Skills,
  decorators: [
    (Story) => (
      <div className="bg-mck_black_light text-mck_gray_light">{Story()}</div>
    )
  ],
  parameters: {
    msw: {
      handlers: [
        http.post(`${env.VITE_API_URL}/skills`, () => {
          return HttpResponse.json({ status: 201 })
        })
      ]
    }
  }
}

export default meta
type Story = StoryObj<typeof Skills>

export const Default: Story = {}
