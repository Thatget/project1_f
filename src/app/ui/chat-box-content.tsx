'use client';

import { socket } from '@/src/utils/socket';
import { Message } from '@prisma/client';
import { useEffect, useState } from 'react';

type TChatBoxType = {
  authId?: string | null;
  chatId?: string | null;
};
export const ChatBoxContent = ({ authId, chatId }: TChatBoxType) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async (page: number) => {
    try {
      console.log(page);
      const response = await fetch(`/api/chat/${chatId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const { data } = await response.json();
      if (!data || !Array.isArray(data)) return [];
      return data;
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    const fetchInitMessages = async () => {
      const initMessages = await fetchMessages(0);
      setMessages(initMessages);
    };
    fetchInitMessages();
    if (authId) {
      socket.connect();
      socket.emit('join', authId);
      socket.on('message', (data) => {
        if (data) setMessages((preMessages) => [data, ...preMessages]);
      });
      return () => {
        socket.off('message');
        socket.disconnect();
      };
    }
  }, [authId, chatId]);

  return (
    <div className="flex flex-col-reverse overflow-auto h-full">
      {messages.map((message) => {
        return (
          <div key={message.id} className="w-full">
            {message.userId === authId ? (
              <p className="p-1 m-2 float-right rounded-xl bg-green-800 ">{message.content}</p>
            ) : (
              <div className="flex">
                <img src="" />
                <p className="p-1 m-2 rounded-xl bg-gray-400">{message.content}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
