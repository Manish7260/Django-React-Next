/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import ScrollToTop from "components/ScrollToTop";
import { useCallback, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { fromWei, prograssBar, selectChainImage } from "utils";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { idoState, setIdoAction, setIsnavigate } from "redux/reducers/idoSlice";
import { cancleIdoAction, poolInfoAction } from "redux/actions/idoAction";
import TokenInfo from "./TokenInfo";
import Wrapper from "components/Wrapper";
import Loader from "components/Loader/Loader";
// import { BLOCK_EXPLORER } from "constant";
import EditIdo from "./EditIdo";
import ConnectionCheckWrapper from "components/ConnectionCheckWrapper/ConnectionCheckWrapper";

const IdoDetails = () => {
	const params = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { poolInfo, loading, ido, userAccount, transaction, currentChainId } =
		useSelector(idoState);

	const getPoolDetails = useCallback(() => {
		dispatch(
			poolInfoAction({
				chainId: currentChainId,
				account: userAccount,
				payload: ido,
			})
		);
	}, [dispatch, currentChainId, userAccount, ido]);
	const onPoolRoute = (path) => {
		navigate(`${path || "/pool"}`, {
			state: {
				...ido,
			},
		});
	};

	const cancleIdo = useCallback(() => {
		dispatch(
			cancleIdoAction({
				chainId: currentChainId,
				account: userAccount,
				idoAddress: ido?.idoAddress,
				navigate,
			})
		);
	}, [dispatch]);

	useEffect(() => {
		dispatch(setIsnavigate(true));
	}, []);

	useEffect(() => {
		if (!params.state) return;
		dispatch(setIdoAction({ ...params.state }));
	}, [dispatch, params.state, currentChainId, userAccount]);

	useEffect(() => {
		if (
			!ido.tokenAddress ||
			!ido.idoAddress ||
			!currentChainId ||
			!userAccount
		)
			return;
		getPoolDetails();
	}, [userAccount, currentChainId, getPoolDetails, ido]);

	useEffect(() => {
		console.log("transaction", transaction);
		if (!transaction?.hash && !transaction?.type) {
			return;
		}
		if (
			["cancle_ido"].includes(transaction?.type) &&
			transaction?.status === "success"
		) {
			navigate("/");
		}
	}, [transaction, transaction?.status]);

	const currentSwapStatus = useMemo(() => {
		if (!userAccount) {
			return { currentBtnText: "Connect Wallet", disabled: false };
		}
		if (
			["cancle_ido"].includes(transaction?.type) &&
			transaction?.status === "pending"
		) {
			return {
				currentBtnText: "Pending Transaction...",
				disabled: false,
			};
		}

		if (loading) {
			return {
				currentBtnText: "Loading... ",
				disabled: true,
			};
		}

		return { currentBtnText: "Cancle Ido", disabled: false };
	}, [userAccount, ido, transaction?.type, transaction?.status, loading]);

	return (
		<>
			<ConnectionCheckWrapper>
				<Wrapper>
					{loading && <Loader />}
					<ScrollToTop />
					<Box>
						<div className="gamfi-breadcrumbs-section breadcrumbs-style2">
							<div className="container">
								<div className="row">
									<div className="col-lg-5">
										<div className="breadcrumbs-area sec-heading">
											<div className="sub-inner">
												<Link
													className="breadcrumbs-link"
													to="/"
												>
													Home
												</Link>
												<Link
													className="breadcrumbs-link"
													to="/idos-list"
												>
													Idos
												</Link>
												<span className="sub-title">
													Idos
												</span>
												<img
													className="heading-left-image"
													src="assets/images/icons/steps.png"
													alt="Steps-Image"
												/>
											</div>
										</div>
									</div>
									{/* <div className="col-lg-7 breadcrumbs-form md-mt-10">
									<div
										className="breadcrumbs-social ml-30 md-ml-0"
										data-bs-toggle="modal"
										data-bs-target="#shareIocns"
									>
										<a href="#">
											<i className="icon-share" /> Share
										</a>
									</div>
								</div> */}
								</div>
							</div>
						</div>
						<div className="project-details-conent gamfi-about-secion pb-80 md-pb-20">
							<div className="container">
								<div className="game-price-item hover-shape-inner">
									<div className="game-price-inner">
										<div className="total-price">
											<div className="price-inner d-flex mb-45">
												<div className="image-icon">
													<img
														src={
															ido.projectCover ||
															"assets/images/project/ninga-image.png"
														}
														alt="icon-image"
														height={100}
														width={100}
													/>
												</div>
												<div className="price-details">
													<h3 className="mb-15">
														{ido.projectName}
													</h3>
													<div className="dsc">
														1 TVL ={" "}
														{fromWei(
															poolInfo?.pool
																?.TokenRate
														)}{" "}
														{ido?.symbol?.toUpperCase()}
													</div>
												</div>
											</div>
											<div className="all-raise mb-10">
												{" "}
												Total Raise{" "}
												{fromWei(
													poolInfo?.totalRaised
												)}{" "}
												{ido?.symbol} ({" "}
												{prograssBar(
													fromWei(
														poolInfo?.pool?.HardCap,
														ido?.decimal
													),
													fromWei(
														poolInfo?.totalRaised,
														ido?.decimal
													)
												)}
												% )
											</div>
										</div>
										<div className="allocation-max text-center">
											<img
												src={selectChainImage(
													ido.blockchainPlateform
												)}
												alt="icon-image"
											/>
											<div className="allocation">
												Your Allocation:{" "}
												{fromWei(
													poolInfo?.userInfo
														?.amountInvested,
													ido?.decimal
												) || "0"}{" "}
												TVL /{" "}
												{fromWei(
													poolInfo?.pool
														?.MaxBuyPerUser,
													ido?.decimal
												)}
											</div>
										</div>
										<div
											className="targeted-raise"
											style={{
												textAlign: "end",
											}}
										>
											<div className="all-raise mb-10">
												{ido.idoStatus === "OPEN_ido" &&
													"Sale End In"}
												{ido.idoStatus === "UPCOMING" &&
													"Sale Start In"}
												{ido.idoStatus === "PAST_ido" &&
													"Sale End"}
											</div>
											<div className="price-counter mb-48">
												<div className="timer timer_1">
													{ido.idoStatus !==
													"PAST_ido" ? (
														// <Timer
														// 	futureDate={ido?.launched}
														// />
														<></>
													) : (
														<div>
															{" "}
															{moment(
																ido?.idoEndDate
															).fromNow()}
														</div>
													)}
												</div>
											</div>
											<div className="targeted-raise text-end">
												Targeted Raise{" "}
												{fromWei(
													poolInfo?.pool?.HardCap
												)}{" "}
												{ido?.symbol?.toUpperCase()}
											</div>
										</div>
									</div>
									<div className="progress-inner">
										<div className="progress">
											<div
												className="progress-bar progress-bar-striped"
												role="progressbar"
												aria-valuenow={4}
												aria-valuemin={0}
												aria-valuemax={100}
												style={{
													width: `${prograssBar(
														fromWei(
															poolInfo?.pool
																?.HardCap,
															ido?.decimal
														),
														fromWei(
															poolInfo?.totalRaised,
															ido?.decimal
														)
													)}%`,
												}}
											></div>
										</div>
									</div>
									<div className="banner-bottom-content mt-40">
										<div
											className="btn-area"
											data-bs-toggle="modal"
											data-bs-target="#exampleModal"
										>
											<span
												className="readon white-shape-small"
												style={{ cursor: "pointer" }}
												onClick={() => {
													onPoolRoute("/pool");
												}}
											>
												<span className="btn-text">
													Pool Info{" "}
												</span>
												<span className="hover-shape1" />
												<span className="hover-shape2" />
												<span className="hover-shape3" />
											</span>
										</div>
										<div
											className="btn-area"
											data-bs-toggle="modal"
											data-bs-target="#exampleModal"
										>
											{/*block explorer*/}
											{/* <a
											className="readon white-shape-small"
											style={{ cursor: "pointer" }}
											href={
												BLOCK_EXPLORER[currentChainId]
													? `${BLOCK_EXPLORER[currentChainId]}${ido?.idoAddress}`
													: "#"
											}
										>
											<span className="btn-text">
												view on explorer{" "}
											</span>
											<span className="hover-shape1" />
											<span className="hover-shape2" />
											<span className="hover-shape3" />
										</a> */}
										</div>

										{/* update pool */}

										{/* add to white list */}
										{/* <div
										className="btn-area"
										data-bs-toggle="modal"
										data-bs-target="#exampleModal"
									>
										<span
											className="readon white-shape-small"
											style={{ cursor: "pointer" }}
											onClick={onPoolRoute}
										>
											<span className="btn-text">
												Add To WhiteList{" "}
											</span>
											<span className="hover-shape1" />
											<span className="hover-shape2" />
											<span className="hover-shape3" />
										</span>
									</div> */}
										{/* <div className="text-content">
									Participants 4017/5000
								</div> */}
										<div className="social-area">
											<ul className="social-icon-list">
												{ido.telegramUrl && (
													<li>
														<a
															href={
																ido.telegramUrl
															}
															target="_blank"
															rel="noreferrer"
														>
															<i className="icon-telegram" />
														</a>
													</li>
												)}
												{ido.twitterUrl && (
													<li>
														<a
															href={
																ido.twitterUrl
															}
														>
															<i className="icon-twitter" />
														</a>
													</li>
												)}
												{ido.discordUrl && (
													<li>
														<a
															href={
																ido.discordUrl
															}
														>
															<i className="icon-discord" />
														</a>
													</li>
												)}
												{ido.other && (
													<li>
														<a href={ido.other}>
															<i className="icon-medium" />
														</a>
													</li>
												)}
												<li>
													<a href="#">
														<i className="icon-world" />
													</a>
												</li>
											</ul>
										</div>
									</div>
									<span className="border-shadow shadow-1" />
									<span className="border-shadow shadow-2" />
									<span className="border-shadow shadow-3" />
									<span className="border-shadow shadow-4" />
									<span className="hover-shape-bg hover_shape1" />
									<span className="hover-shape-bg hover_shape2" />
									<span className="hover-shape-bg hover_shape3" />
								</div>
								<div className="row mt-30">
									<div className="col-md-6">
										<div className="project-item">
											<div className="project-info">
												<h4 className="mb-30">
													{ido.projectName}
													<img
														src="assets/images/project/project-heading-image.png"
														alt="project"
													/>
												</h4>
											</div>
											<div className="project-content">
												<div className="project-media">
													<ul className="project-listing">
														<li>
															Token Distribution{" "}
															<span>
																{moment(
																	ido?.idoStartDate
																).fromNow()}{" "}
																To{" "}
																{moment(
																	ido?.idoEndDate
																).fromNow()}
															</span>
														</li>
														<li>
															Token Allocation{" "}
															<span>
																{fromWei(
																	poolInfo
																		?.pool
																		?.TokenAllocation,
																	ido?.decimal
																)}{" "}
																{ido?.symbol?.toUpperCase()}
															</span>
														</li>
														<li>
															Ido is only For
															Whitelisted user{" "}
															<span>
																{poolInfo?.pool
																	?.UseWhiteList
																	? "Yes"
																	: "No"}{" "}
															</span>
														</li>
														{/* <li>
													Max. Allocation{" "}
													<span>
														{ido.maxBuy}{" "}
														{setCurrency(
															ido.blockchainPlateform
														)}
													</span>
												</li> */}
														<li>
															Token Price{" "}
															<span>
																1{" "}
																{ido?.pairCoin}{" "}
																={" "}
																{fromWei(
																	poolInfo
																		?.pool
																		?.TokenRate
																)}
																{ido?.symbol?.toUpperCase()}
															</span>
														</li>
														{/* <li>
														Access type{" "}
														<span>Public</span>
													</li> */}
														<li>
															Softcap{" "}
															<span>
																{fromWei(
																	poolInfo
																		?.pool
																		?.SoftCap
																)}
															</span>
														</li>
														<li>
															Hardcap{" "}
															<span>
																{fromWei(
																	poolInfo
																		?.pool
																		?.HardCap
																)}
															</span>
														</li>
														<li>
															MinBuy{" "}
															<span>
																{fromWei(
																	poolInfo
																		?.pool
																		?.MinBuyPerUser
																)}
															</span>
														</li>
														<li>
															MaxBuy{" "}
															<span>
																{fromWei(
																	poolInfo
																		?.pool
																		?.MaxBuyPerUser
																)}
															</span>
														</li>
														{ido?.whiteList &&
															ido?.isWhiteListVisible && (
																<li>
																	Whitelisted
																	user{" "}
																	<span>
																		{fromWei(
																			poolInfo
																				?.pool
																				?.MaxBuyPerUser
																		)}
																	</span>
																</li>
															)}
													</ul>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="project-item">
											<div className="project-info d-flex">
												<h4 className="mb-20">
													Token Info{" "}
													<img
														src="assets/images/project/project-heading-image.png"
														alt="project"
													/>
												</h4>
											</div>
											<div className="project-content">
												<TokenInfo ido={ido} />
											</div>
										</div>
									</div>
								</div>
								{ido?.ownerAddress === userAccount && (
									<div className="row mt-30">
										<div className="col-md-6">
											<EditIdo navigate={onPoolRoute} />
										</div>
										<div className="col-md-6 text-end">
											<button
												className="readon white-shape-small"
												style={{ cursor: "pointer" }}
												onClick={cancleIdo}
												disabled={
													currentSwapStatus.disabled
												}
											>
												<span className="btn-text">
													{
														currentSwapStatus.currentBtnText
													}
												</span>
												<span className="hover-shape1" />
												<span className="hover-shape2" />
												<span className="hover-shape3" />
											</button>
										</div>
									</div>
								)}
							</div>
						</div>
					</Box>
				</Wrapper>
			</ConnectionCheckWrapper>
		</>
	);
};

export default IdoDetails;
