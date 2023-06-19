import moment from "moment";
import { useNavigate } from "react-router-dom";
import { fromWei, selectChainImage, setCurrency } from "utils";

const GridCard = ({ ido, status }) => {
	const navigate = useNavigate();
	const routeChange = () => {
		navigate("/ido-details", {
			state: {
				...ido,
				status,
			},
		});
	};
	return (
		<div className="col-lg-4 col-md-6" onClick={routeChange}>
			<div className="project-shape-item hover-shape-border">
				<div className="project-item ">
					<div className="project-info">
						<a>
							<img
								src={
									ido.projectCover ||
									"assets/images/project/explore.png"
								}
								alt="Explore-Image"
								height={200}
								width={310}
								style={{
									height: "200px",
								}}
							/>
						</a>
						<div className="project-auother">
							<h4 className="mb-10">
								<a>{ido.projectName}</a>
							</h4>
							<div className="dsc">
								price ({ido?.pairCoin}) ={" "}
								{fromWei(ido?.tokenRate)} {ido?.symbol}
							</div>
						</div>
					</div>
					<div className="project-content">
						<div className="project-header d-flex justify-content-between">
							<div className="heading-title">
								<h4>{moment(ido?.idoStartDate).fromNow()}</h4>
							</div>
							<div className="project-icon">
								<img
									src={selectChainImage(
										ido?.blockchainPlateform
									)}
									alt="Project-Image"
								/>
							</div>
						</div>
						<div className="project-media">
							<ul className="project-listing">
								<li>
									Token allocation{" "}
									<span>
										{fromWei(ido?.tokenAllocation)}{" "}
										{ido?.symbol}
									</span>
								</li>

								<li>
									Targeted raise{" "}
									<span>
										{fromWei(ido?.hardCap)} {ido?.symbol}
									</span>
								</li>
								{/* <li>
									Access type <span>Public</span>
								</li> */}
							</ul>
						</div>
					</div>
					<span className="border-shadow shadow-1" />
					<span className="border-shadow shadow-2" />
					<span className="border-shadow shadow-3" />
					<span className="border-shadow shadow-4" />
				</div>
				<div className="icon-listing">
					<ul className="social-icon-list">
						{ido.telegramUrl && (
							<li>
								<a
									href={ido.telegramUrl}
									target="_blank"
									rel="noreferrer"
								>
									<i className="icon-telegram" />
								</a>
							</li>
						)}
						{ido.twitterUrl && (
							<li>
								<a href={ido.twitterUrl}>
									<i className="icon-twitter" />
								</a>
							</li>
						)}
						{ido.discordUrl && (
							<li>
								<a href={ido.discordUrl}>
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
		</div>
	);
};

export default GridCard;
