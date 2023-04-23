import { z } from "zod";

const STRONG_PASSWORD_PATTERN = import.meta.env.VITE_STRONG_PASSWORD_PATTERN as string
const MUST_HAVE_NUMBERS = import.meta.env.VITE_STRONG_PASSWORD_PATTERN_NUMBER_REQUIRED as string
const MUST_HAVE_UPPERCASES = import.meta.env.VITE_STRONG_PASSWORD_PATTERN_UPPERCASE as string
const MUST_HAVE_SPECIAL_CHARACTERS = import.meta.env.VITE_STRONG_PASSWORD_PATTERN_SPECIAL_CHARACTER as string

export const AuthSignupFormSchemaValidation = z.object({
  email: z.string().nonempty({ message: 'E-mail é obrigatório' }).email({ message: 'E-mail inválido' }),
  password: z.string()
    .nonempty({ message: 'Senha é obrigatória' })
    .min(6, { message: 'A senha deve conter 6 caracteres' })
    .regex(new RegExp(MUST_HAVE_NUMBERS), 'A senha deve conter números')
    .regex(new RegExp(MUST_HAVE_UPPERCASES), 'A senha deve conter uma letra maiúscula')
    .regex(new RegExp(MUST_HAVE_SPECIAL_CHARACTERS), 'A senha deve conter um caracter especial')
})

