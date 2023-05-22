import { useEffect, useState } from 'react'
import * as Styles from './styles'

export type DropdownProps = {
  title: React.ReactNode
  handleIsOpen?: (isOpen: boolean) => void
  initialIsOpenState?: boolean
  children: React.ReactNode
} & Styles.ContentProps

const Dropdown = ({
  title,
  children,
  width,
  handleIsOpen,
  initialIsOpenState = false
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(initialIsOpenState)

  useEffect(() => {
    setIsOpen(initialIsOpenState)
  }, [initialIsOpenState])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const onClick = () => {
    !!(handleIsOpen && handleIsOpen(!isOpen)) || setIsOpen(!isOpen)
  }

  return (
    <Styles.Wrapper isOpen={isOpen}>
      <Styles.Title onClick={onClick}>{title}</Styles.Title>

      <Styles.Content width={width} aria-hidden={!isOpen}>
        {children}
      </Styles.Content>
      <Styles.Overlay aria-hidden={!isOpen} onClick={onClick} />
    </Styles.Wrapper>
  )
}

export default Dropdown
