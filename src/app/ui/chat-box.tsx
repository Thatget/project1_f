'use client';

import { socket } from '@/src/utils/socket';
import { useParams, usePathname } from 'next/navigation';
import { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { ChatBoxContent } from './chat-box-content';

type TChatBoxType = {
  authId?: string | null;
  chatId?: string | null;
};

export const ChatBox = ({ authId, chatId }: TChatBoxType) => {
  const [message, setMessage] = useState('');
  const router = usePathname();

  const { slug } = useParams<{ slug: string }>();
  let userId = null;
  let groupId = null;
  if (router.startsWith('/chat/u/')) {
    userId = slug;
  } else if (router.startsWith('/chat/g/')) {
    groupId = slug;
  }

  useEffect(() => {
    socket.connect();
    socket.emit('join', authId);
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSend = useCallback(() => {
    if (message) {
      socket.emit('message', {
        data: {
          message,
          senderId: authId,
          recipientId: userId,
          groupId,
          chatId,
        },
      });
      setMessage('');
    }
  }, [message]);

  const checkAnswer = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSend();
        // event.preventDefault();
        return false;
      }
    },
    [handleSend],
  );

  return (
    <div className="relative w-full flex-grow-0 p-2 m-2 bg-white rounded-2xl">
      <div className="h-full">
        <div style={{ height: 'calc(100% - 3rem)' }}>
          <ChatBoxContent authId={authId} chatId={chatId} />
        </div>
        <div className="sticky bottom-0 mb-8 h-12">
          <div className="relative w-full">
            <input
              className="w-full border-2 border-green-500 rounded-xl pt-1 outline-none"
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.currentTarget.value);
              }}
              onKeyUp={checkAnswer}
            />
            <button className="absolute right-0 bg-green-900 p-1 rounded-lg" type="button" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
