import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../libs/firebase";
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { http } from "../../libs/axios";
import { AuthSignupFormSchemaValidation } from "../../utils/authSignupFormSchemaValidation";
import { useZorm } from "react-zorm";
import { ErrorMessage } from "./ErrorMessage";

interface ISignupFormProps {
  children?: React.ReactNode;
  title: string;
  buttonText: string;
  footerText: string;
  redirectUrl: string;
  currentUrl: string
}
export function AuthForm({ children, title, buttonText, footerText, redirectUrl, currentUrl }: ISignupFormProps) {
  const { ref, fields, errors, validation, validate } = useZorm("auth", AuthSignupFormSchemaValidation, {
    onValidSubmit: async (event) => {
      event.preventDefault()

      const { email, password } = event.data;

      if (currentUrl.includes('signup')) {
        await handleSignUp(email, password);
      }

      if (currentUrl.includes('signin')) {
        await handleSignIn(email, password);
      }
    }
  })

  const navigate = useNavigate()

  const disabled = validation?.success === false;

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [
    signInWithEmailAndPassword,
  ] = useSignInWithEmailAndPassword(auth);

  async function handleSignUp(email: string, password: string) {
    await createUserWithEmailAndPassword(email, password)
  }

  async function handleSignIn(email: string, password: string) {
    const session = await signInWithEmailAndPassword(email, password);

    if (session) {
      const token = await session.user.getIdToken()

      http.defaults.headers['authorization'] = `Bearer ${token}`
      http.post('/users/login', { email, password }, { withCredentials: true })

      navigate('/logged')
    }
  }

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <span className="text-3l leading-tight font-semibold">{title}</span>
      <form className="w-full flex-col mt-6" ref={ref}>
        <div className="flex items-center">
          <label htmlFor="email" className="font-semibold leading-tight basis-1/5">E-mail</label>
          <input type="email"
            name={fields.email()}
            id="email"
            placeholder="usuario@gmail.com"
            className={`p-2 rounded-lg my-3 mx-3 basis-4/5 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900 ${errors.password() ? 'ring-1 ring-red-500' : ''}`}
          />
        </div>
        {errors.email(error => (
          <ErrorMessage message={error.message} />
        ))}
        <div className="flex items-center">
          <label htmlFor="password" className="font-semibold leading-tight basis-1/5">Senha</label>
          <input type="password"
            name={fields.password()}
            id="password"
            placeholder="*************"
            className={`p-2 rounded-lg my-3 mx-3 basis-4/5 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900 ${errors.password() ? 'ring-1 ring-red-500' : ''}`}
          />
        </div>
        {errors.password(error => (
          <ErrorMessage message={error.message} />
        ))}
        <button type="submit"
          className="mt-6 rounded-lg p-4 w-full flex items-center justify-center gap-3 font-semibold bg-violet-500 hover:bg-violet-700 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
          disabled={disabled}>
          {buttonText}
        </button>
        <span className="inline-block mt-4">
          {footerText.split('?')[0] + '?'}
          <Link to={redirectUrl} className="hover:text-violet-300 transition-colors">
            {footerText.split('?')[1]}
          </Link>
        </span>
      </form >
    </div >
  )
}