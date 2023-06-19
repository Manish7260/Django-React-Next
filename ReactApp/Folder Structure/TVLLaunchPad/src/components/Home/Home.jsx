/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { Box } from "@mui/material";
import Wrapper from "components/Wrapper";
import { Link } from "react-router-dom";

import HomeUpcomingIgo from "./HomeUpcomingIgo";
import HomePastIgos from "./HomePastIgos";
import HomeSlider from "./HomeSlider";
import ConnectionCheckWrapper from "components/ConnectionCheckWrapper/ConnectionCheckWrapper";
import ScrollToTop from "components/ScrollToTop";
const Home = () => {
	return (
		<ConnectionCheckWrapper>
			<Wrapper>
				<ScrollToTop />
				<Box>
					<div
						style={{ position: "relative", zIndex: 1 }}
						id="sc-banner"
						className="sc-banner banner-bg position-relative"
					>
						<div className="container">
							<div className="banner-content text-center">
								<img
									className="banner-icon wow fadeInUp"
									data-wow-delay="0.4s"
									data-wow-duration="0.7s"
									src="assets/images/icons/icon1.png"
									alt="icon-image"
								/>
								<h1
									className="banner-title wow fadeInUp"
									data-wow-delay="0.4s"
									data-wow-duration="0.7s"
								>
									Web 3.0 Ido Launcepad
								</h1>
								<div
									className="description wow fadeInUp"
									data-wow-delay="0.4s"
									data-wow-duration="0.7s"
								>
									The next generation for Idos
								</div>
								<Link to="/idos-list">
									<a
										className="banner-btn wow fadeInUp black-shape-big"
										data-wow-delay="0.4s"
										data-wow-duration="0.7s"
									>
										<span className="btn-text">
											Explore IDO
										</span>
										<span className="hover-shape1" />
										<span className="hover-shape2" />
										<span className="hover-shape3" />
									</a>
								</Link>
							</div>
						</div>
					</div>

					<div
						// style={{ position: "relative", zIndex: 10000 }}
						className="gamfi-about-secion pb-80 md-pb-45"
					>
						<div className="container">
							<div className="banner-slider-inner wow fadeInUp">
								{/* <div
		  className="sc-carousel owl-carousel"
		  data-loop="true"
		  data-items={1}
		  data-margin={70}
		  data-autoplay="true"
		  data-hoverpause="true"
		  data-autoplay-timeout={5000}
		  data-smart-speed={1500}
		  data-dots="true"
		  data-nav="false"
		  data-nav-speed="true"
		  data-center-mode="false"
		  data-mobile-device={1}
		  data-mobile-device-nav="false"
		  data-mobile-device-dots="true"
		  data-ipad-device={1}
		  data-ipad-device-nav="false"
		  data-ipad-device-dots="true"
		  data-ipad-device2={1}
		  data-ipad-device-nav2="false"
		  data-ipad-device-dots2="false"
		  data-md-device={1}
		  data-md-device-nav="false"
		  data-md-device-dots="true"
		> */}

								{/* </div> */}
							</div>
						</div>
					</div>
					<div className="gamfi-project-section main-project-area">
						<div className="container">
							<div className="sec-inner align-items-center d-flex justify-content-between">
								<div className="sec-heading">
									<div className="sub-inner mb-15">
										<span className="sub-title">
											Running Projects
										</span>
										<img
											className="heading-left-image"
											src="assets/images/icons/steps.png"
											alt="Steps-Image"
										/>
									</div>
									<h2 className="title">Open IDO</h2>
								</div>
								<div className="gamfi-btn-area">
									<ul>
										<li>
											<Link to="/idos-list">
												<a className="view-more black-shape">
													<span className="btn-text">
														View More
													</span>
													<i className="icon-arrow_right" />
													<span className="hover-shape1" />
													<span className="hover-shape2" />
													<span className="hover-shape3" />
												</a>
											</Link>
										</li>
									</ul>
								</div>
							</div>
							<HomeSlider />
						</div>
						<div className="container">
							<div className="sec-inner align-items-center d-flex justify-content-between">
								<div className="sec-heading">
									<div className="sub-inner mb-15">
										<span className="sub-title">
											Next Projects
										</span>
										<img
											className="heading-left-image"
											src="assets/images/icons/steps.png"
											alt="Steps-Image"
										/>
									</div>
									<h2 className="title">Upcoming IDO</h2>
								</div>
								<div className="gamfi-btn-area">
									<ul>
										<li>
											<Link to="/idos-list">
												<a className="view-more black-shape">
													<span className="btn-text">
														View More
													</span>
													<i className="icon-arrow_right" />
													<span className="hover-shape1" />
													<span className="hover-shape2" />
													<span className="hover-shape3" />
												</a>
											</Link>
										</li>
									</ul>
								</div>
							</div>
							<HomeUpcomingIgo />
						</div>
					</div>
					<div className="gamfi-previous-section pb-90 md-pb-50">
						<div className="container">
							<div
								className="sec-inner align-items-center d-flex justify-content-between wow fadeInUp mb-50"
								data-wow-delay="0.2s"
								data-wow-duration="0.4s"
							>
								<div className="sec-heading">
									<div className="sub-inner mb-15">
										<span className="sub-title">
											Complete Projects
										</span>
										<img
											className="heading-left-image"
											src="assets/images/icons/steps.png"
											alt="Steps-Image"
										/>
									</div>
									<h2 className="title mb-0 xs-pb-20">
										Previous IDO
									</h2>
								</div>
								<div className="gamfi-btn-area">
									<ul>
										<li>
											<Link to="/idos-list">
												<a className="view-more black-shape">
													<span className="btn-text">
														View More
													</span>
													<i className="icon-arrow_right" />
													<span className="hover-shape1" />
													<span className="hover-shape2" />
													<span className="hover-shape3" />
												</a>
											</Link>
										</li>
									</ul>
								</div>
							</div>
							<HomePastIgos />
						</div>
					</div>

					{/* <div className="gamfi-team-section gamfi_Our_mentor_section OurPartnarV3_Sect pt-115 pb-85 md-pt-75 md-pb-42">
					<div className="container">
						<div className="sec-inner align-items-center d-flex justify-content-between  mb-50">
							<div className="sec-heading">
								<div className="sub-inner mb-15">
									<span className="sub-title">backers</span>
									<img
										className="heading-left-image"
										src="assets/images/icons/steps.png"
										alt="Steps-Image"
									/>
								</div>
								<h2 className="title mb-0 xs-pb-20">
									Our PARTNERS
								</h2>
							</div>
							<div className="gamfi-btn-area">
								<ul className="GamfiV3_ProjectPoolsBtn">
									<li
										className="v3_OurPartnars_tablinks m-0"
										id="V3_OurPartnars_Tab_defaultOpen"
									>
										<button
											onClick={() => setpartnersValue(0)}
											className="view-more black-shape"
										>
											<span className="btn-text">
												Investor
											</span>
											<span className="hover-shape1" />
											<span className="hover-shape2" />
											<span className="hover-shape3" />
										</button>
									</li>
									<li className="v3_OurPartnars_tablinks">
										<button
											onClick={() => setpartnersValue(1)}
											className="view-more black-shape"
										>
											<span className="btn-text">
												MEDIA
											</span>
											<span className="hover-shape1" />
											<span className="hover-shape2" />
											<span className="hover-shape3" />
										</button>
									</li>
								</ul>
							</div>
						</div>
						<div className="Our_PARTNERSContnetSect">
							{partnersValue === 0 ? (
								<div
									id="Investor"
									className="v3_OurPartnars_tabcontent animate_opacity"
								>
									<ul className="OurPartnatList">
										<li>
											<img
												src="assets/images/partner/1.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/2.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/3.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/4.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/5.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/6.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/7.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/8.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/9.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/10.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/11.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/12.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/13.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/14.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/15.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
									</ul>
								</div>
							) : (
								<div
									id="MEDIA"
									className="v3_OurPartnars_tabcontent animate_opacity"
								>
									<ul className="OurPartnatList">
										<li>
											<img
												src="assets/images/partner/7.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/8.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/9.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/4.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/partner-image.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/partner-image2.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/partner-image3.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/partner-image4.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/partner-image5.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
										<li>
											<img
												src="assets/images/partner/15.png"
												alt="logo"
												className="img-fluid"
											/>
										</li>
									</ul>
								</div>
							)}
						</div>
					</div>
					<div className="OurPartnat_EathImg">
						<img
							src="assets/images/icons/earthBg.svg"
							alt="img"
							className="img-fluid"
						/>
					</div>
					<div className="RocketImgBW">
						<img
							src="assets/images/icons/rocket.png"
							alt="img"
							className="img-fluid"
						/>
					</div>
				</div> */}
				</Box>
			</Wrapper>
		</ConnectionCheckWrapper>
	);
};

export default Home;
