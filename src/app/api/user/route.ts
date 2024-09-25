import { NextResponse } from "next/server";
import { getUsers, TRUser } from "../../models/user.model";

export const dynamic = 'force-static'
 
export async function GET(): Promise<NextResponse<{data: TRUser[] | null}>> {
  const response: { data: TRUser[] | null } = await getUsers(0, 20, 'asc');
 
  if (!response || !response?.data) {
    return NextResponse.json({ data: null });
  }
  return NextResponse.json({ data: response?.data });
}
