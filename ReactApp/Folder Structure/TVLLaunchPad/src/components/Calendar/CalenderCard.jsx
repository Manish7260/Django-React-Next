import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { calculateDays, fromWei, selectChainImage } from "utils";

const CalenderCard = ({ igoData, index, left }) => {
	const navigate = useNavigate();

	const clickHandler = (igo) => {
		navigate("/ido-details", {
			state: {
				...igo,
			},
		});
	};

	if (!igoData.length) {
		return (
			<div className="calender-date">
				<span>{index}</span>
			</div>
		);
	}

	return (
		<div className="calender-date">
			<span>{index}</span>
			<ul className="date-image">
				{igoData?.slice(0, 3)?.map((igo) => (
					<li>
						<div className="calender-image-area">
							<img
								src={
									igo.projectCover ||
									"assets/images/project/date-1.png"
								}
								alt="date"
							/>
							<div
								className={`project-item active-shape ${
									left ? "" : "project-item-left"
								}`}
							>
								<div
									onClick={() => clickHandler(igo)}
									className="project-info d-flex"
								>
									<img
										src={
											igo.projectCover ||
											"assets/images/project/project-image.png"
										}
										alt="Project-Image"
										height={100}
										width={100}
									/>
									<div className="project-auother">
										<Link to="/project-detail">
											<h4 className="mb-10">
												<a>{igo.projectName}</a>
											</h4>
										</Link>
										<div className="dsc">
											price (TVL) ={" "}
											{fromWei(igo?.tokenRate)}{" "}
											{igo?.symbol?.toUpperCase()}
										</div>
									</div>
								</div>
								<div className="project-content">
									<div className="project-header d-flex justify-content-between">
										<div className="heading-title">
											<h4>
												{moment(
													igo?.launched
												).fromNow()}{" "}
											</h4>
										</div>
										<div className="project-icon">
											<img
												src={selectChainImage(
													igo?.blockchainPlateform
												)}
												alt="Project-Image"
											/>
										</div>
									</div>
									<div className="project-media">
										<ul className="project-listing">
											<li>
												Min Buy{" "}
												<span>
													{fromWei(igo?.minBuy)}{" "}
													{igo?.symbol?.toUpperCase()}
												</span>
											</li>
											<li>
												Max Buy{" "}
												<span>
													{fromWei(igo?.maxBuy)}{" "}
													{igo?.symbol?.toUpperCase()}
												</span>
											</li>
											{/* <li>
												Soft Cap{" "}
												<span>
													{fromWei(igo?.softCap)} {}
												</span>
											</li>
											<li>
												Soft Cap{" "}
												<span>
													{fromWei(igo?.hardCap)} {}
												</span>
											</li> */}
											{/* <li>
												Targeted raise{" "}
												<span>
													{igo.liquidity}{" "}
													{setCurrency(
														igo.blockchainPlateform
													)}
												</span>
											</li> */}
											{/* <li>
												Access type <span>Public</span>
											</li> */}
											<li className="social-share">
												Social
												<ul className="social-icon-list">
													{igo.telegramUrl && (
														<li>
															<a
																href={
																	igo.telegramUrl
																}
																target="_blank"
																rel="noreferrer"
															>
																<i className="icon-telegram" />
															</a>
														</li>
													)}
													{igo.twitterUrl && (
														<li>
															<a
																href={
																	igo.twitterUrl
																}
															>
																<i className="icon-twitter" />
															</a>
														</li>
													)}
													{igo.discordUrl && (
														<li>
															<a
																href={
																	igo.discordUrl
																}
															>
																<i className="icon-discord" />
															</a>
														</li>
													)}
													{igo.other && (
														<li>
															<a href={igo.other}>
																<i className="icon-medium" />
															</a>
														</li>
													)}
													{/* <li>
														<a href="#">
															<i className="icon-world" />
														</a>
													</li> */}
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
				))}
			</ul>
		</div>
	);
};

export default CalenderCard;
