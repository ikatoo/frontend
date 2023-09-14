import { useState } from 'react'
import SVG from 'react-inlinesvg'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuthStore } from 'src/store/useAuthStore'
import { SideMenuProps } from '..'
import CloseButton from '../../CloseButton'
import Logo from '../../Logo'
import MenuButton from '../../MenuButton'
import Styles from './styles'

const MobileMenu = ({ social, links }: SideMenuProps) => {
  const { pathname } = useLocation()
  const signout = useAuthStore((state) => state.signout)

  const [isClosed, setIsClosed] = useState(true)

  const user = {}

  const getStyle = (to: string, isActive: boolean) => {
    const isRoot =
      to === 'about' && (pathname === '/' || /^\/admin\/?$/gm.test(pathname))
    return isActive || isRoot ? 'text-mck_aqua' : 'text-gray-500'
  }

  const handleSignOut = async () => {
    await signout()
    setIsClosed(true)
  }

  return (
    <Styles.Menu $isClosed={isClosed} aria-label="Mobile Menu">
      <Styles.MobileBar>
        <Styles.IconWrapper onClick={() => setIsClosed(true)}>
          <Logo mobileSize />
        </Styles.IconWrapper>
        <Styles.IconWrapper onClick={() => setIsClosed(!isClosed)}>
          {isClosed ? <MenuButton /> : <CloseButton />}
        </Styles.IconWrapper>
      </Styles.MobileBar>

      <Styles.Navigator $isClosed={isClosed}>
        <Styles.LinksWrapper>
          <Styles.Links>
            {!!links.length &&
              links.map(({ label, to }, index) => (
                <Styles.LinksItem key={index} onClick={() => setIsClosed(true)}>
                  <NavLink
                    to={to}
                    className={({ isActive }) => getStyle(to, isActive)}
                  >
                    {label}
                  </NavLink>
                </Styles.LinksItem>
              ))}

            {user ? (
              <Styles.Session>
                <Styles.DashboardLink onClick={() => setIsClosed(true)}>
                  <Link to={'/admin'}>Dashboard</Link>
                </Styles.DashboardLink>
                <Styles.SignOutLink onClick={handleSignOut}>
                  <span>Sair</span>
                </Styles.SignOutLink>
              </Styles.Session>
            ) : (
              <Styles.SignInLink onClick={() => setIsClosed(true)}>
                <Link to={'/signin'}>Entrar</Link>
              </Styles.SignInLink>
            )}
          </Styles.Links>
        </Styles.LinksWrapper>

        <Styles.SocialWrapper>
          {!!social.length &&
            social.map((social, index) => (
              <Styles.SocialLink
                key={index}
                onClick={() => setIsClosed(true)}
                href={social.url}
                target="_blank"
                rel="noreferrer"
              >
                <SVG src={social.url_icon} title={social.name} />
              </Styles.SocialLink>
            ))}
        </Styles.SocialWrapper>
      </Styles.Navigator>
    </Styles.Menu>
  )
}

export default MobileMenu
