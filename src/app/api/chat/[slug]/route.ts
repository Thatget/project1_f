import { NextRequest, NextResponse } from "next/server";
import { getChatContent } from "@/src/models/chat.model";

export const dynamic = 'force-static'
 
export async function GET(req: NextRequest, { params }:{params: {slug: string}}) {
  const response = await getChatContent( params.slug, 0,10);
   if (!response ) {
    return NextResponse.json({ data: null });
  }
  return NextResponse.json({ data: response });
}
