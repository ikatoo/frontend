import env from 'src/helpers/env'

import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'
import contactPageMock from 'shared/mocks/contactPageMock/result.json'
import { AdminContact } from '.'

const meta: Meta<typeof AdminContact> = {
  title: 'Pages/Privates/AdminContact',
  component: AdminContact,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>],
  parameters: {
    msw: {
      handlers: [
        rest.get(`${env.VITE_API_URL}/contact`, (_req, res, ctx) => {
          return res(ctx.status(200), ctx.json({}))
        })
      ]
    }
  }
}

export default meta
type Story = StoryObj<typeof AdminContact>

export const Default: Story = {}

export const With_Data: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get(`${env.VITE_API_URL}/contact`, (_req, res, ctx) => {
          return res(ctx.status(200), ctx.json(contactPageMock))
        })
      ]
    }
  }
}
