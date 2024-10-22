import React from 'react';
import { getUserInfo } from '@/src/lib/dtl';
import CallVideo from '../../ui/call-video';

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string;
  };
};

const CallPage = async ({ params, searchParams }: Props) => {
  const data = await getUserInfo();
  console.log(params);
  console.log('searchParams: ', searchParams);

  return (
    <div className="bg-black h-screen w-screen text-white">
      <CallVideo auth={data} recipiment={params.slug} />
    </div>
  );
};

export default CallPage;
