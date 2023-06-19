import React, { useEffect, useState } from "react";
import VideoBox from "../home/VideoBox";
import styled from "styled-components";
import { useRouter } from "next/router";

let API_URL = "http://localhost:8000/studio/likedvideo/";

function LikedVideoList() {
  const [videos, setVideos] = useState([]);

  const router = useRouter();

  console.log(videos[0])

  let searchvalue = router.query;

  useEffect(() => {
    fetchVideos();
  }, [searchvalue]);

  const fetchVideos = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    const response = await fetch(
      API_URL,
      config
    );
    const data = await response.json();
    console.log(data)
    const newVideos = [...data];
    setVideos(newVideos);
  };

  return (
    <Container>
      {videos.map((videoReq) => (
        <VideoBox key={videoReq.id} {...videoReq} />
      ))}
    </Container>
  );
}

export default LikedVideoList;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;
