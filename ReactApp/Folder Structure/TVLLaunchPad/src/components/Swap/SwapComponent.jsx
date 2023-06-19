import {
  Box,
  Button,
  Typography,
  styled,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Card,
  Grid,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";

const MainFieldContainer = styled(Box)(
  () => `
   
      width: 100%;
      border: 2px solid rgba(224, 224, 224,0.6);
      height: 100%;
      min-height: 100px;
      border-radius: 15px;
      padding-bottom: 0;
      background-color: "#151625",

      
  `
);

const Field = styled(Box)(
  () => `
   
    display: flex;
    padding: 10px;
    align-items: center;
    flex-direction: column;
    padding-bottom: 0;
    justify-content: space-evenly
    
  `
);
const FieldTitleBox = styled(Box)(
  () => `
   
      width: 100%;
      display: flex;
      justify-content: space-between;
  `
);
const InputFieldAndSelectBox = styled(Box)(
  () => `
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0;
      align-items: center;
      padding-bottom: 0;
      justify-content: space-between;
  `
);
const MaxSelectBoxComponent = styled(Box)(
  () => `
    align-items: center!important;  
    display:flex
  `
);
const MaxSpan = styled(Box)(
  () => `
    color:white;
      cursor: pointer;
      font-size: 13px;
      margin-left: 2px;
      padding-top: 3px;
      margin-right: 4px;
      padding-left: 6px;
      border-radius: 10px;
      padding-right: 6px;
      padding-bottom: 3px
    `
);
const SelectBoxComponent = styled(Box)(
  () => `
    box-sizing: border-box
    `
);
const SelectInput = styled(Box)(
  () => `
    cursor: pointer;
      height: 35px;
      display: flex;
      align-items: center;
      padding-top: 2px;
      padding-left: 13px;
      border-radius: 12px;
      padding-right: 0;
      padding-bottom: 2px;
      background-color: #333336;

    `
);

const MainFieldContainerHarvest = styled(Box)(
  () => `
   
      width: 100%;
      border: 2px solid rgb(3 3 3 / 89%);
      height: 100%;
      min-height: 50px;
      border-radius: 15px;
      padding-bottom: 0;
      background-color: #333336;

      
  `
);
const HarvestTitle = styled(Typography)(
  () => `
    display:flex;
   justify-content: center;
   margin: 13px 0px;
   font-size: 22px;
   font-weight: 700;
   font-family: ui-sans-serif;
  
  `
);

const Btn = styled(Button)(
  () => `
        color:white;
        width: 100%;
        padding: 12px 50px 12px 50px;
        font-size:19px;
        margin-top:30px;
        border-radius:20px;
        text-transform:none;
        background-color: #2f2f4d;

       
  
  
  `
);
const Token = [
  {
    Token_Name: "BUID",
    img: "https://i.pinimg.com/originals/0e/17/8a/0e178afcffbb3ddd459c01466238b17d.png",
  },
  {
    Token_Name: "TVL",
    img: "https://en.numista.com/catalogue/photos/irlande/6062c40cef36a5.05007969-original.jpg",
  },
];
const SwapComponent = (props) => {
  const [open, setOpen] = useState(false);
  const handleChangeOpen = () => {
    console.log("imcalll");
    setOpen(true);
  };
  const handleChangeClose = () => {
    console.log("close");
    setOpen(false);
  };

  const handleSubmit = (d) => {
    console.log("submit coins");
    setOpen(false);
  };
  return (
    <>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid sm={6} md={4}>
          <Card
            sx={{
              border: "1px solid white",
              paddingTop: "15px",
              mt: "30%",
              px: 4,
              pt: 8,
              pb: 3,
              backgroundColor: "#151625",
              boxShadow: 12,
              borderRadius: "30px",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  color: "white",
                }}
              >
                {"Swap"}
              </Typography>
            </Box>
            <form noValidate {...props}>
              <MainFieldContainer>
                <Field>
                  <FieldTitleBox>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "14px",
                      }}
                    >
                      From
                    </Typography>
                    <Typography>Balance:0.0</Typography>
                  </FieldTitleBox>
                  <InputFieldAndSelectBox>
                    <input
                      style={{
                        color: "white",
                        outline: "none",
                        fontSize: "20px",
                        maxWidth: "150px",
                        fontWeight: 500,
                        borderColor: "transparent",
                        backgroundColor: "#36648a00",
                      }}
                      value="0.0"
                    />
                    <MaxSelectBoxComponent>
                      <MaxSpan component="span">MAX</MaxSpan>
                      <SelectBoxComponent>
                        <SelectInput
                          component="span"
                          onClick={handleChangeOpen}
                        >
                          <span style={{ color: "white", fontSize: "15px" }}>
                            Select
                          </span>
                          <span style={{ color: "white" }}>
                            <ArrowDropDownIcon />
                          </span>
                        </SelectInput>
                      </SelectBoxComponent>
                    </MaxSelectBoxComponent>
                  </InputFieldAndSelectBox>
                </Field>
              </MainFieldContainer>
              <Box m={1}></Box>
              <MainFieldContainer>
                <Field>
                  <FieldTitleBox>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "14px",
                      }}
                    >
                      To (estimate):
                    </Typography>
                    <Typography>Balance:0.0</Typography>
                  </FieldTitleBox>
                  <InputFieldAndSelectBox>
                    <input
                      style={{
                        color: "white",
                        outline: "none",
                        fontSize: "20px",
                        maxWidth: "150px",
                        fontWeight: 500,
                        borderColor: "transparent",
                        backgroundColor: "#36648a00",
                      }}
                      value="0.0"
                    />
                    <MaxSelectBoxComponent>
                      <MaxSpan component="span">MAX</MaxSpan>
                      <SelectBoxComponent>
                        <SelectInput
                          component="span"
                          onClick={handleChangeOpen}
                        >
                          <span style={{ color: "white", fontSize: "15px" }}>
                            Select
                          </span>
                          <span style={{ color: "white" }}>
                            <ArrowDropDownIcon />
                          </span>
                        </SelectInput>
                      </SelectBoxComponent>
                    </MaxSelectBoxComponent>
                  </InputFieldAndSelectBox>
                </Field>
              </MainFieldContainer>

              <Btn type="submit" fullWidth size="large" variant="contained">
                {"Connect Wallet"}
              </Btn>
            </form>

            <Dialog onClose={handleChangeClose} open={open} maxWidth="md">
              <DialogTitle
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#151625",
                }}
              >
                <span> Select a token</span>
                <span style={{ cursor: "pointer" }} onClick={handleChangeClose}>
                  <CloseIcon />
                </span>
              </DialogTitle>

              <List sx={{ pt: 0, display: "flex", backgroundColor: "#151625" }}>
                {Token.map((token) => {
                  return (
                    <>
                      <ListItem disableGutters key={token}>
                        <ListItemButton onClick={handleSubmit}>
                          <ListItemAvatar>
                            <Avatar src={token.img} />
                          </ListItemAvatar>
                          <ListItemText primary={token.Token_Name} />
                        </ListItemButton>
                      </ListItem>
                    </>
                  );
                })}
              </List>
            </Dialog>
          </Card>

          <Card
            sx={{
              border: "1px solid white",
              paddingTop: "15px",
              mt: "5%",
              px: 4,
              pt: 8,
              pb: 3,
              backgroundColor: "#151625",
              boxShadow: 12,
              borderRadius: "30px",
            }}
          >
            <Box>
              <MainFieldContainerHarvest>
                <HarvestTitle> 0 MUSIC</HarvestTitle>
              </MainFieldContainerHarvest>

              <Btn variant="contained">{"Harvest"}</Btn>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default SwapComponent;
