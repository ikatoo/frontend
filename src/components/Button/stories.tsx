import { Github } from '@styled-icons/boxicons-logos'
import { Angry, Laugh } from '@styled-icons/boxicons-regular'
import Button from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button
}

const Wrapper = (props: { children: React.ReactNode }) => (
  <div className="flex justify-center items-center bg-mck_black_light h-screen w-full">
    <div className="flex flex-col w-fit h-fit gap-2">{props.children}</div>
  </div>
)

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: () => <Button />
}

export const With_Label: Story = {
  render: () => <Button>Button</Button>
}

export const With_Icon: Story = {
  render: () => (
    <div>
      <Button icon={<Github />}>GitHub</Button>
    </div>
  )
}

export const Block: Story = {
  render: () => (
    <div>
      <Button block>GitHub</Button>
    </div>
  )
}

export const Types: Story = {
  render: () => (
    <Wrapper>
      <Button styleType="default">Default</Button>
      <Button styleType="primary" icon={<Laugh />}>
        Primary
      </Button>
      <Button styleType="secondary" icon={<Angry />}>
        Secondary
      </Button>
    </Wrapper>
  )
}

export const Disabled: Story = {
  render: () => (
    <Wrapper>
      <Button disabled styleType="default">
        Default
      </Button>
      <Button disabled styleType="primary" icon={<Laugh />}>
        Primary
      </Button>
      <Button disabled styleType="secondary" icon={<Angry />}>
        Secondary
      </Button>
    </Wrapper>
  )
}
