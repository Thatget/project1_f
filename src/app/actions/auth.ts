'use server'

import { SignupFormSchema } from '@/src/lib/definitions';
import { redirect } from 'next/navigation';
import { createSession, deleteSession } from '@/src/lib/session';
import { getUser, createUser } from '@/src/models/user.model';

export async function login(state: any, formData: FormData) {

  const name = formData.get('name')?.toString()?? "";
  const password = formData.get('password')?.toString() ?? "";

  const { data: user } = await getUser(name, password);

  if (!user) {
    return {
      message: 'An error occurred while login.',
    }
  }
  createSession(user?.id);
  redirect('/user/23');
}

export async function signup(state: any,formData: FormData) {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data;
 
  // 3. Insert the user into the database or call an Auth Library's API
  const user = await createUser(name, email, password);

  return {
  message: 'An error occurred while creating your account.',
  }
}

export async function logout() {
  deleteSession();
  redirect('/login')
}
