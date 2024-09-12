import 'server-only'

import { cookies } from 'next/headers'
import { cache } from 'react'
import { decrypt } from './session'
import { redirect } from 'next/navigation'

export const verifySession = cache(async () => {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
  if (!session?.id) {
    redirect('/login');
  }
  return { isAuth: true, id: session.id }
})

export const getUser = cache( async () => {
  const session = await verifySession();
  if (!session) return null;
  try {
    const data = getUser()
  } catch (error) {
    
  }
})
