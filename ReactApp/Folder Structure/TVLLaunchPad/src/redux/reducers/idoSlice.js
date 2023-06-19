import { web3IdoFactoryContract, web3IdoPresaleContract } from "contract";
import { toast } from "react-toastify";
import {
	addToWhiteList,
	addToWhiteListAction,
	buyTokenAction,
	cancleIdoAction,
	checkIdosuccesfullAction,
	checkTVLAllowenceForIdoPresale,
	claimTokenAction,
	confirmTvlAllowenceForIdoPresale,
	createIdo,
	createIdoDbAction,
	deleteIDOAction,
	getIdoPresaleTokensBalancesAction,
	getIdosAction,
	getTvlBalanceAction,
	idocheckTokenAllowence,
	isWhitelistedAction,
	poolInfoAction,
	removeToWhiteListAction,
	removeWhiteList,
	updateIdoAction,
	updateIdoDbAction,
	userInfoInPoolAction,
	userIsWhiteListedAction,
	withdrawRaisedFundAction,
} from "redux/actions/idoAction";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
	loading: false,
	userAccount: null,
	currentChainId: null,
	transaction: {
		type: null, // swap/ add_liquidity, remove_liquidity
		hash: null,
		status: null, // pending, success, failed
		result: null, // transaction result on success, { token0:{symbol, address, amount  }  , token1: { symbol, address, amount }, priceRatio:token0/token1 }
	},
	error: null,
	tvlApproved: false,
	youWhiteListed: {},
	poolInfo: {},
	userInfoInPool: {},
	balanceOfTvl: "0.00",
	allowAmount: "0.00",
	isIdoSuccessfull: false,
	idoStatus: "OPEN_IDO",
	pageNo: 1,
	totalPages: 1,
	data: [],
	reset: true,
	count: 0,
	hasMore: true,
	_idoFactoryContract: null,
	_idoPresaleContract: null,
	ido: {},
	updateIdodata: {},
	createIdoData: {},
	prsaleTokensBalance: {},
	checkTokenApprove: false,
	isNavigate: false,
	isWhiteListed: {
		isIdoWhiteListed: false,
		isUserWhieListed: false,
	},
};

const idoSlice = createSlice({
	name: "ido",
	initialState,
	reducers: {
		transactionAction: (state, action) => {
			console.log("action", action);
			state.transaction = action.payload.transaction;
			if (action.payload?.error) {
				state.error = action.payload.error;
				toast.error(action.payload.error);
			}
			if (action.payload?.tvlApproved !== undefined) {
				state.tvlApproved = action.payload?.tvlApproved;
			}
		},
		setIsnavigate: (state, action) => {
			state.isNavigate = action.payload;
		},
		setIdoAction: (state, action) => {
			state.ido = action.payload;
		},
		setIdoStatus: (state, action) => {
			state.idoStatus = action.payload;
		},
		setIdoUpdateDataAction: (state, action) => {
			state.updateIdodata = action.payload;
		},
		setIdoCreateInDbAction: (state, action) => {
			state.createIdoData = action.payload;
		},
		setAccountAction: (state, action) => {
			state.userAccount = action.payload;
		},
		setChainIdAction: (state, action) => {
			state.currentChainId = action.payload;
		},
		idoFactoryContractAction: (state, action) => {
			if (!state?.currentChainId) {
				return state;
			}
			state._idoFactoryContract = web3IdoFactoryContract({
				chainId: state?.currentChainId,
			});
		},
		idoPresaleContractAction: (state, action) => {
			if (!state?.currentChainId) {
				return state;
			}
			state._idoPresaleContract = web3IdoPresaleContract({
				address: state?.ido?.idoAddress,
				chainId: state?.currentChainId,
			});
		},
	},
	extraReducers: {
		[idocheckTokenAllowence.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[idocheckTokenAllowence.fulfilled]: (state, action) => {
			state.loading = false;
			state.checkTokenApprove = action.payload;
			state.error = null;
		},
		[idocheckTokenAllowence.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		//create
		[createIdo.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[createIdo.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
		},
		[createIdo.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		//check allowence for tvl
		[checkTVLAllowenceForIdoPresale.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[checkTVLAllowenceForIdoPresale.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.tvlApproved = action.payload;
		},
		[checkTVLAllowenceForIdoPresale.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		//approve tvl
		[confirmTvlAllowenceForIdoPresale.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[confirmTvlAllowenceForIdoPresale.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
		},
		[confirmTvlAllowenceForIdoPresale.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		// buy token
		[buyTokenAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[buyTokenAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
		},
		[buyTokenAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		//update ido
		[updateIdoAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[updateIdoAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
		},
		[updateIdoAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		//claim token
		[claimTokenAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[claimTokenAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
		},
		[claimTokenAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		//withdraw raised fund
		[withdrawRaisedFundAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[withdrawRaisedFundAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
		},
		[withdrawRaisedFundAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		//addt to whitelist
		[addToWhiteListAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[addToWhiteListAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
		},
		[addToWhiteListAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		//remove to whitelist
		[removeToWhiteListAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[removeToWhiteListAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
		},
		[removeToWhiteListAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		//check you white listed
		[isWhitelistedAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[isWhitelistedAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			if (action.payload) {
				state.youWhiteListed = { status: true };
			}
		},
		[isWhitelistedAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.youWhiteListed = {};
		},

		//pool info
		[poolInfoAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[poolInfoAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.poolInfo = action.payload;
			state.isWhiteListed.isIdoWhiteListed =
				action.payload?.pool?.UseWhiteList;
		},
		[poolInfoAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.poolInfo = {};
		},

		//check user white list or not
		[userIsWhiteListedAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[userIsWhiteListedAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.isWhiteListed.isUserWhieListed = action.payload;
		},
		[userIsWhiteListedAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.poolInfo = {};
		},

		// userinfo in pool
		[userInfoInPoolAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[userInfoInPoolAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.userInfoInPool = action.payload;
		},
		[userInfoInPoolAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.userInfoInPool = {};
		},

		//fetch tvl balance of user
		[getTvlBalanceAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[getTvlBalanceAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.balanceOfTvl = action.payload;
		},
		[getTvlBalanceAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.balanceOfTvl = "0.00";
		},

		//check ido successfull or not
		[checkIdosuccesfullAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[checkIdosuccesfullAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.isIdoSuccessfull = action.payload;
		},
		[checkIdosuccesfullAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		//getIdoPresaleTokensBalancesAction
		[getIdoPresaleTokensBalancesAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[getIdoPresaleTokensBalancesAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.prsaleTokensBalance = action.payload;
		},
		[getIdoPresaleTokensBalancesAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		//getAllidos
		[getIdosAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[getIdosAction.fulfilled]: (state, action) => {
			console.log(
				"action?.payload?.totalPages > action?.payload?.pageNo",
				action?.payload?.totalPages > action?.payload?.pageNo
			);
			console.log(
				"action?.payload?.totalPages",
				action?.payload?.totalPages
			);
			console.log("action?.payload?.pageNo", action?.payload?.pageNo);
			state.loading = false;
			state.error = null;
			state.data = action?.payload?.reset
				? action.payload?.data
				: [...state.data, ...action.payload?.data];
			state.reset = action?.payload?.reset;
			state.count = action.payload?.count;
			state.pageNo = action?.payload?.pageNo;
			state.totalPages = action?.payload?.totalPages;
			state.hasMore =
				action?.payload?.totalPages >= action?.payload?.pageNo;
			state.idoStatus = action?.payload?.idoStatus;
		},
		[getIdosAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		//update ido in db
		[updateIdoDbAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[updateIdoDbAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
		},
		[updateIdoDbAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			toast.error(action.payload);
		},

		//create ido in db
		[createIdoDbAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[createIdoDbAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
		},
		[createIdoDbAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			toast.error(action.payload);
		},
		//addToWhiteList db
		[addToWhiteList.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[addToWhiteList.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
		},
		[addToWhiteList.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		//removeWhiteList db
		[removeWhiteList.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[removeWhiteList.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
		},
		[removeWhiteList.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		// cancleIdoAction
		[cancleIdoAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[cancleIdoAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
		},
		[cancleIdoAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		//deleteIDOAction
		[deleteIDOAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[deleteIDOAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
		},
		[deleteIDOAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const idoReducer = idoSlice.reducer;

export const idoState = (state) => state?.ido;

export const {
	transactionAction,
	loadingAction,
	setAccountAction,
	setChainIdAction,
	idoFactoryContractAction,
	idoPresaleContractAction,
	setIdoAction,
	setIdoUpdateDataAction,
	setIdoCreateInDbAction,
	setIdoStatus,
	setIsnavigate,
} = idoSlice.actions;
