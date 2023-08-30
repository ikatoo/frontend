import { useState } from 'react'

import Styles from './styles'
import authService from 'src/services/authService'

const Session = () => {
  const user = { name: '', avatar: { url: '', alt: '' } }
  const avatar = user?.avatar
  const [hidden, setHidden] = useState(true)

  const signOut = async () => {
    await authService.signOut()
  }

  return (
    <Styles.Wrapper>
      <Styles.Menu onClick={() => setHidden(!hidden)}>
        <Styles.ImageWrapper>
          <Styles.Image
            layout="object-fit"
            src={avatar?.url}
            alt={avatar?.alt}
          />
        </Styles.ImageWrapper>
        {user?.name}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </Styles.Menu>
      <Styles.Itens $hidden={hidden}>
        <Styles.Item onClick={signOut}>Sair</Styles.Item>
      </Styles.Itens>
    </Styles.Wrapper>
  )
}

export default Session
