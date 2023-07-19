import { Outlet } from 'react-router-dom'

import Menu, { SideMenuProps } from '../../../components/Menu'
import Styles from './styles'

export const PublicLayout = () => {
  const menu: SideMenuProps = {
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
        url: 'https://linkedin.com/mckatoo',
        url_icon: '/images/linkedin.svg'
      }
    ]
  }

  return (
    <div className="h-screen w-screen flex flex-cols">
      <Menu {...menu} />
      <Styles.Container>
        <Outlet />
      </Styles.Container>
    </div>
  )
}
