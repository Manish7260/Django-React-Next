/* eslint-disable jsx-a11y/img-redundant-alt */
import { Box, Button, Card, Grid, styled, Typography } from "@mui/material";
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
	getIdoPresaleTokensBalancesAction,
	poolInfoAction,
	withdrawRaisedFundAction,
} from "redux/actions/idoAction";
import { getAllFeeAction } from "redux/actions/igoApplyAction";
import { igoApplyState } from "redux/reducers";
import {
	idoState,
	setIdoAction,
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

const Withdraw = () => {
	const {
		loading,
		transaction,
		poolInfo,
		userAccount,
		currentChainId,
		isIdoSuccessfull,
		ido,
		prsaleTokensBalance,
	} = useSelector(idoState);
	const { postfee } = useSelector(igoApplyState);
	const dispatch = useDispatch();
	const params = useLocation();
	const [swapDialogOpen, setSwapDialog] = useState(false);
	const [wallateModel, setWallateModel] = useState(false);
	const [tokenName, setTokenName] = useState();
	const [postFeeValuePr, setPostFeeValuePr] = useState();

	useEffect(() => {
		if (!params.state) return;
		dispatch(setIdoAction({ ...params.state }));
	}, [dispatch, params.state]);

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

	const getPoolInfo = useCallback(() => {
		dispatch(getIdoPresaleTokensBalancesAction());
		dispatch(
			checkIdosuccesfullAction({
				chainId: currentChainId,
				payload: ido,
			})
		);
		dispatch(
			poolInfoAction({
				chainId: currentChainId,
				account: userAccount,
				payload: ido,
			})
		);
	}, [currentChainId, dispatch, ido, userAccount]);

	const getTokentoClaim = () => {
		// if (new Date(ido?.idoEndDate).getTime() < new Date().getTime()) {
		// }
		return isIdoSuccessfull
			? `${fromWei(prsaleTokensBalance?.presaleTvlBalance)} TVL`
			: `${fromWei(
					prsaleTokensBalance?.presaleTokenBalance,
					ido?.decimal
			  )} ${ido?.symbol?.toUpperCase()}`;

		// return `${fromWei(prsaleTokensBalance?.presaleTvlBalance)} TVL`;
	};

	const isTokentoClaim = useCallback(() => {
		if (new Date(ido?.idoEndDate).getTime() < new Date().getTime()) {
			return isIdoSuccessfull
				? new BigNumber(
						fromWei(prsaleTokensBalance?.presaleTvlBalance)
				  ).gt(0)
				: new BigNumber(
						fromWei(
							prsaleTokensBalance?.presaleTokenBalance,
							ido?.decimal
						)
				  ).gt(0);
		}

		return new BigNumber(
			fromWei(prsaleTokensBalance?.presaleTvlBalance)
		).gt(0);
	}, [
		ido?.decimal,
		ido?.idoEndDate,
		isIdoSuccessfull,
		prsaleTokensBalance?.presaleTokenBalance,
		prsaleTokensBalance?.presaleTvlBalance,
	]);

	useEffect(() => {
		getPoolInfo();
		dispatch(setIsnavigate(true));
	}, []);

	useEffect(() => {
		if (
			!ido?.tokenAddress ||
			!ido?.idoAddress ||
			!currentChainId ||
			!userAccount
		)
			return;

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
		setTokenName(getTokentoClaim());
	}, [prsaleTokensBalance, isIdoSuccessfull, ido]);

	//calculate fee percentage

	useEffect(() => {
		if (!currentChainId) return;
		dispatch(
			getAllFeeAction({
				chainId: currentChainId,
			})
		);
	}, [currentChainId]);

	useEffect(() => {
		if (!postfee || !poolInfo?.totalRaised) return;
		setPostFeeValuePr((+poolInfo?.totalRaised * +postfee) / 100);
	}, [poolInfo?.totalRaised, postfee]);

	useEffect(() => {
		if (!transaction.hash && !transaction.type) {
			return;
		}

		if (
			["withdrawRaised_fund"].includes(transaction.type) &&
			(transaction.status === "success" ||
				transaction.status === "failed")
		) {
			getPoolInfo();
			!swapDialogOpen && setSwapDialog(true);
		}
	}, [getPoolInfo, swapDialogOpen, transaction, transaction.status]);

	const currentSwapStatus = useMemo(() => {
		if (new Date(ido?.idoEndDate)?.getTime() > new Date().getTime()) {
			return {
				currentBtnText: "Igo Not End Yet",
				disabled: true,
			};
		}

		if (!isTokentoClaim()) {
			return {
				currentBtnText: "Insufficient Fund",
				disabled: true,
			};
		}

		if (!userAccount) {
			return { currentBtnText: "Connect Wallet", disabled: false };
		}

		if (
			["withdrawRaised_fund"].includes(transaction.type) &&
			transaction.status === "pending"
		) {
			return {
				currentBtnText: "Pending Transaction...",
				disabled: true,
			};
		}

		if (loading) {
			return {
				currentBtnText: "Loading... ",
				disabled: true,
			};
		}

		return { currentBtnText: "Withdraw Fund", disabled: false };
	}, [
		ido?.idoEndDate,
		isTokentoClaim,
		userAccount,
		transaction.type,
		transaction.status,
	]);

	const withdrowFundRaise = () => {
		if (!userAccount) {
			setWallateModel(!wallateModel);
			return;
		}
		// if (
		// 	["withdrawRaised_fund"].includes(transaction.type) &&
		// 	transaction.status === "pending" &&
		// 	!swapDialogOpen
		// ) {
		// 	setSwapDialog(true);
		// 	return;
		// }

		if (!ido?.tokenAddress || !ido?.idoAddress) return;
		dispatch(
			withdrawRaisedFundAction({
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
												to="/ido-details"
											>
												Ido-Details
											</Link>
											<span className="sub-title">
												Withdraw-Funds
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
											Withdraw Funds
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
										disabled={currentSwapStatus.disabled}
										onClick={withdrowFundRaise}
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
										Total Token Sold :{" "}
										{fromWei(
											poolInfo?.totalTokenSold,
											ido?.decimal
										)}{" "}
										{ido?.symbol?.toUpperCase()}
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
										{fromWei(poolInfo?.totalRaised)}{" "}
										{ido?.pairCoin}
									</Typography>

									{postFeeValuePr && (
										<Typography
											variant="h6"
											sx={{
												mb: 1,
												color: "white",
												padding: 1,
												borderBottom: "1px solid white",
											}}
										>
											Post Fee To Pay : {postFeeValuePr} %
										</Typography>
									)}
									{/* 
								<Typography
									variant="h6"
									sx={{
										mb: 1,
										color: "white",
										padding: 1,
										borderBottom: "1px solid white",
									}}
								>
									
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
									End Time:
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
									{"Buy Token"}
								</Typography> */}
								</Box>
							</Card>
						</Grid>
					</Grid>
				</Wrapper>
			</ConnectionCheckWrapper>
		</>
	);
};

export default Withdraw;
