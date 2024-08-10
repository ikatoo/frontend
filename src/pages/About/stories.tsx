import { http, HttpResponse } from 'msw'
import { About } from '.'
import aboutPageMock from 'shared/mocks/aboutPageMock/result.json'

import type { Meta, StoryObj } from '@storybook/react'
import env from 'src/helpers/env'

const meta: Meta<typeof About> = {
  title: 'Pages/About',
  component: About,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>]
}

export default meta
type Story = StoryObj<typeof About>

export const Default: Story = {
  render: () => <About />
}

Default.parameters = {
  msw: {
    handlers: [
      http.get(`${env.VITE_API_URL}/about`, () => {
        return HttpResponse.json(aboutPageMock)
      }),
      http.post(`${env.VITE_API_URL}/about`, () => {
        return HttpResponse.json({ status: 201 })
      }),
      http.patch(`${env.VITE_API_URL}/about`, () => {
        return HttpResponse.json({ status: 204 })
      }),
      http.delete(`${env.VITE_API_URL}/about`, () => {
        return HttpResponse.json({ status: 204 })
      })
    ]
  }
}
