'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { TRUser } from "../models/user.model";

export function SideInfo() {
  const [users, setUsers] = useState<TRUser[] | []>([]);

  useEffect(() => {
    const listUser = async () => {
      const list = await fetch('/api/user');
      const { data } = await list.json();
      if(data)
      setUsers((pre) => [...pre, ...data])
    }
    listUser();
  }, [])

  return (
    <div className="flex flex-col m-2">
      <div className="p-2 bg-white">
        <div>
          <form>
            <div>
            <input type="name" />
              <button>Searhc</button>
            </div>
          </form>
        </div>
        {
          users.map((user, index )=> {
            return (<Link href="/" key={index}>{ user.nickName }</Link>)
          })
        }
      </div>
    </div>
  )
}
