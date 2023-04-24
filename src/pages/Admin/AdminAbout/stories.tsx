import { ComponentMeta, ComponentStory } from '@storybook/react'
import { AdminAbout } from '.'
import about from '../../../mocks/handlers/aboutHandler'

export default {
  title: 'Pages/Privates/AdminAbout',
  component: AdminAbout,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>]
} as ComponentMeta<typeof AdminAbout>

export const Default = {} as ComponentStory<typeof AdminAbout>

export const withData = {} as ComponentStory<typeof AdminAbout>
withData.parameters = {
  msw: {
    handlers: about
  }
}
