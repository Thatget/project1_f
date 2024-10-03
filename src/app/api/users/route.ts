import { NextResponse } from "next/server";
import { getUsers, TRUser } from "../../../models/user.model";
import { cookies } from "next/headers";

export const dynamic = 'force-static'
 
export async function GET() {
  try {
    const users = cookies().get('session');
    console.log("users cookie: ", users);
    const response: { data: TRUser[] | null } = await getUsers(0, 20, 'asc');
    if (!response || !response?.data) {
      return NextResponse.json({ data: null });
    }
    return NextResponse.json({ data: response?.data });
  } catch (error) {
    return new Response('server error', {
      status: 500,
  });
  }
}
