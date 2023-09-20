import { useState } from 'react'
import { decodeToken } from 'react-jwt'
import { useLocation, useNavigate } from 'react-router-dom'
import { removeLocalStorage, setLocalStorage } from 'src/helpers/localStorage'
import { useAlert } from 'src/hooks/useAlert'
import authService from 'src/services/authService'
import { AuthResponseSchema, SignInProps } from 'src/types/Auth'
import { PartialUser } from 'src/types/User'
import { UserContext } from './UserContext'

export const UserProvider = (props: { children: JSX.Element }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { setAlert } = useAlert()

  const [user, setUser] = useState<PartialUser>()

  const signOut = () => {
    removeLocalStorage('token')
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

    const { accessToken, user } = validResponse.data
    const token = `${accessToken}`
    const decodedToken = decodeToken(token) as { exp: number }
    const target = pathname === '/signin' ? '/admin' : pathname

    const authorized = !!user && !!decodedToken

    if (authorized) {
      setLocalStorage('token', token)
      navigate(target, { replace: true })
      return
    }

    setAlert({
      type: 'alert',
      title: 'Não autorizado'
    })
  }

  return (
    <UserContext.Provider value={{ user, setUser, signOut, signIn }}>
      {props.children}
    </UserContext.Provider>
  )
}
