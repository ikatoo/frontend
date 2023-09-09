import { z } from 'zod'

// export type User = {
//   id: string
//   username: string
//   name: string
//   email: string
//   password?: string
//   avatar: {
//     url: string
//     alt: string
//   }
// }

export const UserSchema = z.object({
  id: z.number().int(),
  username: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string().optional(),
  avatar: z.object({
    url: z.string(),
    alt: z.string()
  })
})

export type User = z.infer<typeof UserSchema>

export type PartialUser = Partial<User>

export type UserSignUp = {
  name: string
  email: string
  password: string
}
