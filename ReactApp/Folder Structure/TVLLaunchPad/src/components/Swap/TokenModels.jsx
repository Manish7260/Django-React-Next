import { Avatar, Box, Container, Dialog, DialogTitle, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";


const TokenModels = ({ open, setModelOpen, tokens, onTokenSelect }) => {
	const [filteredToken, setFilteredToken] = useState([]);

	useEffect(() => {
		tokens && setFilteredToken(tokens);
	}, [tokens]);
	return (
		<>
			{/* <Modal
				open={open}
				onClose={() => setModelOpen(false)}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<Box
					bgcolor="#0a1929"
					paddingY="4rem"
					width="30%"
					borderRadius="10px"
					className="model"
				>
					<Container maxWidth="lg">
						<Grid container>
							<h2
								id="parent-modal-title"
								style={{
									textAlign: "center",
									width: "100%",
								}}
							>
								Select Token
							</h2>
							
							<div style={{ width: "100%", height: "50vh" }}>
								{filteredToken.map((token, index) => (
									<Box
										display="flex"
										alignItems="center"
										width="80%"
										margin="auto"
										padding="10px"
										height="40px"
										key={index}
										marginY="5px"
										onClick={() => {
											onTokenSelect(token);
											setModelOpen(false);
										}}
									>
										<img
											src={token.logo}
											width="35px"
											alt={token?.symbol}
										/>
										<Typography marginLeft="10px">
											{token.symbol}
										</Typography>
									</Box>
								))}
							</div>

						
						</Grid>
					</Container>
				</Box>
			</Modal> */}
			<Dialog onClose={() => setModelOpen(false)} open={open} maxWidth="md">
				<DialogTitle
					sx={{
						display: "flex",
						justifyContent: "space-between",
						backgroundColor: "#151625",
					}}
				>
					<span> Select a token</span>
					<span style={{ cursor: "pointer" }} onClick={() => setModelOpen(false)}>
						<CloseIcon />
					</span>
				</DialogTitle>

				<List sx={{ pt: 0, display: "flex", backgroundColor: "#151625" }}>
					{filteredToken.map((token) => {
						return (
							<>
								<ListItem disableGutters key={token}>
									<ListItemButton onClick={() => {
										onTokenSelect(token);
										setModelOpen(false);
									}}>
										<ListItemAvatar>
											<Avatar src={token.logo} />
										</ListItemAvatar>
										<ListItemText primary={token.symbol} />
									</ListItemButton>
								</ListItem>
							</>
						);
					})}
				</List>
			</Dialog>
		</>
	);
};

export default TokenModels;
