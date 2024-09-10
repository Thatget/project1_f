import prisma from '@/app/lib/prisma'
import { hash } from 'bcrypt-ts';

export async function getUser(nickName: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
      nickName: nickName
    }
  })
  return { data: user}
  } catch (error) {
    return {user: null}
  }
}

export async function createUser(nickName: string, email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        nickName: nickName
      },
      select: {
        nickName: true
      }
    })
    if (user) {
      return {
        data: {
          exit: true,
          user
      } }
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        nickName,
        email,
        password: hashedPassword
      }
    })
    return {
      exit: false,
      user: newUser
    }
  } catch (error) {
    return {user: null}
  }
}
