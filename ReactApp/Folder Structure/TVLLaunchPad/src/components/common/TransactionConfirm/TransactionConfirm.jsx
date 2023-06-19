import {
	Avatar,
	Box,
	Button,
	Dialog,
	DialogTitle,
	Grid,
	styled,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { idoState } from "redux/reducers/idoSlice";
import { BLOCK_EXPLORER } from "constant";

const AvatarWrapper = styled(Box)(
	({ theme }) => `
	
		position: relative;
	
		.MuiAvatar-root {
		  width: ${theme.spacing(16)};
		  height: ${theme.spacing(16)};
		}
	`
);
const TransactionConfirm = ({ open, handleClose, transaction }) => {
	const { currentChainId } = useSelector(idoState);
	return (
		<Dialog
			PaperProps={{
				style: {
					borderRadius: "40px",
					overflow: "hidden",
				},
			}}
			onClose={handleClose}
			open={open}
		>
			<DialogTitle
				sx={{ display: "flex", justifyContent: "space-between" }}
			>
				<span> </span>
				<span
					style={{ cursor: "pointer", color: "#000" }}
					onClick={handleClose}
				>
					<CloseIcon />
				</span>
			</DialogTitle>
			<Grid item xs={12} lg={5} justifyContent="center">
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					flexDirection="column"
					padding="0px 30px"
				>
					<Box
						sx={{
							fontSize: "35px",
							fontWeight: "700",
							fontFamily: "sans-serif",
							margin: "25px 0px",
							color: "#000",
						}}
						component="span"
					>
						{transaction?.status === "success" &&
							"Transaction Success"}
						{transaction?.status === "failed" &&
							"Transaction Failed"}
					</Box>
					<AvatarWrapper>
						{transaction?.status === "success" && (
							<Avatar
								style={{ borderRadius: "15rem" }}
								variant="rounded"
								alt="NO"
								id="Success"
								name="Success"
								src={
									"https://cdn-icons-png.flaticon.com/512/7518/7518748.png"
								}
							/>
						)}

						{transaction?.status === "failed" && (
							<Avatar
								style={{ borderRadius: "15rem" }}
								variant="rounded"
								alt="NO"
								id="Success"
								name="Success"
								src={
									"https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png"
								}
							/>
						)}
					</AvatarWrapper>
				</Box>
			</Grid>

			<Box sx={{ margin: "12% 12%", textAlign: "center" }}>
				<Box component="span" sx={{ borderBottom: "1px solid black" }}>
					{(transaction?.hash ||
						transaction?.result?.transactionHash) && (
						<a
							style={{
								textDecoration: "none",
								color: " #0e0ee2",
								fontSize: "19px",
							}}
							href={`${BLOCK_EXPLORER[currentChainId]}${
								transaction?.hash ||
								transaction?.result?.transactionHash
							}`}
							target="_blank"
						>
							View on etherscan
						</a>
					)}
				</Box>
			</Box>
		</Dialog>
	);
};

export default TransactionConfirm;
