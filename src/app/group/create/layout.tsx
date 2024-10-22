import { getUserInfo } from '@/src/lib/dtl'; 

export default async function Layout({ children }: { children: React.ReactNode; params: { slug: string } }) {
  const data = await getUserInfo();
  return <div className="bg-slate-100 h-screen">{children}</div>;
}
