import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
import Loader from "components/Loader/Loader";
import { Route, Routes } from "react-router-dom";
import { getUserAction } from "redux/actions/userActions";
import { useWeb3React } from "@web3-react/core";
import { coinBaseWallate, injected } from "connection";
// import Initalization from "components/Initalization/Initalization";

const Initalization = lazy(() =>
	import("./components/Initalization/Initalization")
);

const Home = lazy(() => import("./components/Home/Home"));
const SignUp = lazy(() => import("./components/SignUp"));
const SignIn = lazy(() => import("./components/SignIn"));
const ForgetPassword = lazy(() => import("./components/ForgetPassword"));
const ResetPassword = lazy(() => import("./components/ResetPassword"));

const IGOApply = lazy(() => import("./components/IGOApply"));

const IdoList = lazy(() => import("./components/IdosList/IdoList"));
const IdoDetails = lazy(() => import("./components/IdoPool/IdoDetails"));
const IdoPool = lazy(() => import("./components/IdoPool/IdoPool"));
const UpdateIdo = lazy(() => import("./components/IdoPool/IdoOwner/UpdateIdo"));
const WhiteList = lazy(() => import("./components/IdoPool/IdoOwner/WhiteList"));
const Withdraw = lazy(() => import("./components/IdoPool/IdoOwner/Withdraw"));
const ClaimToken = lazy(() => import("./components/IdoPool/ClaimToken"));
const WhiteListTable = lazy(() =>
	import("./components/IdoPool/IdoOwner/WhiteListTable")
);
const RemoveWhiteListTable = lazy(() =>
	import("./components/IdoPool/IdoOwner/RemoveWhiteListTable")
);
const Calendar = lazy(() => import("./components/Calendar/Calendar"));
//admin
// const CreateIdo = lazy(() => import("./components/Test/CreateIdo"));

const Swap = lazy(() => import("./components/Swap/Swap"));

//blog
const BlogList = lazy(() => import("./components/Blogs/BlogList"));
const BlogDetails = lazy(() => import("./components/Blogs/BlogDetails"));
// const LeavePageModal = lazy(() => import("./components/Test/LeaveRoute"));

//stacking
const Staking = lazy(() => import("./components/Staking/Staking"));

function App() {
	const dispatch = useDispatch();
	const { activate } = useWeb3React();

	useEffect(() => {
		const wallet = localStorage.getItem("wallet");
		switch (wallet) {
			case "meta":
				activate(injected);
				break;
			case "coinbaseWallet":
				activate(coinBaseWallate);
			default:
				break;
		}
	}, []);

	useEffect(() => {
		dispatch(getUserAction());
	}, [dispatch]);

	return (
		<Suspense fallback={<Loader />}>
			<Initalization>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/ido-apply" element={<IGOApply />} />
					<Route path="/exchange" element={<Swap />} />
					<Route path="/ido-details" element={<IdoDetails />} />
					<Route path="/pool" element={<IdoPool />} />
					<Route path="/idos-list" element={<IdoList />} />
					<Route path="/ido-update" element={<UpdateIdo />} />
					<Route path="/ido-whitelist" element={<WhiteList />} />
					<Route path="/ido-withdraw" element={<Withdraw />} />
					<Route path="/ido-claim" element={<ClaimToken />} />

					<Route
						path="/whitelisted-user"
						element={<WhiteListTable />}
					/>
					<Route
						path="/removed-whitelisted-user"
						element={<RemoveWhiteListTable />}
					/>
					<Route path="/blog" element={<BlogList />} />
					<Route path="/blog-detail" element={<BlogDetails />} />
					<Route path="/calendar" element={<Calendar />} />

					<Route
						path="/forget-password"
						element={<ForgetPassword />}
					/>

					<Route path="/reset-password" element={<ResetPassword />} />
					{/* <Route path="/l" element={<LeavePageModal />} /> */}

					<Route path="/staking" element={<Staking />} />
				</Routes>
			</Initalization>
		</Suspense>
	);
}

export default App;
