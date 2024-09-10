import { signup } from "@/app/actions/auth"

export default function Page() {
  return (
    <div className="w-full h-h-full justify-center align-middle flex">
      <div className="mt-16 bg-gray-50 p-4 rounded-md">
        <form action={signup}>
          <div className="p-3">
            <input className="p-3" placeholder="user name" name="name" />
          </div>
          <div className="p-3">
            <input className="p-3" placeholder="password" name="password" type="password" />
          </div>
          <div className="p-3 text-center">
            <button className="p-3 w-full rounded-lg bg-green-500">Submit</button>
          </div>
        </form>
        <div className="flex">
          <input type="checkbox" />
          <label>Remember me</label>
        </div>
        <div className="flex justify-between p-3 items-center">
          <button className="text-white bg-red-700 p-1 rounded-lg">Cancel</button>
          <div>forgot <a href="#">password</a></div>
        </div>
      </div>
    </div>
  )
}
