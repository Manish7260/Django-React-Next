/* eslint-disable jsx-a11y/img-redundant-alt */
import { Box } from "@mui/material";
import { PAIIR_DROPDOWN, tokenUrls } from "constant";
import { useIgoApply } from "hooks/useIgoApplyHook";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	checkAllowenceIgoApply,
	feeCollectedAction,
	getAllFeeAction,
} from "redux/actions/igoApplyAction";
import { igoApplyState, transactionActionidoApply } from "redux/reducers";
import { idoState } from "redux/reducers/idoSlice";
import TransactionConfirm from "./common/TransactionConfirm/TransactionConfirm";
import Loader from "./Loader/Loader";
import Modal from "./popups/Modal";
import ScrollToTop from "./ScrollToTop";
import Wrapper from "./Wrapper";
import { fromWei, tokenAmount } from "utils";

const IGOApply = () => {
	const {
		formik,
		image,
		handleBlockchainChange,
		handleChangeWhitelist,
		handleChangeIsWhitelist,
		onImageChange,
		onCoverImageChange,
		coverImage,
		setButtonStatus,
		buttonStatus,
		modelOpen,
		setModelOpen,
	} = useIgoApply();
	const dispatch = useDispatch();
	const { userAccount, currentChainId } = useSelector(idoState);
	const {
		loading,
		transaction,
		tokenApproved,
		decimals,
		isFeeCollected,
		prefee,
		postfee,
	} = useSelector(igoApplyState);

	const [dialog, setDialog] = useState(false);
	const [totalToken, setTotalToken] = useState();
	const [currency, setCurrency] = useState("");

	const handleTransactionModelClose = useCallback(() => {
		dispatch(
			transactionActionidoApply({
				transaction: {
					...transaction,
					status: "",
				},
			})
		);
		setDialog(false);
	}, [dispatch, transaction, dialog]);

	const checkAllowence = useCallback(
		(value) => {
			if (!value) return;
			dispatch(
				checkAllowenceIgoApply({
					chainId: currentChainId,
					payload: value,
					account: userAccount,
				})
			);
		},
		[dispatch, currentChainId, userAccount]
	);

	const checkFeeCollected = useCallback(
		(value) => {
			if (!value) return;
			dispatch(
				feeCollectedAction({
					chainId: currentChainId,
					idoAddress: value,
				})
			);
		},
		[dispatch, currentChainId]
	);

	useEffect(() => {
		if (!currentChainId) return;
		dispatch(
			getAllFeeAction({
				chainId: currentChainId,
			})
		);
	}, [currentChainId]);

	useEffect(() => {
		if (!currentChainId) return;
		const chain = tokenUrls.find((chn) => chn?.chainId === currentChainId);
		chain && setCurrency(chain?.currency);
	}, [currentChainId]);

	useEffect(() => {
		console.log("transaction", formik);
		if (
			formik.dirty &&
			formik.values.tokenAddress &&
			!formik.errors?.tokenAddress
		) {
			checkAllowence(formik.values);
			checkFeeCollected(formik.values.tokenAddress);
		}
	}, [formik.values.tokenAddress, transaction, formik.errors?.tokenAddress]);

	useEffect(() => {
		if (decimals && formik.values.hardCap && formik.values.tokenRate) {
			setTotalToken(
				tokenAmount(
					formik.values.hardCap,
					formik.values.tokenRate,
					decimals
				)
			);
			return;
		}
	}, [
		formik.values.hardCap,
		formik.values.tokenRate,
		formik.values.symbol,
		decimals,
	]);

	console.log("payload", formik);

	// useEffect(() => {
	// 	formik.values.idoStartDate &&
	// 		formik.setFieldValue(
	// 			"idoStartDate",
	// 			new Date(formik.values.idoStartDate).toISOString()
	// 		);
	// 	formik.values.idoEndDate &&
	// 		formik.setFieldValue(
	// 			"idoEndDate",
	// 			new Date(formik.values.idoEndDate).toISOString()
	// 		);
	// }, [formik.values.idoStartDate, formik.values.idoEndDate]);

	useMemo(() => {
		if (!userAccount) {
			setButtonStatus({
				currentBtnText: "Connect Wallet",
				disabled: false,
			});
			return;
		}
		if (
			["token_approve", "collect_fee"].includes(transaction?.type) &&
			transaction?.status === "pending"
		) {
			setButtonStatus({
				currentBtnText: "Pending Transaction...",
				disabled: true,
			});
			return;
		}
		console.log("tokenApproved", tokenApproved, isFeeCollected);
		if (!tokenApproved && formik.values.tokenAddress) {
			setButtonStatus({
				currentBtnText: "Approve Token",
				disabled: false,
			});
			return;
		}

		if (!isFeeCollected && tokenApproved) {
			setButtonStatus({
				currentBtnText: `Pay ${fromWei(prefee)} ${currency} Fee`,
				disabled: false,
			});
			return;
		}

		if (loading) {
			setButtonStatus({
				currentBtnText: "Loading... ",
				disabled: true,
			});
			return;
		}

		return setButtonStatus({ currentBtnText: "Apply", disabled: false });
	}, [
		userAccount,
		transaction?.type,
		transaction?.status,
		loading,
		decimals,
	]);

	useEffect(() => {
		console.log("transaction", transaction);
		if (!transaction?.hash && !transaction?.type) {
			return;
		}

		if (
			["token_approve", "collect_fee"].includes(transaction?.type) &&
			(transaction?.status === "success" ||
				transaction?.status === "failed") &&
			!dialog
		) {
			setDialog(true);
		}
	}, [dialog, transaction, transaction?.status]);

	return (
		<>
			{loading && <Loader />}
			<ScrollToTop />
			<Wrapper>
				<Modal open={modelOpen} setOpen={setModelOpen} />
				<TransactionConfirm
					open={dialog}
					handleClose={handleTransactionModelClose}
					transaction={transaction}
				/>
				<Box>
					<div className="gamfi-breadcrumbs-section">
						<div className="container">
							<div className="apply-heading text-center">
								<h2 className="mb-0">Apply for IDO</h2>
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
											1. Project Details
										</h4>
										<p className="text-white">
											Please complete the required project
											details
										</p>
									</div>
									<div className="input-button">
										<input
											type="text"
											id="tokenAddress"
											placeholder="Token Address"
											required={true}
											name="tokenAddress"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.tokenAddress}
										/>
										<label
											htmlFor="token-address"
											className="text-white"
										>
											Enter your Token Address *
										</label>
										<div className="form-text text-white">
											{Boolean(
												formik.touched.tokenAddress &&
													formik.errors.tokenAddress
											) ? (
												<span className="form-text text-danger">
													{formik.errors.tokenAddress}
												</span>
											) : (
												"The token information will be fetched from the relevant blockchain."
											)}
										</div>
									</div>
									<div className="input-button">
										<input
											type="text"
											id="ownerAddress"
											placeholder="Owner Address"
											required={true}
											name="ownerAddress"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.ownerAddress}
										/>
										<label
											htmlFor="token-address"
											className="text-white"
										>
											Enter Owner Address *
										</label>
										<div className="form-text text-white">
											{Boolean(
												formik.touched.ownerAddress &&
													formik.errors.ownerAddress
											) && (
												<span className="form-text text-danger">
													{formik.errors.ownerAddress}
												</span>
											)}
										</div>
									</div>
									<div className="input-button">
										<div className="file-upload">
											<div className="image-upload-wrap">
												<input
													className="file-upload-input"
													type="file"
													accept="image/*"
													required={true}
													name="projectCover"
													onChange={onImageChange}
													onBlur={formik.handleBlur}
												/>
												<div className="drag-text">
													{image ? (
														<img
															src={image}
															alt="project image"
														/>
													) : (
														<>
															<svg
																className="mx-auto upload-icon-svg h-12 w-12 text-gray-400"
																stroke="currentColor"
																fill="none"
																viewBox="0 0 48 48"
																aria-hidden="true"
															>
																<path
																	d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
																	strokeWidth={
																		2
																	}
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
															</svg>
															<p className="form-text text-white">
																Upload a file or
																drag and drop
															</p>
														</>
													)}
												</div>
											</div>
										</div>
										<label
											htmlFor="project-cover"
											className="text-white"
										>
											Token symbol *
										</label>

										<div className="form-text text-white">
											{Boolean(
												formik.touched.projectCover &&
													formik.errors.projectCover
											) ? (
												<span className="form-text text-danger">
													{formik.errors.projectCover}
												</span>
											) : (
												"The token information will be fetched from the relevant blockchain."
											)}
										</div>
									</div>
									<div className="input-button">
										<div className="file-upload">
											<div className="image-upload-wrap">
												<input
													className="file-upload-input"
													type="file"
													accept="image/*"
													required={true}
													name="coverImage"
													onChange={
														onCoverImageChange
													}
													onBlur={formik.handleBlur}
												/>
												<div className="drag-text">
													{coverImage ? (
														<img
															src={coverImage}
															alt="project image"
														/>
													) : (
														<>
															<svg
																className="mx-auto upload-icon-svg h-12 w-12 text-gray-400"
																stroke="currentColor"
																fill="none"
																viewBox="0 0 48 48"
																aria-hidden="true"
															>
																<path
																	d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
																	strokeWidth={
																		2
																	}
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
															</svg>
															<p className="form-text text-white">
																Upload a file or
																drag and drop
															</p>
														</>
													)}
												</div>
											</div>
										</div>
										<label
											htmlFor="project-cover"
											className="text-white"
										>
											Project Cover *
										</label>
										<div className="form-text text-white">
											We need a cover in the following
											format: 1920x1080px
										</div>
										<div className="form-text text-white">
											{Boolean(
												formik.touched.coverImage &&
													formik.errors.coverImage
											) ? (
												<span className="form-text text-danger">
													{formik.errors.coverImage}
												</span>
											) : (
												"The token information will be fetched from the relevant blockchain."
											)}
										</div>
									</div>
									<div className="row">
										<div className="input-button col-md-9">
											<input
												type="text"
												id="projectName"
												required={true}
												name="projectName"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={
													formik.values.projectName
												}
											/>
											<label
												htmlFor="project-name"
												className="label-14px-left text-white"
											>
												Project Name *
											</label>
											<div className="form-text text-white">
												{Boolean(
													formik.touched
														.projectName &&
														formik.errors
															.projectName
												) && (
													<span className="form-text text-danger">
														{
															formik.errors
																.projectName
														}
													</span>
												)}
											</div>
										</div>
										<div className="input-button col-md-3">
											<input
												type="text"
												id="symbol"
												required={true}
												name="symbol"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.symbol}
											/>
											<label
												htmlFor="symbol"
												className="label-14px-left text-white"
											>
												Symbol *
											</label>
											<div className="form-text text-white">
												{Boolean(
													formik.touched.symbol &&
														formik.errors.symbol
												) && (
													<span className="form-text text-danger">
														{formik.errors.symbol}
													</span>
												)}
											</div>
										</div>
									</div>
									<div className="input-button">
										<textarea
											type="text"
											className="mb-0"
											rows={3}
											id="description"
											name="description"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.description}
										/>
										<label
											htmlFor="short-desc"
											className="text-white"
										>
											Short Description *
										</label>
										<div className="form-text text-white">
											Brief description of your project.
										</div>
									</div>
									<div className="input-button">
										<input
											type="text"
											id="websiteUrl"
											required={true}
											size="30"
											name="websiteUrl"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.websiteUrl}
										/>
										<label
											htmlFor="website-url"
											className="text-white"
										>
											Website URL *
										</label>
										<div className="form-text text-white">
											{Boolean(
												formik.touched.websiteUrl &&
													formik.errors.websiteUrl
											) && (
												<span className="form-text text-danger">
													{formik.errors.websiteUrl}
												</span>
											)}
										</div>
									</div>
									<div className="input-button">
										<input
											type="text"
											id="whitePaperUrlPdf"
											required={true}
											size="30"
											name="whitePaperUrlPdf"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={
												formik.values.whitePaperUrlPdf
											}
										/>
										<label
											htmlFor="website-url"
											className="text-white"
										>
											WhitePaper URL (should be a PDF)
										</label>
										<div className="form-text text-white">
											{Boolean(
												formik.touched
													.whitePaperUrlPdf &&
													formik.errors
														.whitePaperUrlPdf
											) && (
												<span className="form-text text-danger">
													{
														formik.errors
															.whitePaperUrlPdf
													}
												</span>
											)}
										</div>
									</div>
									<div className="mt-4">
										<h4 className="mb-0">2. IDO Details</h4>
										<p className="text-white">
											Calculate the amount of token for
											IDO and the liquidity
										</p>
									</div>
									<div className="radio-button">
										<h5 className="mt-35 text-white">
											Blockchain/Platform *
										</h5>
										<div className="row">
											{tokenUrls.map((network, index) => (
												<div
													className="col-md-6"
													key={index}
												>
													<div
														onClick={(e) => {
															console.log(
																"formik.values",
																formik.values
																	.blockchainPlateform
															);
															handleBlockchainChange(
																network.chainId
															);
														}}
														className="input-list"
													>
														<input
															type="radio"
															checked={
																formik.values
																	.blockchainPlateform ===
																network.name
																	? true
																	: false
															}
															value={
																network.chainId
															}
															name="blockchainPlateform"
															// onChange={handleBlockchainChange}
															onBlur={
																handleBlockchainChange
															}
														/>
														<label htmlFor="binance">
															{network.name}
														</label>
														<div className="check" />
													</div>
												</div>
											))}
										</div>
										<div className="form-text text-white">
											{Boolean(
												formik.touched
													.blockchainPlateform &&
													formik.errors
														.blockchainPlateform
											) && (
												<span className="form-text text-danger">
													{
														formik.errors
															.blockchainPlateform
													}
												</span>
											)}
										</div>
									</div>

									<div className="input-button">
										<input
											type="number"
											id="tokenRate"
											required={true}
											name="tokenRate"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.tokenRate}
										/>
										<label
											htmlFor="token-rate"
											className="text-white"
										>
											Token rate *
										</label>
										<div className="form-text text-white">
											{Boolean(
												formik.touched.tokenRate &&
													formik.errors.tokenRate
											) && (
												<span className="form-text text-danger">
													{formik.errors.tokenRate}
												</span>
											)}
										</div>
									</div>
									<div className="row">
										<div className="input-button col-md-6">
											<input
												type="number"
												id="softCap"
												required={true}
												name="softCap"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.softCap}
											/>
											<label
												htmlFor="softcap"
												className="label-14px-left text-white"
											>
												SoftCap{" "}
												<span>
													(
													{
														formik.values
															.blockchainPlateform
													}
													)
												</span>{" "}
												*
											</label>
											<div className="form-text text-white">
												<div className="form-text text-white">
													{Boolean(
														formik.touched
															.softCap &&
															formik.errors
																.softCap
													) ? (
														<span className="form-text text-danger">
															{
																formik.errors
																	.softCap
															}
														</span>
													) : (
														"Softcap must be >=50% of Hardcap!"
													)}
												</div>
											</div>
										</div>
										<div className="input-button col-md-6">
											<input
												type="number"
												id="hardCap"
												required={true}
												name="hardCap"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.hardCap}
											/>
											<label
												htmlFor="hardcap"
												className="label-14px-left text-white"
											>
												HardCap{" "}
												<span>
													(
													{
														formik.values
															.blockchainPlateform
													}
													)
												</span>{" "}
												*
											</label>
											<div className="form-text text-white">
												{Boolean(
													formik.touched.hardCap &&
														formik.errors.hardCap
												) && (
													<span className="form-text text-danger">
														{formik.errors.hardCap}
													</span>
												)}
											</div>
										</div>
										<div className="input-button col-md-6">
											<input
												type="number"
												id="minBuy"
												required={true}
												name="minBuy"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.minBuy}
											/>
											<label
												htmlFor="minbuy"
												className="label-14px-left text-white"
											>
												Min. Buy{" "}
												<span>
													(
													{
														formik.values
															.blockchainPlateform
													}
													)
												</span>{" "}
												*
											</label>
											<div className="form-text text-white">
												{Boolean(
													formik.touched.minBuy &&
														formik.errors.minBuy
												) && (
													<span className="form-text text-danger">
														{formik.errors.minBuy}
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
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.maxBuy}
											/>
											<label
												htmlFor="maxbuy"
												className="label-14px-left text-white"
											>
												Max. Buy{" "}
												<span>
													(
													{
														formik.values
															.blockchainPlateform
													}
													)
												</span>{" "}
												*
											</label>
											<div className="form-text text-white">
												{Boolean(
													formik.touched.maxBuy &&
														formik.errors.maxBuy
												) && (
													<span className="form-text text-danger">
														{formik.errors.maxBuy}
													</span>
												)}
											</div>
										</div>

										<div className="input-button col-md-6">
											<input
												type="number"
												id="listing-rate"
												required={true}
												name="tokenAllocation"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={
													formik.values
														.tokenAllocation
												}
											/>
											<label
												htmlFor="listing-rate"
												className="label-14px-left text-white"
											>
												Token Allocation*
											</label>
											<div className="form-text text-white">
												{Boolean(
													formik.touched
														.tokenallocation &&
														formik.errors
															.tokenallocation
												) && (
													<span className="form-text text-danger">
														{
															formik.errors
																.tokenallocation
														}
													</span>
												)}
											</div>
										</div>
										<div className="input-button col-md-6">
											<input
												type="datetime-local"
												id="ido-start-time"
												required={true}
												name="idoStartDate"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={
													formik.values.idoStartDate
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
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.idoEndDate}
											/>
											<label
												htmlFor="ido-start-time"
												className="label-14px-left text-white"
											>
												IDO End Date &amp; Time *
											</label>
											<div className="form-text text-white">
												{Boolean(
													formik.touched.idoEndDate &&
														formik.errors.idoEndDate
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
										<div className="input-button col-md-6">
											<select
												required={true}
												name="pairCoin"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.pairCoin}
											>
												{PAIIR_DROPDOWN[
													currentChainId
												]?.map((ele, i) => (
													<option key={i} value={ele}>
														{ele}
													</option>
												))}
											</select>
											<label
												htmlFor="ido-start-time"
												className="label-14px-left text-white"
											>
												Pair Token *
											</label>
											<div className="form-text text-white">
												{Boolean(
													formik.touched.pairCoin &&
														formik.errors.pairCoin
												) && (
													<span className="form-text text-danger">
														{formik.errors.pairCoin}
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
														checked={
															formik.values
																.whiteList
														}
														name="whitelist"
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
													{formik.errors.whitelist}
												</span>
											)}
										</div>
									</div>
									{/* isWhiteListVisible */}
									{formik.values.whiteList && (
										<div className="radio-button">
											<h5 className="mt-34 mb-22 text-white">
												Show Whitelist address in public
											</h5>
											<div className="row">
												<div className="col-md-6">
													<div
														className="input-list"
														onClick={() =>
															handleChangeIsWhitelist(
																true
															)
														}
													>
														<input
															type="radio"
															id="enable"
															value={true}
															checked={
																formik.values
																	.isWhiteListVisible
															}
															name="isWhiteListVisible"
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
															handleChangeIsWhitelist(
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
																	.isWhiteListVisible
															}
															name="isWhiteListVisible"
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
									)}
									<div className="mt-4">
										<h4 className="mb-0">
											3. Social Media Networks:
										</h4>
										<p className="text-white">
											Please indicate your different
											social media networks
										</p>
									</div>
									<div className="input-button group">
										<i className="icon-telegram" />
										<input
											type="text"
											className="enter"
											id="telegram"
											placeholder="Enter telegram URL"
											name="telegramUrl"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.telegramUrl}
										/>
										<label
											htmlFor="telegram"
											className="text-white"
										>
											Telegram URL
										</label>
										<div className="form-text text-white">
											{Boolean(
												formik.touched.telegramUrl &&
													formik.errors.telegramUrl
											) && (
												<span className="form-text text-danger">
													{formik.errors.telegramUrl}
												</span>
											)}
										</div>
									</div>
									<div className="input-button">
										<i className="icon-twitter" />
										<input
											type="text"
											className="enter"
											placeholder="Enter Twitter URL"
											id="twitter"
											name="twitterUrl"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.twitterUrl}
										/>
										<label
											htmlFor="twitter"
											className="text-white"
										>
											Twitter URL
										</label>
										<div className="form-text text-white">
											{Boolean(
												formik.touched.twitterUrl &&
													formik.errors.twitterUrl
											) && (
												<span className="form-text text-danger">
													{formik.errors.twitterUrl}
												</span>
											)}
										</div>
									</div>
									<div className="input-button">
										<i className="icon-discord" />
										<input
											type="text"
											className="enter"
											id="discord"
											placeholder="Enter discord URL"
											name="discordUrl"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.discordUrl}
										/>
										<label
											htmlFor="discord"
											className="text-white"
										>
											Discord URL
										</label>
										<div className="form-text text-white">
											{Boolean(
												formik.touched.discordUrl &&
													formik.errors.discordUrl
											) && (
												<span className="form-text text-danger">
													{formik.errors.discordUrl}
												</span>
											)}
										</div>
									</div>
									<div className="input-button">
										<i className="icon-link" />
										<input
											type="text"
											className="enter"
											placeholder="Enter URL"
											id="other"
											name="other"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.other}
										/>
										<label
											htmlFor="other"
											className="text-white"
										>
											Other
										</label>
										<div className="form-text text-white">
											{Boolean(
												formik.touched.other &&
													formik.errors.other
											) && (
												<span className="form-text text-danger">
													{formik.errors.other}
												</span>
											)}
										</div>
									</div>

									<div className="mt-4">
										<h4 className="mb-0">
											4. Submission Fee
										</h4>

										<p className="text-white">
											{prefee &&
												`${fromWei(
													prefee
												)} ${currency}`}{" "}
											{postfee &&
												`+ ${postfee}% Of Your
												RaisedToken`}
										</p>
									</div>
									<p className="text-white">
										{totalToken &&
											`${fromWei(totalToken, decimals)} ${
												formik.values.symbol
											} Require To Create Ido`}
									</p>
									<div className="project-btn-area text-center black-shape-big mt-40">
										<input
											type="submit"
											name="Approve"
											value={buttonStatus.currentBtnText}
											disabled={buttonStatus.disabled}
										/>
										<span className="hover-shape1" />
										<span className="hover-shape2" />
										<span className="hover-shape3" />
									</div>
								</form>
							</div>
						</div>
					</div>
				</Box>
			</Wrapper>
		</>
	);
};

export default IGOApply;
