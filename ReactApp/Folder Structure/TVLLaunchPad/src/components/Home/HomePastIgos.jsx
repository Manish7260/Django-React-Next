import { tokenUrls } from "constant";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { idoState, setIdoStatus } from "redux/reducers/idoSlice";
import { getAllIgo } from "redux/services/idoService";
import { fromWei, selectChainImage, setCurrency } from "utils";

const HomePastIgos = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const { currentChainId } = useSelector(idoState);

	const getData = async (chain) => {
		try {
			const query = {
				limit: 6,
				pagination: false,
				status: "PAST_IDO",
			};
			if (chain) {
				query.chain = chain;
			}

			const response = await getAllIgo(query);
			setData(response?.data?.data);
		} catch (error) {
			console.log("error", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!currentChainId) return;
		const chain = tokenUrls.find(
			(chi) => chi.chainId === currentChainId
		)?.name;
		chain && getData(chain);
	}, [currentChainId]);

	const routeChange = (igo) => {
		dispatch(setIdoStatus("PAST_IDO"));
		navigate("/ido-details", {
			state: {
				...igo,
			},
		});
	};

	return (
		<div className="row align-items-center">
			{data?.map((igo, i) => (
				<div className="col-lg-4 col-md-6">
					<div>
						<div className="project-item hover-shape-border">
							<div className="project-info d-flex">
								<div
									onClick={() => routeChange(igo)}
									style={{ cursor: "pointer" }}
								>
									<img
										src={
											igo.projectCover ||
											"assets/images/project/project-image.png"
										}
										alt="Project-Image"
										width={70}
										height={70}
									/>
								</div>
								<div className="project-auother">
									<h4
										className="mb-10"
										style={{ cursor: "pointer" }}
									>
										<div onClick={() => routeChange(igo)}>
											{igo.projectName}
										</div>
									</h4>
									<div className="dsc">
										price ({igo?.pairCoin}) ={" "}
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
												igo?.idoStartDate
											).fromNow()}
										</h4>
									</div>
									<div className="project-icon">
										<img
											src={selectChainImage(
												igo.blockchainPlateform
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
												{fromWei(igo.minBuy)}{" "}
												{igo?.symbol?.toUpperCase()}
											</span>
										</li>
										<li>
											Max Buy{" "}
											<span>
												{fromWei(igo.maxBuy)}{" "}
												{igo?.symbol?.toUpperCase()}
											</span>
										</li>
										<li>
											Token Allocation{" "}
											<span>
												{fromWei(igo.tokenAllocation)}{" "}
												{igo?.symbol?.toUpperCase()}
											</span>
										</li>
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
				</div>
			))}
		</div>
	);
};

export default HomePastIgos;
