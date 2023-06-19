import Loader from "components/Loader/Loader";
import { tokenUrls } from "constant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	calenderNextMongthAction,
	calenderPreviousMongthAction,
	getCurrenData,
} from "redux/actions/calenderAction";
import { calenderState } from "redux/reducers/calenderSlice";
import { idoState } from "redux/reducers/idoSlice";
import CalenderCard from "./CalenderCard";
import ConnectionCheckWrapper from "../ConnectionCheckWrapper/ConnectionCheckWrapper";
import Wrapper from "components/Wrapper";

const Calendar = () => {
	const { loading, data, year, monthName, fristWeekOfMonth } =
		useSelector(calenderState);

	const { currentChainId } = useSelector(idoState);

	const [chainName, setChainName] = useState();

	const dispatch = useDispatch();

	useEffect(() => {
		if (!currentChainId) return;
		const chain = tokenUrls.find((e) => e.chainId === currentChainId);
		if (chain) {
			setChainName(chain.name);
		}
	}, [currentChainId]);

	useEffect(() => {
		if (!chainName) return;
		dispatch(getCurrenData({ chain: chainName }));
	}, [chainName]);

	let Counter = 1;

	const modifyClass = () => {
		Counter++;
		let left = false;
		if (Counter <= 3) {
			left = true;
		} else if (Counter >= 7) {
			Counter = 1;
		}
		return left;
	};
	return (
		<>
			{loading && <Loader />}
			<ConnectionCheckWrapper>
				<Wrapper>
					<div>
						{/* Breadcrumbs Section Start */}
						<div className="gamfi-breadcrumbs-section">
							<div className="container">
								<div className="row">
									<div className="col-lg-5">
										<div className="breadcrumbs-area sec-heading">
											<div className="sub-inner mb-15">
												<Link
													className="breadcrumbs-link"
													to="/"
												>
													Home
												</Link>
												<span className="sub-title">
													Calendar View
												</span>
												<img
													className="heading-left-image"
													src="assets/images/icons/steps.png"
													alt="Steps-Image"
												/>
											</div>
											<h2 className="title mb-0">
												IGO Calendar
											</h2>
										</div>
									</div>
									<div className="col-lg-7 breadcrumbs-form md-mt-30">
										<div className="btn-area">
											<Link to="/idos-list">
												<a className="readon black-shape">
													<i className="icon-list" />
													<span className="btn-text">
														List View
													</span>
													<span className="hover-shape1" />
													<span className="hover-shape2" />
													<span className="hover-shape3" />
												</a>
											</Link>
										</div>
										<div className="gamfi-navigation ml-30 md-ml-0 sm-mt-20">
											<ul>
												<li>
													<a
														onClick={() =>
															dispatch(
																calenderPreviousMongthAction(
																	{
																		chain: chainName,
																	}
																)
															)
														}
													>
														<i className="icon-Vector" />
													</a>
												</li>
												<li>
													<a
														className="black-shape"
														href="#"
													>
														<span className="btn-text">
															{`${monthName} ${year}`}
														</span>
														<span className="hover-shape1" />
														<span className="hover-shape2" />
														<span className="hover-shape3" />
													</a>
												</li>
												<li>
													<a
														onClick={() =>
															dispatch(
																calenderNextMongthAction(
																	{
																		chain: chainName,
																	}
																)
															)
														}
													>
														<i className="icon-arrow_right" />
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* Breadcrumbs  Section End */}
						{/* Previous Section Start */}
						<div className="gamfi-previous-section pt-70 pb-130 md-pb-50">
							<div className="container">
								<div className="project-menu-area d-flex align-items-center justify-content-between">
									<div className="project-left-menu ">
										<ul
											className="nav"
											id="myTab"
											role="tablist"
										>
											<li
												className="nav-item border-none"
												role="presentation"
											>
												<button
													className="tab-link calendar-date-text"
													type="button"
												>
													{`${monthName} ${year}`}
												</button>
											</li>
										</ul>
									</div>
									<div className="project-right-menu">
										<ul className="al-access-menu">
											{/* <li className="access">
										<a href="#">All Access</a>
										<ul className="sub-menu">
											<li>
												<a href="#">All Access</a>
											</li>
											<li>
												<a href="#">Public</a>
											</li>
											<li>
												<a href="#">Private</a>
											</li>
											<li>
												<a href="#">Community</a>
											</li>
										</ul>
									</li> */}
											{/* <li className="block">
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
															dispatch(
																chainChanged(
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
														dispatch(
															chainChanged(null)
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
									</li> */}
										</ul>
									</div>
								</div>
								<div className="row align-items-center">
									<div className="col-md-12">
										<div className="previous-mainmenu mb-15">
											<ul className="menu-list date-menu">
												{fristWeekOfMonth?.map(
													(day, i) => (
														<li
															className={`date-list date_${
																i + 1
															}`}
														>
															{day}
														</li>
													)
												)}
											</ul>
										</div>
									</div>
								</div>
								{/* <div className="gamfi-calendar-list">
							<div className="calender-date">
								<span>30</span>
							</div>
							<div className="calender-date">
								<span>31</span>
								<ul className="date-image">
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-1.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a>
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																05 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-2.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image4.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																05 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image2.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-3.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image3.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																05 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image3.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="calender-date">
								<h5>1</h5>
							</div>
							<div className="calender-date">
								<h5>2</h5>
								<ul className="date-image">
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-4.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image2.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																18 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image4.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-5.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image6.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																04 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image5.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="calender-date">
								<h5>3</h5>
								<ul className="date-image">
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-6.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image2.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																15 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image6.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="calender-date">
								<h5>4</h5>
							</div>
							<div className="calender-date">
								<h5>5</h5>
								<ul className="date-image">
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-7.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																06 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image3.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-8.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image3.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																18 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image5.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="calender-date">
								<h5>6</h5>
								<ul className="date-image">
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image6.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																13 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="calender-date">
								<h5>7</h5>
							</div>
							<div className="calender-date">
								<h5>8</h5>
								<ul className="date-image">
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-9.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image3.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																16 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image2.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-10.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																19 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image6.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="calender-date">
								<h5>9</h5>
							</div>
							<div className="calender-date">
								<h5>10</h5>
								<ul className="date-image">
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-11.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image5.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																21 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-12.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image4.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																17 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image3.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-13.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image5.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																18 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image4.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="calender-date">
								<h5>11</h5>
								<ul className="date-image">
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-14.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image6.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																09 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image4.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="calender-date">
								<h5>12</h5>
							</div>
							<div className="calender-date">
								<h5>13</h5>
							</div>
							<div className="calender-date">
								<h5>14</h5>
								<ul className="date-image">
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-15.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																18 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image3.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="calender-date">
								<h5>15</h5>
								<ul className="date-image">
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-16.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image4.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																02 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-17.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image5.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																20 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image5.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-18.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image6.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																17 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image3.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="calender-date">
								<h5>16</h5>
								<ul className="date-image">
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-19.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image3.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																08 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image6.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-20.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image3.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																02 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image5.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="calender-date">
								<h5>17</h5>
							</div>
							<div className="calender-date">
								<h5>18</h5>
							</div>
							<div className="calender-date">
								<h5>19</h5>
								<ul className="date-image">
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-22.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image4.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																10 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image4.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-23.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image5.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																12 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image3.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-3.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image4.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																15 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image6.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="calender-date">
								<h5>20</h5>
								<ul className="date-image">
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-24.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image6.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																13 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image2.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-25.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image2.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																08 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image5.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="calender-date">
								<h5>21</h5>
							</div>
							<div className="calender-date">
								<h5>22</h5>
							</div>
							<div className="calender-date">
								<h5>23</h5>
								<ul className="date-image">
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-18.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																08 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="calender-date">
								<h5>24</h5>
								<ul className="date-image">
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-19.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image5.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																08 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image5.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-20.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image2.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																08 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image2.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-14.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																08 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="calender-date">
								<h5>25</h5>
							</div>
							<div className="calender-date">
								<h5>26</h5>
							</div>
							<div className="calender-date">
								<h5>27</h5>
							</div>
							<div className="calender-date">
								<h5>28</h5>
								<ul className="date-image">
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-4.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																08 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image5.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="calender-date">
								<span>1</span>
								<ul className="date-image">
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-7.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																08 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-11.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																08 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image5.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="calender-date">
								<span>2</span>
							</div>
							<div className="calender-date">
								<span>3</span>
							</div>
							<div className="calender-date">
								<span>4</span>
								<ul className="date-image">
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-12.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																08 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image3.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-3.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																08 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image6.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
									<li>
										<div className="calender-image-area">
											<img
												src="assets/images/project/date-18.png"
												alt="date"
											/>
											<div className="project-item active-shape">
												<div className="project-info d-flex">
													<img
														src="assets/images/project/project-image.png"
														alt="Project-Image"
													/>
													<div className="project-auother">
														<Link to="/project-detail">
															<h4 className="mb-10">
																<a href="project-details.html">
																	Galaxy War
																</a>
															</h4>
														</Link>
														<div className="dsc">
															price (GAC) = 0.59
															BUSD
														</div>
													</div>
												</div>
												<div className="project-content">
													<div className="project-header d-flex justify-content-between">
														<div className="heading-title">
															<h4>
																08 Days Left
															</h4>
														</div>
														<div className="project-icon">
															<img
																src="assets/images/project/project-single-image.png"
																alt="Project-Image"
															/>
														</div>
													</div>
													<div className="project-media">
														<ul className="project-listing">
															<li>
																Min allocation{" "}
																<span>
																	0.33 BUSD
																</span>
															</li>
															<li>
																Max allocation{" "}
																<span>
																	900.00 BUSD
																</span>
															</li>
															<li>
																Targeted raise{" "}
																<span>
																	200,000 BUSD
																</span>
															</li>
															<li>
																Access type{" "}
																<span>
																	Public
																</span>
															</li>
															<li className="social-share">
																Social
																<ul className="social-icon-list">
																	<li>
																		<a href="#">
																			<i className="icon-telegram" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-twitter" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-discord" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-medium" />
																		</a>
																	</li>
																	<li>
																		<a href="#">
																			<i className="icon-world" />
																		</a>
																	</li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
												<span className="border-shadow shadow-1" />
												<span className="border-shadow shadow-2" />
												<span className="border-shadow shadow-3" />
												<span className="border-shadow shadow-4" />
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="calender-date">
								<span>5</span>
							</div>
						</div> */}
								<div className="gamfi-calendar-list">
									{data?.map((ele, i) => {
										let left = modifyClass();
										return (
											<CalenderCard
												igoData={ele}
												index={i + 1}
												key={i}
												left={left}
											/>
										);
									})}
								</div>
							</div>
						</div>
						{/* Previous Section End */}
					</div>
				</Wrapper>
			</ConnectionCheckWrapper>
		</>
	);
};

export default Calendar;
