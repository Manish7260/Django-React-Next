import { Box } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { STAKING_CONTRACT_ADDRESS } from "constant";
import { usePoolStakedInfo } from "hooks/StakingHooks/usePoolStakedInfo";
import { useStakeCallback } from "hooks/StakingHooks/useStakeCallback";
import { useStaking } from "hooks/StakingHooks/useStaking";
import { useTokenAllowance } from "hooks/StakingHooks/useTokenAllowance";
import { useTokenContract } from "hooks/StakingHooks/useTokenContract";
import { useUserStakedInfo } from "hooks/StakingHooks/useUserStakedInfo";
import { useCallback, useEffect, useMemo, useState } from "react";
import { formatLargeNumber, toWei } from "utils";
import StakeDialog from "./StakeDialog";

const StakingCard = ({ pool }) => {
	//pending implementation
	const {
		poolInfo,
        loading,
        transaction,
        allowance,
        decimal,
        isEnded,
        confirmAllowance,
        stakeTokens,
        unstakeTokens
	} = useStaking(pool)
	const { chainId, account } = useWeb3React();

	const [accountDialog, setAccountDialog] = useState(false);

	const [dialog, setDialog] = useState({
		open: false,
		type: null,
		tokenType: null,
	});


	const onStake = (tokenType) => {
		setDialog({ open: true, type: "stake", tokenType: tokenType });
	};

	const onUnStake = (tokenType) => {
		setDialog({ open: true, type: "unstake", tokenType: tokenType });
	};

	const handleClose = () => {
		setDialog({ open: false, type: null });
	};


	const handleApprove = () => {
		const tokenWeiAmountToApprove = toWei("999999999");
		confirmAllowance(tokenWeiAmountToApprove);
	};
	//pending tokenprice

	//unstaking

	useEffect(() => {
		console.log("transaction", transaction);
	}, [transaction]);

	//claim token
	const handleClaim = async (tokenType) => {
		// const tokensToClaim = claimTokens;
		await unstakeTokens(
			// tokensToClaim,  pending implementation
		);
	};

	const claimDisableStatus = useMemo(() => {
		return (
			new BigNumber(poolInfo?.staked).eq(0) ||
			transaction.status === "pending"
		);
	}, [poolInfo, transaction]);

	// const totalValueLocked = useMemo(() => {
	// 	return formatLargeNumber(
	// 	  new BigNumber(fromWei(poolStakedInfo?.staked))
	// 		.multipliedBy(poolTokenPrice ? poolTokenPrice : 0)
	// 		.toString()
	// 	);
	//   }, [poolStakedInfo, poolTokenPrice]);

	return (
		<>
			<div className="col-lg-4 col-md-6 mb-30">
				<StakeDialog
					open={dialog.open}
					handleClose={handleClose}
					type={dialog.type}
					pool={pool}
					stakeTokens={stakeTokens}
					unstakeTokens={unstakeTokens}
					transactionStatus={transaction}
					poolInfo={poolInfo}
					stopped={isEnded}
				/>
				<div className="staking_flip_card lq_flip_card lq_flip_card1">
					<div className="staking_flip_card_inner">
						<div className="staking_flip_card_front p-0">
							<div className="lq_flip_card_headings">
								<h2>
									<span>
										<img
											src="assets/images/icons/Tokens.png"
											alt="icon"
										/>
									</span>
									AAVE-BNB
								</h2>
								<h3>15% APY</h3>
								<span className="staking_header_shape">
									<img
										src="assets/images/bg/staking_header_shape.png"
										alt="img"
									/>
								</span>
							</div>
							<Box
								mt={5}
								px={2}
								display="flex"
								flexDirection="column"
							>
								<Box
									display="flex"
									alignItems="center"
									justifyContent="space-between"
									borderBottom="1px solid gray"
									pb={1}
								>
									<Box fontFamily="Inter" fontSize="16px">
										Ends In
									</Box>
									<Box
										fontFamily="Russo One"
										fontWeight={500}
										fontSize="16px"
									>
										81,765,655 blocks
									</Box>
								</Box>
								<Box
									display="flex"
									alignItems="center"
									justifyContent="space-between"
									mt={1}
									pb={1}
									borderBottom="1px solid gray"
								>
									<Box display="flex" flexDirection="column">
										<Box
											textAlign="left"
											fontFamily="Inter"
											fontSize="16px"
										>
											BBFT EARNED
										</Box>
										<Box
											fontFamily="Inter"
											fontWeight={500}
											fontSize="16px"
											textAlign="left"
											mt={1}
										>
											0
										</Box>
										<Box
											textAlign="left"
											fontFamily="Inter"
											fontSize="16px"
											mt={1}
										>
											0 USD
										</Box>
									</Box>
									<Box display="flex" flexDirection="column">
										<Box
											border="2px solid #6D4AFE"
											style={{
												background: "#6D4AFE",
												cursor: "pointer",
											}}
											px={2}
											py={0.5}
											width="120px"
											textAlign="center"
											fontSize="16px"
											className="black-shape"
											fontFamily="Russo One"
										>
											<span class="hover-shape1"></span>
											<span class="hover-shape2"></span>
											<span class="hover-shape3"></span>
											Compound
										</Box>
										<Box
											px={2}
											py={0.5}
											mt={1.5}
											width="120px"
											textAlign="center"
											fontFamily="Russo One"
											fontSize="16px"
											border="2px solid #6D4AFE"
											style={{
												background: "#6D4AFE",
												cursor: "pointer",
											}}
											className="black-shape"
										>
											<span class="hover-shape1"></span>
											<span class="hover-shape2"></span>
											<span class="hover-shape3"></span>
											Harvest
										</Box>
									</Box>
								</Box>
								<Box
									display="flex"
									alignItems="center"
									justifyContent="space-between"
									borderBottom="1px solid gray"
									mt={0.6}
									pb={0.6}
								>
									<Box display="flex" flexDirection="column">
										<Box
											textAlign="left"
											mt={1}
											fontFamily="Inter"
											fontSize="16px"
										>
											BUSD REFLECTED
										</Box>
										<Box
											textAlign="left"
											fontFamily="Inter"
											fontWeight={500}
											fontSize="16px"
											mt={1}
										>
											0
										</Box>
										<Box
											textAlign="left"
											mt={1}
											fontFamily="Inter"
											fontSize="16px"
										>
											0 USD
										</Box>
									</Box>
									<Box display="flex" flexDirection="column">
										<Box
											border="2px solid #6D4AFE"
											style={{
												background: "#6D4AFE",
												cursor: "pointer",
											}}
											px={2}
											py={0.5}
											width="120px"
											textAlign="center"
											fontSize="16px"
											className="black-shape"
											fontFamily="Russo One"
										>
											<span class="hover-shape1"></span>
											<span class="hover-shape2"></span>
											<span class="hover-shape3"></span>
											Compound
										</Box>
										<Box
											px={2}
											py={0.5}
											mt={1.5}
											width="120px"
											textAlign="center"
											fontFamily="Russo One"
											fontSize="16px"
											border="2px solid #6D4AFE"
											style={{
												background: "#6D4AFE",
												cursor: "pointer",
											}}
											className="black-shape"
										>
											<span class="hover-shape1"></span>
											<span class="hover-shape2"></span>
											<span class="hover-shape3"></span>
											Harvest
										</Box>
									</Box>
								</Box>
								<Box
									display="flex"
									alignItems="center"
									justifyContent="space-between"
									mt={1}
								>
									<Box fontFamily="Inter" fontSize="16px">
										DEPOSIT FEE
									</Box>
									<Box
										fontFamily="Russo One"
										fontWeight={500}
										fontSize="16px"
									>
										0.00%
									</Box>
								</Box>
								<Box
									display="flex"
									alignItems="center"
									justifyContent="space-between"
									mt={1}
								>
									<Box fontFamily="Inter" fontSize="16px">
										WITHDRAW FEE
									</Box>
									<Box
										fontFamily="Russo One"
										fontWeight={500}
										fontSize="16px"
									>
										0.50%
									</Box>
								</Box>
								{/* <Box
								display="flex"
								alignItems="center"
								justifyContent="space-between"
							>
								<Box mt={2} display="flex" alignItems="center">
									<Box fontFamily="Inter">
										Add To Metamask{" "}
										<img src={metamask} width="20px" />
									</Box>
								</Box>
								<Box
									border="2px solid #6D4AFE"
									style={{
										background: "#6D4AFE",
										cursor: "pointer",
									}}
									px={2}
									py={0.3}
									mt={2}
									width="90px"
									textAlign="center"
									fontFamily="Russo One"
									fontSize="16px"
									className="black-shape"
								>
									<span class="hover-shape1"></span>
									<span class="hover-shape2"></span>
									<span class="hover-shape3"></span>
									Manual
								</Box>
							</Box> */}
								<Box
									mt={1}
									display="flex"
									flexDirection="column"
								>
									<Box
										border="2px solid #6D4AFE"
										style={{
											background: "#6D4AFE",
											cursor: "pointer",
										}}
										px={2}
										py={0.5}
										mt={0.5}
										textAlign="center"
										fontFamily="Russo One"
										fontSize="18px"
										className="black-shape"
										onClick={() => {
											console.log("call");
											onStake();
										}}
									>
										<span class="hover-shape1"></span>
										<span class="hover-shape2"></span>
										<span class="hover-shape3"></span>
										Connect Wallet
									</Box>
								</Box>
								<Box
									display="flex"
									alignItems="center"
									flexDirection="column"
									width="100%"
									mt={-1}
								>
									<div className="lq_flip_front_card_bottom">
										<ul>
											<li
												style={{
													marginRight: "10px",
												}}
											>
												<button>Token Info</button>
											</li>
											<li
												style={{
													marginLeft: "10px",
												}}
											>
												<button>Project Site</button>
											</li>
										</ul>
									</div>
								</Box>
							</Box>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default StakingCard;
