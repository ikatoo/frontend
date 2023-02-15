import { Meta, StoryFn } from '@storybook/react'
import { AdminAbout } from '.'

export default {
  title: 'Pages/Privates/AdminAbout',
  component: AdminAbout,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>]
} as Meta<typeof AdminAbout>

export const Default = {} as StoryFn<typeof AdminAbout>
export const WithInitiallData = {} as StoryFn<typeof AdminAbout>
