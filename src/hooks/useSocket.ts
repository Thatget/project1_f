import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client";

let socket: Socket;

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!socket) {
      socket = io('http://localhost:3009');
    }
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false );
    });
  },[])

  return {socket, isConnected}
}

export default useSocket;
