import React, { useEffect, useState } from "react";
import SignleListVideo from "./SingleListVideo";
import styled from "styled-components";

let API_URL = "http://localhost:8000/studio/allvideo/";

function PublicVideoList() {
  const [Videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };
    const response = await fetch(API_URL, config);
    const data = await response.json();
    const newVideos = [...Videos, ...data.results];
    setVideos(newVideos);
  };

  console.log(Videos);
  return (
    <Container>
      {Videos.map((videoReq) => (
        <SignleListVideo key={videoReq.id} {...videoReq} />
      ))}
    </Container>
  );
}

export default PublicVideoList;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  margin-top: 10px;
`;
