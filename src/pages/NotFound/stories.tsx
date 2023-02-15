import { Meta, StoryFn } from '@storybook/react'
import { NotFound } from '.'

export default {
  title: 'Pages/NotFound',
  component: NotFound,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>]
} as Meta<typeof NotFound>

export const Default = {} as StoryFn<typeof NotFound>
