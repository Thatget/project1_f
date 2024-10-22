'use client'

import { io } from "socket.io-client";

const URL = process.env.NODE_ENV === 'production' ? "undefined" : 'http://localhost:3009';

export const socket = io(URL);
// export const p2pSocket = new P2P(socket)
