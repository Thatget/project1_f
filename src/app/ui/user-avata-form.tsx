'use client';

import { useCallback, useState } from 'react';
import UserAvataFormUpload from './user-avata-form-upload';
import { User } from '@prisma/client';

export const UserAvateForm = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const handleModal = useCallback(() => {
    setOpen(!open);
  }, [open]);
  return (
    <>
      <div className="rounded-full -mt-20 p-2 flex justify-between">
        <img
          onClick={() => setOpen(true)}
          className="rounded-full p-1 bg-white hover:cursor-pointer"
          src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-1/357707661_1717039835424822_5907826501296627829_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGibj3Y9Oz3wgWY5SK0AXkBzR6yj8KAeGTNHrKPwoB4ZPCNUSi8dEa0RT4B-GGzCL_vG3ak4ta3yAjfRQD19qv0&_nc_ohc=nYh7QqGQn4MQ7kNvgGSYJXb&_nc_ht=scontent.fhan14-5.fna&_nc_gid=AmEYPOigclcnjJl9IZimavy&oh=00_AYABrU0jqmMInJ0_arsbMvmV7JJIWcoHyfzBhetGBCq4nw&oe=67040217"
        />
      </div>
      <UserAvataFormUpload user={user} modal={open} handleModal={handleModal} />
    </>
  );
};
