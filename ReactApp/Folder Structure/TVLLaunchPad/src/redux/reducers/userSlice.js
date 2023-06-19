import { createSlice } from "@reduxjs/toolkit";
import { userRegisterAction } from "redux/actions";
import {
	getUserAction,
	userLoginAction,
	userLogoutAction,
	userOtpAction,
	userResetPasswordAction,
} from "redux/actions/userActions";

const initialState = {
	loading: false,
	details: {},
	token: null,
	authenticated: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: {
		//register
		[userRegisterAction.pending]: (state, action) => {
			state.loading = true;
		},
		[userRegisterAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.details = {};
		},
		[userRegisterAction.rejected]: (state, action) => {
			state.loading = false;
		},

		//login
		[userLoginAction.pending]: (state, action) => {
			state.loading = true;
		},
		[userLoginAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.details = action.payload?.data;
			state.token = action.payload?.token;
			state.authenticated = true;
		},
		[userLoginAction.rejected]: (state, action) => {
			state.loading = false;
			state.authenticated = false;
			state.details = {};
		},

		//profile
		[getUserAction.pending]: (state, action) => {
			state.loading = true;
		},
		[getUserAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.details = action.payload?.data;
			state.token = action.payload?.token;
			state.authenticated = action.payload?.token ? true : false;
		},
		[getUserAction.rejected]: (state, action) => {
			console.log('"action"', action);
			state.loading = false;
			state.authenticated = false;
			state.details = {};
		},

		//logout
		[userLogoutAction.pending]: (state, action) => {
			state.loading = true;
		},
		[userLogoutAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.details = {};
			state.token = null;
			state.authenticated = false;
		},
		[userLogoutAction.rejected]: (state, action) => {
			state.loading = false;
		},
		//userOtpAction
		[userOtpAction.pending]: (state, action) => {
			state.loading = true;
		},
		[userOtpAction.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[userOtpAction.rejected]: (state, action) => {
			state.loading = false;
		},
		//userResetPasswordAction
		[userResetPasswordAction.pending]: (state, action) => {
			state.loading = true;
		},
		[userResetPasswordAction.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[userResetPasswordAction.rejected]: (state, action) => {
			state.loading = false;
		},
	},
});

export const userReducer = userSlice.reducer;

export const userState = (state) => state.user;
