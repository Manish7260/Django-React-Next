/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */

import { Box, Button, Card, Grid, styled, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import Wrapper from "components/Wrapper";
import { SWAP_ADDRESS, TVL_BUSD_PAIR } from "constant";
import { useCallback, useEffect, useMemo, useState } from "react";
import "./swap.css";
import TokenModels from "./TokenModels";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { dexState, resetOutputAmount } from "redux/reducers/dexSlice";
import { checkAllowence } from "redux/actions";
import Modal from "components/popups/Modal";
import {
	confirmAllowence,
	getBalance,
	getOutTokenAmount,
	swap,
} from "redux/actions/dexAction";
import { fromWei, toWei } from "utils";
// import Loader from "components/Loader/Loader";
import TransactionConfirm from "components/common/TransactionConfirm/TransactionConfirm";
import { resultState } from "redux/reducers/dexSlice";
import ConnectionCheckWrapper from "components/ConnectionCheckWrapper/ConnectionCheckWrapper";

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

const Swap = () => {
	const { chainId, account, library } = useWeb3React();

	const dispatch = useDispatch();

	const { approvedToken, loading, transaction, outputTokenAmount, balance } =
		useSelector(dexState);

	const [modelOpen, setModelOpen] = useState(false);
	const [tokens, setTokens] = useState([]);
	const [flag, setFlag] = useState("");
	const [fromAmount, setFromAmount] = useState("");
	const [sourceToken, setSourceToken] = useState({});

	const [wallateModel, setWallateModel] = useState(false);
	const [swapDialogOpen, setSwapDialog] = useState(false);

	const [destToken, setDestToken] = useState({});

	const clearInputs = useCallback(() => {
		setFromAmount("");
		dispatch(resetOutputAmount());
	}, [dispatch]);

	const handleTransactionModelClose = useCallback(() => {
		dispatch(
			resultState({
				transaction: {
					...transaction,
					status: "",
				},
			})
		);
		setSwapDialog(false);
	}, [dispatch, transaction, swapDialogOpen]);

	const setMaxValue = () => {
		if (fromAmount === fromWei(balance)) {
			return setFromAmount("");
		}
		setFromAmount(fromWei(balance));
	};

	//get balance
	const getTokenBalance = useCallback(() => {
		if (!sourceToken?.address || !chainId || !account) return;
		dispatch(
			getBalance({
				library,
				account,
				token: sourceToken,
			})
		);
	}, [account, chainId, dispatch, library, sourceToken]);

	const getDestTokenAmountOut = async () => {
		if (!sourceToken?.address || !destToken?.address || !chainId) return;
		try {
			const swapAddress = SWAP_ADDRESS[chainId];
			if (swapAddress) {
				dispatch(
					getOutTokenAmount({
						chainId,
						library,
						token: sourceToken,
						amount: fromAmount || "0",
					})
				);
			}
		} catch (err) {}
	};

	useEffect(() => {
		if (!chainId) return;

		setTokens(TVL_BUSD_PAIR[chainId] || []);
	}, [chainId]);

	useEffect(() => {
		if (!sourceToken?.symbol) return;

		if (sourceToken?.symbol === "BUSD") {
			const tvl = tokens.find((tkn) => tkn?.symbol === "TVL");
			tvl && setDestToken(tvl);
			return;
		}
		const busd = tokens.find((tkn) => tkn?.symbol === "BUSD");
		busd && setDestToken(busd);
	}, [account, chainId, library, sourceToken, tokens]);

	useEffect(() => {
		if (!tokens.length) return;
		tokens.map((token) => {
			if (token?.symbol === "BUSD") {
				setSourceToken(token);
			}
			if (token?.symbol === "TVL") {
				setDestToken(token);
			}
		});
	}, [tokens]);

	useEffect(() => {
		if (!sourceToken?.address) return;
		const swapAddress = SWAP_ADDRESS[chainId];
		if (!swapAddress) return;

		dispatch(
			checkAllowence({
				token: sourceToken,
				account,
				swapAddress,
				library,
				amount: toWei(fromAmount),
			})
		);
	}, [account, chainId, dispatch, library, sourceToken]);

	useEffect(() => {
		if (!destToken?.symbol) return;

		if (destToken?.symbol === "BUSD") {
			const tvl = tokens.find((tkn) => tkn?.symbol === "TVL");
			tvl && setSourceToken(tvl);
			return;
		}
		const busd = tokens.find((tkn) => tkn?.symbol === "BUSD");
		busd && setSourceToken(busd);
	}, [destToken, tokens]);

	useEffect(() => {
		getTokenBalance();
	}, [account, chainId, getTokenBalance, library, sourceToken]);

	//get outputamount
	useEffect(() => {
		const timer = setTimeout(() => {
			getDestTokenAmountOut();
		}, 800);

		return () => clearTimeout(timer);
	}, [fromAmount]);

	const getToken = (token) => {
		console.log("token", token);
		if (!token)
			throw new Error(
				`Token ${token.symbol} not available on network ${chainId}`
			);

		clearInputs();

		if (flag === "From") {
			setSourceToken(token);
		} else if (flag === "To") {
			setDestToken(token);
		}
	};

	const isTokenApproved = useMemo(() => {
		return approvedToken?.status;
	}, [approvedToken?.status]);

	const currentSwapStatus = useMemo(() => {
		if (!account) {
			return { currentBtnText: "Connect Wallet", disabled: false };
		}

		if (
			["swap", "token_approve"].includes(transaction.type) &&
			transaction.status === "pending"
		) {
			return {
				currentBtnText: "Pending Transaction...",
				disabled: true,
			};
		}

		if (!fromAmount) {
			return { currentBtnText: "Enter token amount", disabled: true };
		}

		console.log("+formetValue(balance) > 0", +fromWei(balance) > 50);
		if (!+fromWei(balance) > 50) {
			return {
				currentBtnText: "Insufficient funds!",
				disabled: true,
			};
		}

		if (!approvedToken?.status) {
			return {
				currentBtnText: "Approve " + sourceToken?.symbol,
				disabled: false,
			};
		}

		if (loading) {
			return {
				currentBtnText: "Loading... ",
				disabled: true,
			};
		}

		return { currentBtnText: "Swap", disabled: false };
	}, [
		account,
		approvedToken?.status,
		balance,
		fromAmount,
		loading,
		sourceToken?.symbol,
		transaction.status,
		transaction.type,
	]);

	// swap transaction status update
	useEffect(() => {
		console.log("transaction", transaction);
		if (!transaction.hash && !transaction.type) {
			return;
		}

		if (
			["swap_token", "token_approve"].includes(transaction.type) &&
			transaction.status === "success"
		) {
			setSwapDialog(true);
			clearInputs();
			getTokenBalance();
		}

		if (
			["swap_token", "token_approve"].includes(transaction.type) &&
			(transaction.status === "success" ||
				transaction.status === "failed") &&
			!swapDialogOpen
		) {
			setSwapDialog(true);
		}
	}, [
		clearInputs,
		getTokenBalance,
		swapDialogOpen,
		transaction,
		transaction.status,
	]);

	const handleAction = () => {
		if (!account) {
			setWallateModel(!wallateModel);
			return;
		}
		if (fromAmount) {
			if (!isFinite(fromAmount)) {
				return toast.error("please enter valid value");
			}
			if (+fromAmount <= 50) {
				return toast.info("Please enter value graterthan 50");
			}
		}

		if (
			["swap_token", "token_approve"].includes(transaction.type) &&
			transaction.status === "pending" &&
			!swapDialogOpen
		) {
			setSwapDialog(true);
			return;
		}

		if (isTokenApproved) {
			dispatch(
				swap({
					token: sourceToken,
					chainId,
					account,
					amount: toWei(fromAmount),
				})
			);
		} else {
			const swapAddress = SWAP_ADDRESS[chainId];
			if (chainId && !swapAddress) {
				toast.error("please select correnct chain");
				return;
			}
			console.log("hear");
			dispatch(
				confirmAllowence({
					token: sourceToken,
					chainId,
					account,
					amount: toWei(fromAmount),
					swapAddress,
				})
			);
		}
	};
	console.log("loading", loading);
	console.log("transaction", transaction);

	return (
		<>
			<ConnectionCheckWrapper>
				<Wrapper>
					{/* {loading && <Loader />} */}
					<Modal open={wallateModel} setOpen={setWallateModel} />
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
					<TokenModels
						open={modelOpen}
						setModelOpen={setModelOpen}
						tokens={tokens}
						onTokenSelect={getToken}
					/>
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
														onClick={() => {
															setFlag("From");
															setModelOpen(
																!modelOpen
															);
														}}
													>
														<img
															src={
																sourceToken.logo ||
																""
															}
															width="35px"
															alt={
																sourceToken.symbol
															}
														/>
														<Typography
															fontWeight={800}
															fontSize="18px"
															marginLeft="10px"
														>
															{sourceToken.symbol ||
																"select token"}
														</Typography>
													</Box>
												</Box>
												<Box>
													<InputBase
														placeholder="0.00"
														className="baseinput"
														value={fromAmount}
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
													Balance: {fromWei(balance)}

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
														onClick={() => {
															setFlag("To");
															setModelOpen(
																!modelOpen
															);
														}}
													>
														{destToken && (
															<img
																src={
																	destToken?.logo ||
																	""
																}
																width="35px"
																alt={
																	destToken?.symbol ||
																	""
																}
															/>
														)}
														<Typography
															fontWeight={800}
															fontSize="18px"
															marginLeft="10px"
														>
															{destToken?.symbol ||
																"select token"}
														</Typography>
													</Box>
												</Box>
												<Box>
													<InputBase
														placeholder="0.00"
														className="baseinput"
														value={fromWei(
															outputTokenAmount
														)}
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
									</Box>
								</Grid>
							</Grid>
						</Container>
					</Box>				</div> */}
					<TokenModels
						open={modelOpen}
						setModelOpen={setModelOpen}
						tokens={tokens}
						onTokenSelect={getToken}
					/>
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
													Balance:{fromWei(balance)}
												</Typography>
											</FieldTitleBox>
											<InputFieldAndSelectBox>
												<input
													style={{
														color: "white",
														outline: "none",
														fontSize: "20px",
														maxWidth: "150px",
														fontWeight: 500,
														borderColor:
															"transparent",
														backgroundColor:
															"#36648a00",
													}}
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
															onClick={() => {
																setFlag("From");
																setModelOpen(
																	!modelOpen
																);
															}}
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
														maxWidth: "150px",
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
														<SelectInput
															component="span"
															onClick={() => {
																setFlag("To");
																setModelOpen(
																	!modelOpen
																);
															}}
														>
															<span
																style={{
																	color: "white",
																	fontSize:
																		"15px",
																}}
															>
																{destToken?.symbol ||
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
						</Grid>
					</Grid>
				</Wrapper>
			</ConnectionCheckWrapper>
		</>
	);
};

export default Swap;
