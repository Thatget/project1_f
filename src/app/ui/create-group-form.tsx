import { TRUser } from '@/src/models/user.model';
import Image from 'next/image';
import React from 'react';

type Props = {
  user: TRUser;
};

const CreateGroupForm = ({ user }: Props) => {
  return (
    <form>
      <div className="flex flex-col p-2">
        <div className="flex w-11 h-11 rounded-full items-center">
          <Image
            className="rounded-full w-full"
            src={user?.avata || ''}
            alt={user?.displayName || ''}
            width={200}
            height={200}
          />
          <div>
            <h6 className="pl-5">{user?.displayName || user?.nickName}</h6>
            administrator
          </div>
        </div>
      </div>
      <div>
        <div className="relative pt-2">
          <label className="absolute top-5 left-4">Title</label>
          <input
            type="text"
            name="title"
            className="w-full outline-none p-5 border-1 border-slate-400 border rounded-lg mt-3"
          />
        </div>
        <div className="relative pt-2">
          <label className="absolute top-5 left-4">Chọn quyền riêng tư</label>
          <select className="w-full outline-none p-5 border-1 border-slate-400 border rounded-lg mt-3" name="privilege">
            <option className="p-2" value={'public'}>
              Công khai
            </option>
            <option className="p-2" value={'private'}>
              Riêng tư
            </option>
          </select>
        </div>
        <div className="relative mt-5 p-2 w-full min-h-48 border border-slate-500 rounded-xl">
          <h5 className="absolute">Invite friends</h5>
          <input className="outline-none" />
        </div>
      </div>
      <div className="pt-4">
        <button className="w-full p-2 rounded-xl bg-blue-500 text-white font-bold">Create</button>
      </div>
    </form>
  );
};

export default CreateGroupForm;
