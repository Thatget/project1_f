'use server'

import { SignupFormSchema } from '@/app/lib/definitions';
import { redirect } from 'next/navigation';
import { deleteSession } from '@/app/lib/session';
import { createUser } from '@/app/models/user.model';
 
export async function signup(formData: FormData) {
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
  const user = createUser(name, email, password);

  return {
  message: 'An error occurred while creating your account.',
  }
}

export async function logout() {
  deleteSession();
  redirect('/login')
}
