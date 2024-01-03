import { useEffect, useState } from 'react'
import { decodeToken } from 'react-jwt'
import { useLocation, useNavigate } from 'react-router-dom'
import { removeLocalStorage, setLocalStorage } from 'src/helpers/localStorage'
import { useAlert } from 'src/hooks/useAlert'
import authService from 'src/services/authService'
import { getAvatar } from 'src/services/gravatarService'
import { AuthResponseSchema, SignInProps } from 'src/types/Auth'
import { PartialUser } from 'src/types/User'
import { AvatarProps, UserContext } from './UserContext'

export const UserProvider = (props: { children: JSX.Element }) => {
  const navigate = useNavigate()
  const { state: locationState } = useLocation()
  const { setAlert } = useAlert()

  const [user, setUser] = useState<PartialUser>()
  const [avatar, setAvatar] = useState<AvatarProps>()

  useEffect(() => {
    if (user?.email) {
      const url = getAvatar(user.email)
      setAvatar({
        url,
        alt: `Imagem do usuário ${user?.name}`
      })
    }
  }, [user?.email, user?.name])

  const signOut = () => {
    removeLocalStorage('accessToken')
    navigate('/')
    setUser(undefined)
  }

  const signIn = async (credentials: SignInProps) => {
    const { email, password } = credentials
    const { data } = await authService.signIn({
      email,
      password
    })

    const validResponse = AuthResponseSchema.safeParse(data)
    if (!validResponse.success) {
      setAlert({
        type: 'error',
        title: validResponse.error.message
      })
      return
    }

    const { accessToken, refreshToken, user } = validResponse.data
    const decodedToken = decodeToken(accessToken + '') as { exp: number }

    const authorized = !!user && !!decodedToken

    if (authorized) {
      setLocalStorage('accessToken', accessToken + '')
      setLocalStorage('refreshToken', refreshToken + '')
      navigate(locationState?.redirectTo ?? '/admin', { replace: true })
      return
    }

    setAlert({
      type: 'alert',
      title: 'Não autorizado'
    })
  }

  return (
    <UserContext.Provider value={{ user, avatar, setUser, signOut, signIn }}>
      {props.children}
    </UserContext.Provider>
  )
}
