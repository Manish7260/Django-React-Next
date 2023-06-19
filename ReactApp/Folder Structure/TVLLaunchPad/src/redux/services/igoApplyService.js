import { Axios } from "utils/axiosInstance";

export const createIgoApply = async (payload) => {
	console.log("paylosasxaxasxassxaxad", payload);
	const token = localStorage.getItem("token");
	return await Axios.post("igo-apply/", payload, {
		headers: {
			// "Content-Type": "multipart/form-data",
			token,
		},
	});
};
