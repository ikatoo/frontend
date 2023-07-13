import { ComponentMeta, ComponentStory, Parameters } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import Menu from '.'
import { SideMenuProps } from '.'

export const mockedMenu: SideMenuProps = {
  links: [
    {
      label: 'Sobre',
      to: 'about'
    },
    {
      label: 'Habilidades',
      to: 'skills'
    },
    {
      label: 'Projetos',
      to: 'projects'
    },
    {
      label: 'Contato',
      to: 'contact'
    }
  ],
  social: [
    {
      name: 'github',
      url: 'https://github.com/mckatoo',
      url_icon: '/images/github.svg'
    },
    {
      name: 'youtube',
      url: 'https://youtube.com/mckatoo',
      url_icon: '/images/youtube.svg'
    },
    {
      name: 'linkedin',
      url: 'https://linkedin.com/in/mckatoo',
      url_icon: '/images/linkedin.svg'
    }
  ]
}

export default {
  title: 'Components/Menu',
  component: Menu,
  args: mockedMenu,
  decorators: [
    (Story) => <MemoryRouter initialEntries={['/']}>{Story()}</MemoryRouter>
  ]
} as ComponentMeta<typeof Menu>

export const Default = {} as ComponentStory<typeof Menu>
export const Mobile = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  } as Parameters
} as ComponentStory<typeof Menu>
