import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import { rootReducer } from "./reducers";

// const middleware = [thunk];

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
