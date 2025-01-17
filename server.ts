import { createServer } from "node:http";
import express from 'express';
import { env } from "node:process";
import next from "next";
import { Server } from "socket.io";
import prisma from "./src/lib/prisma";
//  config using dotenv !
import * as dotenv from "dotenv";
dotenv.config();

const dev = env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(env.PORT || "3000");

// when using middleware `hostname` and `port` must be provided below
const appNext = next({ dev, hostname, port });
const handler = appNext.getRequestHandler();

appNext.prepare().then(() => {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000", " https://3119-2405-4803-fe33-300-88b9-a023-19f3-808d.ngrok-free.app"],
      methods: ["GET", "POST"],
      credentials: false
    }
  });

  io.on("connection", (socket) => {
    socket.on('join', (authId)=> {
      socket.join(authId);
    });
    socket.on('message', async ({data}) => {
      try {
        const messageChat = await insertChat(
          data.senderId,
          data.message,
          data.messageId,
          data.recipientId,
          data.groupId
        );
        if (messageChat) {
          socket.to(data.recipientId || data.groupId).emit("message", messageChat);
        } else {
          socket.emit("error", "Message could not be sent");
        }
      } catch(error) {
        socket.to(data.senderId).emit('error',"lỗi gởi tin nhắn!");
      }
    });
    socket.on('call', async (payload) => {
      socket.to(payload.senderId).emit('call', payload);
    })
  });

  app.all("*", (req, res) => {
    return handler(req, res);
  })

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});


async function insertChat(userId: string, content: string, messageChatId: string, recipientId?: string, groupId?: string ) {
  try {
    console.log(userId, recipientId);
    let chat = null;
    // Handle one-to-one chat
    if (recipientId) {
      // const recipienUser = await prisma.user.findUnique({where: {id: recipientId}});
      chat = await prisma.messageChat.findFirst({
        where: { userIds: { hasEvery: [recipientId, userId] } },
      });
      if (chat) {
        const message = await prisma.message.create({
          data: {
            userId,
            content,
            messageChatId: chat.id
          }});
        return message;
      } else {
        const chat = await prisma.messageChat.create({
          data: {
            userIds: [userId,  recipientId],
            groupId
          }
        });

        const message = await prisma.message.create({
          data: {
            userId,
            content,
            messageChatId: chat.id,
            groupId,
  
          }
        });
        return message;
      }
      // Handle group chat
    } else if (groupId) {
      // const group = await prisma.group.findUnique({where: {id: groupId}});
      chat = await prisma.messageChat.findFirst({
        where:{ groupId },
      });
      if (!chat) {
        const chat = await prisma.messageChat.create({
          data: {
            userIds: [],
            groupId
          }
        });
        const message = await prisma.message.create({
          data: {
            userId,
            content,
            messageChatId: chat.id,
            groupId,
  
          }
        });
        return message;
      } else {
        const message = await prisma.message.create({
          data: {
            userId,
            content,
            messageChatId
          }
        });
        return message;
      }
    }
    
  }catch(error){
    return null;
  }
}
