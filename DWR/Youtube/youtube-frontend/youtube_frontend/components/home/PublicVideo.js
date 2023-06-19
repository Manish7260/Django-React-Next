import React, { useEffect, useState } from "react";
import VideoBox from "./VideoBox";
import styled from "styled-components";
import { useRouter } from "next/router";
import authenticateUser from "@/pages/authMiddleware";
let API_URL = "http://localhost:8000/studio/allvideo/?search=";

function PublicVideoDashboard() {
  const [videos, setVideos] = useState([]);

  const router = useRouter();

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
      API_URL + (searchvalue.search !== undefined ? searchvalue.search : ""),
      config
    );
    const data = await response.json();
    const newVideos = [videos, ...data.results];
    console.log(data.results)
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

export default authenticateUser(PublicVideoDashboard);

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;
