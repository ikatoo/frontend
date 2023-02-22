import { Meta, StoryFn } from '@storybook/react'
import DataTable from '.'
import Button from '../Button'
import { Delete, Edit } from '@styled-icons/material-outlined'

export default {
  title: 'Components/DataTable',
  component: DataTable,
  args: {
    data: [
      {
        '#': 1,
        title: 'any title',
        desc: 'any desc',
        actions: (
          <div className="flex gap-4 justify-center">
            <Button icon={<Edit />} />
            <Button icon={<Delete />} styleType="dangerous" />
          </div>
        )
      },
      {
        '#': 2,
        title: 'any title 2',
        desc: 'any desc 2',
        actions: (
          <div className="flex gap-4 justify-center">
            <Button icon={<Edit />} />
            <Button icon={<Delete />} styleType="dangerous" />
          </div>
        )
      },
      {
        '#': 3,
        title: 'any title 3',
        desc: 'any desc 3',
        actions: (
          <div className="flex gap-4 justify-center">
            <Button icon={<Edit />} />
            <Button icon={<Delete />} styleType="dangerous" />
          </div>
        )
      }
    ]
  }
} as Meta<typeof DataTable>

export const Default: StoryFn<typeof DataTable> = (args) => (
  <div>
    <DataTable {...args} />
  </div>
)
