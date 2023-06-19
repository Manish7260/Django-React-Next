import { useWeb3React } from "@web3-react/core";
import { useStakingContract } from "./useStakingContract";
import { useCallback } from "react";
import { toWei } from "utils";

export const useStakeCallback = () => {
	const { library, chainId, account } = useWeb3React();
	const _stakeContract = useStakingContract();

	const stakeTokens = useCallback(
		async (stakeAmount, poolId, decimal, setTransaction) => {
			try {
				const depositTokens = toWei(stakeAmount, decimal);

				await _stakeContract.methods
					.deposit(poolId, depositTokens)
					.send(
						{ from: account },
						async function (error, transactionHash) {
							if (error) {
								console.log("error", error);
								setTransaction({
									type: "token_Stake",
									hash: transactionHash,
									status: "failed",
									result: {},
								});
							} else {
								setTransaction({
									type: "token_Stake",
									hash: transactionHash,
									status: "pending",
									result: {},
								});
							}
						}
					)
					.on("receipt", async function (receipt) {
						console.log("receipt", receipt);
						setTransaction({
							type: "token_Stake",
							hash: null,
							status: "success",
							result: receipt,
						});
					})
					.on("error", async function (error) {
						console.log("error", error);
						setTransaction({
							type: "token_Stake",
							hash: null,
							status: "failed",
							result: {},
						});
					});
			} catch (error) {
				console.log("error", error);
			}
		},
		[_stakeContract, account]
	);

	const unstakeTokens = useCallback(
		async (unstakeAmount, poolId, isEnded, decimal, setTransaction) => {
			try {
				if (isEnded) {
					await _stakeContract.methods
						.emergencyWithdraw(poolId)
						.send(
							{ from: account },
							async function (error, transactionHash) {
								if (error) {
									console.log("error", error);
									setTransaction({
										type: "token_unStake",
										hash: transactionHash,
										status: "failed",
										result: {},
									});
								} else {
									setTransaction({
										type: "token_unStake",
										hash: transactionHash,
										status: "pending",
										result: {},
									});
								}
							}
						)
						.on("receipt", async function (receipt) {
							console.log("receipt", receipt);
							setTransaction({
								type: "token_unStake",
								hash: null,
								status: "success",
								result: receipt,
							});
						})
						.on("error", async function (error) {
							console.log("error", error);
							setTransaction({
								type: "token_unStake",
								hash: null,
								status: "failed",
								result: {},
							});
						});
				} else {
					const withdrawTokens = toWei(unstakeAmount, decimal);
					await _stakeContract.methods
						.withdraw(poolId, withdrawTokens)
						.send(
							{ from: account },
							async function (error, transactionHash) {
								if (error) {
									console.log("error", error);
									setTransaction({
										type: "token_unStake",
										hash: transactionHash,
										status: "failed",
										result: {},
									});
								} else {
									setTransaction({
										type: "token_unStake",
										hash: transactionHash,
										status: "pending",
										result: {},
									});
								}
							}
						)
						.on("receipt", async function (receipt) {
							console.log("receipt", receipt);
							setTransaction({
								type: "token_unStake",
								hash: null,
								status: "success",
								result: receipt,
							});
						})
						.on("error", async function (error) {
							console.log("error", error);
							setTransaction({
								type: "token_unStake",
								hash: null,
								status: "failed",
								result: {},
							});
						});
				}
			} catch (error) {
				console.log("error", error);
			}
		},
		[_stakeContract, account]
	);

	return {
		stakeTokens,
		unstakeTokens,
	};
};
