import { ChatBox } from '@/src/app/ui/chat-box';
import { NextApiRequest, NextApiResponse } from 'next';
import { SideInfo } from '../ui/side-info';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ id: 12 });
}

export default function User(params: any) {
  const { params: ss } = params;

  return (
    <div className="h-full flex flex-row">
      <ChatBox chatId={''} />
      <SideInfo />
    </div>
  );
}
