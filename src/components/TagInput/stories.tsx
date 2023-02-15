import { Meta, StoryFn } from '@storybook/react'

import TagInput from '.'

export default {
  title: 'Components/TagInput',
  component: TagInput,
  args: {
    label: 'Skills',
    name: 'skills',
    initialValue: ['um', '2', 'tres'],
    placeholder: 'skill1',
    disabled: false
  }
} as Meta<typeof TagInput>

export const Default: StoryFn<typeof TagInput> = (args) => (
  <div style={{ maxWidth: 300, padding: 15 }}>
    <TagInput {...args} />
  </div>
)

export const withError: StoryFn<typeof TagInput> = (args) => (
  <div style={{ maxWidth: 300, padding: 15 }}>
    <TagInput {...args} />
  </div>
)
withError.args = {
  error: 'Ops...something is wrong'
}
