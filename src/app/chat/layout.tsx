import { NavLinks } from '@/app/ui/nav-links';
import { AsideLinks } from '@/app/ui/aside-links';
import { cookies } from 'next/headers';
import { getUserInfo } from '@/app/lib/dtl';

export default async function Layout({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  if (slug) {
    const data = await getUserInfo();
    console.log('data: ', data);
  }
  return (
    <div className="bg-orange-200">
      <NavLinks />
      <div className="flex w-full" style={{ height: 'calc(100vh - 3rem)' }}>
        <div className="md:basis-1/4">
          <AsideLinks />
        </div>
        <main className="mx-aut md:basis-3/4">{children}</main>
      </div>
    </div>
  );
}
