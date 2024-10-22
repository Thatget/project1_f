'use server'

import { groupCreateFormSchema } from "@/src/lib/definitions";
import { decrypt } from "@/src/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function create(state: any, formData: FormData) {
  try {
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);
    if (!session?.id) {
      redirect('/');
    }
   
    // const userId = session.id as string;
    const validateAvata = groupCreateFormSchema.safeParse({
      name: formData.get('name'),
      logo: formData.get('logo'),
      privilege: formData.get('privilege'),
      members: formData.get('members'),
    })
    if (!validateAvata.success) {
      return {
        errors: validateAvata.error.flatten().fieldErrors,
      }
    }
    redirect('/');
  } catch(error) {
    redirect('/');
  }
}
