import { CallBox } from "@/app/ui/call-box";
import { ChatBox } from "@/app/ui/chat-box";
import { NextApiRequest, NextApiResponse } from "next";

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ id: 12 })
}

export default function User(params: any) {
  const { params: ss } = params;

  return (
    <div className="flex flex-row">
      <CallBox />
      <ChatBox />
    </div>
  )
}
