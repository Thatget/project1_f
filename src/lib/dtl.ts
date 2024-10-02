import 'server-only'

import { cookies } from 'next/headers'
import { cache } from 'react'
import { decrypt } from './session'
import { redirect } from 'next/navigation'
import { getUserById } from '@/src/models/user.model'
// import { JWTPayload } from 'jose'

export const verifySession = cache(async () => {
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);
  if (!session?.id) {
    redirect('/login');
  }
  return { isAuth: true, session }
})

export const getUserInfo = cache(async () => {
  const sessionData: {isAuth: boolean, session: any} = await verifySession();
  if (!sessionData || !sessionData.session) return null;
  try {
    const {data} = await getUserById(sessionData.session.id);
    return data;
  } catch (error) {
    console.log('Failed to fetch user')
    return null
  }
})
