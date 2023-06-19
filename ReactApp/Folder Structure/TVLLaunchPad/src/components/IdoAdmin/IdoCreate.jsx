import { Box } from "@mui/material";
import ScrollToTop from "components/ScrollToTop";
import Wrapper from "components/Wrapper";
import { tokenUrls } from "constant";
import { useIdoForm } from "hooks/useIdoHook";

const IdoCreate = () => {
	const { formik, handleChangeWhitelist, handleBlockchainChange, approveIdoTokenAndTransfer, createIdo, buyTokens, checkIdopresalTokenBalance, climeToken,withdrawRaisedFund } =
		useIdoForm();
	return (
		<>
			<ScrollToTop />
			<Wrapper>
				<Box>
					<div className="gamfi-breadcrumbs-section">
						<div className="container">
							<div className="apply-heading text-center">
								<h2 className="mb-0">Apply for IGO</h2>
								<button onClick={approveIdoTokenAndTransfer}>approveTtoken</button>
								<button onClick={createIdo}>createIdo</button>
								<button onClick={buyTokens}>buyTokens</button>
								<button onClick={checkIdopresalTokenBalance}>checkIdopresaleToken balance</button>
								<button onClick={climeToken}>climeToken</button>
								<button onClick={withdrawRaisedFund}>WidrowFund</button>
							</div>
						</div>
					</div>

					<div className="gamfi-form-content pt-65 md-pt-45 pb-120 md-pb-80">
						<div className="container">
							<div className="address-form">
								<form
									noValidate
									onSubmit={formik.handleSubmit}
								// autocomplete="off"
								>
									<div>
										<h4 className="mb-0">
											1. Project Details
										</h4>
										<p className="text-white">
											Please complete the required project
											details
										</p>
									</div>
									<div className="input-button">
										<input
											type="text"
											id="tokenAddress"
											placeholder="Token Address"
											required={true}
											name="tokenAddress"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.tokenAddress}
										/>
										<label
											htmlFor="token-address"
											className="text-white"
										>
											Enter your Token Address *
										</label>
										<div className="form-text text-white">
											{Boolean(
												formik.touched.tokenAddress &&
												formik.errors.tokenAddress
											) ? (
												<span className="form-text text-danger">
													{formik.errors.tokenAddress}
												</span>
											) : (
												"The token information will be fetched from the relevant blockchain."
											)}
										</div>
									</div>

									<div className="row">
										<div className="input-button col-md-9">
											<input
												type="text"
												id="tokenName"
												placeholder="tokenName"
												required={true}
												name="tokenName"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.tokenName}
											/>
											<label
												htmlFor="token-address"
												className="text-white"
											>
												Enter tokenName *
											</label>
											<div className="form-text text-white">
												{Boolean(
													formik.touched.tokenName &&
													formik.errors.tokenName
												) && (
														<span className="form-text text-danger">
															{
																formik.errors
																	.tokenName
															}
														</span>
													)}
											</div>
										</div>

										<div className="input-button col-md-3">
											<input
												type="text"
												id="tokenSymbol"
												required={true}
												name="tokenSymbol"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={
													formik.values.tokenSymbol
												}
											/>
											<label
												htmlFor="tokenSymbol"
												className="label-14px-left text-white"
											>
												Symbol *
											</label>
											<div className="form-text text-white">
												{Boolean(
													formik.touched
														.tokenSymbol &&
													formik.errors
														.tokenSymbol
												) && (
														<span className="form-text text-danger">
															{
																formik.errors
																	.tokenSymbol
															}
														</span>
													)}
											</div>
										</div>
									</div>
									<div className="input-button">
										<input
											type="number"
											className="mb-0"
											id="tokenAllocation"
											name="tokenAllocation"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={
												formik.values.tokenAllocation
											}
										/>
										<label
											htmlFor="short-desc"
											className="text-white"
										>
											TokenAllowcation *
										</label>
										<div className="form-text text-white">
											{Boolean(
												formik.touched
													.tokenAllocation &&
												formik.errors
													.tokenAllocation
											) ? (
												<span className="form-text text-danger">
													{
														formik.errors
															.tokenAllocation
													}
												</span>
											) : (
												"Brief TokenAllowcation of your project."
											)}
										</div>
									</div>

									<div className="radio-button">
										<h5 className="mt-35 text-white">
											Blockchain/Platform *
										</h5>
										<div className="row">
											{tokenUrls.map((network, index) => (
												<div
													className="col-md-6"
													key={index}
												>
													<div
														onClick={(e) => {
															console.log(
																"formik.values",
																formik.values
																	.chain
															);
															handleBlockchainChange(
																network.chainId
															);
														}}
														className="input-list"
													>
														<input
															type="radio"
															checked={
																formik.values
																	.chain ===
																	network.name
																	? true
																	: false
															}
															value={
																network.chainId
															}
															name="chain"
															// onChange={handleBlockchainChange}
															onBlur={
																handleBlockchainChange
															}
														/>
														<label htmlFor="binance">
															{network.name}
														</label>
														<div className="check" />
													</div>
												</div>
											))}
										</div>
										<div className="form-text text-white">
											{Boolean(
												formik.touched.chain &&
												formik.errors.chain
											) && (
													<span className="form-text text-danger">
														{formik.errors.chain}
													</span>
												)}
										</div>
									</div>

									<div className="input-button">
										<input
											type="number"
											id="tokenRate"
											required={true}
											name="tokenRate"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.tokenRate}
										/>
										<label
											htmlFor="token-rate"
											className="text-white"
										>
											Token rate *
										</label>
										<div className="form-text text-white">
											{Boolean(
												formik.touched.tokenRate &&
												formik.errors.tokenRate
											) && (
													<span className="form-text text-danger">
														{formik.errors.tokenRate}
													</span>
												)}
										</div>
									</div>
									<div className="row">
										<div className="input-button col-md-6">
											<input
												type="number"
												id="softCap"
												required={true}
												name="softCap"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.softCap}
											/>
											<label
												htmlFor="softcap"
												className="label-14px-left text-white"
											>
												SoftCap{" "}
												<span>
													({formik.values.chain})
												</span>{" "}
												*
											</label>
											<div className="form-text text-white">
												<div className="form-text text-white">
													{Boolean(
														formik.touched
															.softCap &&
														formik.errors
															.softCap
													) ? (
														<span className="form-text text-danger">
															{
																formik.errors
																	.softCap
															}
														</span>
													) : (
														"Softcap must be >=50% of Hardcap!"
													)}
												</div>
											</div>
										</div>
										<div className="input-button col-md-6">
											<input
												type="number"
												id="hardCap"
												required={true}
												name="hardCap"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.hardCap}
											/>
											<label
												htmlFor="hardcap"
												className="label-14px-left text-white"
											>
												HardCap{" "}
												<span>
													({formik.values.chain})
												</span>{" "}
												*
											</label>
											<div className="form-text text-white">
												{Boolean(
													formik.touched.hardCap &&
													formik.errors.hardCap
												) && (
														<span className="form-text text-danger">
															{formik.errors.hardCap}
														</span>
													)}
											</div>
										</div>
										<div className="input-button col-md-6">
											<input
												type="number"
												id="minBuyPerUser"
												required={true}
												name="minBuyPerUser"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={
													formik.values.minBuyPerUser
												}
											/>
											<label
												htmlFor="minBuyPerUser"
												className="label-14px-left text-white"
											>
												Min. Buy{" "}
												<span>
													({formik.values.chain})
												</span>{" "}
												*
											</label>
											<div className="form-text text-white">
												{Boolean(
													formik.touched
														.minBuyPerUser &&
													formik.errors
														.minBuyPerUser
												) && (
														<span className="form-text text-danger">
															{
																formik.errors
																	.minBuyPerUser
															}
														</span>
													)}
											</div>
										</div>
										<div className="input-button col-md-6">
											<input
												type="number"
												id="maxBuyPerUser"
												required={true}
												name="maxBuyPerUser"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={
													formik.values.maxBuyPerUser
												}
											/>
											<label
												htmlFor="maxBuyPerUser"
												className="label-14px-left text-white"
											>
												Max. Buy{" "}
												<span>
													({formik.values.chain})
												</span>{" "}
												*
											</label>
											<div className="form-text text-white">
												{Boolean(
													formik.touched
														.maxBuyPerUser &&
													formik.errors
														.maxBuyPerUser
												) && (
														<span className="form-text text-danger">
															{
																formik.errors
																	.maxBuyPerUser
															}
														</span>
													)}
											</div>
										</div>

										<div className="input-button col-md-6">
											<input
												type="datetime-local"
												id="startTime"
												required={true}
												name="startTime"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.startTime}
											/>
											<label
												htmlFor="startTime"
												className="label-14px-left text-white"
											>
												IDO Start Date &amp; Time *
											</label>
											<div className="form-text text-white">
												{Boolean(
													formik.touched.startTime &&
													formik.errors.startTime
												) && (
														<span className="form-text text-danger">
															{
																formik.errors
																	.startTime
															}
														</span>
													)}
											</div>
										</div>
										<div className="input-button col-md-6">
											<input
												type="datetime-local"
												id="endTime"
												required={true}
												name="endTime"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.endTime}
											/>
											<label
												htmlFor="endTime"
												className="label-14px-left text-white"
											>
												IDO End Date &amp; Time *
											</label>
											<div className="form-text text-white">
												{Boolean(
													formik.touched.endTime &&
													formik.errors.endTime
												) && (
														<span className="form-text text-danger">
															{formik.errors.endTime}
														</span>
													)}
											</div>
										</div>
									</div>
									<div className="radio-button">
										<h5 className="mt-34 mb-22 text-white">
											Whitelist *
										</h5>
										<div className="row">
											<div className="col-md-6">
												<div
													className="input-list"
													onClick={() =>
														handleChangeWhitelist(
															true
														)
													}
												>
													<input
														type="radio"
														id="enable"
														value={true}
														name="useWhiteList"
														// onClick={handleChangeWhitelist}
														onBlur={
															formik.handleBlur
														}
													/>
													<label
														htmlFor="enable"
														className="text-white"
													>
														Enable
													</label>
													<div className="check" />
												</div>
											</div>
											<div className="col-md-6">
												<div
													className="input-list"
													onClick={() =>
														handleChangeWhitelist(
															false
														)
													}
												>
													<input
														type="radio"
														id="disable"
														value={false}
														name="useWhiteList"
														onBlur={
															formik.handleBlur
														}
													/>
													<label
														htmlFor="disable"
														className="text-white"
													>
														Disable
													</label>

													<div className="check" />
												</div>
											</div>
										</div>
										<div className="form-text text-white">
											{Boolean(
												formik.touched.useWhiteList &&
												formik.errors.useWhiteList
											) && (
													<span className="form-text text-danger">
														{formik.errors.useWhiteList}
													</span>
												)}
										</div>
									</div>
									<div className="mt-4">
										<h4 className="mb-0">
											3. Social Media Networks:
										</h4>
										<p className="text-white">
											Please indicate your different
											social media networks
										</p>
									</div>
									<div className="input-button group">
										<i className="icon-telegram" />
										<input
											type="text"
											className="enter"
											id="telegram"
											placeholder="Enter telegram URL"
											name="telegramUrl"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.telegramUrl}
										/>
										<label
											htmlFor="telegram"
											className="text-white"
										>
											Telegram URL
										</label>
										<div className="form-text text-white">
											{Boolean(
												formik.touched.telegramUrl &&
												formik.errors.telegramUrl
											) && (
													<span className="form-text text-danger">
														{formik.errors.telegramUrl}
													</span>
												)}
										</div>
									</div>
									<div className="input-button">
										<i className="icon-twitter" />
										<input
											type="text"
											className="enter"
											placeholder="Enter Twitter URL"
											id="twitter"
											name="twitterUrl"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.twitterUrl}
										/>
										<label
											htmlFor="twitter"
											className="text-white"
										>
											Twitter URL
										</label>
										<div className="form-text text-white">
											{Boolean(
												formik.touched.twitterUrl &&
												formik.errors.twitterUrl
											) && (
													<span className="form-text text-danger">
														{formik.errors.twitterUrl}
													</span>
												)}
										</div>
									</div>
									<div className="input-button">
										<i className="icon-discord" />
										<input
											type="text"
											className="enter"
											id="discord"
											placeholder="Enter discord URL"
											name="discordUrl"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.discordUrl}
										/>
										<label
											htmlFor="discord"
											className="text-white"
										>
											Discord URL
										</label>
										<div className="form-text text-white">
											{Boolean(
												formik.touched.discordUrl &&
												formik.errors.discordUrl
											) && (
													<span className="form-text text-danger">
														{formik.errors.discordUrl}
													</span>
												)}
										</div>
									</div>
									<div className="input-button">
										<i className="icon-link" />
										<input
											type="text"
											className="enter"
											placeholder="Enter URL"
											id="otherUrl"
											name="otherUrl"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.otherUrl}
										/>
										<label
											htmlFor="otherUrl"
											className="text-white"
										>
											otherUrl
										</label>
										<div className="form-text text-white">
											{Boolean(
												formik.touched.otherUrl &&
												formik.errors.otherUrl
											) && (
													<span className="form-text text-danger">
														{formik.errors.otherUrl}
													</span>
												)}
										</div>
									</div>
									<div className="mt-4">
										<h4 className="mb-0">
											4. Submission Fee
										</h4>
										<p className="text-white">
											Cost to submit project
										</p>
										{tokenUrls.map((network, index) => (
											<>
												{network.name ===
													formik.values.chain && (
														<p
															key={index}
															className="text-white"
														>
															0.65 {network.currency}{" "}
															+ 1% of Tokens Sold + 2%
															of BNB Raised
														</p>
													)}
											</>
										))}
									</div>
									<div className="project-btn-area text-center black-shape-big mt-40">
										<input
											type="submit"
											name="submit"
											defaultValue="Submit IGO Project"
										/>
										<span className="hover-shape1" />
										<span className="hover-shape2" />
										<span className="hover-shape3" />
									</div>
								</form>
							</div>
						</div>
					</div>
				</Box>
			</Wrapper>
		</>
	);
};

export default IdoCreate;
