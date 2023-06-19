/* eslint-disable jsx-a11y/img-redundant-alt */
import { Box, Button, Card, Grid, styled, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import Modal from "components/popups/Modal";
import Wrapper from "components/Wrapper";
import { NATIVE_TOKENS, TVL_ADDRESS } from "constant";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
	buyTokenAction,
	checkIdosuccesfullAction,
	checkTVLAllowenceForIdoPresale,
	confirmTvlAllowenceForIdoPresale,
	getTvlBalanceAction,
	poolInfoAction,
	userIsWhiteListedAction,
} from "redux/actions/idoAction";
import {
	idoState,
	setIsnavigate,
	transactionAction,
} from "redux/reducers/idoSlice";
import { calCulateOutputTokenAmount, fromWei, getNativeBalance } from "utils";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { NumericFormat } from "react-number-format";
import ScrollToTop from "components/ScrollToTop";
import TransactionConfirm from "components/common/TransactionConfirm/TransactionConfirm";
import ConnectionCheckWrapper from "components/ConnectionCheckWrapper/ConnectionCheckWrapper";
import TokenModels from "components/Swap/TokenModels";

//temperry css
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

const IdoPool = () => {
	const { active, library } = useWeb3React();

	const dispatch = useDispatch();

	const {
		loading,
		balanceOfTvl,
		tvlApproved,
		transaction,
		userAccount,
		currentChainId,
		poolInfo,
		ido,
		isWhiteListed,
	} = useSelector(idoState);

	const navigate = useNavigate();

	const handlePathchange = () => {
		navigate("/ido-claim", {
			state: {
				...ido,
			},
		});
	};

	//state
	// const [tvlAddress, setTvlAddress] = useState();
	const [wallateModel, setWallateModel] = useState(false);
	const [fromAmount, setFromAmount] = useState();
	const [outputTokenAmount, setOutputTokenAmount] = useState("0.00");
	const [swapDialogOpen, setSwapDialog] = useState(false);
	const [modelOpen, setModelOpen] = useState(false);
	const [tokens, setTokens] = useState([]);
	const [sourceToken, setSourceToken] = useState({});
	console.log("sourceToken", sourceToken);

	//functions
	const clearInputs = useCallback(() => {
		setFromAmount("");
	}, []);

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

	const getTvlBalance = useCallback(() => {
		dispatch(
			getTvlBalanceAction({
				library,
				chainId: currentChainId,
				account: userAccount,
				token: sourceToken,
			})
		);
	}, [userAccount, currentChainId, dispatch, library, sourceToken]);

	const setMaxValue = () => {
		if (fromAmount === fromWei(balanceOfTvl)) {
			return setFromAmount("");
		}
		setFromAmount(fromWei(balanceOfTvl));
	};

	const getPoolInfo = useCallback(() => {
		dispatch(
			poolInfoAction({
				chainId: currentChainId,
				account: userAccount,
				payload: ido,
			})
		);
		dispatch(userIsWhiteListedAction());
	}, [userAccount, currentChainId, dispatch, ido]);

	//check ido success full or not
	const checkIdoSuccessFull = useCallback(() => {
		dispatch(
			checkIdosuccesfullAction({
				chainId: currentChainId,
				payload: ido,
			})
		);
	}, [dispatch, currentChainId, ido]);

	// useEffect(() => {
	// 	if (!location.state) return;
	// 	dispatch(setIdoAction({ ...location.state }));
	// }, [location]);

	useEffect(() => {
		dispatch(setIsnavigate(true));
	}, []);

	useEffect(() => {
		if (!currentChainId || !userAccount || !ido?.idoAddress) return;
		getPoolInfo();
		checkIdoSuccessFull();
	}, [
		userAccount,
		currentChainId,
		checkIdoSuccessFull,
		dispatch,
		getPoolInfo,
		ido,
	]);

	useEffect(() => {
		if (!currentChainId || !userAccount) {
			return;
		}

		if (
			!ido?.tokenAddress ||
			!currentChainId ||
			!userAccount ||
			!sourceToken?.address
		)
			return;
		dispatch(
			checkTVLAllowenceForIdoPresale({
				chainId: currentChainId,
				account: userAccount,
				library,
				payload: ido,
				token: sourceToken,
			})
		);
	}, [currentChainId, userAccount, dispatch, library, ido, sourceToken]);

	//set Tvl address during chain change
	// useEffect(() => {
	// 	if (!currentChainId) return;
	// 	setTvlAddress(TVL_ADDRESS[currentChainId]);
	// }, [currentChainId]);

	//set output amount
	useEffect(() => {
		if (isFinite(fromAmount) && ido?.tokenRate && ido?.decimal) {
			setOutputTokenAmount(
				fromWei(
					calCulateOutputTokenAmount(
						fromAmount,
						ido?.tokenRate,
						ido?.decimal
					)
				)
			);
		}
	}, [fromAmount, ido?.decimal, ido?.tokenRate]);

	useEffect(() => {
		if (!currentChainId) return;

		setTokens(NATIVE_TOKENS[currentChainId] || []);
	}, [userAccount, currentChainId, library, currentChainId]);

	useEffect(() => {
		if (!tokens.length) return;

		console.log("ido", ido);
		const tkns = tokens?.find((tkn) => tkn?.symbol === ido?.pairCoin);
		tkns && setSourceToken(tkns);
	}, [tokens]);

	useEffect(() => {
		if (!sourceToken?.address) return;
		getTvlBalance();
	}, [sourceToken]);

	// const getToken = (token) => {
	// 	console.log("token", token);
	// 	if (!token)
	// 		throw new Error(
	// 			`Token ${token.symbol} not available on network ${currentChainId}`
	// 		);

	// 	clearInputs();
	// 	setSourceToken(token);
	// };

	const currentSwapStatus = useMemo(() => {
		console.log(
			"fromWei(poolInfo?.pool?.MaxBuyPerUser",
			fromWei(poolInfo.pool?.MaxBuyPerUser)
		);
		if (!userAccount) {
			return { currentBtnText: "Connect Wallet", disabled: false };
		}

		if (new Date(ido?.idoStartDate).getTime() > new Date().getTime()) {
			return {
				currentBtnText: "Ido Sale Not Start Yet",
				disabled: true,
			};
		}

		if (new Date(ido?.idoEndDate).getTime() < new Date().getTime()) {
			return {
				currentBtnText: "Ido Sale End",
				disabled: true,
			};
		}

		if (
			isWhiteListed?.isIdoWhiteListed &&
			!isWhiteListed?.isUserWhieListed
		) {
			return {
				currentBtnText: "You are not White Listed",
				disabled: true,
			};
		}

		if (
			["tvl_approve", "buy_token"].includes(transaction?.type) &&
			transaction?.status === "pending"
		) {
			return {
				currentBtnText: "Pending Transaction...",
				disabled: false,
			};
		}

		if (!fromAmount) {
			return { currentBtnText: "Enter token amount", disabled: true };
		}

		if (
			poolInfo?.pool?.MinBuyPerUser + fromAmount <
			+fromWei(poolInfo?.pool?.MinBuyPerUser)
		) {
			return {
				currentBtnText: `Min amount shoude be > ${fromWei(
					poolInfo?.pool?.MinBuyPerUser
				)}`,
				disabled: true,
			};
		}

		if (
			poolInfo?.pool?.MaxBuyPerUser &&
			+fromAmount > +fromWei(poolInfo?.pool?.MaxBuyPerUser)
		) {
			return {
				currentBtnText: `Max amount shoude be < ${fromWei(
					poolInfo?.pool?.MaxBuyPerUser
				)}`,
				disabled: true,
			};
		}

		if (!+fromWei(balanceOfTvl) > 1) {
			return {
				currentBtnText: "Insufficient funds!",
				disabled: true,
			};
		}

		if (!tvlApproved) {
			return {
				currentBtnText: "Approve TVL",
				disabled: false,
			};
		}

		if (loading) {
			return {
				currentBtnText: "Loading... ",
				disabled: true,
			};
		}

		return { currentBtnText: "Buy Token", disabled: false };
	}, [
		userAccount,
		ido?.idoStartDate,
		ido?.idoEndDate,
		transaction?.type,
		transaction?.status,
		fromAmount,
		poolInfo?.pool?.MinBuyPerUser,
		poolInfo?.pool?.MaxBuyPerUser,
		balanceOfTvl,
		tvlApproved,
		loading,
	]);

	useEffect(() => {
		console.log("transaction", transaction);
		if (!transaction?.hash && !transaction?.type) {
			return;
		}

		if (
			["tvl_approve", "buy_token"].includes(transaction?.type) &&
			transaction?.status === "success"
		) {
			transaction?.type === "buy_token" && clearInputs();

			getTvlBalance();
			getPoolInfo();
			checkIdoSuccessFull();
		}
		console.log("transaction?.type", transaction?.type);
		if (
			["tvl_approve", "buy_token"].includes(transaction?.type) &&
			(transaction?.status === "success" ||
				transaction?.status === "failed") &&
			!swapDialogOpen
		) {
			setSwapDialog(true);
		}
	}, [
		checkIdoSuccessFull,
		clearInputs,
		getTvlBalance,
		getPoolInfo,
		swapDialogOpen,
		transaction,
		transaction?.status,
	]);

	//handle final action
	const handleAction = () => {
		if (!userAccount) {
			setWallateModel(!wallateModel);
			return;
		}
		if (fromAmount && !isFinite(fromAmount)) {
			return toast.error("please enter valid value");
		}

		if (
			["tvl_approve", "buy_token"].includes(transaction?.type) &&
			transaction?.status === "pending" &&
			!swapDialogOpen
		) {
			setSwapDialog(true);
			return;
		}

		if (!ido?.tokenAddress || !ido?.idoAddress) return;

		dispatch(
			buyTokenAction({
				chainId: currentChainId,
				account: userAccount,
				amount: fromAmount,
				library,
				payload: ido,
				token: sourceToken,
			})
		);
	};

	//claim token
	// const claimToken = () => {
	// 	if (!account) {
	// 		setWallateModel(!wallateModel);
	// 		return;
	// 	}
	// 	if (
	// 		["claim_token", "claim_token"].includes(transaction.type) &&
	// 		transaction.status === "pending" &&
	// 		!swapDialogOpen
	// 	) {
	// 		setSwapDialog(true);
	// 		return;
	// 	}

	// 	if (!ido?.tokenAddress || !ido?.idoAddress) return;
	// 	dispatch(
	// 		claimTokenAction({
	// 			account,
	// 			chainId,
	// 			payload: ido,
	// 		})
	// 	);
	// };

	return (
		<>
			<ConnectionCheckWrapper>
				<Wrapper>
					{/* {loading && <Loader />} */}
					<Modal open={wallateModel} setOpen={setWallateModel} />
					<ScrollToTop />
					<TransactionConfirm
						open={swapDialogOpen}
						handleClose={handleTransactionModelClose}
						transaction={transaction}
					/>
					{/* <TransactionConfirm
					open={swapDialogOpen}
					handleClose={() => setSwapDialog(false)}
					fromAmount={fromAmount}
					sourceToken={sourceToken}
					destToken={destToken}
				/> */}
					{/* <div>
					<Box bgcolor="#0a1929" paddingY="4rem">
						<Container maxWidth="lg">
							<Grid container>
								<Grid item md={6} xs={12} margin="auto">
									<Box
										bgcolor="#17293d"
										padding="2rem"
										borderRadius="12px"
									>
										<Box
											marginY="2rem"
											textAlign="center"
											color="#fff"
										>
											<h1>Tvlswap</h1>
										</Box>
										<Box
											bgcolor="#0a1929"
											padding="10px"
											borderRadius="12px"
										>
											<Box marginBottom="10px">
												<Typography color="#fff">
													From
												</Typography>
											</Box>
											<Box
												flexDirection="row"
												display="flex"
												alignItems="center"
												className="baseinputbox"
											>
												<Box paddingX="1rem">
													<Box
														display="flex"
														alignItems="center"
													>
														<img
															src={
															
																"/assets/images/icons/phantom.png"
															}
															width="35px"
															alt={"Tvl"}
														/>
														<Typography
															fontWeight={800}
															fontSize="18px"
															marginLeft="10px"
														>
															{tvlAddress &&
																"TVL"}
														</Typography>
													</Box>
												</Box>
												<Box>
													<InputBase
														placeholder="0.00"
														className="baseinput"
														value={fromAmount}
														disabled={
															!tvlAddress ||
															!active
														}
														onChange={(e) =>
															setFromAmount(
																e.target.value
															)
														}
													/>
												</Box>
											</Box>
											<Box marginY="10px">
												<Typography color="#fff">
													Balance:{" "}
													{fromWei(balanceOfTvl)}
													
												</Typography>
											</Box>
										</Box>
										<Box paddingY="2rem"></Box>
										<Box
											bgcolor="#0a1929"
											padding="10px"
											borderRadius="12px"
										>
											<Box marginBottom="10px">
												<Typography color="#fff">
													To
												</Typography>
											</Box>
											<Box
												flexDirection="row"
												display="flex"
												alignItems="center"
												className="baseinputbox"
											>
												<Box paddingX="1rem">
													<Box
														display="flex"
														alignItems="center"
													>
														{ido?.tokenAddress && (
															<img
																src={
																	ido?.projectCover ||
																	"/assets/images/icons/Chain2.png"
																}
																width="35px"
																alt={
																	ido?.symbol ||
																	""
																}
															/>
														)}
														<Typography
															fontWeight={800}
															fontSize="18px"
															marginLeft="10px"
														>
															{ido?.symbol}
														</Typography>
													</Box>
												</Box>
												<Box>
													<InputBase
														placeholder="0.00"
														className="baseinput"
														value={
															outputTokenAmount
														}
														disabled={true}
														style={{
															color: "#fff !important",
														}}
													/>
												</Box>
											</Box>
											
										</Box>
										<Box paddingY="2rem"></Box>
										<Box textAlign="center">
											<Button
												variant="contained"
												disabled={
													currentSwapStatus.disabled
												}
												onClick={handleAction}
											>
												{
													currentSwapStatus.currentBtnText
												}
											</Button>
										</Box>
										<Box textAlign="center">
											<p>
												{fromWei(
													userInfoInPool?.tokenToClaim
												) || ""}
											</p>
											<Button
												variant="contained"
												disabled={
													Math.floor(
														new Date(
															Date.now() / 1000
														)
													) <
													Math.floor(
														new Date(
															new Date(
																ido?.idoEndDate
															).getTime / 1000
														)
													)
												}
												onClick={claimToken}
											>
												Cliam Tokens
											</Button>
										</Box>
									</Box>
								</Grid>
							</Grid>
						</Container>
					</Box>
				</div> */}
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
												Pool
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
										<h2 className="title mb-0">Pool</h2>
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
					{/* <TokenModels
						open={modelOpen}
						setModelOpen={setModelOpen}
						tokens={tokens}
						onTokenSelect={getToken}
					/> */}
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
									marginTop: 5,
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
										{"Buy Token"}
									</Typography>
								</Box>
								<form noValidate>
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
												<Typography>
													Balance:
													<NumericFormat
														displayType="text"
														value={fromWei(
															balanceOfTvl
														)}
														decimalScale={5}
													/>
												</Typography>
											</FieldTitleBox>
											<InputFieldAndSelectBox>
												<input
													style={{
														color: "white",
														outline: "none",
														fontSize: "20px",
														maxWidth: "200px",
														fontWeight: 500,
														borderColor:
															"transparent",
														backgroundColor:
															"#36648a00",
													}}
													// disabled={
													// 	!sourceToken?.addess ||
													// 	!active
													// }
													value={fromAmount}
													onChange={(e) =>
														setFromAmount(
															e.target.value
														)
													}
												/>
												<MaxSelectBoxComponent>
													<MaxSpan
														component="span"
														onClick={setMaxValue}
													>
														MAX
													</MaxSpan>
													<SelectBoxComponent>
														<SelectInput
															component="span"
															// onClick={() => {
															// 	setModelOpen(
															// 		!modelOpen
															// 	);
															// }}
														>
															<span
																style={{
																	color: "white",
																	fontSize:
																		"15px",
																}}
															>
																{sourceToken?.symbol ||
																	"Select"}
															</span>
															<span
																style={{
																	color: "white",
																}}
															>
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
												{/* <Typography>Balance:0.0</Typography> */}
											</FieldTitleBox>
											<InputFieldAndSelectBox>
												<input
													disabled={true}
													style={{
														color: "white",
														outline: "none",
														fontSize: "20px",
														maxWidth: "200px",
														fontWeight: 500,
														borderColor:
															"transparent",
														backgroundColor:
															"#36648a00",
													}}
													value={fromWei(
														outputTokenAmount
													)}
												/>
												<MaxSelectBoxComponent>
													{/* <MaxSpan component="span">MAX</MaxSpan> */}
													<SelectBoxComponent>
														<SelectInput component="span">
															<span
																style={{
																	color: "white",
																	fontSize:
																		"15px",
																}}
															>
																{ido?.symbol ||
																	""}
															</span>
															<span
																style={{
																	color: "white",
																}}
															>
																<ArrowDropDownIcon />
															</span>
														</SelectInput>
													</SelectBoxComponent>
												</MaxSelectBoxComponent>
											</InputFieldAndSelectBox>
										</Field>
									</MainFieldContainer>

									<Btn
										type="button"
										fullWidth
										size="large"
										variant="contained"
										disabled={currentSwapStatus.disabled}
										onClick={handleAction}
									>
										{currentSwapStatus.currentBtnText}
									</Btn>
								</form>
							</Card>
							{/* <ClaimToken ido={ido} /> */}
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
										Min. User Per Buy :{" "}
										{fromWei(poolInfo?.pool?.MinBuyPerUser)}{" "}
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
										Max. User Per Buy :{" "}
										{fromWei(poolInfo?.pool?.MaxBuyPerUser)}{" "}
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
										Your Allocation :{" "}
										{fromWei(
											poolInfo?.userInfo?.amountInvested
										)}{" "}
										TVL
									</Typography>
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
								<Btn
									type="button"
									fullWidth
									size="large"
									variant="contained"
									onClick={handlePathchange}
								>
									Go To Cliam Page
								</Btn>
							</Card>
						</Grid>
					</Grid>
				</Wrapper>
			</ConnectionCheckWrapper>
		</>
	);
};

export default IdoPool;
