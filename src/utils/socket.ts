'use client'

import { io } from "socket.io-client";

const URL = process.env.NODE_ENV === 'production' ? "undefined" : 'https://3119-2405-4803-fe33-300-88b9-a023-19f3-808d.ngrok-free.app';

export const socket = io(URL);
// export const p2pSocket = new P2P(socket)
