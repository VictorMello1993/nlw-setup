import React from "react"
import { AuthForm } from "../../components/auth/AuthForm";
import { texts } from "../../utils/texts";

interface ISignUpFormProps {
  children?: React.ReactNode
}

export function SignInForm({ children }: ISignUpFormProps) {
  return (
    <AuthForm buttonText={texts.Signin}
      footerText={texts.NoAccount}
      title={texts.SigninTitle}
      redirectUrl={texts.SignupUrl}>
      <div>{children}</div>
    </AuthForm >
  )
}