import React, { useState, Children } from "react"
import { Link } from "react-router-dom";
import { AuthForm, texts } from "../../components/auth/AuthForm";

interface ISignUpFormProps {
  children?: React.ReactNode
}

export function SignInForm({ children }: ISignUpFormProps) {
  return (
    <AuthForm>
      {children}
      <button type="submit" className="mt-6 rounded-lg p-4 w-full flex items-center justify-center gap-3 font-semibold bg-violet-500 hover:bg-violet-700 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
        {texts.Signin}
      </button>
      <span className="inline-block mt-4">
        {texts.NoAccount.split('?')[0]} < Link to="/signin" className="hover:text-violet-300 transition-colors">{texts.NoAccount.split('?')[1]}</Link>
      </span>
    </AuthForm >
  )
}