import env from 'src/helpers/env'

import type { Meta, StoryObj } from '@storybook/react'
import { HttpResponse, http } from 'msw'
import contactPageMock from 'shared/mocks/contactPageMock/result.json'
import { AdminContact } from '.'

const meta: Meta<typeof AdminContact> = {
  title: 'Pages/Privates/AdminContact',
  component: AdminContact,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>],
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.VITE_API_URL}/contact`, () => {
          return HttpResponse.json({})
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
        http.get(`${env.VITE_API_URL}/contact`, () => {
          return HttpResponse.json(contactPageMock)
        })
      ]
    }
  }
}
