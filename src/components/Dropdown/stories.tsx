import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Dropdown from '.'

const meta: Meta<typeof Dropdown> = {
  title: 'components/Dropdown',
  component: Dropdown,
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
  render: () => <Dropdown title="Click here">Content</Dropdown>
}

export const External_Open: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div>
        <Dropdown
          title="Click here"
          handleIsOpen={setIsOpen}
          initialIsOpenState={isOpen}
        >
          <span data-testid="content">
            <button
              type="button"
              data-testid="button-to-close"
              onClick={() => setIsOpen(!isOpen)}
            >
              Click to close
            </button>
          </span>
        </Dropdown>

        <button
          className="absolute top-0 right-0"
          type="button"
          data-testid="button-to-open"
        >
          Click to open
        </button>

        <div className="absolute bottom-0 left-0">
          {`isOpen state = ${isOpen}`}
        </div>
      </div>
    )
  }
}
