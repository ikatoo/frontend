import type { Meta, StoryObj } from '@storybook/react'
import { Contact } from '.'
import { http, HttpResponse } from 'msw'
import env from 'src/helpers/env'
import contactPageMock from 'shared/mocks/contactPageMock/result.json'

const meta: Meta<typeof Contact> = {
  title: 'Pages/Contact',
  component: Contact,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>],
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.VITE_API_URL}/contact`, () => {
          return HttpResponse.json(contactPageMock, { status: 200 })
        }),
        http.post(`${env.VITE_API_URL}/contact`, () => {
          return HttpResponse.json({ status: 201 })
        }),
        http.patch(`${env.VITE_API_URL}/contact`, () => {
          return HttpResponse.json({ status: 204 })
        }),
        http.delete(`${env.VITE_API_URL}/contact`, () => {
          return HttpResponse.json({ status: 204 })
        })
      ]
    }
  }
}

export default meta
type Story = StoryObj<typeof Contact>

export const Default: Story = {
  render: () => <Contact />
}
