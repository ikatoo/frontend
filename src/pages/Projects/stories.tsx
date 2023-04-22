import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Projects } from '.'
import projects from '../../mocks/handlers/projectsHandler'

export default {
  title: 'Pages/Projects',
  component: Projects,
  decorators: [(Story) => <div className="bg-mck_black_light">{Story()}</div>],
  parameters: {
    msw: {
      handlers: projects
    }
  }
} as ComponentMeta<typeof Projects>

export const Default = {} as ComponentStory<typeof Projects>
