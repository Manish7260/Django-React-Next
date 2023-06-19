import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { loginUser, logoutUser, registerUser } from "redux/services";
import {
	getUser,
	otpUser,
	resetPasswordUser,
} from "redux/services/userService";

const { createAsyncThunk } = require("@reduxjs/toolkit");

export const userRegisterAction = createAsyncThunk(
	"user/register",
	async (data, { getState, rejectWithValue, dispatch }) => {
		try {
			const res = await registerUser(data?.payload);
			data.navigate("/signin");
			return res.data;
		} catch (err) {
			console.log("err", err);
			if (err instanceof AxiosError) {
				return toast.error(err?.response?.data?.errors[0]);
			}
			toast.error(err?.message);
		}
	}
);

export const userLoginAction = createAsyncThunk(
	"user/login",
	async (data, { getState, rejectWithValue, dispatch }) => {
		try {
			const res = await loginUser(data.payload);
			localStorage.setItem("token", res.data?.token);
			data.navigate("/");
			return res.data;
		} catch (err) {
			if (err instanceof AxiosError) {
				toast.error(err?.response?.data?.errors[0]);
				return rejectWithValue({});
			}
			toast.error(err?.message);
			return rejectWithValue({});
		}
	}
);

export const getUserAction = createAsyncThunk(
	"user/profile",
	async (_, { getState, rejectWithValue, dispatch }) => {
		try {
			const res = await getUser();
			console.log("res.data", res.data);
			return res.data;
		} catch (err) {
			if (err instanceof AxiosError) {
				if (err?.response?.data?.errors[0] === "invalid signature") {
					localStorage.removeItem("token");
					return rejectWithValue({});
				}
				return toast.error(err?.response?.data?.errors[0]);
			}
			toast.error(err?.message);
			return rejectWithValue({});
		}
	}
);

export const userLogoutAction = createAsyncThunk(
	"user/logout",
	async (_, { getState, rejectWithValue, dispatch }) => {
		try {
			const res = await logoutUser();
			localStorage.removeItem("token");
			return res.data;
		} catch (err) {
			if (err instanceof AxiosError) {
				return toast.error(err?.response?.data?.errors[0]);
			}
			toast.error(err?.message);
		}
	}
);

export const userOtpAction = createAsyncThunk(
	"user/userOtpAction",
	async (data, { getState, rejectWithValue, dispatch }) => {
		try {
			const res = await otpUser(data?.payload);
			data.navigate &&
				data?.navigate("/reset-password", {
					state: {
						email: data?.payload?.email,
					},
				});
			return res.data;
		} catch (err) {
			console.log("err", err);
			if (err instanceof AxiosError) {
				return toast.error(err?.response?.data?.errors[0]);
			}
			toast.error(err?.message);
		}
	}
);

export const userResetPasswordAction = createAsyncThunk(
	"user/userResetPasswordAction",
	async (data, { getState, rejectWithValue, dispatch }) => {
		try {
			const res = await resetPasswordUser(data?.payload);
			localStorage.removeItem("token");
			data.navigate("/signin");
			return res.data;
		} catch (err) {
			console.log("err", err);
			if (err instanceof AxiosError) {
				return toast.error(err?.response?.data?.errors[0]);
			}
			toast.error(err?.message);
		}
	}
);
