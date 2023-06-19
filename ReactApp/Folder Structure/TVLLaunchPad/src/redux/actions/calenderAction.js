import { createAsyncThunk } from "@reduxjs/toolkit";
import { monthNames } from "constant";
import { getAllIgo } from "redux/services/idoService";
import { getDaysInMonth, getWeekDays } from "utils";

const parseDate = function (data) {
	console.log("data", data);
	if (
		new Date(data?.idoStartDate).getTime() < new Date().getTime() &&
		new Date(data?.idoEndDate) > new Date().getTime()
	) {
		return {
			date: data?.idoEndDate,
			igoStatus: "OPEN_IGO",
		};
	} else if (new Date(data?.idoEndDate).getTime() < new Date().getTime()) {
		return {
			date: data?.idoEndDate,
			igoStatus: "PAST_IGO",
		};
	} else if (new Date(data?.idoStartDate).getTime() > new Date().getTime()) {
		return {
			date: data?.idoStartDate,
			igoStatus: "UPCOMING",
		};
	}
};

export const getCurrenData = createAsyncThunk(
	"calender/getcalenderCurrentMonthAction",
	async (data, { getState, rejectWithValue }) => {
		try {
			const { calender } = getState();

			const query = {
				pagination: false,
				condition: `${calender.monthName} ${calender.year}`,
			};
			if (data?.chain) {
				query.chain = data?.chain;
			}
			const response = await getAllIgo(query);
			console.log("current", calender);
			let result = [];

			for (let i = 1; i <= calender.daysOfMonth; i++) {
				let sameDaysResults = [];
				response?.data?.data?.filter((ele) => {
					if (i === new Date(ele.idoStartDate).getDate()) {
						const { date, igoStatus } = parseDate(ele);
						sameDaysResults.push({
							...ele,
							launched: date,
							igoStatus: igoStatus,
						});
					}
				});
				result.push(sameDaysResults);
			}
			return result;
		} catch (err) {
			console.log("err", err);
			rejectWithValue(err.message);
		}
	}
);

export const calenderNextMongthAction = createAsyncThunk(
	"calender/getcalenderNextMonthAction",
	async (data, { getState, rejectWithValue }) => {
		try {
			const { calender } = getState();

			let current;
			// if (calender.month === 11) {
			// 	current = new Date(calender.year + 1, 0, 1);
			// } else {
			// 	current = new Date(calender.year, calender.month + 1, 1);
			// }
			current = new Date(calender.year, calender.month + 1, 1);
			const payload = {
				date: current,
				year: current.getFullYear(),
				monthName: monthNames[current.getMonth()],
				month: current.getMonth(),
				daysOfMonth: getDaysInMonth(
					current.getFullYear(),
					current.getMonth()
				),
				fristWeekOfMonth: getWeekDays(
					current.getFullYear(),
					current.getMonth()
				),
			};
			console.log("payload", payload);

			const query = {
				pagination: false,
				condition: `${payload.monthName} ${payload.year}`,
			};
			if (data?.chain) {
				query.chain = data?.chain;
			}
			const response = await getAllIgo(query);

			console.log("response", calender.daysOfMonth);

			let result = [];

			for (let i = 1; i <= payload.daysOfMonth; i++) {
				let sameDaysResults = [];
				response?.data?.data?.filter((ele) => {
					if (i === new Date(ele.idoStartDate).getDate()) {
						const { date, igoStatus } = parseDate(ele);
						sameDaysResults.push({
							...ele,
							launched: date,
							igoStatus: igoStatus,
						});
					}
				});
				result.push(sameDaysResults);
			}

			return {
				...payload,
				data: result,
			};
		} catch (err) {
			console.log("err", err);
			rejectWithValue(err.message);
		}
	}
);

export const calenderPreviousMongthAction = createAsyncThunk(
	"calender/getcalenderPreviousMonthAction",
	async (data, { getState, rejectWithValue }) => {
		try {
			const { calender } = getState();

			let current;
			current = new Date(calender.year, calender.month - 1, 1);
			const payload = {
				date: current,
				year: current.getFullYear(),
				monthName: monthNames[current.getMonth()],
				month: current.getMonth(),
				daysOfMonth: getDaysInMonth(
					current.getFullYear(),
					current.getMonth()
				),
				fristWeekOfMonth: getWeekDays(
					current.getFullYear(),
					current.getMonth()
				),
			};
			console.log("payload", payload);
			const query = {
				pagination: false,
				condition: `${payload.monthName} ${payload.year}`,
			};
			if (data?.chain) {
				query.chain = data?.chain;
			}
			const response = await getAllIgo(query);

			let result = [];

			for (let i = 1; i <= payload.daysOfMonth; i++) {
				let sameDaysResults = [];
				response?.data?.data?.filter((ele) => {
					if (i === new Date(ele.idoStartDate).getDate()) {
						const { date, igoStatus } = parseDate(ele);
						sameDaysResults.push({
							...ele,
							launched: date,
							igoStatus: igoStatus,
						});
					}
				});
				result.push(sameDaysResults);
			}

			return {
				...payload,
				data: result,
			};
		} catch (err) {
			console.log("err", err);
			rejectWithValue(err.message);
		}
	}
);
