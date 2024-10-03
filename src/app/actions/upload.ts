'use server'

import prisma from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";

export async function upload(formData: FormData) {
  try {
    const cookie = cookies().get('session')?.value;
    const userId = cookie;
    const file = formData.get('avata') as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const id = randomUUID();
    const filePath = `public/assest/images/${id}.jpeg`;
    await writeFile(filePath, buffer);
    prisma.user.update({
      data: {
        avata: filePath,
      },
      where: {
        id: userId
      }
    })
  return filePath;
  } catch(error) {
    console.error(error);
    throw new Error('Failed to store avata');
  }
  
}
