import { createAsyncThunk } from "@reduxjs/toolkit";
import BigNumber from "bignumber.js";
import {
	allowanceAmount,
	IDO_PRE_SALE_FACTORY_ADDRESS,
	TVL_ADDRESS,
} from "constant";
import {
	bep20Contract,
	erc20Contract,
	web3Bep20Contract,
	web3Erc20Contract,
	web3IdoFactoryContract,
	web3IdoPresaleContract,
} from "contract";
import { setIdoUpdateDataAction, transactionAction } from "redux/reducers";
import { fromWei, getNativeBalance, revertedError, toWei } from "utils";
import {
	createIdoService,
	deleteIgo,
	getAllIgo,
	updateIgo,
} from "redux/services/idoService";
import { AxiosError } from "axios";
import { setIdoCreateInDbAction } from "redux/reducers/idoSlice";
import { addAddress, removeAddress } from "redux/services/whitelistService";

export const createIdo = createAsyncThunk(
	"ido/createIdo",
	async (data, { getState, rejectWithValue, dispatch }) => {
		/**
		 * data ={
	
		 * payload: {
		 * }
		 * }
		 */
		const { ido } = getState();
		const { _idoFactoryContract } = ido;

		const _erc20Contrcat = web3Erc20Contract({
			address: data?.tokenAddress,
			chainId: ido?.currentChainId,
		});

		if (!_idoFactoryContract || !ido?.userAccount) {
			return;
		}

		try {
			//get token decimal
			const decimal = await _erc20Contrcat.methods.decimals().call();
			const info = {
				...data,
				tokenAllocation: toWei(data?.tokenAllocation, decimal),
				softCap: toWei(data?.softCap, decimal),
				hardCap: toWei(data?.hardCap, decimal),
				minBuy: toWei(data?.minBuy, decimal),
				maxBuy: toWei(data?.maxBuy, decimal),
				decimal: decimal,
			};
			dispatch(setIdoCreateInDbAction(info));

			// let eventData;
			await _idoFactoryContract.methods
				.createIDO(
					{
						TokenAddress: data?.tokenAddress,
						TokenAllocation: toWei(
							data?.tokenAllocation?.toString(),
							decimal
						),
						TokenRate: toWei(data?.tokenRate),
						SoftCap: toWei(data?.softCap, decimal),
						HardCap: toWei(data?.hardCap, decimal),
						MinBuyPerUser: toWei(data?.minBuy, decimal),
						MaxBuyPerUser: toWei(data?.maxBuy, decimal),
						StartTime: Math.floor(
							new Date(data?.idoStartDate).getTime() / 1000
						),
						EndTime: Math.floor(
							new Date(data?.idoEndDate).getTime() / 1000
						),
						UseWhiteList: data?.whiteList,
					},
					//this is ido token owner address
					data?.ownerAddress
				)
				.send(
					{ from: ido?.userAccount },
					function (error, transactionHash) {
						if (error) {
							console.log("error", error);
							return dispatch(
								transactionAction({
									transaction: {
										type: "create_ido",
										hash: transactionHash,
										status: "failed",
										result: {},
									},
									error: revertedError(error),
								})
							);
						} else {
							dispatch(
								transactionAction({
									transaction: {
										type: "create_ido",
										hash: transactionHash,
										status: "pending",
										result: {},
									},
								})
							);
						}
					}
				)
				.on("receipt", async function (receipt) {
					console.log("receipt", receipt);
					// console.log("eventData", eventData);
					dispatch(
						transactionAction({
							type: "create_ido",
							hash: null,
							status: "success",
							result: receipt,
						})
					);
				})
				.on("error", async function (error) {
					console.log("error", error);
					dispatch(
						transactionAction({
							transaction: {
								type: "create_ido",
								hash: null,
								status: "failed",
								result: {},
							},
							error: revertedError(error, 2),
						})
					);
				});

			// eventData = transaction.events["IdoCreated"].returnValues;

			// if (eventData?.idoaddress) {
			// 	const info = {
			// 		...data,
			// 		idoAddress: eventData?.idoaddress,
			// 		tokenAllocation: toWei(data?.tokenAllocation, decimal),
			// 		softCap: toWei(data?.softCap, decimal),
			// 		hardCap: toWei(data?.hardCap, decimal),
			// 		minBuy: toWei(data?.minBuy, decimal),
			// 		maxBuy: toWei(data?.maxBuy, decimal),
			// 		decimal: decimal,
			// 	};
			// 	dispatch(setIdoCreateInDbAction(info));
			// 	//save eventData in database
			// 	// await createIdoService(info);
			// }
		} catch (err) {
			console.log("err", err);
			const parsedError = JSON.stringify(err.message);
			if (parsedError.includes("reverted with reason ")) {
				return rejectWithValue(revertedError(err));
			}
		}
	}
);

//need to chack for buy time
export const checkTVLAllowenceForIdoPresale = createAsyncThunk(
	"ido/checkallownceforPresale",
	async (data, { getState, rejectWithValue, dispatch }) => {
		/**
		 * data ={
		 *  chainId,
		 * account,
		 * library,
		 * token
		 * payload: {
		 * }
		 * }
		 */

		try {
			if (data?.token?.type === "stable") {
				// const tvlAddress = TVL_ADDRESS[data?.chainId];

				// if (!tvlAddress) {
				// 	return rejectWithValue("No TVL Token found on this chain");
				// }
				const _bep20Contract = bep20Contract({
					address: data?.token?.address,
					library: data?.library,
				});
				const allowence = await _bep20Contract.allowance(
					data?.account,
					data?.payload?.idoAddress
				);
				if (new BigNumber(allowence?.toString()).gt(0)) {
					return true;
				} else {
					return false;
				}
			} else if (data?.token?.type === "native") {
				return true;
			}
		} catch (err) {
			const parsedError = JSON.stringify(err.message);
			if (parsedError.includes("reverted with reason ")) {
				return rejectWithValue(revertedError(err));
			}
			return rejectWithValue(err.message);
		}
	}
);

//need to chack for buy time
export const confirmTvlAllowenceForIdoPresale = createAsyncThunk(
	"ido/confirmtvlallowenceforIdoPresale",
	async (data, { getState, rejectWithValue, dispatch }) => {
		/**
		 * data ={
		 *  chainId,
		 * account,
		 * payload: {
		 * }
		 * }
		 */

		const tvlAddress = TVL_ADDRESS[data?.chainId];

		if (!tvlAddress) {
			return rejectWithValue("No TVL Token found on this chain");
		}
		try {
			const _bep20Contract = web3Bep20Contract({
				address: tvlAddress,
				chainId: data?.chainId,
			});
			await _bep20Contract.methods
				.approve(data?.payload?.idoAddress, allowanceAmount)
				.send(
					{ from: data?.account },
					function (error, transactionHash) {
						if (error) {
							dispatch(
								transactionAction({
									transaction: {
										type: "tvl_approve",
										hash: null,
										status: "failed",
										result: {},
									},
									error: revertedError(error),
								})
							);
						} else {
							dispatch(
								transactionAction({
									transaction: {
										type: "tvl_approve",
										hash: transactionHash,
										status: "pending",
										result: {},
									},
								})
							);
						}
					}
				)
				.on("receipt", async function (receipt) {
					dispatch(
						transactionAction({
							tvlApproved: true,
							transaction: {
								type: "tvl_approve",
								hash: null,
								status: "success",
								result: receipt,
							},
						})
					);
				})
				.on("error", async function (error) {
					console.log("error", error);
					dispatch(
						transactionAction({
							tvlApproved: false,
							transaction: {
								type: "tvl_approve",
								hash: null,
								status: "failed",
								result: {},
							},
							error: revertedError(error, 2),
						})
					);
				});
		} catch (err) {
			const parsedError = JSON.stringify(err.message);
			if (parsedError.includes("reverted with reason ")) {
				return rejectWithValue(revertedError(err));
			}
			return rejectWithValue(err.message);
		}
	}
);

export const buyTokenAction = createAsyncThunk(
	"ido/buytoken",
	async (data, { getState, rejectWithValue, dispatch }) => {
		/**
		 * data ={
		 *  chainId,
		 * account,
		 * amount
		 * library,
		 * token
		 * payload: {
		 * }
		 * }
		 */

		try {
			// const _idoPresale = web3IdoPresaleContract({
			// 	address: data?.payload?.idoAddress,
			// 	chainId: data?.chainId,
			// });
			const { ido } = getState();
			const { _idoPresaleContract, tvlApproved } = ido;

			if (!_idoPresaleContract) {
				return rejectWithValue("Somthing went wrong");
			}

			if (data?.token?.type === "stable") {
				if (tvlApproved) {
					const _erc20Contrcat = erc20Contract({
						address: data?.payload?.tokenAddress,
						library: data?.library,
					});

					const decimal = await _erc20Contrcat.decimals();

					await _idoPresaleContract.methods
						.buyTokens(toWei(data?.amount, decimal))
						.send(
							{ from: data?.account },
							function (error, transactionHash) {
								if (error) {
									dispatch(
										transactionAction({
											transaction: {
												type: "buy_token",
												hash: null,
												status: "failed",
												result: {},
											},
											error: revertedError(error),
										})
									);
								} else {
									dispatch(
										transactionAction({
											transaction: {
												type: "buy_token",
												hash: transactionHash,
												status: "pending",
												result: {},
											},
										})
									);
								}
							}
						)
						.on("receipt", async function (receipt) {
							console.log("receipt", receipt);
							dispatch(
								transactionAction({
									transaction: {
										type: "buy_token",
										hash: null,
										status: "success",
										result: receipt,
									},
								})
							);
						})
						.on("error", async function (error) {
							console.log("error", error);
							transactionAction({
								transaction: {
									type: "buy_token",
									hash: null,
									status: "failed",
									result: {},
								},
								error: revertedError(error, 2),
							});
						});
				} else {
					dispatch(
						confirmTvlAllowenceForIdoPresale({
							chainId: data?.chainId,
							account: data?.account,
							payload: data?.payload,
						})
					);
				}
			} else if (data?.token?.type === "native") {
				await _idoPresaleContract.methods
					.buyTokensWithNative()
					.send(
						{ from: data?.account, value: toWei(data?.amount) },
						function (error, transactionHash) {
							if (error) {
								dispatch(
									transactionAction({
										transaction: {
											type: "buy_token",
											hash: null,
											status: "failed",
											result: {},
										},
										error: revertedError(error),
									})
								);
							} else {
								dispatch(
									transactionAction({
										transaction: {
											type: "buy_token",
											hash: transactionHash,
											status: "pending",
											result: {},
										},
									})
								);
							}
						}
					)
					.on("receipt", async function (receipt) {
						console.log("receipt", receipt);
						dispatch(
							transactionAction({
								transaction: {
									type: "buy_token",
									hash: null,
									status: "success",
									result: receipt,
								},
							})
						);
					})
					.on("error", async function (error) {
						console.log("error", error);
						transactionAction({
							transaction: {
								type: "buy_token",
								hash: null,
								status: "failed",
								result: {},
							},
							error: revertedError(error, 2),
						});
					});
			}
		} catch (err) {
			console.log("errfdfsdfsd", err);
			const parsedError = JSON.stringify(err.message);
			if (parsedError.includes("reverted with reason ")) {
				return rejectWithValue(revertedError(err));
			}
			return rejectWithValue(err.message);
		}
	}
);

export const claimTokenAction = createAsyncThunk(
	"ido/claimToken",
	async (data, { getState, rejectWithValue, dispatch }) => {
		/**
		 * data ={
		 * chainId,
		 * account,
		 * payload: {
		 * }
		 * }
		 */

		try {
			// const _idoPresale = web3IdoPresaleContract({
			// 	address: data?.payload?.idoAddress,
			// 	chainId: data?.chainId,
			// });

			const { ido } = getState();
			const { _idoPresaleContract } = ido;

			if (!_idoPresaleContract) {
				return rejectWithValue("Somthing went wrong");
			}

			await _idoPresaleContract.methods
				.claimTokens()
				.send(
					{ from: data?.account },
					function (error, transactionHash) {
						if (error) {
							dispatch(
								transactionAction({
									transaction: {
										type: "claim_token",
										hash: null,
										status: "failed",
										result: {},
									},
									error: revertedError(error),
								})
							);
						} else {
							dispatch(
								transactionAction({
									transaction: {
										type: "claim_token",
										hash: transactionHash,
										status: "pending",
										result: {},
									},
								})
							);
						}
					}
				)
				.on("receipt", async function (receipt) {
					console.log("receipt", receipt);
					dispatch(
						transactionAction({
							transaction: {
								type: "claim_token",
								hash: null,
								status: "success",
								result: receipt,
							},
						})
					);
				})
				.on("error", async function (error) {
					console.log("error", error);
					transactionAction({
						transaction: {
							type: "claim_token",
							hash: null,
							status: "failed",
							result: {},
						},
						error: revertedError(error, 2),
					});
				});
		} catch (err) {
			const parsedError = JSON.stringify(err.message);
			if (parsedError.includes("reverted with reason ")) {
				return rejectWithValue(revertedError(err));
			}
			return rejectWithValue(err.message);
		}
	}
);

//only for token(pool) owner
export const updateIdoAction = createAsyncThunk(
	"ido/updateIdo",
	async (data, { getState, rejectWithValue, dispatch }) => {
		/**
		 * data ={
		 *  chainId,
		 * account,
		 * amount
		 * payload: {
		 * }
		 * }
		 */

		try {
			// const _idoPresale = web3IdoPresaleContract({
			// 	address: data?.payload?.idoAddress,
			// 	chainId: data?.chainId,
			// });

			const { ido } = getState();
			const { _idoPresaleContract } = ido;

			if (!_idoPresaleContract) {
				return rejectWithValue("Somthing went wrong");
			}

			dispatch(
				setIdoUpdateDataAction({
					...data?.payload,
					minBuy: toWei(data?.payload?.minBuy, ido?.ido?.decimal),
					maxBuy: toWei(data?.payload?.maxBuy, ido?.ido?.decimal),
				})
			);

			const tx = await _idoPresaleContract.methods
				.updateIdoInfo(
					toWei(data?.payload?.minBuy, ido?.ido?.decimal),
					toWei(data?.payload?.maxBuy, ido?.ido?.decimal),
					Math.floor(
						new Date(data?.payload?.idoStartDate).getTime() / 1000
					),
					Math.floor(
						new Date(data?.payload?.idoEndDate).getTime() / 1000
					),
					data?.payload?.whiteList
				)
				.send(
					{ from: data?.account },
					function (error, transactionHash) {
						if (error) {
							return dispatch(
								transactionAction({
									transaction: {
										type: "update_ido",
										hash: null,
										status: "failed",
										result: {},
									},
									error: revertedError(error),
								})
							);
						} else {
							dispatch(
								transactionAction({
									transaction: {
										type: "update_ido",
										hash: transactionHash,
										status: "pending",
										result: {},
									},
								})
							);
						}
					}
				)
				.on("receipt", async function (receipt) {
					console.log("receipt", receipt);
					dispatch(updateIdoDbAction());
					dispatch(
						transactionAction({
							transaction: {
								type: "update_ido",
								hash: null,
								status: "success",
								result: receipt,
							},
						})
					);
				})
				.on("error", async function (error) {
					console.log("error", error);
					dispatch(
						transactionAction({
							transaction: {
								type: "update_ido",
								hash: null,
								status: "failed",
								result: {},
							},
							// error: revertedError(error, 2),
						})
					);
				});
			console.log("tx", tx);
		} catch (err) {
			console.log("err", err);
			const parsedError = JSON.stringify(err.message);
			if (parsedError.includes("reverted with reason ")) {
				return rejectWithValue(revertedError(err));
			}
			return rejectWithValue(err.message);
		}
	}
);

//only for token(pool) owner
export const withdrawRaisedFundAction = createAsyncThunk(
	"ido/withdrawRaisedFund",
	async (data, { getState, rejectWithValue, dispatch }) => {
		/**
		 * data ={
		 *  chainId,
		 * account,
		 * payload: {
		 * }
		 * }
		 */

		try {
			const _idoPresale = web3IdoPresaleContract({
				address: data?.payload?.idoAddress,
				chainId: data?.chainId,
			});

			await _idoPresale.methods
				.withdrawRaisedFund()
				.send(
					{ from: data?.account },
					function (error, transactionHash) {
						if (error) {
							dispatch(
								transactionAction({
									transaction: {
										type: "withdrawRaised_fund",
										hash: null,
										status: "failed",
										result: {},
									},
									error: revertedError(error),
								})
							);
						} else {
							dispatch(
								transactionAction({
									transaction: {
										type: "withdrawRaised_fund",
										hash: transactionHash,
										status: "pending",
										result: {},
									},
								})
							);
						}
					}
				)
				.on("receipt", async function (receipt) {
					console.log("receipt", receipt);
					dispatch(
						transactionAction({
							transaction: {
								type: "withdrawRaised_fund",
								hash: null,
								status: "success",
								result: receipt,
							},
						})
					);
				})
				.on("error", async function (error) {
					console.log("error", error);
					transactionAction({
						transaction: {
							type: "withdrawRaised_fund",
							hash: null,
							status: "failed",
							result: {},
						},
						error: revertedError(error, 2),
					});
				});
		} catch (err) {
			const parsedError = JSON.stringify(err.message);
			if (parsedError.includes("reverted with reason ")) {
				return rejectWithValue(revertedError(err));
			}
			return rejectWithValue(err.message);
		}
	}
);

//only for token(pool) owner
export const addToWhiteListAction = createAsyncThunk(
	"ido/addToWhiteList",
	async (data, { getState, rejectWithValue, dispatch }) => {
		/**
		 * data ={
		 *  chainId,
		 * account,
		 * idoAddress
		 * payload: {
		 * }
		 * }
		 */

		try {
			const _idoPresale = web3IdoPresaleContract({
				address: data?.idoAddress,
				chainId: data?.chainId,
			});
			console.log("call", data);
			const tx = await _idoPresale.methods
				.addAddressesToWhitelist(data?.payload)
				.send(
					{ from: data?.account },
					function (error, transactionHash) {
						if (error) {
							dispatch(
								transactionAction({
									transaction: {
										type: "add_whitelist",
										hash: null,
										status: "failed",
										result: {},
									},
									error: revertedError(error),
								})
							);
						} else {
							data?.cb();
							dispatch(
								transactionAction({
									transaction: {
										type: "add_whitelist",
										hash: transactionHash,
										status: "pending",
										result: {},
									},
								})
							);
						}
					}
				)
				.on("receipt", async function (receipt) {
					console.log("receipt", receipt);
					dispatch(addToWhiteList(data?.payload));
					dispatch(
						transactionAction({
							transaction: {
								type: "add_whitelist",
								hash: null,
								status: "success",
								result: receipt,
							},
						})
					);
				})
				.on("error", async function (error) {
					console.log("error", error);
					transactionAction({
						transaction: {
							type: "add_whitelist",
							hash: null,
							status: "failed",
							result: {},
						},
						error: revertedError(error, 2),
					});
				});

			console.log("tx", tx);
		} catch (err) {
			console.log("err", err);
			const parsedError = JSON.stringify(err.message);
			if (parsedError.includes("reverted with reason ")) {
				return rejectWithValue(revertedError(err));
			}
			return rejectWithValue(err.message);
		}
	}
);

//only for token(pool) owner
export const removeToWhiteListAction = createAsyncThunk(
	"ido/removeToWhiteList",
	async (data, { getState, rejectWithValue, dispatch }) => {
		/**
		 * data ={
		 *  chainId,
		 * account,
		 * idoAddress
		 * payload: {
		 * }
		 * }
		 */

		try {
			const _idoPresale = web3IdoPresaleContract({
				address: data?.idoAddress,
				chainId: data?.chainId,
			});

			await _idoPresale.methods
				.removeAddressesFromWhitelist(data?.payload)
				.send(
					{ from: data?.account },
					function (error, transactionHash) {
						if (error) {
							dispatch(
								transactionAction({
									transaction: {
										type: "remove_whitelist",
										hash: null,
										status: "failed",
										result: {},
									},
									error: revertedError(error),
								})
							);
						} else {
							data?.cb();
							dispatch(
								transactionAction({
									transaction: {
										type: "remove_whitelist",
										hash: transactionHash,
										status: "pending",
										result: {},
									},
								})
							);
						}
					}
				)
				.on("receipt", async function (receipt) {
					dispatch(removeWhiteList(data?.payload));
					dispatch(
						transactionAction({
							transaction: {
								type: "remove_whitelist",
								hash: null,
								status: "success",
								result: receipt,
							},
						})
					);
				})
				.on("error", async function (error) {
					console.log("error", error);
					transactionAction({
						transaction: {
							type: "remove_whitelist",
							hash: null,
							status: "failed",
							result: {},
						},
						error: revertedError(error, 2),
					});
				});
		} catch (err) {
			const parsedError = JSON.stringify(err.message);
			if (parsedError.includes("reverted with reason ")) {
				return rejectWithValue(revertedError(err));
			}
			return rejectWithValue(err.message);
		}
	}
);

export const isWhitelistedAction = createAsyncThunk(
	"ido/isWhitelistedAction",
	async (data, { getState, rejectWithValue, dispatch }) => {
		/**
		 * data ={
		 *  chainId,
		 * account,
		 * payload: {
		 * }
		 * }
		 */

		try {
			const _idoPresale = web3IdoPresaleContract({
				address: data?.payload?.idoAddress,
				chainId: data?.chainId,
			});

			const result = await _idoPresale.methods
				.isWhitelisted(data?.payload?.account)
				.call();
			return result;
		} catch (err) {
			const parsedError = JSON.stringify(err.message);
			if (parsedError.includes("reverted with reason ")) {
				return rejectWithValue(revertedError(err));
			}
			return rejectWithValue(err.message);
		}
	}
);

// pool information
export const poolInfoAction = createAsyncThunk(
	"ido/poolInfo",
	async (data, { getState, rejectWithValue, dispatch }) => {
		/**
		 * data ={
		 *  chainId,
		 * account
		 * payload: {
		 * }
		 * }
		 */
		console.log("call", data?.payload?.idoAddress);
		try {
			const _idoPresale = web3IdoPresaleContract({
				address: data?.payload?.idoAddress,
				chainId: data?.chainId,
			});

			console.log("_idoPresale", _idoPresale);
			// const totalRaised = await _idoPresale.methods.tvlRaised().call();
			// const totalTokenSold = await _idoPresale.methods
			// 	.totalTokenSold()
			// 	.call();
			// const pool = await _idoPresale.methods.idoPoolInfo();
			// const userInfo = await _idoPresale.methods
			// 	.userRecord(data?.account)
			// 	.call();

			const [totalRaised, totalTokenSold, pool, userInfo] =
				await Promise.all([
					_idoPresale.methods.valueRaised().call(),
					_idoPresale.methods.totalTokenSold().call(),
					_idoPresale.methods.idoPoolInfo().call(),
					_idoPresale.methods.userRecord(data?.account).call(),
				]);

			return {
				totalRaised,
				totalTokenSold,
				pool,
				userInfo,
			};
		} catch (err) {
			console.log("err", err);
			const parsedError = JSON.stringify(err.message);
			if (parsedError.includes("reverted with reason ")) {
				return rejectWithValue(revertedError(err));
			}
			return rejectWithValue(err.message);
		}
	}
);

export const userIsWhiteListedAction = createAsyncThunk(
	"ido/userIsWhiteListedAction",
	async (_, { getState, rejectWithValue, dispatch }) => {
		/**
		 * data ={
		 *  chainId,
		 * account
		 * payload: {
		 * }
		 * }
		 */
		const { ido } = getState();
		console.log("call", ido?.ido?.idoAddress);
		try {
			const _idoPresale = web3IdoPresaleContract({
				address: ido?.ido?.idoAddress,
				chainId: ido?.currentChainId,
			});

			console.log("_idoPresale", _idoPresale);
			// const totalRaised = await _idoPresale.methods.tvlRaised().call();
			// const totalTokenSold = await _idoPresale.methods
			// 	.totalTokenSold()
			// 	.call();
			// const pool = await _idoPresale.methods.idoPoolInfo();
			// const userInfo = await _idoPresale.methods
			// 	.userRecord(data?.account)
			// 	.call();

			const result = await _idoPresale.methods
				.whiteList(ido?.userAccount)
				.call();

			return result;
		} catch (err) {
			console.log("err", err);
			const parsedError = JSON.stringify(err.message);
			if (parsedError.includes("reverted with reason ")) {
				return rejectWithValue(revertedError(err));
			}
			return rejectWithValue(err.message);
		}
	}
);

//user info in pool
export const userInfoInPoolAction = createAsyncThunk(
	"ido/userInfoInpoolaction",
	async (data, { getState, rejectWithValue, dispatch }) => {
		/**
		 * data ={
		 *  chainId,
		 * account
		 * payload: {
		 * }
		 * }
		 */

		try {
			const _idoPresale = web3IdoPresaleContract({
				address: data?.payload?.idoAddress,
				chainId: data?.chainId,
			});

			const userInfo = await _idoPresale.methods
				.userRecord(data?.account)
				.call();

			return userInfo;
		} catch (err) {
			const parsedError = JSON.stringify(err.message);
			if (parsedError.includes("reverted with reason ")) {
				return rejectWithValue(revertedError(err));
			}
			return rejectWithValue(err.message);
		}
	}
);

export const getTvlBalanceAction = createAsyncThunk(
	"ido/gettvlbalance",
	async (payload, { getState, rejectWithValue, dispatch }) => {
		/**
		 * payload = {
		 * library
		 * account,
		 * token
		 * }
		 */
		console.log("call", payload);
		try {
			let balance = "0.00";
			if (payload?.token?.type === "stable") {
				const tvlAddress = TVL_ADDRESS[payload?.chainId];
				if (!tvlAddress) {
					return rejectWithValue("Please select diffrent chain");
				}
				const bep20 = bep20Contract({
					address: tvlAddress,
					library: payload?.library,
				});
				const bal = await bep20?.balanceOf(payload?.account);
				balance = bal?.toString() || "0.00";
			} else if (payload?.token?.type === "native") {
				balance = await getNativeBalance({
					chainId: payload?.chainId,
					address: payload?.account,
				});
			}

			return balance;
		} catch (err) {
			console.log("err", err);
			return rejectWithValue("Failed to fetch Tvl balance");
		}
	}
);

export const checkIdosuccesfullAction = createAsyncThunk(
	"ido/checkIdosuccesful",
	async (data, { getState, rejectWithValue, dispatch }) => {
		/**
		 * payload = {
		 * library
		 * account
		 * }
		 */

		try {
			const _idoPresale = web3IdoPresaleContract({
				address: data?.payload?.idoAddress,
				chainId: data?.chainId,
			});
			// const totalRaised = await _idoPresale.methods.tvlRaised().call();
			// const totalTokenSold = await _idoPresale.methods
			// 	.totalTokenSold()
			// 	.call();
			// const pool = await _idoPresale.methods.idoPoolInfo();
			// const userInfo = await _idoPresale.methods
			// 	.userRecord(data?.account)
			// 	.call(
			const result = await _idoPresale.methods.isIdoSuccesful().call();

			return result;
		} catch (err) {
			console.log("err", err);
			const parsedError = JSON.stringify(err.message);
			if (parsedError.includes("reverted with reason ")) {
				return rejectWithValue(revertedError(err));
			}
			return rejectWithValue(err.message);
		}
	}
);

export const getIdosAction = createAsyncThunk(
	"ido/getallidos",
	async (data, { getState, rejectWithValue, dispatch }) => {
		const { ido } = getState();
		try {
			const query = {
				limit: data?.limit || 9,
				pageNo: data?.reset ? 1 : ido?.pageNo,
				pagination: true,
				status: data?.status,
			};
			if (data?.search) {
				query.search = data?.search;
			}
			if (data?.chain) {
				query.chain = data?.chain;
			}
			console.log("data", data);
			console.log("query", query);
			const response = await getAllIgo(query);
			console.log("response", response);
			return {
				data: response?.data?.data || [],
				count: response?.data?.count || 0,
				totalPages: response?.data?.totalPages || 1,
				pageNo: query?.pageNo + 1,
				idoStatus: data?.status,
				reset: data?.reset,
			};
		} catch (error) {
			return rejectWithValue("faield to fetch idos");
		}
	}
);

export const getIdoPresaleTokensBalancesAction = createAsyncThunk(
	"ido/getIdoPresaleTokensBalancesAction",
	async (_, { getState, rejectWithValue, dispatch }) => {
		/**
		 * data = {
		 * library
		 * account
		 * tokenAddress
		 * }
		 */
		try {
			const { ido } = getState();
			const tvlAddress = TVL_ADDRESS[ido?.currentChainId];
			if (!tvlAddress) {
				return rejectWithValue("Please select diffrent chain");
			}

			const bep20 = web3Bep20Contract({
				address: tvlAddress,
				chainId: ido?.currentChainId,
			});

			const erc20 = web3Erc20Contract({
				address: ido?.ido?.tokenAddress,
				chainId: ido?.currentChainId,
			});

			const [tvlBalance, tokenBalance] = await Promise.all([
				bep20?.methods.balanceOf(ido?.ido?.idoAddress).call(),
				erc20?.methods.balanceOf(ido?.ido?.idoAddress).call(),
			]);

			console.log("tvlBalance", tvlBalance?.toString());
			console.log("tokenBalance?.toString()", tokenBalance?.toString());

			return {
				presaleTvlBalance: tvlBalance?.toString() || 0,
				presaleTokenBalance: tokenBalance?.toString() || 0,
			};
		} catch (err) {
			console.log("err", err);
			return rejectWithValue("Failed to fetch Tvl balance");
		}
	}
);

export const idocheckTokenAllowence = createAsyncThunk(
	"ido/checkAllowence",
	async (payload, { getState, rejectWithValue, dispatch }) => {
		try {
			const { ido } = getState();
			const { userAccount, currentChainId } = ido;

			const factoryAddress = IDO_PRE_SALE_FACTORY_ADDRESS[currentChainId];
			if (!factoryAddress) {
				return rejectWithValue("please select diffrent chain id");
			}

			const _erc20 = web3Erc20Contract({
				address: payload,
				chainId: currentChainId,
			});

			const tokenAllowance = await _erc20?.methods
				.allowance(userAccount, factoryAddress)
				.call();

			console.log("tokenAllowance.toString(", tokenAllowance?.toString());

			if (new BigNumber(tokenAllowance?.toString()).gt(0)) {
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.log("err", err);
			return rejectWithValue("Failed to check allowance");
		}
	}
);

//for db actions

//for admin
export const createIdoDbAction = createAsyncThunk(
	"ido/createidoindbaction",
	async (data, { getState, rejectWithValue, dispatch }) => {
		try {
			await createIdoService(data);
			return;
		} catch (err) {
			console.log("err", err);
			if (err instanceof AxiosError) {
				return rejectWithValue(err?.response?.data?.errors[0]);
			}
			return rejectWithValue(err?.message);
		}
	}
);

export const updateIdoDbAction = createAsyncThunk(
	"ido/updateidoindbaction",
	async (_, { getState, rejectWithValue, dispatch }) => {
		const { ido } = getState();
		console.log("updating", ido);
		try {
			await updateIgo({
				...ido?.ido,
				...ido?.updateIdodata,
			});
			return;
		} catch (err) {
			console.log("err", err);
			if (err instanceof AxiosError) {
				return rejectWithValue(err?.response?.data?.errors[0]);
			}
			return rejectWithValue(err?.message);
		}
	}
);

export const addToWhiteList = createAsyncThunk(
	"ido/addToWhiteList",
	async (data, { getState, rejectWithValue, dispatch }) => {
		try {
			const { ido } = getState();
			const payload = data?.map((ele) => ({
				idoId: ido?.ido?.id,
				address: ele,
				status: "add",
			}));
			console.log("payload", payload);
			await addAddress(payload);
			return;
		} catch (err) {
			console.log("err", err);
			if (err instanceof AxiosError) {
				return rejectWithValue(err?.response?.data?.errors[0]);
			}
			return rejectWithValue(err?.message);
		}
	}
);

export const removeWhiteList = createAsyncThunk(
	"ido/removeWhiteList",
	async (data, { getState, rejectWithValue, dispatch }) => {
		try {
			const { ido } = getState();
			const payload = {
				addresses: data,
				idoId: ido?.ido?.id,
				status: "remove",
			};
			await removeAddress(payload);
			return;
		} catch (err) {
			console.log("err", err);
			if (err instanceof AxiosError) {
				return rejectWithValue(err?.response?.data?.errors[0]);
			}
			return rejectWithValue(err?.message);
		}
	}
);
// ido
export const deleteIDOAction = createAsyncThunk(
	"ido/deleteIdo",
	async (_, { getState, rejectWithValue, dispatch }) => {
		try {
			const { ido } = getState();
			await deleteIgo(ido?.ido?.id);
		} catch (err) {
			console.log("err", err);
			if (err instanceof AxiosError) {
				return rejectWithValue(err?.response?.data?.errors[0]);
			}
			return rejectWithValue(err?.message);
		}
	}
);

// cancelIDO
export const cancleIdoAction = createAsyncThunk(
	"ido/cancleIdoAction",
	async (data, { getState, rejectWithValue, dispatch }) => {
		/**
		 * data ={
		 *  chainId,
		 * account,
		 * idoAddress
		 * payload: {
		 * }
		 * }
		 */

		try {
			const _idoPresale = web3IdoPresaleContract({
				address: data?.idoAddress,
				chainId: data?.chainId,
			});
			await _idoPresale.methods
				.cancelIDO()
				.send(
					{ from: data?.account },
					async function (error, transactionHash) {
						if (error) {
							dispatch(
								transactionAction({
									transaction: {
										type: "cancle_ido",
										hash: null,
										status: "failed",
										result: {},
									},
									error: revertedError(error),
								})
							);
						} else {
							dispatch(
								transactionAction({
									transaction: {
										type: "cancle_ido",
										hash: transactionHash,
										status: "pending",
										result: {},
									},
								})
							);
							await dispatch(deleteIDOAction());
							data?.navigate("/idos-list");
						}
					}
				)
				.on("receipt", async function (receipt) {
					dispatch(
						transactionAction({
							transaction: {
								type: "cancle_ido",
								hash: null,
								status: "success",
								result: receipt,
							},
						})
					);
				})
				.on("error", async function (error) {
					console.log("error", error);
					transactionAction({
						transaction: {
							type: "cancle_ido",
							hash: null,
							status: "failed",
							result: {},
						},
						error: revertedError(error, 2),
					});
				});
			return;
		} catch (err) {
			const parsedError = JSON.stringify(err.message);
			if (parsedError.includes("reverted with reason ")) {
				return rejectWithValue(revertedError(err));
			}
			return rejectWithValue(err.message);
		}
	}
);
