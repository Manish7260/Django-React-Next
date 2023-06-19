import { Link } from "react-router-dom";

const EditIdo = ({ navigate }) => {
	return (
		<div className="project-content">
			<div className="project-media">
				<ul className="project-listing">
					<li>
						Edit WhiteList{" "}
						<span>
							<span onClick={() => navigate("/ido-whitelist")}>
								Click hear
							</span>
						</span>
					</li>
					<li>
						Update Ido{" "}
						<span>
							<span onClick={() => navigate("/ido-update")}>
								Click hear
							</span>
						</span>
					</li>
					<li>
						Withdraw Fund{" "}
						<span>
							<span onClick={() => navigate("/ido-withdraw")}>
								Click hear
							</span>
						</span>
					</li>
					<li>
						show WhiteListed user
						<span>
							<span onClick={() => navigate("/whitelisted-user")}>
								Click hear
							</span>
						</span>
					</li>
					<li>
						Removed WhiteListed user
						<span>
							<span
								onClick={() =>
									navigate("/removed-whitelisted-user")
								}
							>
								Click hear
							</span>
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default EditIdo;
