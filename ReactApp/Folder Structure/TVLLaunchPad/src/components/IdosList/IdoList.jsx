/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import Loader from "components/Loader/Loader";
import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { getIdosAction } from "redux/actions/idoAction";
import { idoState, setIdoStatus } from "redux/reducers/idoSlice";
import GridCard from "./GridCard";
import { Box } from "@mui/material";
import { tokenUrls } from "constant";
import Wrapper from "components/Wrapper";
import ScrollToTop from "components/ScrollToTop";
import { Link } from "react-router-dom";
import ConnectionCheckWrapper from "components/ConnectionCheckWrapper/ConnectionCheckWrapper";

const IdoList = () => {
	const dispatch = useDispatch();

	const [search, setSearch] = useState("");

	const { loading, data, hasMore, currentChainId, idoStatus } =
		useSelector(idoState);
	const [chainName, setChainName] = useState();

	const getData = useCallback(
		(reset = false, status = "OPEN_IDO") => {
			const payload = {
				status: status,
				reset,
			};
			if (search) {
				payload.search = search;
			}
			if (chainName) {
				payload.chain = chainName;
			}
			dispatch(getIdosAction(payload));
		},
		[dispatch, search, chainName]
	);

	const Search = (e) => {
		e.preventDefault();
		if (!currentChainId) {
			return;
		}
		getData(true, idoStatus);
	};

	useEffect(() => {
		if (!currentChainId) return;
		const chain = tokenUrls.find((chi) => chi.chainId === currentChainId);
		chain && setChainName(chain.name, idoStatus);
	}, [currentChainId]);

	useEffect(() => {
		if (!chainName) return;
		getData(true);
	}, [chainName]);

	console.log("fsfsf", hasMore);
	return (
		<>
			{loading && <Loader />}
			<ConnectionCheckWrapper>
				<Wrapper>
					<ScrollToTop />
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
													to="/"
												>
													Home
												</Link>
												<span className="sub-title">
													Projects
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
												Explore Igos
											</h2>
										</div>
									</div>
									<div className="col-lg-7 breadcrumbs-form md-mt-40">
										<form onSubmit={Search}>
											<input
												type="text"
												id="Search"
												name="search"
												placeholder="Search by name, token, address"
												value={search}
												onInput={(e) =>
													setSearch(e.target.value)
												}
											/>
											<span className="submit">
												<i
													className="icon-search"
													onClick={Search}
												/>
												<input type="submit" />
											</span>
										</form>
										<div className="btn-area">
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
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="gamfi-explore-content gamfi-previous-section pt-70 md-pt-80 pb-110 md-pb-50">
							<div className="container">
								{/* Tab Menu Section Start */}
								<div className="project-menu-area d-flex align-items-center justify-content-between">
									<div className="project-left-menu">
										<ul
											className="nav"
											id="myTab"
											role="tablist"
										>
											<li
												className="nav-item"
												role="presentation"
											>
												<button
													className="tab-link active"
													id="home-tab"
													data-bs-toggle="tab"
													data-bs-target="#open-igo"
													type="button"
													role="tab"
													aria-controls="open-igo"
													aria-selected="true"
													onClick={() =>
														getData(
															true,
															"OPEN_IDO"
														)
													}
												>
													OPEN IGO
												</button>
											</li>
											<li
												className="nav-item"
												role="presentation"
											>
												<button
													className="tab-link"
													id="profile-tab"
													data-bs-toggle="tab"
													data-bs-target="#upcoming"
													type="button"
													role="tab"
													aria-controls="upcoming"
													aria-selected="false"
													onClick={() =>
														getData(
															true,
															"UPCOMING"
														)
													}
												>
													Upcoming
												</button>
											</li>
											<li
												className="nav-item"
												role="presentation"
											>
												<button
													className="tab-link"
													id="contact-tab"
													data-bs-toggle="tab"
													data-bs-target="#past-igo"
													type="button"
													role="tab"
													aria-controls="past-igo"
													aria-selected="false"
													onClick={() =>
														getData(
															true,
															"PAST_IDO"
														)
													}
												>
													Past IGO
												</button>
											</li>
										</ul>
									</div>
									{/* <div className="project-right-menu">
								<ul className="al-access-menu">
									<li
										className="block"
										style={{
											zIndex: 10000,
										}}
									>
										<a>{chain || "All Block Chain"}</a>
										<ul className="sub-menu">
											{tokenUrls.map((network, index) => (
												<li
													style={{
														cursor: "pointer",
													}}
												>
													<a
														onClick={() =>
															dispatchOfPList(
																chainChangedPoL(
																	network.name
																)
															)
														}
													>
														<img
															src={network.logo}
															alt="icon"
														/>{" "}
														{network.name}
													</a>
												</li>
											))}
											<li style={{ cursor: "pointer" }}>
												<a
													onClick={() =>
														dispatchOfPList(
															chainChangedPoL(
																null
															)
														)
													}
												>
													<img
														src="assets/images/project/chain.png"
														alt="icon"
													/>{" "}
													All Block Chain
												</a>
											</li>
										</ul>
									</li>
								</ul>
							</div> */}
								</div>
								{/* Tab Content Section Start */}

								{/* Open IGO Content Start */}

								<InfiniteScroll
									next={() => getData(false, idoStatus)}
									dataLength={data.length}
									hasMore={
										currentChainId
											? data.length
												? hasMore
												: false
											: false
									}
									// scrollThreshold={0.7}
									loader={
										<h4 style={{ textAlign: "center" }}>
											Loading...
										</h4>
									}
								>
									<div
										className="tab-content"
										id="myTabContent"
									>
										<div
											className="tab-pane fade show active"
											id="open-igo"
											role="tabpanel"
											aria-labelledby="home-tab"
										>
											<div className="row align-items-center">
												{data?.map((ele, i) => (
													<GridCard
														status={idoStatus}
														ido={ele}
														key={i}
													/>
												))}
											</div>
										</div>
									</div>
								</InfiniteScroll>
							</div>
						</div>
					</Box>
				</Wrapper>
			</ConnectionCheckWrapper>
		</>
	);
};

export default IdoList;
