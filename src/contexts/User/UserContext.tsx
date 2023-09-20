import { createContext, useContext } from 'react'
import { SignInProps } from 'src/types/Auth'
import { PartialUser } from 'src/types/User'

export type UserContextProps = {
  user: PartialUser | undefined
  setUser: (user: PartialUser) => void
  signOut: () => void
  signIn: (credentials: SignInProps) => void
}

export const UserContext = createContext({
  user: undefined,
  setUser: () => null,
  signOut: () => null,
  signIn: () => null
} as UserContextProps)

export const useUser = () => useContext(UserContext)
