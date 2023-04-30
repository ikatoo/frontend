import { ButtonHTMLAttributes } from 'react'
import Styles from './styles'

type ButtonProps = {
  children?: React.ReactNode
  styleType?: 'primary' | 'secondary' | 'default'
  icon?: JSX.Element
  block?: boolean
  tabIndex?: number
  asLink?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  children,
  icon,
  styleType = 'default',
  block = false,
  tabIndex,
  ...props
}: ButtonProps) => {
  return (
    <Styles.Wrapper
      {...props}
      tabIndex={tabIndex}
      $block={block}
      $styleType={styleType}
    >
      {!!icon && <Styles.IconWrapper>{icon}</Styles.IconWrapper>}
      {children}
    </Styles.Wrapper>
  )
}

export default Button
