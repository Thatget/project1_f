'use client';

import { socket } from '@/src/utils/socket';
import React, { useEffect, useRef, useState } from 'react';
import Peer, { Instance } from 'simple-peer';

type Props = {
  auth: any;
  recipiment: any;
};

const CallVideo = ({ auth, recipiment }: Props) => {
  console.log('auth.id: ', auth.id);
  const peerRef = useRef<Instance | null>(null);
  const [recipimentPeer, setRecipimentPeer] = useState(null);

  let peerSig = null;

  useEffect(() => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
    });
    peerRef.current = peer;
    peerRef.current.on('signal', (data) => {
      peerSig = data;
      socket.emit('call', {
        senderId: recipiment,
        peerSig,
      });
    });

    const handleMessage = (event: { origin: string; data: React.SetStateAction<null> }) => {
      if (event.origin !== window.location.origin) return;
      setRecipimentPeer(event.data);
    };

    peer.on('connect', () => {
      console.log('CONNECT');
      peer.send('whatever' + Math.random());
    });
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [recipiment]);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  console.log(recipimentPeer);
  return <div>callVideo</div>;
};

export default CallVideo;
