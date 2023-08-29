import { z } from 'zod'

export const EmailSchema = z
  .string()
  .email('Please, fill in a valid email address.')

export type Email = z.infer<typeof EmailSchema>
