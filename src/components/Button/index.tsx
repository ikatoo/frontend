import { ButtonHTMLAttributes } from 'react'
import Styles from './styles'

type ButtonProps = {
  children?: React.ReactNode
  styleType?: 'primary' | 'secondary' | 'default' | 'dangerous'
  icon?: JSX.Element
  block?: boolean
  tabIndex?: number
  title?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  children,
  icon,
  styleType = 'default',
  block = false,
  tabIndex,
  title
}: ButtonProps) => {
  return (
    <Styles.Wrapper
      title={title}
      tabIndex={tabIndex}
      $block={block}
      $type={styleType}
    >
      {!!icon && <Styles.IconWrapper>{icon}</Styles.IconWrapper>}
      {children}
    </Styles.Wrapper>
  )
}

export default Button
