import { useState } from "react"
import { Link } from "react-router-dom";
import { AuthForm } from "../../components/auth/AuthForm";


export function SignUpForm() {
  return (
    <AuthForm>
      <button type="submit" className="mt-6 rounded-lg p-4 w-full flex items-center justify-center gap-3 font-semibold bg-violet-500 hover:bg-violet-700 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
        Criar conta
      </button>
      <span className="inline-block mt-4">
        Já possui a sua conta? <Link to="/signin" className="hover:text-violet-300 transition-colors">Faça login</Link>
      </span>
    </AuthForm>
  )
}