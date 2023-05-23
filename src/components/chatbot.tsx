import React, { useState, ChangeEvent } from 'react';
import { getChatGPT } from '../service/chatGpt';
import { message } from '../interfaces';

export default function Chatbot() {

  const get_hours = () => {
    let fechaHora = new Date();
    let hours = fechaHora.getHours();
    let minutes = fechaHora.getMinutes();

    return hours +":"+ minutes;
  }

  let firts_hour = get_hours()
  const CONVERSATION = {
      id: '1',
      content: '¡Hola, un placer hablar contigo!',
      hs: firts_hour,
      sender: "Clown"
    }

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<message[]>([CONVERSATION]);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }

  const handleSend = () => {
    if (message.trim() !== "") {
      let res = get_hours()
      console.log(res)
      const newMessage = {  id: String(Date.now()), content: message, hs: res, sender: 'Tu' };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage("");
    }

    getChatGPT(message)
      .then(response => {
         console.log(response)
         let res = get_hours()
        const botMessage = { id: response.id, content: response.text, hs: res, sender: 'Clown' };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // console.log("first", firts_hour)
  // console.log(message)
  // console.log(messages)

  const userMessage = "bg-[#b1bac8] p-6 max-w-fit rounded-3xl rounded-br-none shadow-sm"
  const BotMessage = "bg-white p-6 max-w-fit rounded-3xl rounded-bl-none shadow-sm"

  return (
   <div>

<div className=' overflow-auto pt-6 px-20 bg-[#6f6a62] rounded-t-lg max-w-xl max-h-[75vh]'>

{/* SOLO MENSAJES */}
<div className='messages flex flex-col mb-12 w-full'>

{messages.map((msg, index) => (
  <div key={index} className={msg.sender === 'Clown' ? "mb-2" : "mb-2 place-self-end"}>
   <div className={msg.sender === 'Clown' ? BotMessage : userMessage}>
   <p className='mb-1'>{msg.sender}</p>
    <small className='text-gray-700 font-light'>{msg.content}</small>
   </div>
    <small className='p-2 font-light'>{msg.hs}</small>
  </div>
))}

</div>

{/* SOLO MENSAJES */}

</div>

<form action='#' className='flex py-6 px-6 bg-[#59554f] w-full max-w-xl rounded-b-lg space-x-2'>
<input type="text" placeholder='Escribe tu mensaje' value={message} onChange={handleChange} className='rounded px-4 py-2 w-full focus:outline-none font-light' />
<button onClick={handleSend} className='text-white bg-[#6f6a62] mr-4 rounded px-4 py-2'>Enviar</button>
</form>

   </div>
  )
}
