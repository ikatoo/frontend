import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Loading from 'src/components/Loading'
import { useUser } from 'src/contexts/User/UserContext'
import { getLocalStorage } from 'src/helpers/localStorage'
import authService from 'src/services/authService'
import { UserSchema } from 'src/types/User'

export const Private = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(true)
  const [signed, setSigned] = useState(false)
  const { setUser } = useUser()

  useEffect(() => {
    const verifyToken = async () => {
      const token = getLocalStorage('accessToken')
      if (!token) {
        setLoading(false)
        return
      }
      const { status, data } = await authService.verifyToken(token)
      if (status === 200 && typeof data === 'object' && 'user' in data) {
        const validUser = UserSchema.safeParse(data.user)
        validUser.success && setUser(validUser.data)
        setLoading(false)
        setSigned(validUser.success)
        return
      }
      setLoading(false)
      setSigned(false)
    }
    verifyToken()
  }, [setUser])

  if (loading) return <Loading />

  const target = pathname === '/signin' ? '/admin' : pathname

  if (!signed)
    return <Navigate to={'/signin'} state={{ redirectTo: target }} replace />

  return props.children
}
