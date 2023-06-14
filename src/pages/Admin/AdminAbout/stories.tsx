import env from 'src/helpers/env'
import { AdminAbout } from '.'

import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'
import aboutPageMock from 'shared/mocks/aboutPageMock/result.json'

const meta: Meta<typeof AdminAbout> = {
  title: 'Pages/Privates/AdminAbout',
  component: AdminAbout,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>],
  parameters: {
    msw: {
      handlers: [
        rest.get(`${env.VITE_API_URL}/about`, (_req, res, ctx) => {
          return res(ctx.status(200), ctx.json({}))
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
        rest.get(`${env.VITE_API_URL}/about`, (_req, res, ctx) => {
          return res(ctx.status(200), ctx.json(aboutPageMock))
        })
      ]
    }
  }
}
