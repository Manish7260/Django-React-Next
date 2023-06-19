import { combineReducers } from "redux";
import { blogReducer } from "./blogSlice";
import { calenderReducer } from "./calenderSlice";
import { dexReducer } from "./dexSlice";
import { idoReducer } from "./idoSlice";
import { igoApplyReducer } from "./igoApplySlice";
import { userReducer } from "./userSlice";
import { whitelistReducer } from "./whitelistSlice";

export const rootReducer = combineReducers({
	user: userReducer,
	igoApply: igoApplyReducer,
	dex: dexReducer,
	ido: idoReducer,
	whiteList: whitelistReducer,
	blog: blogReducer,
	calender: calenderReducer,
});
