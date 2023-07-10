import env from 'src/helpers/env'
import { AdminProjects } from '.'

import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'
import projectsPageMock from 'shared/mocks/projectsMock/result.json'

const meta: Meta<typeof AdminProjects> = {
  title: 'Pages/Privates/AdminProjects',
  component: AdminProjects,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>],
  parameters: {
    msw: {
      handlers: [
        rest.get(`${env.VITE_API_URL}/projects`, (_req, res, ctx) => {
          return res(ctx.status(200), ctx.json({}))
        }),
        rest.post(`${env.VITE_API_URL}/image`, (_req, res, ctx) => {
          const mock = {
            secure_url: 'https://cloudinary.com/folder/image.png',
            public_id: 'folder/image.png'
          }
          const body = { url: mock.secure_url, publicId: mock.public_id }

          return res(ctx.status(201), ctx.json({ body, statusCode: 201 }))
        })
      ]
    }
  }
}

export default meta
type Story = StoryObj<typeof AdminProjects>

export const Default: Story = {}

export const With_Data: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get(`${env.VITE_API_URL}/projects`, (_req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json([
              ...projectsPageMock,
              ...projectsPageMock,
              ...projectsPageMock,
              ...projectsPageMock
            ])
          )
        })
      ]
    }
  }
}
