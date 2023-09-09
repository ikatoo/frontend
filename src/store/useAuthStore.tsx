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
  signin: (credentials: SignInProps) => Promise<AuthResponseType>
  signout: () => void
  verifyToken: (token: string) => Promise<AuthResponseType>
}

export const useAuthStore = create<UseAuthProps>((set) => ({
  user: undefined,
  signin: async (credentials) => {
    const response = await authService.signIn(credentials)
    const validSignInResponse = AuthResponseSchema.safeParse(response.data)

    if (validSignInResponse.success) {
      const { data } = validSignInResponse
      set(() => ({ user: data.user }))
      return data
    }

    return { error: validSignInResponse.error.message }
  },
  signout: async () => {
    await authService.signOut()
    set(() => ({ user: undefined }))
  },
  verifyToken: async (token: string) => {
    const response = await authService.verifyToken(`${token}`)
    const validResponse = AuthResponseSchema.safeParse(response?.data)

    if (validResponse.success) {
      const { data } = validResponse
      set(() => ({ user: data.user }))
      return data
    }

    return { error: validResponse.error.message }
  }
}))
