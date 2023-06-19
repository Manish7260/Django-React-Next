/* eslint-disable jsx-a11y/img-redundant-alt */
import { Box } from "@mui/material";
import Modal from "components/popups/Modal";
import ScrollToTop from "components/ScrollToTop";
import Wrapper from "components/Wrapper";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateIdoAction } from "redux/actions/idoAction";
import {
	idoState,
	setIsnavigate,
	transactionAction,
} from "redux/reducers/idoSlice";
import { fromWei, toWei } from "utils";
import * as Yup from "yup";
import { setIdoAction } from "redux/reducers/idoSlice";
import TransactionConfirm from "components/common/TransactionConfirm/TransactionConfirm";
import ConnectionCheckWrapper from "components/ConnectionCheckWrapper/ConnectionCheckWrapper";

const UpdateIdo = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		loading,
		userAccount,
		currentChainId,
		ido,
		idoStatus,
		transaction,
	} = useSelector(idoState);

	//state
	const [swapDialogOpen, setSwapDialog] = useState(false);
	const [wallateModel, setWallateModel] = useState(false);

	const formik = useFormik({
		initialValues: {
			maxBuy: "",
			minBuy: "",
			idoStartDate: "",
			idoEndDate: "",
			whiteList: false,
		},
		validationSchema: Yup.object({
			minBuy: Yup.number()
				.typeError("you must specify a number")
				.required("Please enter valid Minbuy"),
			maxBuy: Yup.number()
				.typeError("you must specify a number")
				.required("Please enter valid Maxbuy"),
			idoStartDate: Yup.date()
				.required("please enter valid start date")
				.min(
					new Date(new Date(Date.now()).getTime() + 5 * 60000),
					"please enter date grater 5 min after date"
				),
			idoEndDate: Yup.date()
				.required("please enter valid end date")
				.min(
					Yup.ref("idoStartDate"),
					({ min }) => `Date needs to be after ${min}!!`
				),
		}),
		onSubmit: async (values, helpers) => {
			if (ido?.ownerAddress !== userAccount || !userAccount) return;
			console.log("values", values);
			await dispatch(
				updateIdoAction({
					chainId: currentChainId,
					account: userAccount,
					payload: {
						...values,
						idoAddress: ido?.idoAddress,
						id: ido?.id,
						idoStartDate: new Date(
							values.idoStartDate
						).toISOString(),
						idoEndDate: new Date(values.idoEndDate).toISOString(),
					},
				})
			);
			dispatch(
				setIdoAction({
					...ido,
					...values,
					minBuy: toWei(values.minBuy),
					maxBuy: toWei(values.maxBuy),
					idoStartDate: new Date(values.idoStartDate).toISOString(),
					idoEndDate: new Date(values.idoEndDate).toISOString(),
				})
			);
			// navigate("/ido-details");
		},
	});

	const handleChangeWhitelist = (e) => {
		console.log(e);
		formik.setFieldValue("whiteList", e);
	};
	const dateForDateTimeInputValue = (date) =>
		new Date(
			new Date(date)?.getTime() +
				new Date().getTimezoneOffset() * -60 * 1000
		)
			.toISOString()
			.slice(0, 19);

	useEffect(() => {
		dispatch(setIsnavigate(true));
	}, []);

	useEffect(() => {
		console.log(
			"new Date(ido?.idoEndDate).toISOString()",
			new Date(
				new Date(ido?.idoEndDate)?.getTime() +
					new Date().getTimezoneOffset() * -60 * 1000
			)
				.toISOString()
				.slice(0, 19)
		);

		// dispatch(setIdoAction({ ...params.state }));
		formik.setFieldValue("minBuy", fromWei(ido?.minBuy));
		formik.setFieldValue("maxBuy", fromWei(ido?.maxBuy));
		formik.setFieldValue(
			"idoStartDate",
			dateForDateTimeInputValue(ido?.idoStartDate)
		);
		formik.setFieldValue(
			"idoEndDate",
			dateForDateTimeInputValue(ido?.idoEndDate)
		);
		formik.setFieldValue("whiteList", ido?.whiteList);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		dispatch,
		ido?.idoEndDate,
		ido?.idoStartDate,
		ido?.maxBuy,
		ido?.minBuy,
		ido?.whiteList,
	]);

	const handleTransactionModelClose = useCallback(() => {
		dispatch(
			transactionAction({
				transaction: {
					...transaction,
					status: "",
				},
			})
		);
		setSwapDialog(false);
	}, [dispatch, transaction, swapDialogOpen]);

	useEffect(() => {
		console.log("transaction", transaction);
		if (!transaction.hash && !transaction.type) {
			return;
		}

		if (
			["update_ido"].includes(transaction.type) &&
			(transaction.status === "success" ||
				transaction.status === "failed")
		) {
			!swapDialogOpen && setSwapDialog(true);
		}
	}, [swapDialogOpen, transaction, transaction.status]);
	console.log("idoStatus", idoStatus);

	const currentSwapStatus = useMemo(() => {
		console.log(
			"idoStatus",
			new Date(
				new Date(ido?.idoStartDate).getTime() + 5 * 60000
			).getTime(),
			",",
			new Date().getTime()
		);
		if (
			idoStatus !== "UPCOMING" ||
			new Date(
				new Date(ido?.idoStartDate).getTime() + 5 * 60000
			).getTime() < new Date().getTime()
		) {
			return { currentBtnText: "You Can Not Update Now", disabled: true };
		}

		if (!userAccount) {
			return { currentBtnText: "Connect Wallet", disabled: false };
		}

		if (
			["update_ido"].includes(transaction.type) &&
			transaction.status === "pending"
		) {
			return {
				currentBtnText: "Pending Transaction...",
				disabled: true,
			};
		}

		if (loading) {
			return {
				currentBtnText: "Loading... ",
				disabled: true,
			};
		}
		return { currentBtnText: "Update Ido", disabled: false };
	}, [
		idoStatus,
		ido?.idoStartDate,
		userAccount,
		transaction.type,
		transaction.status,
		loading,
	]);

	return (
		<>
			{/* {loading && <Loader />} */}
			<ConnectionCheckWrapper>
				<Wrapper>
					<ScrollToTop />
					<TransactionConfirm
						open={swapDialogOpen}
						handleClose={handleTransactionModelClose}
						transaction={transaction}
					/>
					<Modal open={wallateModel} setOpen={setWallateModel} />
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
													Update-Ido
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
												Update Igo
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
										onSubmit={formik.handleSubmit}
										// autocomplete="off"
									>
										<div>
											<h4 className="mb-0">
												Add To Whitelist{" "}
											</h4>
											<p className="text-white">
												Please complete the required
												blog details
											</p>
										</div>

										<div className="row">
											<div className="input-button col-md-6">
												<input
													type="datetime-local"
													id="ido-start-time"
													required={true}
													name="idoStartDate"
													onChange={
														formik.handleChange
													}
													onBlur={formik.handleBlur}
													value={
														formik.values
															.idoStartDate
													}
												/>
												<label
													htmlFor="ido-start-time"
													className="label-14px-left text-white"
												>
													IDO Start Date &amp; Time *
												</label>
												<div className="form-text text-white">
													{Boolean(
														formik.touched
															.idoStartDate &&
															formik.errors
																.idoStartDate
													) && (
														<span className="form-text text-danger">
															{
																formik.errors
																	.idoStartDate
															}
														</span>
													)}
												</div>
											</div>
											<div className="input-button col-md-6">
												<input
													type="datetime-local"
													id="ido-end-time"
													required={true}
													name="idoEndDate"
													onChange={
														formik.handleChange
													}
													onBlur={formik.handleBlur}
													value={
														formik.values.idoEndDate
													}
												/>
												<label
													htmlFor="ido-start-time"
													className="label-14px-left text-white"
												>
													IDO End Date &amp; Time *
												</label>
												<div className="form-text text-white">
													{Boolean(
														formik.touched
															.idoEndDate &&
															formik.errors
																.idoEndDate
													) && (
														<span className="form-text text-danger">
															{
																formik.errors
																	.idoEndDate
															}
														</span>
													)}
												</div>
											</div>
										</div>
										<div className="row">
											<div className="input-button col-md-6">
												<input
													type="number"
													id="minBuy"
													required={true}
													name="minBuy"
													onChange={
														formik.handleChange
													}
													onBlur={formik.handleBlur}
													value={formik.values.minBuy}
												/>
												<label
													htmlFor="minbuy"
													className="label-14px-left text-white"
												>
													Min. Buy{" "}
													{/* <span>
												(
												{
													formik.values
														.blockchainPlateform
												}
												)
											</span>{" "} */}
													*
												</label>
												<div className="form-text text-white">
													{Boolean(
														formik.touched.minBuy &&
															formik.errors.minBuy
													) && (
														<span className="form-text text-danger">
															{
																formik.errors
																	.minBuy
															}
														</span>
													)}
												</div>
											</div>
											<div className="input-button col-md-6">
												<input
													type="number"
													id="maxBuy"
													required={true}
													name="maxBuy"
													onChange={
														formik.handleChange
													}
													onBlur={formik.handleBlur}
													value={formik.values.maxBuy}
												/>
												<label
													htmlFor="maxbuy"
													className="label-14px-left text-white"
												>
													Max. Buy{" "}
													{/* <span>
												(
												{
													formik.values
														.blockchainPlateform
												}
												)
											</span>{" "} */}
													*
												</label>
												<div className="form-text text-white">
													{Boolean(
														formik.touched.maxBuy &&
															formik.errors.maxBuy
													) && (
														<span className="form-text text-danger">
															{
																formik.errors
																	.maxBuy
															}
														</span>
													)}
												</div>
											</div>
										</div>
										<div className="radio-button">
											<h5 className="mt-34 mb-22 text-white">
												Whitelist *
											</h5>
											<div className="row">
												<div className="col-md-6">
													<div
														className="input-list"
														onClick={() =>
															handleChangeWhitelist(
																true
															)
														}
													>
														<input
															type="radio"
															id="enable"
															value={true}
															name="whitelist"
															checked={
																formik.values
																	.whiteList
															}
															// onClick={handleChangeWhitelist}
															onBlur={
																formik.handleBlur
															}
														/>
														<label
															htmlFor="enable"
															className="text-white"
														>
															Enable
														</label>
														<div className="check" />
													</div>
												</div>
												<div className="col-md-6">
													<div
														className="input-list"
														onClick={() =>
															handleChangeWhitelist(
																false
															)
														}
													>
														<input
															type="radio"
															id="disable"
															value={false}
															checked={
																!formik.values
																	.whiteList
															}
															name="whitelist"
															onBlur={
																formik.handleBlur
															}
														/>
														<label
															htmlFor="disable"
															className="text-white"
														>
															Disable
														</label>

														<div className="check" />
													</div>
												</div>
											</div>
											<div className="form-text text-white">
												{Boolean(
													formik.touched.whitelist &&
														formik.errors.whitelist
												) && (
													<span className="form-text text-danger">
														{
															formik.errors
																.whitelist
														}
													</span>
												)}
											</div>
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
		</>
	);
};

export default UpdateIdo;
