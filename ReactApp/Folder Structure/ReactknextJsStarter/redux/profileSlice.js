import { createSlice } from "@reduxjs/toolkit";

const initialStateObj = {
    profileImage: null,
    profileType: "renter",
    dashboardMenuShow: null,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState: initialStateObj,
    reducers: {
        profileImageAction: (state, { payload }) => {
            state.profileImage = payload;
        },
        profileTypeAction: (state, { payload }) => {
            state.profileType = payload;
        },
        dashboardMenuShowAction: (state, { payload }) => {
            state.dashboardMenuShow = payload;
        },
    },
});

export const { profileImageAction, profileTypeAction, dashboardMenuShowAction } = profileSlice.actions;

//it behave like connector (old redux)
export const profileSelector = (state) => state.profile;

export default profileSlice.reducer;
