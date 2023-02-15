import { Meta, StoryFn } from '@storybook/react'
import TextArea from '.'

export default {
  title: 'Components/TextArea',
  component: TextArea,
  args: {
    label: 'E-mail',
    name: 'email',
    initialValue: '',
    placeholder: 'john.cage@gmail.com',
    disabled: false
  }
} as Meta<typeof TextArea>

export const Default: StoryFn<typeof TextArea> = (args) => (
  <div className="w-full p-15">
    <TextArea {...args} />
  </div>
)

export const withError: StoryFn<typeof TextArea> = (args) => (
  <div className="w-80 p-15">
    <TextArea {...args} />
  </div>
)
withError.args = {
  error: 'Ops...something is wrong'
}

export const WhiteLabel: StoryFn<typeof TextArea> = (args) => (
  <div className="w-80 p-15">
    <TextArea {...args} />
  </div>
)
WhiteLabel.args = {
  labelColor: 'white'
}
