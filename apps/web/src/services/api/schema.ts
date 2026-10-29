import { z } from '@wrapa/forms'

export const fieldErrorSchema = z.object({
  field: z.string(),
  message: z.string(),
})

export const apiErrorSchema = z
  .object({
    code: z.string(),
    details: z.array(fieldErrorSchema).nullable(),
  })
  .nullable()

export const apiMetadataSchema = z.object({
  correlationId: z.string(),
  timestamp: z.string(),
})

export function apiEnvelopeSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema.nullable(),
    error: apiErrorSchema.optional(),
    metadata: apiMetadataSchema.optional(),
  })
}

export class ApiRequestError extends Error {
  status: number

  constructor(message: string, status = 0) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
  }
}

type Envelope<T> = {
  success: boolean
  message: string
  data: T | null
  error?: z.infer<typeof apiErrorSchema>
}

export function parseEnvelope<T>(schema: z.ZodType<Envelope<T>>, payload: unknown): T {
  const parsed = schema.parse(payload)

  if (!parsed.success || parsed.data == null) {
    const detail = parsed.error?.details?.[0]?.message
    throw new ApiRequestError(detail || parsed.message || 'Request failed')
  }

  return parsed.data
}
