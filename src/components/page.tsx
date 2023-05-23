import React from 'react'
import Chatbot from './chatbot'

export default function Page() {
  return (
    <div className='flex flex-wrap flex-col justify-center content-center place-content-center'>
        <h1 className='text-white font-bold'>¡Bienvenido! 👋 Este es mi primer ChatBot hecho con ChatGPT. </h1>
        <Chatbot/>
    </div>
  )
}
