'use client'

import { socket } from "@/utils/socket";
import { FormEvent, useEffect } from "react";

export const Callbox = () => {

  useEffect(() => {
    return () => {
    }
  }, [])

  socket.on('connect', () => {
    console.log('Connected to server');
  })
    
  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("message", {data: "FFFFFFFFFFFFFF"})
    console.log('send button clicked')
  }

  return (
    <div className="basis-2/4 bg-slate-500">
      <form onSubmit={handleSend}>
        <video></video>
        <button>Call</button>
        <button>End</button>
      </form>
    </div>
  )
}
