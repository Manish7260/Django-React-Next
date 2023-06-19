import { Box } from "@mui/material";
import ConnectionCheckWrapper from "components/ConnectionCheckWrapper/ConnectionCheckWrapper";
import Wrapper from "components/Wrapper";
import React from "react";
import { Link } from "react-router-dom";
import StakingCard from "./StakingCard";

const Staking = () => {
	return (
		<ConnectionCheckWrapper>
			<Wrapper>
				<Box>
					<div className="gamfi-breadcrumbs-section">
						<div className="container">
							<div className="row">
								<div className="col-lg-5">
									<div
										style={{ position: "relative" }}
										className="breadcrumbs-area sec-heading"
									>
										<div className="sub-inner mb-15">
											<Link
												className="breadcrumbs-link"
												to="/"
											>
												Home
											</Link>
											<span className="sub-title">
												STAKE
											</span>
											<img
												className="heading-left-image"
												src="assets/images/icons/steps.png"
												alt="Steps-Image"
											/>
										</div>
										<h2 className="title mb-0">Staking</h2>
										<Box
											position="absolute"
											right="100px"
											top="45px"
											display="flex"
											alignItems="center"
										>
											{/* <Link to="/staking-grid">
												<i
													style={{
														fontSize: "30px",
														color: "#F0B600",
													}}
													className="fas fa-th"
												></i>
											</Link>
											<Link to="/staking">
												<i
													style={{
														fontSize: "30px",
														marginLeft: "20px",
													}}
													className="fas fa-list"
												></i>
											</Link> */}
										</Box>
									</div>
								</div>
								<div className="col-lg-7 breadcrumbs-form md-mt-40">
									<form>
										<input
											type="text"
											id="Search"
											name="search"
											placeholder="Search by name, token, address"
										/>
										<span className="submit">
											<i className="icon-search" />
											<input type="submit" />
										</span>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div className="gamfi-farming gamfi-previous-section pt-70 pb-130 md-pb-60">
						<div className="container">
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
												aria-selected="true"
											>
												Active
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
												aria-selected="false"
											>
												Inactive
											</button>
										</li>
										{/* <li
											className="form-switch"
											id="addswitchclass"
										>
											<label className="switch">
												<input type="checkbox" />
												<span className="slider round" />
											</label>
											<span className="title">
												Staked Only
											</span>
										</li> */}
									</ul>
								</div>
								{/* <div className="project-right-menu">
									<ul className="al-access-menu right-postion">
										<li>
											<a href="#">All Pools</a>
											<ul className="sub-menu">
												<li>
													<a href="#">All Pools</a>
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
										</li>
									</ul>
								</div> */}
							</div>
						</div>
						<div className="staking_flip_card_sect">
							<div className="container">
								<div className="row">
									{Array.from(Array(9).keys()).map(
										(ele, index) => (
											<StakingCard key={index} />
										)
									)}
								</div>
							</div>
						</div>
					</div>
				</Box>
			</Wrapper>
		</ConnectionCheckWrapper>
	);
};

export default Staking;
