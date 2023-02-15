import { Meta, StoryFn } from '@storybook/react'
import { AdminSkills } from '.'

export default {
  title: 'Pages/Privates/AdminSkills',
  component: AdminSkills,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>]
} as Meta<typeof AdminSkills>

export const Default = {} as StoryFn<typeof AdminSkills>
