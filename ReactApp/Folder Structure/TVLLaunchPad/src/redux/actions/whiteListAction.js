const { createAsyncThunk } = require("@reduxjs/toolkit");
const { getAddress } = require("redux/services/whitelistService");

export const getAllWhiteList = createAsyncThunk(
	"whitelist/getallAction",
	async (payload, { getState, dispatch, rejectWithValue }) => {
		const { ido } = getState();
		const query = {
			...payload,
			pagination: true,
			idoId: ido?.ido?.id,
			limit: 20,
		};

		const { data } = await getAddress(query);
		console.log("data", data);
		return {
			data: data?.data,
			totalPages: data?.totalPages,
			count: data?.count,
			pageNo: payload?.pageNo || 1,
		};
	}
);
