import { useState } from "react";
import { Link } from "react-router-dom";

export const texts = {
  alreadyHasAccount: 'Já tem uma conta? Faça login',
  NoAccount: 'Ainda não tem uma conta? Inscreva-se',
  Signup: 'Criar conta',
  Signin: 'Entrar'
}

interface ISignupFormProps {
  children?: React.ReactNode
}

export function AuthForm({ children }: ISignupFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <span className="text-3l leading-tight font-semibold">Por favor, digite suas informações de cadastro</span>
      <form className="w-full flex-col mt-6">
        <div className="flex items-center">
          <label htmlFor="email" className="font-semibold leading-tight basis-1/5">E-mail</label>
          <input type="email"
            name="email"
            id="email"
            placeholder="usuario@gmail.com"
            className="p-2 rounded-lg my-3 mx-3 basis-4/5 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
            onChange={(event) => { setEmail(event.target.value) }}
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="password" className="font-semibold leading-tight basis-1/5">Senha</label>
          <input type="password"
            name="password"
            id="password"
            placeholder="*************"
            className="p-2 rounded-lg my-3 mx-3 basis-4/5 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
            onChange={(event) => { setPassword(event.target.value) }}
          />
        </div>
      </form >
    </div >
  )
}