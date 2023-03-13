import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../libs/firebase";
import { texts } from "../../utils/texts";
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { Auth } from "firebase/auth";

interface ISignupFormProps {
  children?: React.ReactNode;
  title: string;
  buttonText: string;
  footerText: string;
  redirectUrl: string;
}
export function AuthForm({ children, title, buttonText, footerText, redirectUrl }: ISignupFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [
    signInWithEmailAndPassword,
  ] = useSignInWithEmailAndPassword(auth);

  async function handleSignOut(event: React.SyntheticEvent) {
    event.preventDefault();
    await createUserWithEmailAndPassword(email, password)
  }

  async function handleSignIn(event: React.SyntheticEvent) {
    event.preventDefault();
    await signInWithEmailAndPassword(email, password);
  }

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <span className="text-3l leading-tight font-semibold">{title}</span>
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
        <button type="submit"
          className="mt-6 rounded-lg p-4 w-full flex items-center justify-center gap-3 font-semibold bg-violet-500 hover:bg-violet-700 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
          onClick={buttonText === texts.Signup ? handleSignOut : handleSignIn}>
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
