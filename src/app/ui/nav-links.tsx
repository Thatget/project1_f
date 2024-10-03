'use client';

import Link from 'next/link';
// import { usePathname } from 'next/navigation';

export function NavLinks(user: any) {
  console.log('nav-link: ', user.id);
  return (
    <nav className="sticky top-0 w-full h-12 bg-slate-50 flex items-center z-50">
      <div className="w-12">
        <img
          className="rounded"
          width={'100%'}
          height={'auto'}
          src="https://images2.thanhnien.vn/528068263637045248/2024/1/25/c3c8177f2e6142e8c4885dbff89eb92a-65a11aeea03da880-1706156293184503262817.jpg"
        />
      </div>
      <Link href={'/'}>sadfas</Link>
    </nav>
  );
}
