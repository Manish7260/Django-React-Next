import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";

import {
  Heading,
  Main,
  Title,
  Text,
  HR,
  ChildHeading,
  Link,
  LinkGroup,
} from "@/styles/pages/account.styles";

const Account = () => {
  const [open, setOpen] = useState(false);

  const [channel, setChannel] = useState({
    user: Cookies.get("user"),
    channel_name: "",
    handler: "",
  });

  const router = useRouter();

  let handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setChannel({
      ...channel,
      [name]: value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log(Cookies.get("user"));
    console.log(Cookies.get("isAuthenticated"));
    setOpen(false);
  };

  const handleSubmit = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    axios
      .post("http://127.0.0.1:8000/studio/createchannel/", channel, config)
      .then((response) => {
        console.log(response);
        router.push("/channel");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          console.log("Bad request:", error.response.data);
        } else {
          console.log("Request failed:", error.message);
        }
      });
  };

  return (
    <Main>
      <Heading>Account</Heading>
      <Title>Choose how you appear and what you see on YouTube</Title>
      <Text>Signed in as User Name </Text>

      <HR />

      <Heading>Your YouTube Channel</Heading>
      <Text>
        This is your public presence on YouTube. You need a channel to upload
        your own videos, comment on videos, or create playlists.
      </Text>
      <LinkGroup>
        <ChildHeading>Your channel</ChildHeading>{" "}
        <Link href="#" onClick={handleClickOpen}>
          Create a channel
        </Link>
      </LinkGroup>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>How you'll appear</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Create a Channel Please Enter Your New Channel Name and Handle
            User name which will Create a channel Where you can upload a new
            video by your self on youtube.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleInput}
            name="channel_name"
          />

          <TextField
            margin="dense"
            id="handle"
            label="Handle"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleInput}
            name="handler"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Channel</Button>
        </DialogActions>
      </Dialog>

      <HR />
    </Main>
  );
};

export default Account;
