import { Box, Dialog, DialogContent, Slide, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const LogoutModal = ({ open, setOpen, disconnect }) => {
	const { deactivate } = useWeb3React();
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			<div className="modal__main__container">
				<Dialog
					open={open}
					keepMounted
					TransitionComponent={Transition}
					onClose={handleClose}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogContent className="dialoge__content__section">
						<Box
							style={{
								textAlign: "center",
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<Box
								className="metaMaskUpperLayer"
								onClick={() => {
									setOpen(false);
									deactivate();
									localStorage.removeItem("wallet");
								}}
							>
								<Typography variant="h1" className="buttonText">
									Logout
								</Typography>
							</Box>
							<Box
								className="metaMaskUpperLayer"
								onClick={handleClose}
							>
								<Typography variant="h1" className="buttonText">
									Cancel
								</Typography>
							</Box>
						</Box>
					</DialogContent>
				</Dialog>
				{/* </Slide> */}
			</div>
		</div>
	);
};

export default LogoutModal;
