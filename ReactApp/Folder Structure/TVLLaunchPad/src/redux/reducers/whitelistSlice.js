const { createSlice } = require("@reduxjs/toolkit");
const { getAllWhiteList } = require("redux/actions/whiteListAction");


const initialState = {
    loading: false,
    data: [],
    pageNo: 1,
    totalPages: 0,
    count: 0
}

const whitelistSlice = createSlice({
   initialState,
   name: 'whiteList',
   reducers:{},
   extraReducers:{
    [getAllWhiteList.pending]: (state, action) => {
        state.loading = true;
    },
    [getAllWhiteList.fulfilled]: (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pageNo = action.payload.pageNo;
        state.totalPages = action.payload.totalPages;
        state.count = action.payload.count;
    },
    [getAllWhiteList.rejected]: (state, action) => {
        state.loading = false;
    }
   }
})

export const whitelistReducer = whitelistSlice.reducer;

export const whitelistState = state => state?.whiteList;