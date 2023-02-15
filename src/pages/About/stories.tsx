import { Meta, StoryFn } from '@storybook/react'
import { About } from '.'

export default {
  title: 'Pages/About',
  component: About,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>]
} as Meta<typeof About>

export const Default = {} as StoryFn<typeof About>
