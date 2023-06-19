import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Web3ReactProvider } from "@web3-react/core";
import { ThemeProvider } from "@mui/material";
import theme from "theme";
import { BrowserRouter } from "react-router-dom";
import { getLibrary } from "connection";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<>
		<ToastContainer
			style={{ zIndex: 100000000000 }}
			position="top-right"
			autoClose={10000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
		<Web3ReactProvider getLibrary={getLibrary}>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</ThemeProvider>
			</Provider>
		</Web3ReactProvider>
	</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
