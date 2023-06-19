import { Axios } from "utils/axiosInstance";

export const getAddress = async (payload) => {
	return await Axios.get("whitelist", {
		params: {
			...payload,
		},
	});
};

export const addAddress = async (payload) => {
	return await Axios.post("whitelist", payload);
};

export const removeAddress = async (payload) => {
	return await Axios.patch("whitelist", payload);
};
