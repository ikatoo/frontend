import { Projects } from '.'
import projectsMock from 'shared/mocks/projectsMock/result.json'

import type { Meta, StoryObj } from '@storybook/react'
import { http, HttpResponse } from 'msw'
import env from 'src/helpers/env'

const meta: Meta<typeof Projects> = {
  title: 'Pages/Projects',
  component: Projects,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>],
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.VITE_API_URL}/projects`, () => {
          return HttpResponse.json(projectsMock, { status: 200 })
        }),
        http.get(`${env.VITE_API_URL}/projects/title/:title`, () => {
          return HttpResponse.json(projectsMock, { status: 200 })
        }),
        http.get(`${env.VITE_API_URL}/project/id/:id`, () => {
          return HttpResponse.json(projectsMock[1], { status: 200 })
        }),
        http.post(`${env.VITE_API_URL}/project`, () => {
          return HttpResponse.json({ status: 201 })
        }),
        http.patch(`${env.VITE_API_URL}/project/id/:id`, () => {
          return HttpResponse.json({ status: 204 })
        }),
        http.delete(`${env.VITE_API_URL}/project/id/:id`, () => {
          return HttpResponse.json({ status: 204 })
        })
      ]
    }
  }
}

export default meta
type Story = StoryObj<typeof Projects>

export const Default: Story = {
  render: () => <Projects />
}
