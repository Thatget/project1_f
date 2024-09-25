'use client';

import { socket } from '@/utils/socket';
import { useParams, usePathname } from 'next/navigation';
import { FormEvent, useEffect } from 'react';

type TChatBoxType = {
  chatId?: string | null;
};
export const ChatBox = ({ chatId }: TChatBoxType) => {
  const router = usePathname();
  let type = 'chat';
  if (router.startsWith('/chat/u/')) {
    type = 'user';
  } else if (router.startsWith('/chat/g/')) {
    type = 'group';
  }

  const params = useParams<{ slug: string }>();
  useEffect(() => {
    socket.connect();
    socket.on('answer', () => {
      console.log('Answer received');
    });
    return () => {
      socket.off('answer');
      socket.disconnect();
    };
  }, []);

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit('message', { data: 'FFFFFFFFFFFFFF' });
    console.log('send button clicked');
  };

  return (
    <div className="relative w-full flex-grow-0 p-2 m-2 bg-white rounded">
      <div className="h-full">
        <div className="fixed w-full z-10 bg-yellow-300">
          <div>Info</div>
        </div>
        <div className="flex flex-col-reverse overflow-auto" style={{ height: 'calc(100% - 1.5rem)' }}>
          <div>chat content !</div>
        </div>
        <div className="sticky bottom-0 h-6">
          <form onSubmit={handleSend}>
            <div className="relative w-full">
              <input className="w-full" />
              <button className="absolute right-0" type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
