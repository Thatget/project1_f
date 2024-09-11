import prisma from '@/app/lib/prisma'
import { User } from '@prisma/client';
import { hash, compare } from 'bcrypt-ts';

type TRUser = Omit<User, 'password'>;

export async function getUser(nickName: string, password: string): Promise<{data: TRUser| null}> {
  try {
    const user = await prisma.user.findUnique({
      where: {
      nickName: nickName
    }
  })

  if (!user) {
    return {
      data: null
    }
  }
  const isValidatePassword = await compare(password, user.password);

  if (!isValidatePassword) {
    return {
      data: null
    }
  }

  const { password: _, ...userWithoutPassword } = user;
  return { data: userWithoutPassword };
  } catch (error) {
    return {data: null}
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
        }
      }
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
