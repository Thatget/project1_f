import { getUserInfo } from '@/src/lib/dtl';
import { UserAvateForm } from '../ui/user-avata-form';

export default async function Profile() {
  const user = await getUserInfo();
  return (
    <main className="container mx-auto">
      <h1>Profile</h1>
      <div className="w-full">
        <img
          className="w-full"
          src={
            'https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/328523052_3372450809678526_8554665831450045228_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHX_rZLEk0AHX0IfISrlwVgejVtyOe9yO96NW3I573I7_JvJTIEc9cTbu9lpRTRT6vFfha32zhYzde2zrjwm9VC&_nc_ohc=CeYbMKUwzVsQ7kNvgFPLqY6&_nc_ht=scontent.fhan14-5.fna&_nc_gid=AJsEuQJHaVs6mnAtNK7FJML&oh=00_AYCoqQyaHJPzUY6UW00KSOTtmqPx5lZCER8YIpAAo7AQfw&oe=67041452'
          }
          width={200}
          height={200}
          alt={user?.nickName ?? ''}
        />
      </div>
      <div className="flex flex-col md:flex-row">
        {user && <UserAvateForm user={user} />}
        <div>
          <div>
            <h2>
              {user?.displayName ?? ''}
              <span>({user?.nickName})</span>
            </h2>
          </div>
          <div>
            <h5>315 người bạn</h5>
            <h5>friend list!</h5>
          </div>
        </div>
        <div className="flex">
          <div>
            <button className="m-4 p-1 rounded-md bg-green-500">Thêm vào tin</button>
            <button className="m-4 p-1 rounded-md bg-green-500">Chỉnh sửa trang cá nhân</button>
          </div>
        </div>
      </div>
    </main>
  );
}
