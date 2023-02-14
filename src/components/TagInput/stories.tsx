import { ComponentMeta, ComponentStory } from '@storybook/react'

import TagInput from '.'

export default {
  title: 'Components/TagInput',
  component: TagInput,
  args: {
    label: 'Skills',
    name: 'skills',
    initialValue: '',
    placeholder: 'skill1',
    disabled: false
  }
} as ComponentMeta<typeof TagInput>

export const Default: ComponentStory<typeof TagInput> = (args) => (
  <div style={{ maxWidth: 300, padding: 15 }}>
    <TagInput {...args} />
  </div>
)

export const withError: ComponentStory<typeof TagInput> = (args) => (
  <div style={{ maxWidth: 300, padding: 15 }}>
    <TagInput {...args} />
  </div>
)
withError.args = {
  error: 'Ops...something is wrong'
}
