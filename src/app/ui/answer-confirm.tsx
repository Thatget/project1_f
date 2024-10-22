'use client';

import { socket } from '@/src/utils/socket';
import React, { useCallback, useEffect, useState } from 'react';

export const AnswerConfirm = () => {
  const [senderId, setSenderId] = useState(null);
  const [peerSig, setPeerSig] = useState(null);

  const handleCall = useCallback(() => {
    const params = new URLSearchParams();
    params.append('type', 'user');
    const voiceCallUrl = `/call/${senderId}${params}`;
    const voiceCallWindow = window.open(
      voiceCallUrl,
      'VoiceCall',
      'toolbar=no,location=no,status=no,menubar=no,resizable=yes,width=800,height=800,left=600,top=100',
    );
    if (voiceCallWindow) {
      voiceCallWindow.postMessage(peerSig, '*');
      voiceCallWindow.focus();
    } else {
      alert('Popup blocked! Please allow popups for this site.');
    }
    setPeerSig(null);
  }, [peerSig, senderId]);

  useEffect(() => {
    socket.connect();
    socket.on('call', (data) => {
      setPeerSig(data.peerSig);
      setSenderId(data.senderId);
    });
    return () => {
      socket.off('call');
      socket.disconnect();
    };
  }, [socket]);

  console.log('peerSig: ', peerSig);
  return (
    <>
      {peerSig && (
        <div>
          <button onClick={handleCall}>Answer</button>
          <button onClick={() => setPeerSig(null)}>Denied</button>
        </div>
      )}
    </>
  );
};