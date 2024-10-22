'use server'

import { fileSchema } from "@/src/lib/definitions";
import prisma from "@/src/lib/prisma";
import { decrypt } from "@/src/lib/session";
import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";

export async function upload(state: any, formData: FormData) {
  try {
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);
    if (!session?.id) {
      throw new Error('Invalid session');
    }
    const userId = session.id as string;
    const file = formData.get('avata') as File;
    const validateAvata = fileSchema.safeParse({
      avata: formData.get('avata'),
    })
    if (!validateAvata.success) {
      return {
        errors: validateAvata.error.flatten().fieldErrors,
      }
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const id = randomUUID();
    const filePath = `/assets/images/${id}.jpeg`;
    await writeFile(`public${filePath}`, buffer);
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        avata: filePath,
      },
      include: {
        messageChats: true
      }

    })
    return {
      status: 'ok'
    }
  } catch(error) {
    throw new Error('Failed to store avata');
  }
}
