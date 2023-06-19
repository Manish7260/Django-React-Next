/* eslint-disable jsx-a11y/img-redundant-alt */
import { Box } from "@mui/material";
import TransactionConfirm from "components/common/TransactionConfirm/TransactionConfirm";
import ConnectionCheckWrapper from "components/ConnectionCheckWrapper/ConnectionCheckWrapper";
// import Loader from "components/Loader/Loader";
import Modal from "components/popups/Modal";
import ScrollToTop from "components/ScrollToTop";
import Wrapper from "components/Wrapper";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
	addToWhiteListAction,
	removeToWhiteListAction,
} from "redux/actions/idoAction";
import {
	idoState,
	setIdoAction,
	setIsnavigate,
	transactionAction,
} from "redux/reducers/idoSlice";

const WhiteList = () => {
	const params = useLocation();
	const dispatch = useDispatch();
	const {
		loading,
		userAccount,
		currentChainId,
		ido,
		transaction,
	} = useSelector(idoState);

	const [mode, setMode] = useState("add");
	const [addressValue, setAddressValue] = useState("");
	const [dialogOpen, setDialog] = useState(false);
	const [wallateModel, setWallateModel] = useState(false);

	const handleTransactionModelClose = useCallback(() => {
		dispatch(
			transactionAction({
				transaction: {
					...transaction,
					status: "",
				},
			})
		);
		setDialog(false);
	}, [dispatch, transaction]);

	useEffect(() => {
		dispatch(setIsnavigate(true));
	}, []);

	useEffect(() => {
		if (!params.state) return;

		dispatch(setIdoAction({ ...params.state }));
	}, [dispatch, params.state]);

	useEffect(() => {
		console.log("transaction", transaction);
		if (!transaction.hash && !transaction.type) {
			return;
		}
		if (
			["add_whitelist"].includes(transaction.type) &&
			transaction.status === "pending" &&
			!dialogOpen
		) {
			setDialog(true);
		}

		if (
			["add_whitelist"].includes(transaction.type) &&
			(transaction.status === "success" ||
				transaction.status === "failed") &&
			!dialogOpen
		) {
			setDialog(true);
		}
	}, [dialogOpen, transaction, transaction.status]);

	const currentSwapStatus = useMemo(() => {
		if (!userAccount) {
			return { currentBtnText: "Connect Wallet", disabled: false };
		}
		// if (idoStatus === "PAST_IDO") {
		// 	return { currentBtnText: "Ido Is Close", disabled: true };
		// }

		if (!ido?.whiteList) {
			return { currentBtnText: "Ido Not Whitelisted", disabled: true };
		}

		if (
			["add_whitelist"].includes(transaction.type) &&
			transaction.status === "pending"
		) {
			return {
				currentBtnText: "Pending Transaction...",
				disabled: true,
			};
		}

		if (mode === "add") {
			return {
				currentBtnText: "Add To Whitelist",
				disabled: false,
			};
		}

		if (loading) {
			return {
				currentBtnText: "Loading... ",
				disabled: true,
			};
		}

		return { currentBtnText: "remove To Whitelist", disabled: false };
	}, [userAccount, ido?.whiteList, transaction.type, transaction.status, mode, loading]);

	const submit = (e) => {
		e.preventDefault();

		if (!userAccount) {
			setWallateModel(true);
			return;
		}

		const addressArray = addressValue?.split("\n");
		console.log("addressArray", addressArray);
		if (!ido?.idoAddress) return;
		if (addressArray?.length) {
			if (mode === "add") {
				dispatch(
					addToWhiteListAction({
						chainId: currentChainId,
						account: userAccount,
						idoAddress: ido?.idoAddress,
						payload: addressArray,
						cb: () => setAddressValue("")
					})
				);
			} else {
				console.log("else")
				dispatch(
					removeToWhiteListAction({
						chainId: currentChainId,
						account: userAccount,
						idoAddress: ido?.idoAddress,
						payload: addressArray,
						cb: () => setAddressValue("")
					})
				);
			}
		}
	};

	return (
		<ConnectionCheckWrapper>
			<Wrapper>
				{/* {loading && <Loader />} */}
				<Modal open={wallateModel} setOpen={setWallateModel} />
				<ScrollToTop />
				<TransactionConfirm
					open={dialogOpen}
					handleClose={handleTransactionModelClose}
					transaction={transaction}
				/>
				<Box>
					<div className="gamfi-breadcrumbs-section">
						<div className="container">
							<div className="row">
								<div className="col-lg-5">
									<div className="breadcrumbs-area sec-heading">
										<div
											style={{ position: "relative" }}
											className="sub-inner mb-15"
										>
											<Link
												className="breadcrumbs-link"
												to="/ido-details"
											>
												Ido-Details
											</Link>
											<span className="sub-title">
												Whitelist
											</span>
											<img
												className="heading-left-image"
												src="assets/images/icons/steps.png"
												alt="Steps-Image"
											/>
											{/* <Box
												position="absolute"
												right="100px"
												display="flex"
												top="45px"
												alignItems="center"
											>
												<Link to="/projects-grid">
													<i
														style={{
															fontSize: "30px",
															color: "#F0B600",
														}}
														className="fas fa-th"
													></i>
												</Link>
												<Link to="/projects-list">
													<i
														style={{
															fontSize: "30px",
															marginLeft: "20px",
														}}
														className="fas fa-list"
													></i>
												</Link>
											</Box> */}
										</div>
										<h2 className="title mb-0">
											WhiteList
										</h2>
									</div>
								</div>
								<div className="col-lg-7 breadcrumbs-form md-mt-40">
									{/* <div className="btn-area">
										<Link to="/calendar">
											<a className="readon black-shape">
												<i className="icon-calendar" />
												<span className="btn-text">
													Calendar
												</span>
												<span className="hover-shape1" />
												<span className="hover-shape2" />
												<span className="hover-shape3" />
											</a>
										</Link>
									</div> */}
								</div>
							</div>
						</div>
					</div>
					<div className="gamfi-form-content pt-65 md-pt-45 pb-120 md-pb-80">
						<div className="container">
							<div className="address-form">
								<form
									noValidate
									onSubmit={submit}
									// autocomplete="off"
								>
									<div>
										<h4 className="mb-0">
											{mode === "add" ? "Add" : "Remove"}{" "}
											To Whitelist{" "}
										</h4>
										<p className="text-white">
											Please note your whiteList address
											they do not show again
										</p>
										{ido?.whiteList && (
											<button
											type="button"
												onClick={() =>
													setMode(
														mode === "add"
															? "remove"
															: "add"
													)
												}
											>
												{mode === "add"
													? "Add"
													: "Remove"}
											</button>
										)}
									</div>

									<div className="input-button">
										<textarea
											name={"address"}
											rows={15}
											value={addressValue}
											onChange={(e) =>
												setAddressValue(e.target.value)
											}
											style={{
												resize: "no",
											}}
											placeholder={`0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
										`}
										/>
										<label
											// htmlFor="token-address"
											className="text-white"
										>
											Enter Addresses *
										</label>
										<div className="form-text text-white"></div>
									</div>

									{/* <div className="input-button">
									<textarea
										type="text"
										className="mb-0"
										rows={3}
										onChange={(e) => {
											handelFcontentChange(0, e);
										}}
										onBlur={(e) =>
											handelFcontentChange(0, e)
										}
										value={fcontent[0]}
									>
										{fcontent[0]}
									</textarea>
									<label
										htmlFor="short-desc"
										className="text-white"
									>
										feature description
									</label>
									{fcontent <= 0 && (
										<button
											type="button"
											className="readon black-shape-big p-2"
											data-bs-toggle="modal"
											data-bs-target="#exampleModal"
											onClick={addMoreFContent}
											style={{ width: "100%" }}
										>
											<span className="btn-text">
												Add more field
											</span>
											<span className="hover-shape1" />
											<span className="hover-shape2" />
											<span className="hover-shape3" />
										</button>
									)}
								</div> */}

									<div className="project-btn-area text-center black-shape-big mt-40">
										<input
											type="submit"
											name="submit"
											value={
												currentSwapStatus.currentBtnText
											}
											disabled={
												currentSwapStatus.disabled
											}
										/>
										<span className="hover-shape1" />
										<span className="hover-shape2" />
										<span className="hover-shape3" />
									</div>
								</form>
								{/* <button type="button" onClick={addMoreFContent}>
								addmore
							</button> */}
							</div>
						</div>
					</div>
				</Box>
			</Wrapper>
		</ConnectionCheckWrapper>
	);
};

export default WhiteList;
