import { Axios } from "utils/axiosInstance";

export const getAllBlogs = async (payload) => {
	return await Axios.get("blog", {
		params: {
			...payload,
		},
	});
};

export const getBlog = async (id) => {
	return await Axios.get(`blog/${id}`);
};

export const getCategorys = async (payload) => {
	return Axios.get("category", {
		params: {
			...payload,
		},
	});
};
