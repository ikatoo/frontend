import { Meta, StoryFn } from '@storybook/react'
import { Contact } from '.'

export default {
  title: 'Pages/Contact',
  component: Contact,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>]
} as Meta<typeof Contact>

export const Default = {} as StoryFn<typeof Contact>
