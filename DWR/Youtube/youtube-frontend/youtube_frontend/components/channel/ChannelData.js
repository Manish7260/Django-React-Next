import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState, useEffect } from "react";
import UploadVideo from "./UploadVideo";
import axios from "axios";

import {
  Details,
  Main,
  Logo,
  Content,
  Title,
  Handler,
  P,
} from "./styles/channeldata.styles";

import Cookies from "js-cookie";

const ChannelData = () => {
  const [data, setData] = useState(null);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(localStorage.getItem("access_token"));

    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    axios
      .get("http://localhost:8000/studio/getchannel/", {
        params: {
          username: Cookies.get("user"),
        },
        config,
      })
      .then((response) => {
        setData(response.data.channels[0]);
        console.log(response.data.channels[0]);
      });
  }, []);

  return (
    <>
      <Main>
        <Details>
          <Logo>{data && data.channel_name.charAt(0)}</Logo>
          <Content>
            <Title>{data && data.channel_name}</Title>
            <Handler>@{data && data.handler}</Handler>
            <P>No subscribe &nbsp;&nbsp;&nbsp;&nbsp; No videos</P>
          </Content>
        </Details>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Home" value="1" />
                <Tab label="Play List" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <UploadVideo ChannelName={data && data.channel_name} />
            </TabPanel>
            <TabPanel value="2">Playlist</TabPanel>
          </TabContext>
        </Box>
      </Main>
    </>
  );
};

export default ChannelData;
