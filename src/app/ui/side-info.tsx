'use client';

import Link from 'next/link';
import { AiOutlineRight } from 'react-icons/ai';

export function SideInfo() {
  const topPics = [
    { id: 0, title: 'Thông tin đoạn chat', items: [{ id: 0, title: 'Tin nhắn đã ghim', link: '/info' }] },
    {
      id: 1,
      title: 'Tùy chỉnh đoạn chat',
      items: [
        { id: 0, title: 'Đổi chủ đề', link: '/change' },
        { id: 1, title: 'Thay đổi biểu tượng cảm xúc', link: '/change' },
        { id: 2, title: 'Chỉnh sửa biệt danh', link: '/change' },
      ],
    },
    {
      id: 2,
      title: 'File phương tiện & file',
      items: [
        { id: 0, title: 'File phương tiện', link: '/file' },
        { id: 1, title: 'File', link: '/file' },
      ],
    },
    {
      id: 3,
      title: 'Quyền riêng tư & hỗ trợ',
      items: [
        { id: 0, title: 'Tắt thông báo', link: '/setting' },
        { id: 1, title: 'Tin nhắn tự hủy', link: '/setting' },
        { id: 2, title: 'Xác minh mã hóa đàu cuối', link: '/setting' },
        { id: 3, title: 'Hạn chế', link: '/setting' },
        { id: 4, title: 'Chặn', link: '/setting' },
        { id: 5, title: 'Báo cáo', link: '/setting' },
      ],
    },
  ];

  return (
    <div className="flex flex-col m-2 bg-white p-2 rounded-2xl overflow-y-scroll">
      <div className="">
        <img
          src={
            'https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/456909750_3802471409994234_4035674451251586238_n.jpg?stp=dst-jpg_s100x100&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGVejSdud7Ok8nxrGDlXaCqU9b_wg8kucxT1v_CDyS5zK7PLHVCQrejhu5_ItT8cCUabdHvCL-YdWAoRcoxDdhe&_nc_ohc=KlBqh_CQu0EQ7kNvgF8d3rL&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan17-1.fna&oh=00_AYDHrqEXc2SKY5QyBOGuqD6GH3iyV_rlmyu2MX05qHKhYg&oe=66FC8264'
          }
          alt="thanh"
          width={30}
          height={30}
        />
      </div>
      <div>
        <Link href="/user/[id]" as="/user/1">
          Trang cá nhân
        </Link>
        <Link href="/user/[id]" as="/user/1">
          Thông báo
        </Link>
        <Link href="/user/[id]" as="/user/1">
          Tìm kiếm
        </Link>
      </div>
      {topPics.map((topPic) => {
        return (
          <div key={topPic.id}>
            <div
              className="font-bold flex justify-between hover:bg-slate-300 text-slate-600 items-center text-md cursor-pointer rounded-xl p-2"
              aria-controls="collapse"
              aria-expanded={false}
            >
              <Link className="" href="/">
                {topPic.title}
              </Link>
              <AiOutlineRight className="font-bold" size={'30'} />
            </div>
            <div>
              {topPic.items.map((item) => {
                return (
                  <div id={'collapse'} key={item.id} className="w-full hover:bg-slate-300 rounded-md">
                    {item.title}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
