import React from "react"
import { AuthForm } from "../../components/auth/AuthForm";
import { getCurrentUrl } from "../../utils/get-current-url";
import { texts } from "../../utils/texts";

interface ISignUpFormProps {
  children?: React.ReactNode
}

export function SignUpForm({ children }: ISignUpFormProps) {
  return (
    <AuthForm>
      <div>{children}</div>
    </AuthForm >
  )
}