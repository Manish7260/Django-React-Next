import { Axios } from "utils/axiosInstance";

export const createIdoService = async (payload) => {
	const token = localStorage.getItem("token");
	return await Axios.post("admin/ido", payload, {
		headers: {
			token,
		},
	});
};

export const getAllIgo = async (query) => {
	const token = localStorage.getItem("token");

	return await Axios.get("ido", {
		params: {
			...query,
		},
		headers: {
			token,
		},
	});
};

export const updateIgo = async (payload) => {
	return await Axios.patch("ido", payload);
};

export const deleteIgo = async (id) => {
	return await Axios.delete(`ido/${id}`);
};
