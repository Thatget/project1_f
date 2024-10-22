'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TRUser } from '../../models/user.model';
import { BiFace, BiSearchAlt } from 'react-icons/bi';
import { useParams } from 'next/navigation';

export function AsideLinks() {
  const [users, setUsers] = useState<TRUser[] | []>([]);

  const { slug } = useParams<{ slug: string }>();
  useEffect(() => {
    const listUser = async () => {
      const list = await fetch('/api/users');
      const { data } = await list.json();
      if (data) setUsers(data);
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
        <div className="flex flex-col pt-3">
          {users.map((user) => {
            return (
              <Link
                href={`/chat/u/${user.id}`}
                key={user.id}
                className={`w-full hover:bg-gray-300 rounded-3xl p-2 flex   ${user.id === slug ? 'bg-gray-300' : ''}`}
              >
                {user?.avata ? (
                  <div className="w-7 h-7 border-2 border-green-600 rounded-full">
                    <img className="rounded-full w-full h-full" src={user.avata} alt={user.nickName} />
                  </div>
                ) : (
                  <BiFace size={'25'} />
                )}
                <p className="pl-2">{user.nickName}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
