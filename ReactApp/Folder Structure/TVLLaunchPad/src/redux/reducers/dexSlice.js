import { toast } from "react-toastify";
import { checkAllowence } from "redux/actions";
import { getBalance, getOutTokenAmount, swap } from "redux/actions/dexAction";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
	loading: false,
	approvedToken: {},
	transaction: {
		type: null, // swap/ add_liquidity, remove_liquidity
		hash: null,
		status: "pending", // pending, success, failed
		result: null, // transaction result on success, { token0:{symbol, address, amount  }  , token1: { symbol, address, amount }, priceRatio:token0/token1 }
	},
	error: null,
	balance: "0.00",
	outputTokenAmount: "0.00"
};

const dexSlice = createSlice({
	name: "dex",
	initialState,
	reducers: {
		loadingState: (state, action) => {
			state.loading = action.payload;
		},
		resultState: (state, action) => {
			if (action.payload?.transaction) {
				state.transaction = action.payload?.transaction;
			}
			if (action.payload?.approvedToken) {
				state.approvedToken = action.payload?.approvedToken;
			}
		},
		resetOutputAmount: (state, action) => {
			state.outputTokenAmount = "0.00"
		}
	},
	extraReducers: {
		[checkAllowence.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[checkAllowence.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.approvedToken = action.payload;
		},
		[checkAllowence.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.approvedToken = {};
		},
		//get outputtoken balance
		[getOutTokenAmount.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
			state.outputTokenAmount = "0.00"
		},
		[getOutTokenAmount.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.outputTokenAmount = action.payload
		},
		[getOutTokenAmount.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.outputTokenAmount = "0.00"
		},
		//get balance
		[getBalance.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
			state.balance = "0.00";
		},
		[getBalance.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.balance = action.payload;
		},
		[getBalance.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.balance = "0.00";
		},
		//swap
		[swap.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[swap.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
		},
		[swap.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
	
			toast.error(action?.payload)
		},
	},
});

export const dexReducer = dexSlice.reducer;

export const dexState = (state) => state?.dex;

export const { loadingState, resultState, resetOutputAmount } = dexSlice.actions;
