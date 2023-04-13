import React from "react"
import { AuthForm } from "../../components/auth/AuthForm";
import { getCurrentUrl } from "../../utils/get-current-url";
import { texts } from "../../utils/texts";

interface ISignUpFormProps {
  children?: React.ReactNode
}

export function SignUpForm({ children }: ISignUpFormProps) {
  return (
    <AuthForm buttonText={texts.Signup}
      footerText={texts.alreadyHasAccount}
      title={texts.SignupTitle}
      redirectUrl={texts.SignInUrl}
      currentUrl={getCurrentUrl()}>
      <div>{children}</div>
    </AuthForm >
  )
}