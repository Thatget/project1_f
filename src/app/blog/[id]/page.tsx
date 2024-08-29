import { CallBox } from "@/app/components/CallBox";
import { ChatBox } from "@/app/components/ChatBox";
import { NextApiRequest, NextApiResponse } from "next";

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ id: 12 })
}

export default function Blog(params: any) {
  const { params: ss } = params;

  return (
    <div className="flex flex-row">
      {/* <h1>Blog {ss.id}</h1> */}
      <CallBox />
      {/* <ChatBox /> */}
    </div>
  )
}
