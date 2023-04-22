import { ComponentMeta, ComponentStory } from '@storybook/react'
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
} as ComponentMeta<typeof TextArea>

export const Default: ComponentStory<typeof TextArea> = (args) => (
  <div className="w-full p-15">
    <TextArea {...args} />
  </div>
)

export const withInitialValue: ComponentStory<typeof TextArea> = (args) => (
  <div className="w-80 p-15">
    <TextArea {...args} />
  </div>
)
withInitialValue.args = {
  initialValue: 'initial value'
}

export const withError: ComponentStory<typeof TextArea> = (args) => (
  <div className="w-80 p-15">
    <TextArea {...args} />
  </div>
)
withError.args = {
  error: 'Ops...something is wrong'
}

export const WhiteLabel: ComponentStory<typeof TextArea> = (args) => (
  <div className="w-80 p-15">
    <TextArea {...args} />
  </div>
)
WhiteLabel.args = {
  labelColor: 'white'
}
