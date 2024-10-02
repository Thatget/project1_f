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
  const io = new Server(server);

  io.on("connection", (socket) => {
    socket.on('join', (authId)=> {
      console.log("authId:      ", authId);
      socket.join(authId);
    });
    socket.on('message', async ({data}) => {
      try {
        const messageChat = await insertChat(data.senderId, data.message, data.messageId, data.recipientId);
        socket.to(data.recipientId).emit('message', data);
      } catch(error) {
        socket.to(data.senderId).emit('error',"lỗi gởi tin nhắn!");
      }
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
    if (recipientId) {
      // const recipienUser = await prisma.user.findUnique({where: {id: recipientId}});
      chat = await prisma.messageChat.findFirst({
        where: { userIds: { hasEvery: [recipientId, userId] } },
      });
      if (!chat) {
        console.log("SSSSSSSSS:SA");
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
