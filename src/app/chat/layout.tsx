import React from 'react';
import { getUserInfo } from '@/src/lib/dtl';
import { AsideLinks } from '../ui/aside-links';
import { NavLinks } from '../ui/nav-links';
import { Group, User } from '@prisma/client';

export type TRecipiment =
  | ({
      type: 'user';
    } & Partial<User>)
  | ({
      type: 'group';
    } & Group);

export default async function Layout({ children }: { children: React.ReactNode; params: { slug: string } }) {
  const data = await getUserInfo();
  return (
    <div className="bg-orange-200">
      <NavLinks user={data} />
      <div className="flex w-full" style={{ height: 'calc(100vh - 3rem)' }}>
        <div className="md:basis-1/4">
          <AsideLinks />
        </div>
        <main className="mx-aut md:basis-3/4">{children}</main>
      </div>
    </div>
  );
}
