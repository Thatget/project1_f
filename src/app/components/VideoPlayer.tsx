'use client';

import * as React from 'react';
import { useEffect } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';

export interface IVideoPlayerProps {
  stream: MediaStream | null,
  playing?: boolean
}

export default function VideoPlayer({ stream, playing }: IVideoPlayerProps) {
  const [sstream, setSstream] = React.useState<MediaStream| null>(null);

  useEffect(() => {
    if (stream) { 
      setSstream(stream);
      console.log("sssssssssssssssssss: ", sstream);
    }
  }, [stream])
  
  return (
    <div>
      {sstream &&
        <ReactPlayer
          url={sstream}
          playing={playing}
          muted={false}
          height="100%"
          width="100%"
          style={{ transform: 'scaleX(-1)' }}
        />
      }
    </div>
  );
}
