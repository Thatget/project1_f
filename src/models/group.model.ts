import { User } from '@prisma/client';
import prisma from '../lib/prisma';

export type TRUser = Omit<User, 'password'>;

export async function getChatContent(chatId: string,skip: number, take: number ) {
  try {
    const messages = await prisma.message.findMany({
      skip,
      take,
      where: {
        messageChatId: chatId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return messages;
  }
  catch (error) {
    return null;
  }
}
  