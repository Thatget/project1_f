import { getUserInfo } from '@/src/lib/dtl';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BiSolidUniversalAccess } from 'react-icons/bi';
import CreateGroupForm from '../../ui/create-group-form';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function CreateGroup() {
  const user = await getUserInfo();
  if (!user) redirect('/');
  return (
    <main className="container mx-auto ">
      <div></div>
      <div className="md:flex max-h-full">
        <aside className="w-full md:w-1/3 bg-white rounded-xl p-2">
          <div className="flex p-2 border-b-2 shadow-xl shadow-slate-100">
            <Link href={'/'}>
              <AiFillCloseCircle fontSize={'3rem'} color="gray" />
            </Link>
            <button>
              <BiSolidUniversalAccess fontSize={'3rem'} color="green" />
            </button>
          </div>
          <CreateGroupForm user={user} />
        </aside>
        <div>Preview</div>
      </div>
    </main>
  );
}
