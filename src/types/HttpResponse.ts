import { z } from 'zod'

export const HttpResponseSchema = z.object({
  data: z.object({}).or(z.string()).optional(),
  error: z
    .object({
      message: z.string()
    })
    .optional(),
  status: z.number().int().positive()
})

export const PartialHttpResponseSchema = HttpResponseSchema.partial()

export type HttpResponse = z.infer<typeof HttpResponseSchema>
