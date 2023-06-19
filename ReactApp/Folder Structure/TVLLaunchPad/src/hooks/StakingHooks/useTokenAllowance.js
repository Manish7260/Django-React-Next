import { useWeb3React } from "@web3-react/core";
import { useTokenContract } from "./useTokenContract";
import { useCallback, useEffect, useState } from "react";
import { toWei } from "utils";
import BigNumber from "bignumber.js";
import { STAKING_CONTRACT_ADDRESS } from "constant";

export const useTokenAllowance = (token, owner, spender) => {
	const _tokenContract = useTokenContract(token?.stakingToken);
	const { library, chainId, account } = useWeb3React();
	const [allowance, setAllowance] = useState(false);
	const [decimal, setDecimal] = useState(18);

	const checkAllowance = async () => {
		try {
			const [result, dec] = await Promise.all([
				_tokenContract.methods.allowance(owner, spender).call(),
				_tokenContract.methods.decimals().call(),
			]);
			console.log("result", result?.toString());
			console.log("dec", dec);
			setAllowance(new BigNumber(result?.toString()).gt(0));
			setDecimal(dec);
		} catch (err) {
			console.log("err", err);
		}
	};

	const confirmAllowance = useCallback(
		async (balance, setTransaction) => {
			const stakingContractAddress = STAKING_CONTRACT_ADDRESS[chainId];
			try {
				await _tokenContract.methods
					.approve(stakingContractAddress, toWei(balance, decimal))
					.send(
						{ from: account },
						async function (error, transactionHash) {
							if (error) {
								console.log("error", error);
								setTransaction({
									type: "staking_approve",
									hash: transactionHash,
									status: "failed",
									result: {},
								});
							} else {
								setTransaction({
									type: "staking_approve",
									hash: transactionHash,
									status: "pending",
									result: {},
								});
							}
						}
					)
					.on("receipt", async function (receipt) {
						console.log("receipt", receipt);
						// console.log("eventData", eventData);
						setTransaction({
							type: "staking_approve",
							hash: null,
							status: "success",
							result: receipt,
						});
					})
					.on("error", async function (error) {
						console.log("error", error);
						setTransaction({
							type: "staking_approve",
							hash: null,
							status: "failed",
							result: {},
						});
					});
			} catch (err) {
				console.log("err", err);
			}
		},
		[chainId, _tokenContract, decimal]
	);

	useEffect(() => {
		if (!_tokenContract) return;
		checkAllowance();
	}, [_tokenContract]);

	return {
		allowance,
		confirmAllowance,
		decimal,
	};
};
