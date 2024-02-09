import env from 'src/helpers/env'
import { AdminAbout } from '.'

import type { Meta, StoryObj } from '@storybook/react'
import { HttpResponse, http } from 'msw'
import aboutPageMock from 'shared/mocks/aboutPageMock/result.json'

const meta: Meta<typeof AdminAbout> = {
  title: 'Pages/Privates/AdminAbout',
  component: AdminAbout,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>],
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.VITE_API_URL}/about`, () => {
          return HttpResponse.json(aboutPageMock)
        })
      ]
    }
  }
}

export default meta
type Story = StoryObj<typeof AdminAbout>

export const Default: Story = {}

export const With_Data: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.VITE_API_URL}/about`, () => {
          return HttpResponse.json(aboutPageMock)
        })
      ]
    }
  }
}
