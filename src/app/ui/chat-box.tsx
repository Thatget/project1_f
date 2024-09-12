'use client'

import { socket } from "@/utils/socket";
import { FormEvent, useEffect } from "react";

export const ChatBox = () => {

  useEffect(() => {
    socket.connect();
    socket.on('answer', () => {
      console.log('Answer received');
    });
    return () => {
      socket.off('answer');
      socket.disconnect();
    }
  }, [])
    
  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("message", {data: "FFFFFFFFFFFFFF"})
    console.log('send button clicked')
  }

  return (
    <div className="h-screen relative flex-grow-0" >
      <div className="fixed z-10 bg-gray-50">
        <div>Info</div>
      </div>
      <div className="flex flex-col-reverse">
        <form onSubmit={handleSend} >
          <div className="relative w-full">
            <input className="w-full" />
            <button className="absolute right-0" type="submit">Send</button>
          </div>
        </form>
        <div>
          chat content !
        </div>
      </div>
    </div>
  )
}
