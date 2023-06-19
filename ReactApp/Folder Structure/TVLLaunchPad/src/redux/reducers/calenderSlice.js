import { createSlice } from "@reduxjs/toolkit";
import { dayName, monthNames } from "constant";
import {
	calenderNextMongthAction,
	calenderPreviousMongthAction,
	getCurrenData,
} from "redux/actions/calenderAction";
import { getDaysInMonth, getWeekDays } from "utils";

const initialState = {
	loading: false,
	data: [],
	chain: null,
	year: new Date(Date.now()).getFullYear(),
	monthName: monthNames[new Date(Date.now()).getMonth()],
	month: new Date(Date.now()).getMonth(),
	date: new Date(Date.now()),
	daysOfMonth: getDaysInMonth(
		new Date(Date.now()).getFullYear(),
		new Date(Date.now()).getMonth()
	),
	fristWeekOfMonth: getWeekDays(
		new Date(Date.now()).getFullYear(),
		new Date(Date.now()).getMonth()
	),
};

const calenderSlice = createSlice({
	name: "calender",
	initialState,
	reducers: {},
	extraReducers: {
		//current month
		[getCurrenData.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[getCurrenData.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.loading = false;
			state.error = null;
		},
		[getCurrenData.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		//next month
		[calenderNextMongthAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[calenderNextMongthAction.fulfilled]: (state, action) => {
			state = {
				...state,
				...action.payload,
				loading: false,
				error: null,
			};
			return state;
		},
		[calenderNextMongthAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		//previos month
		[calenderPreviousMongthAction.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[calenderPreviousMongthAction.fulfilled]: (state, action) => {
			state = {
				...state,
				...action.payload,
				loading: false,
				error: null,
			};
			return state;
		},
		[calenderPreviousMongthAction.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const calenderReducer = calenderSlice.reducer;

export const calenderState = (state) => state?.calender;
