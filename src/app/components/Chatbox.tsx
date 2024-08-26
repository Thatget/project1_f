'use client'

import { socket } from "@/utils/socket";
import { FormEvent } from "react";

export const Chatbox = () => {

  socket.on('connect', () => {
    console.log('Connected to server');
  })
    
  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("message", {data: "FFFFFFFFFFFFFF"})
    console.log('send button clicked')
  }

  return (
    <form onSubmit={handleSend} >
      <input />
      <button type="submit">Send</button>
    </form>
  )
}
