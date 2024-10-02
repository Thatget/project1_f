'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TRUser } from '../../models/user.model';
import { BiSearchAlt } from 'react-icons/bi';

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
      <div className="bg-white m-2 p-2 rounded-2xl h-full">
        <div className="">
          <form>
            <div className="flex relative rounded-lg">
              <input
                type="name"
                className="p-2 pb-4 outline-none border-solid border-2 border-lime-600 rounded-full w-full mr-1"
              />
              <button className="top-0 right-0 absolute p-1 bg-lime-600 rounded-full m-1">
                <BiSearchAlt size={'40'} className="p-1" />
              </button>
            </div>
          </form>
        </div>
        {users.map((user, index) => {
          return (
            <div key={index} className="w-full">
              <Link href={`/chat/u/${user.id}`}>{user.nickName}</Link>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
