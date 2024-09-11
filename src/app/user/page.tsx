import { CallBox } from "@/app/components/CallBox";
import { ChatBox } from "@/app/components/ChatBox";
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
