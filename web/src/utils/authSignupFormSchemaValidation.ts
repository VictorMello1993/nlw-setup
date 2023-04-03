import { z } from "zod";

export const AuthSignupFormSchemaValidation = z.object({
  email: z.string().email(),
  password: z.string().regex(import.meta.env.VITE_STRONG_PASSWORD_PATTERN as RegExp)
})