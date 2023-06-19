/* eslint-disable jsx-a11y/img-redundant-alt */
import { Box, Button, Card, styled, Typography, Grid } from "@mui/material";
import BigNumber from "bignumber.js";
import TransactionConfirm from "components/common/TransactionConfirm/TransactionConfirm";
import ConnectionCheckWrapper from "components/ConnectionCheckWrapper/ConnectionCheckWrapper";
import Modal from "components/popups/Modal";
import ScrollToTop from "components/ScrollToTop";
import Wrapper from "components/Wrapper";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
	checkIdosuccesfullAction,
	claimTokenAction,
	poolInfoAction,
} from "redux/actions/idoAction";
import {
	idoState,
	setIsnavigate,
	transactionAction,
} from "redux/reducers/idoSlice";
import { fromWei } from "utils";

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

const ClaimToken = () => {
	const dispatch = useDispatch();
	const params = useLocation();
	const {
		isIdoSuccessfull,
		loading,
		transaction,
		poolInfo,
		userAccount,
		currentChainId,
		ido,
		idoStatus,
	} = useSelector(idoState);
	const [swapDialogOpen, setSwapDialog] = useState(false);
	const [wallateModel, setWallateModel] = useState(false);
	const [tokenName, setTokenName] = useState();

	const getPoolInfo = useCallback(() => {
		dispatch(
			poolInfoAction({
				chainId: currentChainId,
				account: userAccount,
				payload: ido,
			})
		);
	}, [userAccount, currentChainId, dispatch, ido]);

	const handleTransactionModelClose = useCallback(() => {
		dispatch(
			transactionAction({
				transaction: {
					...transaction,
					status: "",
				},
			})
		);
		setSwapDialog(false);
	}, [dispatch, transaction, swapDialogOpen]);

	console.log("poolInfo", poolInfo);
	const getTokentoClaim = () => {
		if (new Date(ido?.idoEndDate).getTime() < new Date().getTime()) {
			return isIdoSuccessfull
				? `${fromWei(
						poolInfo?.userInfo?.tokenToClaim,
						ido?.decimal
				  )} ${ido?.symbol?.toUpperCase()}`
				: `${fromWei(
						poolInfo?.userInfo?.amountInvested,
						ido?.decimal
				  )} ${ido?.pairCoin}`;
		}

		return `${fromWei(
			poolInfo?.userInfo?.tokenToClaim,
			ido?.decimal
		)} ${ido?.symbol?.toUpperCase()}`;
	};
	console.log("isIdoSuccessfull", isIdoSuccessfull);
	const isTokentoClaim = useCallback(() => {
		if (new Date(ido?.idoEndDate).getTime() < new Date().getTime()) {
			return isIdoSuccessfull
				? new BigNumber(
						fromWei(poolInfo?.userInfo?.tokenToClaim, ido?.decimal)
				  ).gt(0)
				: new BigNumber(
						fromWei(
							poolInfo?.userInfo?.amountInvested,
							ido?.decimal
						)
				  ).gt(0);
		}

		return new BigNumber(
			fromWei(poolInfo?.userInfo?.tokenToClaim, ido?.decimal)
		).gt(0);
	}, [
		ido?.decimal,
		ido?.idoEndDate,
		isIdoSuccessfull,
		poolInfo?.userInfo?.amountInvested,
		poolInfo?.userInfo?.tokenToClaim,
	]);

	useEffect(() => {
		dispatch(setIsnavigate(true));
		getPoolInfo();
	}, []);

	useEffect(() => {
		setTokenName(getTokentoClaim());
	}, [poolInfo]);

	useEffect(() => {
		// dispatch(setIdoAction({ ...params.state }));
		getPoolInfo();
	}, [getPoolInfo, params.state]);

	useEffect(() => {
		if (
			!ido?.tokenAddress ||
			!ido?.idoAddress ||
			!currentChainId ||
			!userAccount
		)
			return;
		dispatch(
			checkIdosuccesfullAction({
				chainId: currentChainId,
				payload: ido,
			})
		);
		getPoolInfo();
	}, [
		ido,
		currentChainId,
		userAccount,
		dispatch,
		isIdoSuccessfull,
		getPoolInfo,
	]);

	useEffect(() => {
		console.log("transaction", transaction);
		if (!transaction.hash && !transaction.type) {
			return;
		}

		if (
			["claim_token"].includes(transaction.type) &&
			transaction.status === "success"
		) {
			getPoolInfo();
		}
	}, [getPoolInfo, swapDialogOpen, transaction, transaction.status]);

	const currentSwapStatus = useMemo(() => {
		if (new Date(ido?.idoStartDate).getTime() > new Date().getTime()) {
			return {
				currentBtnText: "Igo Not Start Yet",
				disabled: true,
			};
		}

		if (new Date(ido?.idoEndDate).getTime() > new Date().getTime()) {
			return {
				currentBtnText: "Igo Not End Yet",
				disabled: true,
			};
		}

		if (!userAccount) {
			return { currentBtnText: "Connect Wallet", disabled: false };
		}

		if (!isTokentoClaim()) {
			return {
				currentBtnText: "Insufficent Funds",
				disabled: true,
			};
		}

		if (
			["claim_token"].includes(transaction.type) &&
			transaction.status === "pending"
		) {
			return {
				currentBtnText: "Pending Transaction...",
				disabled: true,
			};
		}

		// if (loading) {
		// 	return {
		// 		currentBtnText: "Loading... ",
		// 		disabled: true,
		// 	};
		// }
		if (isIdoSuccessfull) {
			return {
				currentBtnText: `Claim ${ido?.symbol?.toUpperCase()}`,
				disabled: false,
			};
		}

		return {
			currentBtnText: `Claim TVL`,
			disabled: false,
		};
	}, [
		ido?.idoStartDate,
		ido?.idoEndDate,
		ido?.symbol,
		userAccount,
		isTokentoClaim,
		transaction.type,
		transaction.status,
		isIdoSuccessfull,
	]);

	const claimToken = () => {
		if (!userAccount) {
			setWallateModel(!wallateModel);
			return;
		}
		if (
			["claim_token"].includes(transaction.type) &&
			transaction.status === "pending" &&
			!swapDialogOpen
		) {
			setSwapDialog(true);
			return;
		}

		if (!ido?.tokenAddress || !ido?.idoAddress) return;
		dispatch(
			claimTokenAction({
				account: userAccount,
				chainId: currentChainId,
				payload: ido,
			})
		);
	};
	return (
		<>
			{loading && <p>Loading...</p>}
			<ConnectionCheckWrapper>
				<Wrapper>
					<Modal open={wallateModel} setOpen={setWallateModel} />
					<ScrollToTop />
					<TransactionConfirm
						open={swapDialogOpen}
						handleClose={handleTransactionModelClose}
						transaction={transaction}
					/>
					<div className="gamfi-breadcrumbs-section">
						<div className="container">
							<div className="row">
								<div className="col-lg-5">
									<div className="breadcrumbs-area sec-heading">
										<div
											style={{ position: "relative" }}
											className="sub-inner mb-15"
										>
											<Link
												className="breadcrumbs-link"
												to="/pool"
											>
												Pool
											</Link>
											<span className="sub-title">
												Claim Token
											</span>
											<img
												className="heading-left-image"
												src="assets/images/icons/steps.png"
												alt="Steps-Image"
											/>

											{/* <Box
												position="absolute"
												right="100px"
												display="flex"
												top="45px"
												alignItems="center"
											>
												<Link to="/projects-grid">
													<i
														style={{
															fontSize: "30px",
															color: "#F0B600",
														}}
														className="fas fa-th"
													></i>
												</Link>
												<Link to="/projects-list">
													<i
														style={{
															fontSize: "30px",
															marginLeft: "20px",
														}}
														className="fas fa-list"
													></i>
												</Link>
											</Box> */}
										</div>
										<h2 className="title mb-0">
											Claim Token
										</h2>
									</div>
								</div>
								<div className="col-lg-7 breadcrumbs-form md-mt-40">
									{/* <div className="btn-area">
										<Link to="/calendar">
											<a className="readon black-shape">
												<i className="icon-calendar" />
												<span className="btn-text">
													Calendar
												</span>
												<span className="hover-shape1" />
												<span className="hover-shape2" />
												<span className="hover-shape3" />
											</a>
										</Link>
									</div> */}
								</div>
							</div>
						</div>
					</div>
					<Grid
						container
						sx={{ justifyContent: "center", marginBottom: "2%" }}
					>
						<Grid sm={6} md={4}>
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
									<Typography
										variant="h6"
										sx={{
											mb: 1,
											color: "white",
										}}
									>
										{"Claim Token"}
									</Typography>
								</Box>
								<Box>
									<MainFieldContainerHarvest>
										<HarvestTitle>{tokenName}</HarvestTitle>
									</MainFieldContainerHarvest>

									<Btn
										disabled={
											idoStatus === "UPCOMING" ||
											currentSwapStatus.disabled
										}
										onClick={claimToken}
										variant="contained"
									>
										{currentSwapStatus.currentBtnText}
									</Btn>
								</Box>
							</Card>
						</Grid>
					</Grid>

					<Grid
						container
						sx={{ justifyContent: "center", marginBottom: "2%" }}
					>
						<Grid sm={6} md={4}>
							<Card
								sx={{
									border: "1px solid white",
									paddingTop: "15px",
									mt: "30%",
									px: 4,
									pt: 8,
									pb: 3,
									m: 0,
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
											padding: 1,
											borderBottom: "1px solid white",
											textAlign: "center",
										}}
									>
										Details
									</Typography>
								</Box>
								<Box>
									<Typography
										variant="h6"
										sx={{
											mb: 1,
											color: "white",
											padding: 1,
											borderBottom: "1px solid white",
										}}
									>
										Your Allocation :{" "}
										{fromWei(
											poolInfo?.userInfo?.amountInvested
										)}{" "}
										TVL
									</Typography>
									<Typography
										variant="h6"
										sx={{
											mb: 1,
											color: "white",
											padding: 1,
											borderBottom: "1px solid white",
										}}
									>
										Target Raised :{" "}
										{fromWei(poolInfo?.totalRaised)} TVL
									</Typography>
									<Typography
										variant="h6"
										sx={{
											mb: 1,
											color: "white",
											padding: 1,
											borderBottom: "1px solid white",
										}}
									>
										Token Sold :{" "}
										{fromWei(poolInfo?.totalTokenSold)}{" "}
										{ido?.symbol?.toUpperCase()}
									</Typography>
								</Box>
							</Card>
						</Grid>
					</Grid>
				</Wrapper>
			</ConnectionCheckWrapper>
		</>
	);
};

export default ClaimToken;
