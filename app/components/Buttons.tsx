"use client";

import React from 'react'
import { signOut, signIn } from "next-auth/react";
 

export function LogoutButton() {
  return (
    <button onClick={() => signOut()} className='flex items-center justify-center gap-2 rounded-lg bg-red-500 px-8 py-3
        text-center text-sm font-semibold text-white ring-red-300 transition duration-100 hover:bg-red-600 md:text-base'>
        Выйти
    </button>
  )
};

export function LoginButton() {
    return (
      <button onClick={() => signIn("github")} className='flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-8 py-3
          text-center text-sm font-semibold text-white ring-teal-300 transition duration-100 hover:bg-teal-600 md:text-base'>
          Войти
      </button>
    )
  };

  export function MainLoginButton() {
    return (
      <button onClick={() => signIn("github")} className='w-full flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-8 py-3
          text-center text-sm font-semibold text-white ring-teal-300 transition duration-100 hover:bg-teal-600 md:text-base'>
          Войти через GitHub
      </button>
    )
  };

  export function SendMessageButton() {
    return (
      <button type='submit' className='flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-8 py-3
          text-center text-sm font-semibold text-white ring-teal-300 transition duration-100 hover:bg-teal-600 md:text-base'>
          Отправить
      </button>
    )
  };