import { useEffect, useState } from "react";
import { useStakingContract } from "./useStakingContract";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js/bignumber";
import { STAKING_CONTRACT_ADDRESS } from "constant";

export const useStaking = (pool) => {
    //contract
    const _stakeContract = useStakingContract();
    const _tokenContract = useTokenContract(pool?.stakingToken);
    const [transaction, setTransaction] = useState({
        type: null,
        hash: null,
        status: null,
        result: null,
    })

    const { chainId, account } = useWeb3React();

    //state
    const [poolInfo, setPoolInfo] = useState();
    const [loading, setLoading] = useState(false);
    const [allowance, setAllowance] = useState(false);
    const [decimal, setDecimal] = useState(18);
    const [isEnded, setIsEnded] = useState(false)

    const fatchPoolInfo = async () => {
        try {
            setLoading(true);
            const [pInfo, uInfo, pendingReward, allow, deci] = await Promise.all([
                _stakeContract.methods.getPoolInfo(pool?.pid).call(),
                _stakeContract.methods.userInfo(pool?.pid, account).call(),
                _stakeContract.methods.pendingReward(pool?.pid, account).call(),
                _tokenContract.methods.allowance(owner, spender).call(),
                _tokenContract.methods.decimals().call(),
            ]);

            const poolObj = {
                accTokenPerShare: pInfo?.[0]?.toString(),
                lastRewardBlock: pInfo?.[1].toString(),
                rewardPerBlock: pInfo?.[2]?.toString(),
                totalTokenStaked: pInfo?.[3]?.toString(),
                totalTokenClaimed: pInfo?.[4]?.toString(),

            };
            setIsEnded(new Date().getTime(pool?.endDate) < new Date().getTime());
            setAllowance(new BigNumber(allow?.toString()).gt(0));
            setDecimal(deci);
            setPoolInfo({
                staked: uInfo?.amount?.toString(),
                claimed: uInfo?.rewardClaimed?.toString(),
                pending: pendingReward?.toString(),
                staked: poolObj.totalTokenStaked,
                claimed: poolObj.totalTokenClaimed,
                apy: getApy({
                    poolObj: poolObj,
                    chainId: chainId,
                }),
            })
        } catch (err) {
            console.log('err', err)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!_stakeContract || !pool?.pid || !account || !_tokenContract) return;
        console.log("userstakingCall");
        fatchPoolInfo();
    }, [_stakeContract, pool, account, _tokenContract])

    const confirmAllowance = useCallback(
        async (balance) => {
            const stakingContractAddress = STAKING_CONTRACT_ADDRESS[chainId];
            try {
                setLoading(true);
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
            }finally {
                setLoading(false);
            }
        },
        [chainId, _tokenContract, decimal]
    );

    const stakeTokens = useCallback(
		async (stakeAmount) => {
			try {
                setLoading(true);
				const depositTokens = toWei(stakeAmount, decimal);

				await _stakeContract.methods
					.deposit(pool?.pid, depositTokens)
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
			} finally {
                setLoading(false)
            }
		},
		[_stakeContract, account, pool]
	);

    const unstakeTokens = useCallback(
		async (unstakeAmount) => {
			try {
                setLoading(true);
				if (isEnded) {
					await _stakeContract.methods
						.emergencyWithdraw(pool?.pid)
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
						.withdraw(pool?.pid, withdrawTokens)
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
			} finally {
                setLoading(false);
            }
		},
		[_stakeContract, account, pool]
	);

    return {
        poolInfo,
        loading,
        transaction,
        allowance,
        decimal,
        isEnded,
        confirmAllowance,
        stakeTokens,
        unstakeTokens
    }

};
