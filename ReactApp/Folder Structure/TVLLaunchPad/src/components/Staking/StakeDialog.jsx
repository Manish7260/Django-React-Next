import {
	Box,
	Button,
	Dialog,
	DialogContent,
	styled,
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { erc20Contract } from "contract";
import React, { useEffect, useMemo, useState } from "react";
import {
	formatCurrency,
	fromWei,
	isNumber,
	resetCurrencyFormatting,
} from "utils";

const MainFieldContainer = styled(Box)(
	() => `
	 
		width: 100%;
		border: 2px solid rgba(224, 224, 224,0.6);
		
		min-height: 50px;
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

const StakeDialog = ({
	open,
	handleClose,
	type,
	pool,
	stakeTokens,
	unstakeTokens,
	transactionStatus,
	poolInfo,
	stopped,
}) => {
	const { library, account } = useWeb3React();
	const [inputTokens, setTokenValue] = useState("");
	const [balance, setbalance] = useState("0.00");
	const [error, setError] = useState({ status: false, message: "" });

	const checkBalance = async () => {
		try {
			const _erc20Contract = erc20Contract({
				address: pool?.stakingToken,
				library,
			});
			const bal = await _erc20Contract.balanceOf(account);
			setbalance(bal?.toString());
		} catch (err) {
			console.log("err", err);
		}
	};

	const handleInputChange = (e) => {
		if (
			!isNumber(e.nativeEvent.data) &&
			e.nativeEvent.inputType !== "deleteContentBackward"
		) {
			setError({ status: true, message: "Please enter numbers only!" });
			return;
		}
		setTokenValue(resetCurrencyFormatting(e.target.value));

		if (error.status) {
			setError({ status: false, message: "" });
		}
	};

	useEffect(() => {
		if (!library || !pool?.stakingToken) return;
		checkBalance();
	}, [pool?.stakingToken, library]);

	const onConfirm = async () => {
		let enteredTokens = inputTokens;
		const stakedTokens = fromWei(poolInfo?.staked)?.toString();
		const balanceTokens = fromWei(balance)?.toString();
		if (enteredTokens === "" || new BigNumber(enteredTokens).eq(0)) {
			setError({
				status: true,
				message: `Please enter some ${pool?.stakingSymbol} to ${type} !`,
			});
			return;
		}

		if (type !== "stake" && new BigNumber(enteredTokens).gt(stakedTokens)) {
			setError({
				status: true,
				message: `Maximum withdraw amount can not exceed ${formatCurrency(
					stakedTokens
				)} !`,
			});
			return;
		}

		if (
			type === "stake" &&
			new BigNumber(enteredTokens).gt(balanceTokens)
		) {
			setError({
				status: true,
				message: `Can not stake more that ${formatCurrency(
					balanceTokens
				)} ${pool?.stakingSymbol}!`,
			});
			return;
		}

		setError({});

		if (type === "stake") {
			if (new BigNumber(enteredTokens).eq(balanceTokens)) {
				enteredTokens -= 1;
			}

			await stakeTokens(enteredTokens.toString(), pool?.pid);
		} else {
			await unstakeTokens(enteredTokens?.toString(), pool?.pid, stopped);
		}
		handleClose();
	};

	const formattedBalance = useMemo(() => {
		return formatCurrency(fromWei(poolTokenBalance));
	}, [poolTokenBalance, account, tokenType]);

	const formattedStakedBalance = useMemo(() => {
		return formatCurrency(fromWei(poolInfo?.staked));
	}, [poolInfo, pool?.stakingSymbol, account]);

	const onClose = () => {
		handleClose();
		setTokenValue("");
		setError({});
	};

	return (
		<div>
			<div>
				{/* <Slide direction="up" in={open} mountOnEnter unmountOnExit> */}
				<Dialog
					open={open}
					keepMounted
					onClose={onClose}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogContent className="dialoge__content__section">
						<div className="ConnectWallet_Card">
							<div className="ConnectWallet_Card_Headings">
								<h2>
									{type === "stake"
										? "Stake tokens"
										: "Withdraw tokens"}
								</h2>
								<p>
									{type === "stake"
										? `Available tokens: ${formattedBalance}  ${pool?.stakingSymbol}`
										: `Staked tokens: ${formattedStakedBalance} ${pool?.stakingSymbol}`}{" "}
								</p>
							</div>
							<div>
								<MainFieldContainer>
									<Field>
										<InputFieldAndSelectBox>
											<input
												style={{
													color: "white",
													outline: "none",
													fontSize: "20px",
													maxWidth: "200px",
													fontWeight: 500,
													borderColor: "transparent",
													backgroundColor:
														"#36648a00",
												}}
												placeholder="0"
												value={
													inputTokens
														? formatCurrency(
																inputTokens,
																false,
																0,
																true
														  )
														: ""
												}
												onChange={handleInputChange}
											/>
											<MaxSelectBoxComponent>
												<SelectBoxComponent>
													<span
														style={{
															color: "white",
															fontSize: "15px",
														}}
													>
														Select
													</span>
													<span
														style={{
															color: "white",
														}}
													></span>
												</SelectBoxComponent>
											</MaxSelectBoxComponent>
										</InputFieldAndSelectBox>
									</Field>
								</MainFieldContainer>
							</div>

							<div className="ConnectWallet_Content">
								<div className="row">
									<div className="col-sm-6">
										<div
											style={{ cursor: "pointer" }}
											onClick={onClose}
											className="ConnectWallet_Btn"
										>
											Cancel
										</div>
									</div>
									<div className="col-sm-6">
										<div
											style={{ cursor: "pointer" }}
											onClick={onConfirm}
											className="ConnectWallet_Btn"
										>
											Confirm
										</div>
									</div>
								</div>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};

export default StakeDialog;
