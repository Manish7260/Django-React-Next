/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { tokenUrls } from "constant";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogoutAction } from "redux/actions/userActions";
import { userState } from "redux/reducers";
import Loader from "./Loader/Loader";
import ChainModel from "./popups/ChainModel";
import LogoutModal from "./popups/LogoutModal";
import Modal from "./popups/Modal";

const Header = () => {
	const { account, chainId } = useWeb3React();

	const { details, authenticated, loading } = useSelector(userState);
	const dispatch = useDispatch();

	const [open, setopen] = useState(false);
	const [copen, setCopen] = useState(false);
	const [logout, setlogout] = useState(false);

	const chain = tokenUrls.find((ntw) => ntw.chainId === chainId);

	//pending

	const loggingout = async () => {
		dispatch(userLogoutAction());
	};

	const showMobilenav = () => {
		document.body.classList.add("nav-expanded");
	};

	const hideMobilenav = () => {
		document.body.classList.remove("nav-expanded");
	};
	return (
		<>
			{loading && <Loader />}

			<Box position="relative" zIndex={10}>
				<ChainModel open={copen} setOpen={setCopen} />
				<Modal open={open} setOpen={setopen} />
				<LogoutModal open={logout} setOpen={setlogout} />
				<header
					id="gamfi-header"
					className="gamfi-header-section default-header"
				>
					<div className="menu-area menu-sticky">
						<div className="container">
							<div className="heaader-inner-area d-flex justify-content-between align-items-center">
								<div className="gamfi-logo-area d-flex justify-content-between align-items-center">
									<div className="logo">
										<Link to="/">
											<a>
												<img
													width="100px"
													src="assets/images/logo.png"
													alt="logo"
												/>
											</a>
										</Link>
									</div>
									<div className="header-menu">
										<ul className="nav-menu">
											<li>
												<Link to="/">Home</Link>
												<ul className="sub-menu">
													<li>
														<Link
															style={{
																padding: "0px",
															}}
															to="/ido-apply"
														>
															<a>
																Apply for ICO &
																IDO
															</a>
														</Link>
													</li>
													{/* <li>
														<a>Create token</a>
													</li> */}
												</ul>
											</li>
											<li>
												<a
													style={{
														cursor: "pointer",
													}}
												>
													Trade
												</a>
												<ul className="sub-menu">
													<li>
														<Link
															style={{
																padding: "0px",
															}}
															to="/exchange"
														>
															<a>Exchange</a>
														</Link>
													</li>
													{/* <li>
														<Link to="/ido">
															<a>CreateIdo</a>
														</Link>
													</li> */}
												</ul>
											</li>
											<li>
												<a
													style={{
														cursor: "pointer",
													}}
												>
													Pools
												</a>
												<ul className="sub-menu">
													<li>
														<Link
															style={{
																padding: "0px",
															}}
															to="/staking"
														>
															<a>Staking</a>
														</Link>
													</li>
													{/* <li>
														<Link
															style={{
																padding: "0px",
															}}
															to="/farming"
														>
															<a>Farming</a>
														</Link>
													</li> */}
												</ul>
											</li>
											<li>
												<a>Projects</a>
												<ul className="sub-menu">
													<li>
														<Link
															style={{
																padding: "0px",
															}}
															to="/idos-list"
														>
															<a>Idos List</a>
														</Link>
													</li>
													<li>
														<Link
															style={{
																padding: "0px",
															}}
															to="/calendar"
														>
															<a>
																Project Calendar
															</a>
														</Link>
													</li>
												</ul>
											</li>
											{!authenticated && (
												<li>
													<a
														style={{
															cursor: "pointer",
														}}
													>
														Members
													</a>
													<ul className="sub-menu">
														<li>
															<Link
																style={{
																	padding:
																		"0px",
																}}
																to="/signup"
															>
																<a>
																	Signup/login
																</a>
															</Link>
														</li>

														{/* <li>
													<a href="/kyc">
														Project KYC
													</a>
												</li> */}
														<li>
															<Link
																style={{
																	padding:
																		"0px",
																}}
																to="/blog"
															>
																<a>blog</a>
															</Link>
														</li>
													</ul>
												</li>
											)}
											{authenticated &&
												details?.email && (
													<li>
														<a>Profile</a>
														<ul className="sub-menu">
															<li>
																<a>
																	{
																		details?.username
																	}
																</a>
															</li>
															<li
																onClick={
																	loggingout
																}
															>
																<a>Logout</a>
															</li>
														</ul>
													</li>
												)}
										</ul>
									</div>
								</div>
								<div className="gamfi-btn-area">
									<ul>
										<li onClick={showMobilenav}>
											<a
												id="nav-expander"
												className="nav-expander bar"
												href="#"
											>
												<div className="bar">
													<span className="dot1" />
													<span className="dot2" />
													<span className="dot3" />
												</div>
											</a>
										</li>
										{/* <li className="buy-token">
										<a
											className="readon black-shape"
											href="https://pancakeswap.finance/"
											target="_blank"
										>
											<span className="btn-text">
												Buy Token{" "}
											</span>
											<span className="hover-shape1" />
											<span className="hover-shape2" />
											<span className="hover-shape3" />
										</a>
									</li> */}
										<li>
											{account ? (
												<>
													<button
														type="button"
														className="readon white-btn hover-shape"
														data-bs-toggle="modal"
														data-bs-target="#exampleModal"
														onClick={() =>
															setlogout(true)
														}
													>
														<img
															src="assets/images/icons/connect.png"
															alt="Icon"
														/>
														<span className="btn-text">
															{account.slice(
																0,
																5
															) +
																"..." +
																account.slice(
																	-4
																)}{" "}
														</span>
														<span className="hover-shape1" />
														<span className="hover-shape2" />
														<span className="hover-shape3" />
													</button>
													<button
														type="button"
														className="readon white-btn hover-shape"
														data-bs-toggle="modal"
														data-bs-target="#exampleModal"
														onClick={() =>
															setCopen(true)
														}
													>
														{chain?.logo && (
															<img
																src={
																	chain
																		? chain?.logo
																		: "assets/images/icons/connect.png"
																}
																width={18}
																alt="Icon"
															/>
														)}
														<span className="btn-text">
															{chain
																? chain.name
																: "Select Chain"}
														</span>
														<span className="hover-shape1" />
														<span className="hover-shape2" />
														<span className="hover-shape3" />
													</button>
												</>
											) : (
												<>
													<button
														type="button"
														className="readon white-btn hover-shape"
														data-bs-toggle="modal"
														data-bs-target="#exampleModal"
														onClick={() =>
															setopen(true)
														}
													>
														<img
															src="assets/images/icons/connect.png"
															alt="Icon"
														/>
														<span className="btn-text">
															Connect{" "}
														</span>
														<span className="hover-shape1" />
														<span className="hover-shape2" />
														<span className="hover-shape3" />
													</button>
												</>
											)}
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<nav
						className="right_menu_togle mobile-navbar-menu"
						id="mobile-navbar-menu"
					>
						<div className="close-btn" onClick={hideMobilenav}>
							<a id="nav-close2" className="nav-close">
								<div className="line">
									<span className="line1" />
									<span className="line2" />
								</div>
							</a>
						</div>
						<div className="sidebar-logo mb-30">
							<a>
								<img src="assets/images/logo.png" alt="" />
							</a>
						</div>
						<ul className="nav-menu">
							<li className="current-menu-item">
								<a>Home</a>
								<ul className="sub-menu">
									<li>
										<Link
											style={{ padding: "0px" }}
											to="/ido-apply"
										>
											<a>Apply for ICO & IDO</a>
										</Link>
									</li>
									<li>
										<a>Create token</a>
									</li>
								</ul>
							</li>
							<li>
								<a>Trade</a>
								<ul className="sub-menu">
									<li>
										<Link
											style={{ padding: "0px" }}
											to="/exchange"
										>
											<a>Exchange</a>
										</Link>
									</li>
									<li>
										<Link style={{ padding: "0px" }} to="/">
											<a>Liquidity</a>
										</Link>
									</li>
								</ul>
							</li>
							<li>
								<a>Pools</a>
								<ul className="sub-menu">
									<li>
										<a href="/staking">Staking</a>
									</li>
									<li>
										<a href="/farming">Farming</a>
									</li>
								</ul>
							</li>
							<li>
								<a>Projects</a>
								<ul className="sub-menu">
									<li>
										<Link
											style={{ padding: "0px" }}
											to="/projects-list"
										>
											<a>Projects List</a>
										</Link>
									</li>
									<li>
										<Link
											style={{ padding: "0px" }}
											to="/calendar"
										>
											<a>Project Calendar</a>
										</Link>
									</li>
								</ul>
							</li>
							<li>
								<a>Members</a>
								<ul className="sub-menu">
									<li>
										<Link
											style={{ padding: "0px" }}
											to="/signup"
										>
											<a>Signup/login</a>
										</Link>
									</li>
									<li>
										<a href="/kyc">Project KYC</a>
									</li>
									<li>
										<Link
											style={{ padding: "0px" }}
											to="/blog"
										>
											<a>News/blog</a>
										</Link>
									</li>
								</ul>
							</li>
							<li className="menu-item-has-children">
								<a
									href="https://pancakeswap.finance/"
									target="_blank"
								>
									Buy Token
								</a>
							</li>
							<li>
								{account ? (
									<button
										type="button"
										className="readon black-shape-big connectWalletBtnforMobile"
										data-bs-toggle="modal"
										data-bs-target="#exampleModal"
										onClick={() => setlogout(true)}
									>
										<img
											src="assets/images/icons/connect_white.png"
											alt="Icon"
										/>
										<span className="btn-text">
											{account.slice(0, 5) +
												"..." +
												account.slice(-4)}{" "}
										</span>
										<span className="hover-shape1" />
										<span className="hover-shape2" />
										<span className="hover-shape3" />
									</button>
								) : (
									<button
										type="button"
										className="readon black-shape-big connectWalletBtnforMobile"
										data-bs-toggle="modal"
										data-bs-target="#exampleModal"
										onClick={() => setopen(true)}
									>
										<img
											src="assets/images/icons/connect_white.png"
											alt="Icon"
										/>
										<span className="btn-text">
											Connect{" "}
										</span>
										<span className="hover-shape1" />
										<span className="hover-shape2" />
										<span className="hover-shape3" />
									</button>
								)}
							</li>
						</ul>
					</nav>
				</header>
			</Box>
		</>
	);
};

export default Header;
