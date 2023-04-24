import { ComponentMeta, ComponentStory } from '@storybook/react'
import { AdminAbout } from '.'
import env from '../../../helpers/env'
import about from '../../../mocks/handlers/aboutHandler'
import createHandlers from '../../../mocks/msw/services/createHandlers'

export default {
  title: 'Pages/Privates/AdminAbout',
  component: AdminAbout,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>],
  parameters: {
    msw: {
      handlers: [
        createHandlers([
          { url: `${env.VITE_API_URL}/about`, method: 'post', status: 201 },
          { url: `${env.VITE_API_URL}/about`, method: 'patch', status: 204 }
        ])
      ]
    }
  }
} as ComponentMeta<typeof AdminAbout>

export const Default = {} as ComponentStory<typeof AdminAbout>

export const withData = {} as ComponentStory<typeof AdminAbout>
withData.parameters = {
  msw: {
    handlers: about
  }
}
