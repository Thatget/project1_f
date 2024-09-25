'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TRUser } from '../models/user.model';

export function AsideLinks() {
  const [users, setUsers] = useState<TRUser[] | []>([]);

  useEffect(() => {
    const listUser = async () => {
      const list = await fetch('/api/user');
      const { data } = await list.json();
      if (data) setUsers((pre) => [...pre, ...data]);
    };
    listUser();
  }, []);

  return (
    <aside className="w-full flex flex-col h-full">
      <div className="bg-white m-2 p-2 rounded-md h-full">
        <div className="">
          <form>
            <div>
              <input type="name" />
              <button>Searhc</button>
            </div>
          </form>
        </div>
        {users.map((user, index) => {
          return (
            <div key={index}>
              <Link href={`/chat/u/${user.id}`}>{user.nickName}</Link>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
