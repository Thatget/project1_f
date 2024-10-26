'use client';

import { socket } from '@/src/utils/socket';
import React, { useEffect, useRef } from 'react';
import Peer, { Instance } from 'simple-peer';

type Props = {
  auth: any;
  recipiment: any;
};

const CallVideo = ({ auth, recipiment }: Props) => {
  console.log('auth.id: ', auth.id);
  const peerRef = useRef<Instance | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peer2 = useRef<Instance | null>(null);
  let peerSig = null;

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (videoRef) {
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
      peer.on('connect', () => {
        console.log('CONNECT');
        peer.send('whatever' + Math.random());
      });
    }
  }, [recipiment, videoRef, socket]);

  useEffect(() => {
    async function findStream() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }
    findStream();
  }, [videoRef]);

  useEffect(() => {
    const handleMessage = (event: { origin: string; data: React.SetStateAction<null> }) => {
      if (event.origin !== window.location.origin) return;
      console.log('event.data000000000000000: ', event.data);
      if (event.data && event.data.type && event.data.type == 'offer') {
        if (peer2.current && !peer2.current.destroyed) {
          console.log('event.data11111111111111111: ', event.data);
          if (event.origin === 'https://3119-2405-4803-fe33-300-88b9-a023-19f3-808d.ngrok-free.app') {
            console.log('event.data11111111111111111: ', event.data);
            peer2.current.signal(event.data);
          }
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    peer2.current = new Peer({
      initiator: false,
      trickle: false,
    });

    peer2.current.on('stream', (remoteStream) => {
      console.log('befor: ', remoteStream);
      if (remoteVideoRef.current) {
        console.log('after: ', remoteStream);
        remoteVideoRef.current.srcObject = remoteStream;
      }
    });
  }, [remoteVideoRef]);

  return (
    <div>
      <video ref={videoRef} autoPlay></video>
      <video autoPlay ref={remoteVideoRef}></video>
    </div>
  );
};

export default CallVideo;
