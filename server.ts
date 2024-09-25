import express from 'express';
import next from 'next';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const  port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();


app.prepare().then(() => {
  const server = express();
  const appServer = createServer(server);
  const io = new Server(appServer, {
    path: '/real-time.io',
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
  console.log('a new client connected');
  socket.on('message', (arg) => {
    console.log(arg)
    io.emit('answer', { data: 'FFFFFFFFF' });
  });

  socket.on('call', (stream) => {
    console.log(stream);
    // writeStream.write(Buffer.from(new Uint8Array(stream)));
    io.emit('call:answer', stream);
  });

  socket.on('disconnect', () => {
    console.log("disconect");
  })
})

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen( port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  })
});
