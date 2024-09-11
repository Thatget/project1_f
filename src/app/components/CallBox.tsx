'use client';

import { socket } from "@/utils/socket";
import { useCallback, useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";

export const CallBox = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  let remoteStream = null;

  useEffect(() => {
    const getStream = async () => {
      const localVideo = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(localVideo);
    }
    getStream();
  }, []);
  

  useEffect(() => {
    socket.connect();
    socket.on('call:answer', (data) => {
      remoteStream = data;
    });
    return () => {
      socket.off('call:answer');
      socket.disconnect();
    }
  }, []);

  const handleSend = useCallback(() => {
    if (stream) {
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm; codecs=vp9'
      });
      mediaRecorder.ondataavailable = (event) => {
        socket.emit('call', event.data);
      };
      mediaRecorder.start(100); 
    }
  }, [stream]);

  return (
    <div className="bg-slate-500">
      <form>
        <VideoPlayer stream={stream} playing={true} />
        <VideoPlayer stream={remoteStream} playing={false} />
        <button>End</button>
        <button type="button" onClick={handleSend}>Call</button>
      </form>
    </div>
  )
}
