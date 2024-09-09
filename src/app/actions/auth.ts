import bcrypt from 'bcrypt-ts';
import { SignupFormSchema, FormState } from '@/app/lib/definitions';
import { redirect } from 'next/navigation';
import { deleteSession } from '@/app/lib/session';
 
export async function signup(state: FormState, formData: FormData) {
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
  const { name, email, password } = validatedFields.data
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10)
 
  // 3. Insert the user into the database or call an Auth Library's API
  // const data = await db
  //   .insert(users)
  //   .values({
  //     name,
  //     email,
  //     password: hashedPassword,
  //   })
  //   .returning({ id: users.id })
 
  // const user = data[0]
  const user = {};
 
  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    }
  }
}

export async function logout() {
  deleteSession();
  redirect('/login')
}