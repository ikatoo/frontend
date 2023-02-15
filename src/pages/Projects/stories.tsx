import { Meta, StoryFn } from '@storybook/react'
import { Projects } from '.'

export default {
  title: 'Pages/Projects',
  component: Projects,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>]
} as Meta<typeof Projects>

export const Default = {} as StoryFn<typeof Projects>
