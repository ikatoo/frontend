import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage
} from 'src/helpers/localStorage'
import authService from 'src/services/authService'
import {
  AuthResponseSchema,
  AuthResponseType,
  SignInProps
} from 'src/types/Auth'
import { PartialUser } from 'src/types/User'
import { create } from 'zustand'

type UseAuthProps = {
  user: PartialUser | undefined
  loading: boolean
  signin: (credentials: SignInProps) => Promise<AuthResponseType>
  signout: () => void
  verifyToken: () => Promise<AuthResponseType>
}

export const useAuthStore = create<UseAuthProps>((set) => ({
  user: undefined,
  loading: false,
  signin: async (credentials) => {
    set(() => ({ loading: true }))

    const response = await authService.signIn(credentials)
    const validSignInResponse = AuthResponseSchema.safeParse(response.data)

    if (validSignInResponse.success) {
      const { data } = validSignInResponse

      const { accessToken, user } = data
      setLocalStorage('token', accessToken ?? '')

      set(() => ({ user, loading: false }))
      return data
    }

    set(() => ({ loading: false }))
    return { error: validSignInResponse.error.message }
  },
  signout: async () => {
    set(() => ({ loading: true }))

    await authService.signOut()
    removeLocalStorage('token')
    set(() => ({ user: undefined, loading: false }))
  },
  verifyToken: async () => {
    set(() => ({ loading: true }))
    const accessToken = getLocalStorage('token')
    if (!accessToken) {
      set(() => ({ user: undefined, loading: false }))

      return { error: 'Unauthorized' }
    }
    const response = await authService.verifyToken(accessToken)
    const validResponse = AuthResponseSchema.safeParse(response?.data)

    if (validResponse.success) {
      const { data } = validResponse
      set(() => ({ user: data.user, loading: false }))
      return data
    }

    removeLocalStorage('token')
    set(() => ({ user: undefined, loading: false }))

    return { error: validResponse.error.message }
  }
}))
