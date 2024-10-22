import Image from 'next/image';
import React from 'react';
import { AiTwotonePhone, AiOutlineVideoCamera, AiOutlineEllipsis } from 'react-icons/ai';
import { TRecipiment } from '../chat/layout';

type Props = {
  recipiment: TRecipiment;
};

const ChatBoxBar = ({ recipiment }: Props) => {
  const handleCall = () => {
    const voiceCallUrl = `/call/${recipiment.id}?type=${recipiment.type}&id=${recipiment.id}`;
    const voiceCallWindow = window.open(
      voiceCallUrl,
      'VoiceCall',
      'toolbar=no,location=no,status=no,menubar=no,resizable=yes,width=800,height=800,left=600,top=100',
    );
    if (voiceCallWindow) {
      voiceCallWindow.focus();
    } else {
      alert('Popup blocked! Please allow popups for this site.');
    }
  };

  return (
    <div className="flex justify-between border-b-2 border-slate-400 shadow-lg">
      <div className="flex items-center">
        <div className="w-8 m-2 border-2 border-green-400 rounded-full">
          <Image
            src={recipiment.type === 'user' ? (recipiment.avata ?? '') : (recipiment.logo ?? '')}
            alt={recipiment.type === 'user' ? (recipiment.displayName ?? '') : (recipiment.name ?? '')}
            width={'200'}
            height={'200'}
            className="rounded-full"
          />
        </div>
        <div>{recipiment.type === 'user' ? (recipiment.displayName ?? '') : (recipiment.name ?? '')}</div>
      </div>
      <div className="flex">
        <AiTwotonePhone
          color="red"
          fontSize={'2rem'}
          style={{ cursor: 'pointer' }}
          className="m-2"
          onClick={handleCall}
        />
        <AiOutlineVideoCamera color="red" fontSize={'2rem'} style={{ cursor: 'pointer' }} className="m-2" />
        <AiOutlineEllipsis color="red" fontSize={'2rem'} style={{ cursor: 'pointer' }} className="m-2" />
      </div>
    </div>
  );
};

export default ChatBoxBar;
