import { Axios } from "utils/axiosInstance";

export const registerUser = async (payload) => {
	return await Axios.post("user/register", payload, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

export const loginUser = async (payload) => {
	return await Axios.post("user/login", payload);
};

export const getUser = async () => {
	return await Axios.get("user/profile");
};

export const logoutUser = async () => {
	return await Axios.get("user/logout");
};

export const otpUser = async (payload) => {
	return await Axios.post("user/otp", payload);
};

export const resetPasswordUser = async (payload) => {
	return await Axios.post("user/reset-password", payload);
};
