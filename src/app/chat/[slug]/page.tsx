import prisma from '@/app/lib/prisma';
import { ChatBox } from '@/app/ui/chat-box';
import { SideInfo } from '@/app/ui/side-info';
import { unstable_cache } from 'next/cache';

export default async function Chat(params: any) {
  const {
    params: { slug },
  } = params;
  const chatId: String = slug ?? '';
  //   const detectChat = unstable_cache(
  //   async () => {
  //     const chatMessage = await prisma.messageChat.findUnique({where: {id:  String(slug)}});
  //     const groupId = chatMessage?.groupId;
  //     return groupId;
  //     },
  //     [slug],
  //     {
  //       tags: ['message-chat'],
  //       revalidate: 360
  //     }
  //   );
  //
  //   const data = await detectChat();

  return (
    <div className="h-full flex flex-row">
      <ChatBox chatId={chatId} />
      <SideInfo />
    </div>
  );
}
