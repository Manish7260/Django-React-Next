import { createAsyncThunk } from "@reduxjs/toolkit";
import BigNumber from "bignumber.js";
import { allowanceAmount } from "constant";
import {
	bep20Contract,
	swapContract,
	web3Bep20Contract,
	web3SwapContract,
} from "contract";
import { loadingState, resultState } from "redux/reducers/dexSlice";
import { revertedError, toWei } from "utils";

export const checkAllowence = createAsyncThunk(
	"dex/checkAllowence",
	async (payload, { getState, rejectWithValue, dispatch }) => {
		try {
			console.log("paylosadasdad", payload);
			const _bep20 = bep20Contract({
				address: payload?.token?.address,
				library: payload?.library,
			});
			console.log("payload", payload);

			const tokenAllowance = await _bep20?.allowance(
				payload?.account,
				payload?.swapAddress
			);
			const symb = await _bep20?.symbol();
			console.log("symb", symb);
			console.log("tokenAllowance.toString(", tokenAllowance?.toString());

			if (new BigNumber(tokenAllowance?.toString()).gt(0)) {
				return { symbol: payload?.token.symbol, status: true };
			} else {
				return { symbol: payload?.token.symbol, status: false };
			}
		} catch (err) {
			return rejectWithValue("Failed to check allowance");
		}
	}
);

export const confirmAllowence = createAsyncThunk(
	"dex/confirmAllowence",
	async (payload, { getState, rejectWithValue, dispatch }) => {
		try {
			dispatch(loadingState(true));
			const _bep20 = web3Bep20Contract({
				address: payload?.token?.address,
				chainId: payload?.chainId,
			});

			await _bep20.methods
				.approve(payload?.swapAddress, allowanceAmount)
				.send(
					{ from: payload?.account },
					function (error, transactionHash) {
						if (error) {
							dispatch(
								resultState({
									transaction: {
										type: "token_approve",
										hash: null,
										status: "failed",
										result: {},
									},
								})
							);
						} else {
							dispatch(
								resultState({
									transaction: {
										type: "token_approve",
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
						resultState({
							approvedToken: {
								symbol: payload?.token.symbol,
								status: true,
							},
							transaction: {
								type: "token_approve",
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
						resultState({
							approvedToken: {
								symbol: payload?.token.symbol,
								status: false,
							},
							transaction: {
								type: "token_approve",
								hash: null,
								status: "failed",
								result: {},
							},
						})
					);
				});

			dispatch(loadingState(false));
		} catch (err) {
			console.log("err", err);
			dispatch(loadingState(false));
			return rejectWithValue("Failed to confirm allowance");
		}
	}
);

export const swap = createAsyncThunk(
	"dex/swap",
	async (payload, { getState, rejectWithValue, dispatch }) => {
		try {
			dispatch(loadingState(true));
			const _swap = web3SwapContract({
				chainId: payload?.chainId,
			});

			let swapPromise;

			if (payload?.token?.symbol === "BUSD") {
				console.log("payload", payload);
				swapPromise = _swap.methods
					.buyTVL(payload?.amount)
					.send(
						{ from: payload?.account },
						function (error, transactionHash) {
							if (error) {
								dispatch(
									resultState({
										transaction: {
											type: "swap_token",
											hash: null,
											status: "failed",
											result: {},
										},
										error: revertedError(error, 2),
									})
								);
							} else {
								dispatch(
									resultState({
										transaction: {
											type: "swap_token",
											hash: transactionHash,
											status: "pending",
											result: {},
										},
									})
								);
							}
						}
					);
			} else {
				swapPromise = _swap.methods
					.sellTVL(payload?.amount)
					.send(
						{ from: payload?.account },
						function (error, transactionHash) {
							if (error) {
								dispatch(
									resultState({
										transaction: {
											type: "swap_token",
											hash: null,
											status: "failed",
											result: {},
										},
									})
								);
							} else {
								dispatch(
									resultState({
										transaction: {
											type: "swap_token",
											hash: transactionHash,
											status: "pending",
											result: {},
										},
									})
								);
							}
						}
					);
			}

			await swapPromise
				.on("receipt", async function (receipt) {
					dispatch(
						resultState({
							transaction: {
								type: "swap_token",
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
						resultState({
							transaction: {
								type: "swap_token",
								hash: null,
								status: "failed",
								result: {},
							},
						})
					);
				});
		} catch (err) {
			console.log("err", err);
			const parsedError = JSON.stringify(err.message);
			if (parsedError.includes("reverted with reason ")) {
				return rejectWithValue(revertedError(err));
			}
			return rejectWithValue("Failed to confirm allowance");
		}
	}
);

export const getOutTokenAmount = createAsyncThunk(
	"dex/outtokenamount",
	async (payload, { getState, rejectWithValue, dispatch }) => {
		try {
			const _swapContract = swapContract({
				chainId: payload?.chainId,
				library: payload?.library,
			});
			let out;
			if (payload?.token?.symbol === "BUSD") {
				console.log("BUSD");
				out = await _swapContract?.getTVLOutputAmount(
					toWei(payload?.amount)
				);
			} else {
				console.log("TVL");
				out = await _swapContract?.getBUSDOutputamount(
					toWei(payload?.amount)
				);
			}
			return out?.toString();
		} catch (err) {
			return rejectWithValue("Failed to fetch outputAmount");
		}
	}
);

export const getBalance = createAsyncThunk(
	"dex/getbalance",
	async (payload, { getState, rejectWithValue, dispatch }) => {
		try {
			const bep20 = bep20Contract({
				address: payload?.token?.address,
				library: payload?.library,
			});
			const bal = await bep20?.balanceOf(payload?.account);
			return bal?.toString() || "0.00";
		} catch (err) {
			console.log("err", err);
			return rejectWithValue("Failed to fetch balance");
		}
	}
);
