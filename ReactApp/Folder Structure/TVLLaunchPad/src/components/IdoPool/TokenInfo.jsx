import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { idoState } from "redux/reducers/idoSlice";
import { fromWei, tokenInfo } from "utils";
const TokenInfo = () => {
	const matches = useMediaQuery("(max-width:760px)");
	const {  ido, userAccount, currentChainId } =
		useSelector(idoState);
	//state
	const [loading, setLoading] = useState(false);
	const [tokenDetails, setTokenDetails] = useState({});

	useEffect(() => {
		if (!currentChainId || !ido?.tokenAddress || !userAccount) return;
		(async () => {
			setLoading(true);
			try {
				const [name, symbol, decimal, totalSupply] = await tokenInfo({
					chainId: currentChainId,
					address: ido?.tokenAddress,
				});
				setTokenDetails((state) => ({
					...state,
					name,
					symbol,
					decimal,
					totalSupply: fromWei(totalSupply),
				}));
			} catch (err) {
				console.log("err", err);
			}
			setLoading(false);
		})();
	}, [ido, currentChainId, userAccount]);

	return (
		<>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className="project-media">
					<ul className="project-listing">
						<li>
							Token Name <span>{tokenDetails?.name}</span>
						</li>
						<li>
							Token Symbol <span>{tokenDetails?.symbol}</span>
						</li>
						<li>
							Decimals <span>{tokenDetails?.decimal}</span>
						</li>
						<li>
							Address{" "}
							<span>
								{/* <img
									src="assets/images/project/icon.png"
									alt="project"
								/> */}
								{/* {ido?.tokenAddress?.slice(0, 10)} */}
								{/* ... */}
								{ido?.tokenAddress}
							</span>
						</li>
						<li>
							Total Supply{" "}
							<span>
							{tokenDetails?.totalSupply} {" "}
							{tokenDetails?.symbol}								
							</span>
						</li>
						<li>
							<div
								className="btn-area"
								data-bs-toggle="modal"
								data-bs-target="#exampleModal"
							>
								{/* <a
									className="readon white-shape-small"
									href="#"
								>
									<span className="btn-text">KYC/AVS </span>
									<span className="hover-shape1" />
									<span className="hover-shape2" />
									<span className="hover-shape3" />
								</a> */}
							</div>
							<span>
								<div
									style={{
										marginTop: matches ? "10px" : "-60px",
									}}
								>
									{/* <a
										className="readon white-shape-small"
										href="#"
									>
										<span className="btn-text">Audit </span>
										<span className="hover-shape1" />
										<span className="hover-shape2" />
										<span className="hover-shape3" />
									</a> */}
								</div>
							</span>
						</li>
					</ul>
				</div>
			)}
		</>
	);
};

export default TokenInfo;
