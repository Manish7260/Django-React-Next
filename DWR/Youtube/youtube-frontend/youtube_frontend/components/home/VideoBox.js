import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import {
  MiniPlayer,
  Logo,
  Title,
  Description,
  Detail,
  Channel,
} from "../styles/videobox.styles";

import authenticateUser from "@/pages/authMiddleware";

const DynamicReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

function VideoBox({ id, title, channel_name, video_file, thumbnail }) {
  const [isPlaying, setIsPlaying] = useState(false);  

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
          controls
          width="350px"
          height="200px"
          className="react-player"
          ref={playerRef}
          playing={isPlaying}
          url={video_file}
          light={thumbnail}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
              },
            },
          }}
        />
      )}

      <Description onClick={handleClick}>
        <Logo>{channel_name?.charAt(0)}</Logo>
        <Detail>
          <Title>{title}</Title>
          <Channel>{channel_name}</Channel>
          <Channel>1K Views - 20 Days ago</Channel>
        </Detail>
      </Description>
    </MiniPlayer>
  );
}

export default authenticateUser(VideoBox);
