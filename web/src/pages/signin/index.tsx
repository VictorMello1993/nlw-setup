import React from "react"
import { AuthForm } from "../../components/auth/AuthForm";
import { getCurrentUrl } from "../../utils/get-current-url";
import { texts } from "../../utils/texts";

interface ISignUpFormProps {
  children?: React.ReactNode
}

export function SignInForm({ children }: ISignUpFormProps) {
  return (
    <AuthForm buttonText={texts.Signin}
      footerText={texts.NoAccount}
      title={texts.SigninTitle}
      redirectUrl={texts.SignupUrl}
      currentUrl={getCurrentUrl()}>
      <div>{children}</div>
    </AuthForm >
  )
}