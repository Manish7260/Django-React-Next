import styled from "styled-components";

export const Container = styled.div`
  margin-top: 20px;
  width: 1100px;
  margin-left: 20px;
`;

export const VideoTitle = styled.p`
  margin-top: 15px;
  font-weight: bold;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 20px;
`;
export const Channel = styled.div`
  margin-top: 15px;
  display: flex;
  width: 1100px;
  position: relative;
`;

export const Logo = styled.a`
  width: 40px;
  background-color: black;
  height: 40px;
  border-radius: 50%;
  color: white;
  padding-top: 10px;
  font-weight: bold;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

export const ChannelName = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  margin-top: 2px;
`;

export const SubscribeButton = styled.button`
  margin-left: 30px;
  width: 100px;
  height: 35px;
  background-color: #0f0f0f;
  color: white;
  font-size: 15px;
  font-weight: bold;
  border-radius: 50px;
  border: none;
  cursor: pointer;
`;

export const Like = styled.div`
  width: 120px;
  height: 35px;
  background-color: #f2f2f2;
  position: absolute;
  right: 20px;
  text-align: center;
  padding-top: 5px;
  color: black;
  border-radius: 55px;
  font-weight: bold;
`;

export const ChannelData = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  gap: 2px;
`;

export const VideoDescription = styled.div`
  background-color: #f2f2f2;
  width: 100%;
  height: 100px;
  margin-top: 15px;
  border-radius: 10px;
  padding: 15px;
`;

export const Views = styled.p`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
`;

export const Hashtag = styled.p`
  margin-top: 10px;
  color: #325fd4;
`;

export const Detail = styled.p`
  margin-top: 10px;
`;

export const LikeButton = styled.button`
  background-color: transparent;
  border: none;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 20px;
  cursor: pointer;
`;

export const Layout = styled.div`
  display: flex;
`;
