import { Chatbox } from "@/app/components/Chatbox";
import { socket } from "@/utils/socket";
import { NextApiRequest, NextApiResponse } from "next";
import { FormEvent } from "react";

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ id: 12 })
}

export default function Blog(params: any) {
    const { params: ss } = params;

    return (
        <div>
            <h1>Blog {ss.id}</h1>
            <Chatbox />
        </div>
    )
}
