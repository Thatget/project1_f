'use client'

import { useFormState } from "react-dom"
import { login } from "@/app/actions/auth";

export default function Page() {
  const [state, formAction] = useFormState(login, null);

  return (
    <div className="w-full h-full justify-center align-middle flex">
      <div className="mt-16 bg-green-50 w-1/2 rounded-xl">
        <form action={formAction}>
          <div className="p-2">
            <input className="p-2 w-full" type="text" name="name" placeholder="name" />
          </div>
          <div className="p-2">
            <input className="p-2 w-full" type="password" name="password" placeholder="password" />
          </div>
          <div className="p-2 w-full text-center">
            <button className="bg-green-700 p-2 pl-4 pr-4 rounded-lg">Login</button>
          </div>
          <div className="p-2 flex justify-between items-center bg-slate-100">
            <button className="bg-red-600 text-white p-2 rounded-lg">Cancel</button>
            <p>Forgot <a href="#" className="text-red-700 underline">password</a>?</p>
          </div>
        </form>
      </div>
    </div>
  )
}
