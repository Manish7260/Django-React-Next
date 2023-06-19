import React, { useState } from "react";
import axios from "axios";

import {
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  MenuItem,
  InputLabel,
} from "@mui/material";

import authenticateUser from "@/pages/authMiddleware";
import VideoThumbnail from "react-video-thumbnail";
import { useRouter } from "next/router";

import {
  DisplayThumbnail,
  ThumbnailGroup,
  RenderThumbnail,
} from "@/styles/pages/uploadvideo.styles";

import Cookies from "js-cookie";

import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Uploadvideoformdata = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [video_file, setVideoFile] = useState(null);
  const [url, setUrl] = useState();

  const router = useRouter();

  let channelname = router.query.id;

  console.log(channelname);

  const [thumbnailKey, setThumbnailKey] = useState(0);

  const [thumbnail1, setThumbnail1] = useState(null);
  const [thumbnail2, setThumbnail2] = useState(null);
  const [thumbnail3, setThumbnail3] = useState(null);

  const [selectedThumbnail, setSelectedThumbnail] = useState(null);

  const handleThumbnailClick = (thumbnailIndex) => {
    setSelectedThumbnail(thumbnailIndex);
  };

  const [data, setData] = useState({
    user: Cookies.get("user"),
    channel_name: channelname && channelname.toString(),
    title: "",
    description: "",
    age_restricted: false,
    tags: "",
    category: "",
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setVideoFile(selectedFile);
    setThumbnailKey((prevKey) => prevKey + 1);
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (e.target.type === "checkbox") {
      value = e.target.checked ? "true" : "false";
    }

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    formData.append("video_file", video_file);

    let base64Image = "";

    switch (selectedThumbnail) {
      case 1:
        base64Image = thumbnail1;
        formData.append("thumbnail", thumbnail1);
        break;

      case 2:
        base64Image = thumbnail2;
        formData.append("thumbnail", thumbnail2);
        break;

      case 3:
        base64Image = thumbnail3;
        formData.append("thumbnail", thumbnail3);
        break;
    }

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/studio/uploadvideo/",
        formData,
        config
      );
      console.log(response.data);
      handleOpen();
    } catch (error) {
      if (error.response.status === 400) {
        console.log("Bad request:", error.response.data);
      } else {
        console.log("Request failed:", error.message);
      }
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="50px"
      >
        <form onSubmit={handleSubmit} sx={{ marginTop: "50px" }}>
          <InputLabel htmlFor="video_file">Your Video File</InputLabel>

          <TextField
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            name="video_file"
            fullWidth
            margin="normal"
          />

          {video_file && (
            <div>
              <InputLabel>Please Select Your Video thumbnail</InputLabel>

              <ThumbnailGroup>
                <DisplayThumbnail
                  onClick={() => handleThumbnailClick(1)}
                  isSelected={selectedThumbnail === 1}
                >
                  <img src={thumbnail1} />
                </DisplayThumbnail>

                <DisplayThumbnail
                  onClick={() => handleThumbnailClick(2)}
                  isSelected={selectedThumbnail === 2}
                >
                  <img src={thumbnail2} />
                </DisplayThumbnail>

                <DisplayThumbnail
                  onClick={() => handleThumbnailClick(3)}
                  isSelected={selectedThumbnail === 3}
                >
                  <img src={thumbnail3} />
                </DisplayThumbnail>
              </ThumbnailGroup>
            </div>
          )}

          <TextField
            label="Title"
            type="text"
            name="title"
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Description"
            type="text"
            name="description"
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <FormControlLabel
            control={
              <Checkbox
                name="age_restricted"
                defaultChecked
                onChange={handleInputChange}
                color="primary"
              />
            }
            label="Age Restricted"
          />

          <TextField
            label="Tags"
            type="text"
            name="tags"
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Category"
            name="category"
            value={data.category}
            onChange={handleInputChange}
            select
            fullWidth
            margin="normal"
          >
            <MenuItem value="">Select a category</MenuItem>
            <MenuItem value="Comedy">Comedy</MenuItem>
            <MenuItem value="Education">Education</MenuItem>
            <MenuItem value="Sports">Sports</MenuItem>
            <MenuItem value="Gaming">Gaming</MenuItem>
            <MenuItem value="Music">Music</MenuItem>
            <MenuItem value="News">News</MenuItem>
          </TextField>

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </Box>
      <RenderThumbnail>
        {video_file && (
          <VideoThumbnail
            key={thumbnailKey}
            videoUrl={URL.createObjectURL(video_file)}
            width={450} 
            height={300}
            snapshotAtTime={5}
            thumbnailHandler={(thumbnail) => setThumbnail1(thumbnail)}
          />
        )}
        {video_file && (
          <VideoThumbnail
            key={thumbnailKey}
            videoUrl={URL.createObjectURL(video_file)}
            width={450} 
            height={300}
            snapshotAtTime={15}
            thumbnailHandler={(thumbnail) => setThumbnail2(thumbnail)}
          />
        )}

        {video_file && (
          <VideoThumbnail
            key={thumbnailKey}
            videoUrl={URL.createObjectURL(video_file)}
            width={450} 
            height={300}
            snapshotAtTime={25}
            thumbnailHandler={(thumbnail) => setThumbnail3(thumbnail)}
          />
        )}
      </RenderThumbnail>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Success
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Thank you for uploading video, Your video has been uploaded
                successfully........
              </Typography>
              <Button href="/channel">Go to your Channel Page....</Button>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default authenticateUser(Uploadvideoformdata);
