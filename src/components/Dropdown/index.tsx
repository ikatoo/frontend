import { useState, useEffect } from 'react'
import * as Styles from './styles'

export type DropdownProps = {
  title: React.ReactNode
  children: React.ReactNode
} & Styles.ContentProps

const Dropdown = ({ title, children, width }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <Styles.Wrapper isOpen={isOpen}>
      <Styles.Title onClick={() => setIsOpen(!isOpen)}>{title}</Styles.Title>

      <Styles.Content width={width} aria-hidden={!isOpen}>
        {children}
      </Styles.Content>
      <Styles.Overlay
        aria-hidden={!isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />
    </Styles.Wrapper>
  )
}

export default Dropdown
