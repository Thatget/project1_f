import prisma from '@/app/lib/prisma'
import { User } from '@prisma/client';
import { hash, compare } from 'bcrypt-ts';

export type TRUser = Omit<User, 'password'>;
type TOderBy = 'desc' | 'asc';

export async function getUserfff(nickName: string, password: string): Promise<{data: TRUser| null}> {
  try {
    return null
  }
  catch (error) {
    return null;
  }
}
