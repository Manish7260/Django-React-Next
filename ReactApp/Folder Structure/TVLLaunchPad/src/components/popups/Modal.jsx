/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dialog, DialogContent } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { coinBaseWallate, injected, walletconnect } from "connection";

const Modal = ({ setOpen, open }) => {
	const { activate, account } = useWeb3React();
	console.log(account);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<div>
				{/* <Slide direction="up" in={open} mountOnEnter unmountOnExit> */}
				<Dialog
					open={open}
					keepMounted
					onClose={handleClose}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogContent className="dialoge__content__section">
						<div className="ConnectWallet_Card">
							<div className="ConnectWallet_Card_Headings">
								<h2>Connect Wallet</h2>
								<p>
									Please Choose a network &amp; select a
									wallet to connect to this marketplace
								</p>
							</div>
							{/* <div className="ChooseNetwork_Sect">
								<h2>Choose Network</h2>
								<ul id="ChooseNetworkBtns">
									{tokenUrls.map((network, index) => (
										<li
											className="ChooseNetButton"
											key={index}
										>
											<button>
												<span>
													<img
														src={network.logo}
														alt="img"
														className="img-fluid"
													/>
												</span>
												{network.name}
											</button>
										</li>
									))}
								</ul>
							</div> */}
							<div className="ConnectWallet_Content">
								<h2>Connect Wallet</h2>
								<div className="row">
									<div className="col-sm-6">
										<div
											style={{ cursor: "pointer" }}
											onClick={() => {
												setOpen(false);
												activate(injected);

												localStorage.setItem(
													"wallet",
													"meta"
												);
											}}
											className="ConnectWallet_Btn"
										>
											<span>
												<img
													width="20px"
													src="/assets/images/icons/meta-mask.png"
													alt="img"
													className="img-fluid"
												/>
											</span>
											MetaMask
										</div>
										{/* <div
											style={{ cursor: "pointer" }}
											onClick={() => {
												setOpen(false);
												activate(coinBaseWallate);
												localStorage.setItem(
													"wallet",
													"coinbaseWallet"
												);
											}}
											className="ConnectWallet_Btn"
										>
											<span>
												<img
													width="20px"
													src="/assets/images/icons/coinbase.png"
													alt="img"
													className="img-fluid"
												/>
											</span>
											Coinbase
										</div> */}
									</div>
									<div className="col-sm-6">
										<div
											style={{
												cursor: "pointer",
												paddingLeft: "10px",
												paddingRight: "10px",
												fontSize: "15px",
											}}
											onClick={() => {
												setOpen(false);
												activate(coinBaseWallate);
												localStorage.setItem(
													"wallet",
													"coinbaseWallet"
												);
											}}
											className="ConnectWallet_Btn"
										>
											<span
												style={{
													paddingLeft: "15px",
													marginRight: "10px",
												}}
											>
												<img
													width="20px"
													src="/assets/images/icons/coinbase.png"
													alt="img"
													className="img-fluid"
												/>
											</span>
											Coinbase
										</div>
										{/* <div
											style={{ cursor: "pointer" }}
											onClick={() => {
												setOpen(false);
												activate(injected);
												localStorage.setItem(
													"wallet",
													"c"
												);
											}}
											className="ConnectWallet_Btn"
										>
											<span>
												<img
													width="17px"
													src="/assets/images/icons/trust.png"
													alt="img"
													className="img-fluid"
												/>
											</span>
											Trust Wallet
										</div> */}
									</div>
								</div>
								<p>
									By connecting your wallet, you agree to our{" "}
									<a href="#">Terms of Service</a> and our{" "}
									<a href="#">Privacy Policy</a>.
								</p>
							</div>
						</div>

						{/* <div
              style={{
                textAlign: "center",
              }}
            >
              <Typography variant="h1" className={classes.connectWalletHeading}>
                Connect to a wallet
              </Typography>
              <Box
                className={classes.metaMaskUpperLayer}
                onClick={() => {
                  setOpen(false);
                  activate(injected);
                  localStorage.setItem("wallet", "meta");
                }}
              >
                <Typography variant="h1" className={classes.buttonText}>
                  Metamask
                </Typography>
                <div>
                  <img width="25px" src="/image 27.svg" alt="metamask" />
                </div>
              </Box>
              <Box
                className={classes.metaMaskUpperLayer}
                onClick={() => {
                  setOpen(false);
                  activate(c);
                  localStorage.setItem("wallet", "c");
                }}
              >
                <Typography variant="h1" className={classes.buttonText}>
                  Trust wallet
                </Typography>
                <div>
                  <img width="25px" src="/trust.svg" alt="trustwallet" />
                </div>
              </Box>

              <Box
                className={classes.metaMaskUpperLayer}
                onClick={() => {
                  setOpen(false);
                  activate(c);
                  localStorage.setItem("wallet", "c");
                }}
              >
                <Typography variant="h1" className={classes.buttonText}>
                  Wallet Connect
                </Typography>
                <div>
                  <img
                    width="25px"
                    src="/Wallet_connect.png"
                    alt="trustwallet"
                  />
                </div>
              </Box>
              <Box
                className={classes.metaMaskUpperLayer}
                onClick={() => {
                  setOpen(false);
                  activate(c);
                  localStorage.setItem("wallet", "c");
                }}
              >
                <Typography variant="h1" className={classes.buttonText}>
                  Coinbase Wallet
                </Typography>
                <div>
                  <img width="25px" src="/coinbase.png" alt="trustwallet" />
                </div>
              </Box>
            </div> */}
					</DialogContent>
				</Dialog>
				{/* </Slide> */}
			</div>
		</div>
	);
};

export default Modal;
