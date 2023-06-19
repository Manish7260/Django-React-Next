import { createSlice } from "@reduxjs/toolkit";
import { getBlogsActions, getCategorysActions } from "redux/actions/blogAction";

const initialState = {
	loading: false,
	blogs: [],
	categorys: [],
	blogSearch: "",
	categorySearch: "",
	pageNo: 1,
	totalpages: 0,
	error: null,
};

const blogSlice = createSlice({
	name: "blog",
	initialState,
	reducers: {
		clearBlogSearch: (state, action) => {
			state.blogSearch = "";
		},
	},
	extraReducers: {
		[getBlogsActions.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[getBlogsActions.fulfilled]: (state, action) => {
			state.blogs = action.payload?.blogs;
			state.totalpages = action.payload?.totalpages;
			state.pageNo = action.payload?.pageNo;
			state.blogSearch = action?.payload?.blogSearch;
			state.loading = false;
			state.error = null;
		},
		[getBlogsActions.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		//categorys
		[getCategorysActions.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[getCategorysActions.fulfilled]: (state, action) => {
			state.categorys = action.payload?.categorys;
			state.categorySearch = action.payload.categorySearch;
			state.loading = false;
			state.error = null;
		},
		[getCategorysActions.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const blogReducer = blogSlice.reducer;

export const blogState = (state) => state?.blog;

export const { clearBlogSearch } = blogSlice.actions;
