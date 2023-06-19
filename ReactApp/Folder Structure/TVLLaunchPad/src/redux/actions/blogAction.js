import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBlogs } from "redux/services";
import { getCategorys } from "redux/services/blogService";

export const getBlogsActions = createAsyncThunk(
	"blog/getAllBlogs",
	async (payload, { rejectWithValue, getState }) => {
		try {
			const query = {
				limit: payload?.limit || 9,
				pagination: true,
				pageNo: payload?.pageno,
				search: payload?.search || "",
			};

			console.log("query", query);

			const response = await getAllBlogs(query);

			return {
				blogs: response?.data?.data || [],
				totalpages: response?.data?.totalPages || 1,
				pageNo: payload?.pageno,
				blogSearch: payload.search || "",
			};
		} catch (err) {
			console.log("err", err);
			return rejectWithValue(err.message);
		}
	}
);

export const getCategorysActions = createAsyncThunk(
	"blog/getCategorys",
	async (payload, { rejectWithValue, getState }) => {
		try {
			const query = {
				pagination: false,
				search: payload?.search || "",
			};

			const response = await getCategorys(query);

			console.log("response", response);
			return {
				categorys: response?.data?.data || [],
				categorySearch: payload?.search || "",
			};
		} catch (err) {
			console.log("err", err);
			return rejectWithValue(err.message);
		}
	}
);
