import { z } from "zod";

const STRONG_PASSWORD_PATTERN = import.meta.env.VITE_STRONG_PASSWORD_PATTERN as string

export const AuthSignupFormSchemaValidation = z.object({
  email: z.string().nonempty({ message: 'E-mail é obrigatório' }).email({ message: 'E-mail inválido' }),
  password: z.string()
    .nonempty({ message: 'Senha é obrigatória' })
    .regex(new RegExp(STRONG_PASSWORD_PATTERN), { message: 'Senha fora do padrão' })
})