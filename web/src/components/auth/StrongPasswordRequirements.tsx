interface StrongPasswordRequirementsProps {
  value: string
}

const REQUIREMENT_MATCHED = 'text-green-400 text-xs'
const REQUIREMENT_REJECTED = 'text-red-500 text-xs'

export function StrongPasswordRequirements({ value }: StrongPasswordRequirementsProps) {
  const PASSWORD_LENGTH = value.length >= 6;
  const PASSWORD_HAS_UPPERCASES = new RegExp(import.meta.env.VITE_STRONG_PASSWORD_PATTERN_UPPERCASE as string).test(value);
  const PASSWORD_HAS_NUMBERS = new RegExp(import.meta.env.VITE_STRONG_PASSWORD_PATTERN_NUMBER_REQUIRED as string).test(value);
  const PASSWORD_HAS_SPECIAL_CHARACTERS = new RegExp(import.meta.env.VITE_STRONG_PASSWORD_PATTERN_SPECIAL_CHARACTER as string).test(value)

  return (
    <div className="my-4 text-xs">
      A senha deve conter:
      <ul className="my-1">
        <li className={`${PASSWORD_LENGTH ? REQUIREMENT_MATCHED : REQUIREMENT_REJECTED}`}>6 caracteres</li>
        <li className={`${PASSWORD_HAS_UPPERCASES ? REQUIREMENT_MATCHED : REQUIREMENT_REJECTED}`}>Pelo menos uma letra maiúscula</li>
        <li className={`${PASSWORD_HAS_NUMBERS ? REQUIREMENT_MATCHED : REQUIREMENT_REJECTED}`}>Pelo menos um número</li>
        <li className={`${PASSWORD_HAS_SPECIAL_CHARACTERS ? REQUIREMENT_MATCHED : REQUIREMENT_REJECTED}`}>Pelo menos um caracter especial</li>
      </ul>
    </div>
  )
}