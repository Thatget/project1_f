'use client'

import { io } from "socket.io-client";
import P2P from 'socket.io-p2p'

const URL = process.env.NODE_ENV === 'production' ? "undefined" : 'http://localhost:3000';

export const socket = io('', {path:'/real-time.io'});
// export const p2pSocket = new P2P(socket)
