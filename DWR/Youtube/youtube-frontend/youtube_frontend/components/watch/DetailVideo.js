import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import VideoList from "./VideoList";
import { useRouter } from "next/router";
import axios from "axios";

import {
  Container,
  VideoTitle,
  Channel,
  Logo,
  ChannelName,
  SubscribeButton,
  Like,
  ChannelData,
  VideoDescription,
  Views,
  Hashtag,
  Detail,
  LikeButton,
  Layout,
} from "../styles/detailvideo.style";

import Cookies from "js-cookie";

const DynamicReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

const DetailVideo = () => {
  const router = useRouter();
  const id = router.query;

  const [data, setData] = useState();

  const [liked, setLiked] = useState(true);

  const API_URL = "http://localhost:8000/studio/singlevideo/?id=" + id.id;

  const fetchData = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };
    try {
      const response = await axios.get(API_URL, config);
      const data = response.data;
      console.log(data.videos);
      setData(data.videos);
      setLiked(data.videos.liked_video);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeLike = async () => {

    setLiked((previous) => !previous)

    let updatelike = {
      user: Cookies.get("user"),
      video: id.id,
      like: liked,
    };

    console.log(updatelike);
    console.log(liked);

    try {
      const res = await axios.post(
        "http://localhost:8000/studio/createlikedvideo/",
        updatelike
      );
      
      const da = res.data;
      console.log(da);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <Layout>
      <Container>
        {typeof window !== "undefined" && (
          <DynamicReactPlayer
            controls
            width="1400"
            height="600px"
            className="react-player"
            playing
            url={data && data.video_file}
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                },
              },
            }}
            volume={1}
            muted={false}
          />
        )}

        <VideoTitle>{data && data.title}</VideoTitle>

        <Channel>
          <Logo>{data && data.channel_name.charAt(0)}</Logo>

          <ChannelData>
            <ChannelName>{data && data.channel_name}</ChannelName>
            <p>66 Subscribers</p>
          </ChannelData>

          <SubscribeButton>Subscribe</SubscribeButton>
          <Like>
            <LikeButton>
              <FontAwesomeIcon
                icon={faThumbsUp}
                style={{ color: liked ? "blue" : "" }}
                onClick={onChangeLike}
              />
            </LikeButton>
            |
            <LikeButton>
              <FontAwesomeIcon icon={faThumbsDown} flip="horizontal" />
            </LikeButton>
          </Like>
        </Channel>

        <VideoDescription>
          <Views>388 Views Jun 5, 2023</Views>
          <Hashtag>{data && data.tags}</Hashtag>
          <Detail>{data && data.description}</Detail>
        </VideoDescription>
      </Container>
      <VideoList />
    </Layout>
  );
};

export default DetailVideo;
