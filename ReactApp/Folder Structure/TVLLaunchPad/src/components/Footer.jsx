/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { SUPPOTED_CHAINID } from "constant";
import { Link } from "react-router-dom";
import { isMetaMaskInstalled } from "utils";

const Footer = ({ heading, subHeading }) => {
	const { active, chainId } = useWeb3React();

	if (!isMetaMaskInstalled()) {
		return (
			<Box>
				<div className="gamfi-footer-section">
					<Box sx={{ margin: 5 }}>
						<div className="gamfi-footer-section">
							<div className="container">
								<div className="footer-cta-area text-center active-shape hover-shape-inner">
									<h2 className="title mb-15">
										Please Install Metamask
										<br />
									</h2>
									<div className="dsc mb-40 md-mb-30">
										<a
											href="https://metamask.io/download/"
											target="_blank"
										>
											Click hear to install metamask
										</a>
									</div>
									{/* <Link to="/ido-apply"> */}
									{/* <Link to="/ido-apply">
									<a
										className="banner-btn wow fadeInUp black-shape"
										data-wow-delay="0.3s"
										data-wow-duration="0.5s"
									>
										<span className="btn-text">
											Apply For IGO
										</span>
										<span className="hover-shape1" />
										<span className="hover-shape2" />
										<span className="hover-shape3" />
									</a>
								</Link> */}
									{/* </Link> */}
									<span className="border-shadow shadow-1" />
									<span className="border-shadow shadow-2" />
									<span className="border-shadow shadow-3" />
									<span className="border-shadow shadow-4" />
									<span className="hover-shape-bg hover_shape1" />
									<span className="hover-shape-bg hover_shape2" />
									<span className="hover-shape-bg hover_shape3" />
								</div>
							</div>
						</div>
					</Box>

					<div className="footer-area">
						<div className="container">
							<div className="sec-heading text-center">
								<div className="sub-inner mb-52 mb-mb-30">
									<img
										className="heading-right-image"
										src="assets/images/icons/steps2.png"
										alt="Steps-Image"
									/>
									<span className="sub-title white-color">
										Find us on Social
									</span>
									<img
										className="heading-left-image"
										src="assets/images/icons/steps.png"
										alt="Steps-Image"
									/>
								</div>
							</div>
							<div className="footer-listing text-center mb-100 md-mb-70 xs-mb-50">
								<ul className="footer-icon-list">
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
											<i className="icon-telegram" />
										</a>
									</li>
								</ul>
							</div>
							<div className="footer-logo text-center mb-45">
								<img
									width="200px"
									src="assets/images/logo.png"
									alt="Footer-logo"
								/>
							</div>
							<div className="footer-mainmenu text-center mb-20">
								<ul>
									<li>
										<Link to="/contect-us">
											<a>Contact us</a>
										</Link>
									</li>
									<li>
										<a href="#">Terms of service</a>
									</li>
									<li>
										<a href="#">Privacy policy</a>
									</li>
								</ul>
							</div>
							<div className="copyright-area text-center mb-0">
								<div className="dsc mb-37 md-mb-25">
									<b>TVLPAD™</b> is a registered trademark to
									Focus Media
									<br />
									Copyright © 2004-2022 <b>TVLPAD</b>. All
									rights reserved. Invest responsibly.
								</div>
							</div>
							<div className="scrollup text-center">
								<a href="#gamfi-header">
									<i className="icon-arrow_up" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</Box>
		);
	}

	return (
		<Box>
			<div className="gamfi-footer-section">
				{active && SUPPOTED_CHAINID.includes(chainId) && (
					<div className="container">
						<div className="footer-cta-area text-center active-shape hover-shape-inner">
							<h2 className="title mb-15">
								Apply for project
								<br />
								incubation
							</h2>
							<div className="dsc mb-40 md-mb-30">
								If you want to lanuch an IDO, It will be your
								perfect choice
							</div>
							{/* <Link to="/ido-apply"> */}
							<Link to="/ido-apply">
								<a
									className="banner-btn wow fadeInUp black-shape"
									data-wow-delay="0.3s"
									data-wow-duration="0.5s"
								>
									<span className="btn-text">
										Apply For IDO
									</span>
									<span className="hover-shape1" />
									<span className="hover-shape2" />
									<span className="hover-shape3" />
								</a>
							</Link>
							{/* </Link> */}
							<span className="border-shadow shadow-1" />
							<span className="border-shadow shadow-2" />
							<span className="border-shadow shadow-3" />
							<span className="border-shadow shadow-4" />
							<span className="hover-shape-bg hover_shape1" />
							<span className="hover-shape-bg hover_shape2" />
							<span className="hover-shape-bg hover_shape3" />
						</div>
					</div>
				)}
				{active && !SUPPOTED_CHAINID.includes(chainId) && (
					<Box sx={{ margin: 5 }}>
						<div className="gamfi-footer-section">
							<div className="container">
								<div className="footer-cta-area text-center active-shape hover-shape-inner">
									<h2 className="title mb-15">
										Select diffrent chain
										<br />
									</h2>
									<div className="dsc mb-40 md-mb-30">
										{`Supported chains is ${SUPPOTED_CHAINID?.join(
											","
										)}`}
									</div>
									{/* <Link to="/ido-apply"> */}
									{/* <Link to="/ido-apply">
								<a
									className="banner-btn wow fadeInUp black-shape"
									data-wow-delay="0.3s"
									data-wow-duration="0.5s"
								>
									<span className="btn-text">
										Apply For IGO
									</span>
									<span className="hover-shape1" />
									<span className="hover-shape2" />
									<span className="hover-shape3" />
								</a>
							</Link> */}
									{/* </Link> */}
									<span className="border-shadow shadow-1" />
									<span className="border-shadow shadow-2" />
									<span className="border-shadow shadow-3" />
									<span className="border-shadow shadow-4" />
									<span className="hover-shape-bg hover_shape1" />
									<span className="hover-shape-bg hover_shape2" />
									<span className="hover-shape-bg hover_shape3" />
								</div>
							</div>
						</div>
					</Box>
				)}
				{!active && (
					<Box sx={{ margin: 5 }}>
						<div className="gamfi-footer-section">
							<div className="container">
								<div className="footer-cta-area text-center active-shape hover-shape-inner">
									<h2 className="title mb-15">
										Connect your wallate
										<br />
									</h2>
									<div className="dsc mb-40 md-mb-30">
										please connect your web3 wallate
									</div>
									{/* <Link to="/ido-apply"> */}
									{/* <Link to="/ido-apply">
									<a
										className="banner-btn wow fadeInUp black-shape"
										data-wow-delay="0.3s"
										data-wow-duration="0.5s"
									>
										<span className="btn-text">
											Apply For IGO
										</span>
										<span className="hover-shape1" />
										<span className="hover-shape2" />
										<span className="hover-shape3" />
									</a>
								</Link> */}
									{/* </Link> */}
									<span className="border-shadow shadow-1" />
									<span className="border-shadow shadow-2" />
									<span className="border-shadow shadow-3" />
									<span className="border-shadow shadow-4" />
									<span className="hover-shape-bg hover_shape1" />
									<span className="hover-shape-bg hover_shape2" />
									<span className="hover-shape-bg hover_shape3" />
								</div>
							</div>
						</div>
					</Box>
				)}
				<div className="footer-area">
					<div className="container">
						<div className="sec-heading text-center">
							<div className="sub-inner mb-52 mb-mb-30">
								<img
									className="heading-right-image"
									src="assets/images/icons/steps2.png"
									alt="Steps-Image"
								/>
								<span className="sub-title white-color">
									Find us on Social
								</span>
								<img
									className="heading-left-image"
									src="assets/images/icons/steps.png"
									alt="Steps-Image"
								/>
							</div>
						</div>
						<div className="footer-listing text-center mb-100 md-mb-70 xs-mb-50">
							<ul className="footer-icon-list">
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
										<i className="icon-telegram" />
									</a>
								</li>
							</ul>
						</div>
						<div className="footer-logo text-center mb-45">
							<img
								width="200px"
								src="assets/images/logo.png"
								alt="Footer-logo"
							/>
						</div>
						<div className="footer-mainmenu text-center mb-20">
							<ul>
								<li>
									<Link to="/contect-us">
										<a>Contact us</a>
									</Link>
								</li>
								<li>
									<a href="#">Terms of service</a>
								</li>
								<li>
									<a href="#">Privacy policy</a>
								</li>
							</ul>
						</div>
						<div className="copyright-area text-center mb-0">
							<div className="dsc mb-37 md-mb-25">
								<b>TVLPAD™</b> is a registered trademark to
								Focus Media
								<br />
								Copyright © 2004-2022 <b>TVLPAD</b>. All rights
								reserved. Invest responsibly.
							</div>
						</div>
						<div className="scrollup text-center">
							<a href="#gamfi-header">
								<i className="icon-arrow_up" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</Box>
	);
};

export default Footer;
