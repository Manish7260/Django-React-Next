import React from "react";
import styled from "styled-components";
import { Content, Title, Text, Button } from "./styles/uploadvideo.styles";
import Link from "next/link";

const UploadVideo = ({ ChannelName }) => {
  return (
    <Content>
      <Title>Upload a video to get started</Title>
      <Text>
        Start sharing your story and connecting with viewers. Videos you upload
        will show up here.
      </Text>
      <Link
        href={`/channel/uploadvideo/${ChannelName && ChannelName.toString()}`}
      >
        <Button>Upload Video</Button>
      </Link>
    </Content>
  );
};

export default UploadVideo;
