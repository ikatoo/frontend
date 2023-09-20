import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Loading from 'src/components/Loading'
import { useUser } from 'src/contexts/User/UserContext'
import { getLocalStorage } from 'src/helpers/localStorage'
import authService from 'src/services/authService'

export const Private = (props: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true)
  const [signed, setSigned] = useState(false)
  const { setUser } = useUser()

  useEffect(() => {
    const verifyToken = async () => {
      const token = getLocalStorage('token')
      if (!token) {
        setLoading(false)
        return
      }
      const { status, data } = await authService.verifyToken(token)
      if (status === 200) {
        !!data && 'user' in data && !!data.user && setUser(data.user)
        setLoading(false)
        setSigned(true)
        return
      }
      setLoading(false)
      setSigned(false)
    }
    verifyToken()
  }, [setUser])

  if (loading) return <Loading />

  if (!signed) return <Navigate to={'/signin'} replace />

  return props.children
}
