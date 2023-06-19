import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
	checkAllowenceIgoApply,
	feeCollectedAction,
	getAllFeeAction,
	igoApplyAction,
	igoApproveToFactory,
	payPreFeeIdoAction,
} from "redux/actions/igoApplyAction";

const initialState = {
	loading: false,
	transaction: {
		type: null, // swap/ add_liquidity, remove_liquidity
		hash: null,
		status: null, // pending, success, failed
		result: null, // transaction result on success, { token0:{symbol, address, amount  }  , token1: { symbol, address, amount }, priceRatio:token0/token1 }
	},
	error: null,
	tokenApproved: false,
	decimals: null,
	prefee: 0,
	postfee: 0,
	isFeeCollected: false,
};

const igoApplySlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loadingAction: (state, action) => {
			state.loading = action.payload;
		},
		transactionActionidoApply: (state, action) => {
			state.transaction = action.payload.transaction;
			if (action.payload?.error) {
				state.error = action.payload.error;
				toast.error(action.payload.error);
			}
			if (action.payload?.tokenApproved !== undefined) {
				state.tokenApproved = action.payload?.tokenApproved;
			}
		},
	},
	extraReducers: {
		[igoApplyAction.pending]: (state, action) => {
			state.loading = true;
		},
		[igoApplyAction.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[igoApplyAction.rejected]: (state, action) => {
			state.loading = false;
		},
		//check allowence
		[checkAllowenceIgoApply.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[checkAllowenceIgoApply.fulfilled]: (state, action) => {
			state.loading = false;
			state.tokenApproved = action.payload?.allowence;
			state.decimals = action.payload?.decimals;
		},
		[checkAllowenceIgoApply.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		[igoApproveToFactory.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[igoApproveToFactory.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[igoApproveToFactory.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		//getAllFeeAction
		[getAllFeeAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[getAllFeeAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.prefee = action.payload?.prefee;
			state.postfee = action.payload?.postfee;
		},
		[getAllFeeAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		//feeCollectedAction

		[feeCollectedAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[feeCollectedAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.isFeeCollected = action.payload;
		},
		[feeCollectedAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		//payPreFeeIdoAction
		[payPreFeeIdoAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[payPreFeeIdoAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
		},
		[payPreFeeIdoAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const igoApplyReducer = igoApplySlice.reducer;

export const igoApplyState = (state) => state.igoApply;

export const { transactionActionidoApply } = igoApplySlice.actions;
