import { z } from 'zod'

export const HttpResponseSchema = z.object({
  data: z.object({}).optional(),
  error: z
    .object({
      message: z.string()
    })
    .optional(),
  // .or(z.any()),
  status: z.number().int().positive()
})

export const PartialHttpResponseSchema = HttpResponseSchema.partial()

export type HttpResponse = z.infer<typeof HttpResponseSchema>
