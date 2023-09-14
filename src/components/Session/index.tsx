import { useState } from 'react'

import { useAuthStore } from 'src/store/useAuthStore'
import Styles from './styles'

const Session = () => {
  const user = useAuthStore((state) => state.user)
  const signout = useAuthStore((state) => state.signout)
  const avatar = user?.avatar
  const [hidden, setHidden] = useState(true)

  const signOut = async () => {
    await signout()
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
