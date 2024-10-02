import { User } from '@prisma/client';

export type TRUser = Omit<User, 'password'>;
type TOderBy = 'desc' | 'asc';

export async function getUserfff(nickName: string, password: string): Promise<{data: TRUser| null}> {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          {data: null}
        );
      }, 300);
    });
  }
  catch (error) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          {data: null}
        );
      }, 300);
    });
  }
}
