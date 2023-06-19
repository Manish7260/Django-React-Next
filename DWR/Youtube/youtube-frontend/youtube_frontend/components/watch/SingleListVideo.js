import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import {
  MiniPlayer,
  Title,
  Description,
  Channel,
  Detail,
} from "../styles/singlelistvideo.style";

const DynamicReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

function SignleListVideo({ id, title, channel_name, video_file, thumbnail }) {
  const [isPlaying, setIsPlaying] = useState(true);

  const handleHover = (isHovering) => {
    setIsPlaying(isHovering);
  };

  const router = useRouter();

  const handleClick = () => {
    const params = { id: id };
    router.push({
      pathname: "/watch",
      query: params,
    });
  };

  const playerRef = useRef(null);

  return (
    <MiniPlayer
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      {typeof window !== "undefined" && (
        <DynamicReactPlayer
          width="200px"
          height="140px"
          className="react-player"
          ref={playerRef}
          playing={isPlaying}
          url={video_file}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
              },
            },
          }}
          light={thumbnail}
        />
      )}

      <Description onClick={handleClick}>
        <Detail>
          <Title>{title}</Title>
          <Channel>{channel_name}</Channel>
          <Channel>1K Views - 20 Days ago</Channel>
        </Detail>
      </Description>
    </MiniPlayer>
  );
}

export default SignleListVideo;
