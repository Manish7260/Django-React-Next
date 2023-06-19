import axios from "axios";

const Axios = axios.create({
	// withCredentials: true,
	baseURL: process.env.REACT_APP_API_URL,
});

Axios.interceptors.request.use(
	(config) => {
		config.headers.token = localStorage.getItem("token");
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export { Axios };
