import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import BigNumber from "bignumber.js";
import { IDO_PRE_SALE_FACTORY_ADDRESS } from "constant";
import { web3Erc20Contract, web3IdoFactoryContract } from "contract";
import { toast } from "react-toastify";
import { transactionActionidoApply } from "redux/reducers";
import { createIgoApply } from "redux/services/igoApplyService";
import { revertedError, toWei, uploadToIpfs } from "utils";

export const igoApplyAction = createAsyncThunk(
	"igoApply/create",
	async (data, { getState, rejectWithValue, dispatch }) => {
		try {
			const [symbolImg, coverImg] = await Promise.all([
				uploadToIpfs(data.payload?.projectCover),
				uploadToIpfs(data.payload?.coverImage),
			]);

			data.payload.projectCover = `${process.env.REACT_APP_IPFS_GATEWAY}${symbolImg?.data?.IpfsHash}`;
			data.payload.coverImage = `${process.env.REACT_APP_IPFS_GATEWAY}${coverImg?.data?.IpfsHash}`;
			// data.payload.projectCover = `assets/images/icons/BlockChain5.png`;

			const formData = new FormData();
			for (const key in data?.payload) {
				formData.append(key, data?.payload[key]);
			}
			const res = await createIgoApply(data?.payload);
			data.callback();
			return res.data;
		} catch (err) {
			if (err instanceof AxiosError) {
				toast.error(err?.response?.data?.errors[0]);
				return rejectWithValue("");
			}
			toast.error(err?.message);
			return rejectWithValue("");
		}
	}
);

export const checkAllowenceIgoApply = createAsyncThunk(
	"ido/checkAllowenceIgoApply",
	async (data, { getState, rejectWithValue, dispatch }) => {
		/**
		 * data ={
		 *  chainId,
		 * account,
		 * library,
		 * payload: {
		 * }
		 * }
		 */
		console.log("data11111111", data);

		try {
			const factoryAddress = IDO_PRE_SALE_FACTORY_ADDRESS[data?.chainId];

			if (!factoryAddress) {
				return rejectWithValue(
					"No ido presale contract found on this chain"
				);
			}
			const _erc20Contract = web3Erc20Contract({
				address: data?.payload?.tokenAddress,
				chainId: data?.chainId,
			});

			// const decimal = await _erc20Contract.methods.decimals().call();

			const [allowence, decimals] = await Promise.all([
				_erc20Contract.methods
					.allowance(data?.account, factoryAddress)
					.call(),
				await _erc20Contract.methods.decimals().call(),
			]);
			console.log("allowence", allowence);
			if (new BigNumber(allowence?.toString()).gt(0)) {
				return {
					allowence: true,
					decimals,
				};
			} else {
				return {
					allowence: false,
					decimals,
				};
			}
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

export const igoApproveToFactory = createAsyncThunk(
	"igoApply/igoApproveToFactory",
	async (data, { getState, rejectWithValue, dispatch }) => {
		/**
		 * data ={
		 *  chainId,
		 * account,
		 * payload: {
		 * },
		 * callback
		 * }
		 */

		const factoryAddress = IDO_PRE_SALE_FACTORY_ADDRESS[data?.chainId];
		console.log("factoryAddress", factoryAddress);
		if (!factoryAddress) {
			return rejectWithValue(
				"No ido presale contract found on this chain"
			);
		}

		console.log("factoryAddress", data);
		try {
			const _erc20Contract = web3Erc20Contract({
				address: data?.payload?.tokenAddress,
				chainId: data?.chainId,
			});

			const decimal = await _erc20Contract.methods.decimals().call();

			await _erc20Contract.methods
				.approve(
					factoryAddress,
					toWei(data?.payload?.tokenAllocation, decimal)
				)
				.send(
					{ from: data?.account },
					function (error, transactionHash) {
						if (error) {
							dispatch(
								transactionActionidoApply({
									transaction: {
										type: "token_approve",
										hash: null,
										status: "failed",
										result: {},
									},
									error: revertedError(error),
								})
							);
							return false;
						} else {
							dispatch(
								transactionActionidoApply({
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
					dispatch(
						transactionActionidoApply({
							tvlApproved: true,
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
						transactionActionidoApply({
							tvlApproved: false,
							transaction: {
								type: "token_approve",
								hash: null,
								status: "failed",
								result: {},
							},
							error: revertedError(error, 2),
						})
					);
				});
			return true;
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

//get all fees
export const getAllFeeAction = createAsyncThunk(
	"ido/getAllFeeAction",
	async (payload, { getState, rejectWithValue, dispatch }) => {
		try {
			const _idoPresaleFactory = web3IdoFactoryContract({
				chainId: payload?.chainId,
			});

			const [prefee, postfee] = await Promise.all([
				_idoPresaleFactory.methods.preFee().call(),
				_idoPresaleFactory.methods.postFeepc().call(),
			]);
			console.log("prefee", prefee);
			console.log("postfee", postfee);
			return {
				prefee,
				postfee,
			};
		} catch (err) {
			console.log("err", err);
			return rejectWithValue("Failed to check allowance");
		}
	}
);

export const feeCollectedAction = createAsyncThunk(
	"ido/feeCollectedAction",
	async (payload, { getState, rejectWithValue, dispatch }) => {
		try {
			const _idoPresaleFactory = web3IdoFactoryContract({
				chainId: payload?.chainId,
			});

			const result = await _idoPresaleFactory.methods
				.feeCollected(payload?.idoAddress)
				.call();

			console.log("result", result);
			return result;
		} catch (err) {
			console.log("err", err);
			return rejectWithValue("Failed to check allowance");
		}
	}
);

//payPreFee
export const payPreFeeIdoAction = createAsyncThunk(
	"ido/payPreFeeIdoAction",
	async (data, { getState, rejectWithValue, dispatch }) => {
		/**
		 * data ={
		 *  chainId,
		 * account,
		 * idoAddress
		 * }
		 */
		const { igoApply } = getState();
		const { prefee } = igoApply;
		try {
			const _idoPresaleFactory = web3IdoFactoryContract({
				chainId: data?.chainId,
			});
			await _idoPresaleFactory.methods
				.payPreFee(data?.idoAddress)
				.send(
					{ from: data?.account, value: prefee },
					async function (error, transactionHash) {
						if (error) {
							dispatch(
								transactionActionidoApply({
									transaction: {
										type: "collect_fee",
										hash: null,
										status: "failed",
										result: {},
									},
									error: revertedError(error),
								})
							);
						} else {
							dispatch(
								transactionActionidoApply({
									transaction: {
										type: "collect_fee",
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
						transactionActionidoApply({
							transaction: {
								type: "collect_fee",
								hash: null,
								status: "success",
								result: receipt,
							},
						})
					);
				})
				.on("error", async function (error) {
					console.log("error", error);
					transactionActionidoApply({
						transaction: {
							type: "collect_fee",
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
