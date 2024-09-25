import { getUserInfo } from '@/app/lib/dtl';
import prisma from '@/app/lib/prisma';
import { ChatBox } from '@/app/ui/chat-box';
import { SideInfo } from '@/app/ui/side-info';
import { unstable_cache } from 'next/cache';

export default async function UserChat(params: any) {
  const auth = await getUserInfo();
  const authId = auth?.data?.id ?? '0';

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
        return null;
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
      <ChatBox chatId={data?.id ?? null} />
      <SideInfo />
    </div>
  );
}
