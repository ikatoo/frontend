import SVG from 'react-inlinesvg'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { SideMenuProps } from '..'
import Logo from '../../Logo'
import Styles from './styles'

const DesktopMenu = ({ social, links }: SideMenuProps) => {
  const { pathname } = useLocation()
  const user = {}

  const getStyle = (to: string, isActive: boolean) => {
    const isRoot =
      to === 'about' && (pathname === '/' || /^\/admin\/?$/gm.test(pathname))
    return isActive || isRoot ? 'text-mck_aqua' : 'text-gray-500'
  }

  return (
    <Styles.Menu aria-label="Side Menu">
      <Styles.LogoWrapper>
        <Logo name="Milton Carlos Katoo" description="Software Developer" />
      </Styles.LogoWrapper>

      <Styles.LinksWrapper>
        <Styles.Links>
          {!!links.length &&
            links.map(({ label, to }, index) => (
              <Styles.LinksItem key={index}>
                <NavLink
                  to={to}
                  className={({ isActive }) => getStyle(to, isActive)}
                >
                  {label}
                </NavLink>
              </Styles.LinksItem>
            ))}
        </Styles.Links>

        {user ? (
          <Styles.Session>
            <Styles.DashboardLink>
              <Link to={'/admin'}>Dashboard</Link>
            </Styles.DashboardLink>
          </Styles.Session>
        ) : (
          <Styles.SignInLink>
            <Link to={'/signin'}>Entrar</Link>
          </Styles.SignInLink>
        )}
      </Styles.LinksWrapper>

      <Styles.SocialWrapper>
        {!!social.length &&
          social.map((social, index) => (
            <Styles.SocialLink
              key={index}
              href={social.url}
              target="_parent"
              rel="noreferrer"
            >
              <SVG src={social.url_icon} title={social.name} />
            </Styles.SocialLink>
          ))}
      </Styles.SocialWrapper>
    </Styles.Menu>
  )
}

export default DesktopMenu
