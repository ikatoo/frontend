import { z } from 'zod'
import { UserSchema } from './User'

export const AuthResponseSchema = z.object({
  user: UserSchema.partial().optional(),
  access_token: z.string().optional(),
  error: z.string().optional()
})

export type AuthResponseType = z.infer<typeof AuthResponseSchema>

export type SignInProps = {
  password: string
  username?: string
  email?: string
}
