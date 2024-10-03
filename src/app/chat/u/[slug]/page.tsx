import { ChatBox } from '@/src/app/ui/chat-box';
import { SideInfo } from '@/src/app/ui/side-info';
import { getUserInfo } from '@/src/lib/dtl';
import prisma from '@/src/lib/prisma';
import { unstable_cache } from 'next/cache';

export default async function UserChat(params: any) {
  const auth = await getUserInfo();

  const authId = auth?.id ?? '0';

  const {
    params: { slug },
  } = params;

  const detectChat = unstable_cache(
    async () => {
      try {
        const messageChat = await prisma.messageChat.findFirst({
          where: { userIds: { hasEvery: [authId, slug] } },
        });
        return messageChat;
      } catch (error) {
        return {
          id: null,
        };
      }
    },
    [slug],
    {
      tags: ['user-message-chat'],
      revalidate: 360,
    },
  );

  const data = await detectChat();

  return (
    <div className="h-full flex flex-row">
      <ChatBox authId={authId} chatId={data?.id ?? null} />
      <SideInfo />
    </div>
  );
}
