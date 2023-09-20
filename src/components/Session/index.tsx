import { useState } from 'react'

import Styles from './styles'
import { removeLocalStorage } from 'src/helpers/localStorage'
import { useNavigate } from 'react-router-dom'

const Session = () => {
  const navigate = useNavigate()

  const [hidden, setHidden] = useState(true)
  // const [avatar, setAvatar] = useState({ url: '', alt: '' })

  // useEffect(() => {
  //   const emailHash = MD5(`${user?.email}`.toLowerCase()).toString()
  //   const url = `https://www.gravatar.com/avatar/${emailHash}`
  //   setAvatar({
  //     url,
  //     alt: `Imagem do usuário ${user?.name}`
  //   })
  // }, [user?.email, user?.name])

  // if (!user) return <></>

  const signOut = () => {
    removeLocalStorage('token')
    navigate('/')
  }

  return (
    <Styles.Wrapper>
      <Styles.Menu onClick={() => setHidden(!hidden)}>
        {/* <Styles.ImageWrapper>
          <Styles.Image
            layout="object-fit"
            src={avatar?.url}
            alt={avatar?.alt}
          />
        </Styles.ImageWrapper>
        {user?.name} */}
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
