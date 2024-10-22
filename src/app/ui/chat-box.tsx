'use client';

import { socket } from '@/src/utils/socket';
import { useParams, usePathname } from 'next/navigation';
import { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { ChatBoxContent } from './chat-box-content';
import ChatBoxBar from './chat-box-bar';
import { TRUser } from '@/src/models/user.model';
import { TRecipiment } from '../chat/layout';

type TChatBoxType = {
  auth?: TRUser | null;
  chatId?: string | null;
  recipiment?: TRecipiment | null;
};

export const ChatBox = ({ auth, recipiment, chatId }: TChatBoxType) => {
  const [message, setMessage] = useState('');
  const router = usePathname();
  const [cRecipiment, setCrecipient] = useState<TRecipiment | null>(null);

  const { slug } = useParams<{ slug: string }>();
  let userId = null;
  let groupId = null;
  if (router.startsWith('/chat/u/')) {
    userId = slug;
  } else if (router.startsWith('/chat/g/')) {
    groupId = slug;
  }

  const handleSend = useCallback(() => {
    if (message) {
      socket.emit('message', {
        data: {
          message,
          senderId: auth?.id,
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

  useEffect(() => {
    if (recipiment) setCrecipient(recipiment);
  }, [recipiment]);

  useEffect(() => {
    socket.connect();
    socket.emit('join', auth?.id);
    return () => {
      socket.disconnect();
    };
  }, [auth?.id]);

  return (
    <div className="relative w-full flex-grow-0 p-2 m-2 bg-white rounded-2xl">
      <div className="h-full">
        <div style={{ height: 'calc(100% - 3rem)' }}>
          {cRecipiment && <ChatBoxBar recipiment={cRecipiment} />}
          <ChatBoxContent authId={auth?.id} chatId={chatId} />
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
