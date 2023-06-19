import { Box } from "@mui/material";
import Loader from "components/Loader/Loader";
import ScrollToTop from "components/ScrollToTop";
import Wrapper from "components/Wrapper";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { blogState } from "redux/reducers";
import Categorys from "./Categorys";

const BlogDetails = () => {
	const params = useLocation();
	const { blogs, loading } = useSelector(blogState);

	const [blog, setBlog] = useState();

	useEffect(() => {
		if (!params.state) return;
		console.log("blog", params);
		setBlog({ ...params.state });
	}, [params.state]);

	const onClickBlogHandler = (blog) => {
		setBlog(blog);
	};

	return (
		<Wrapper>
			<Box>
				{loading && <Loader />}
				<ScrollToTop />

				{/* <div
					className="gamfi-breadcrumbs-section blog-breadcrumbs"
					style={{
						backgroundRepeat: "no-repeat",
						background: `url(${blog?.imageUrl})`,
					}}
				> */}
				<img
					src={blog?.imageUrl}
					style={{
						width: "100%",
						height: "400px",
						objectFit: "cover",
					}}
				/>
				<div className="container" style={{ zIndex: "999" }}>
					<div className="sec-heading">
						<h1>
							{blog?.title}

							{/* <img
								src="assets/images/blog/banner-image.png"
								alt="Banner"
							/> */}
						</h1>
					</div>
					<div className="row align-items-center">
						<div className="col-lg-7">
							<div className="sub-menu">
								<ul>
									{/* <li>
											<a>
												<img
													src="assets/images/blog/banner-icon.png"
													alt="Banner"
												/>
												Robert DEO
											</a>
										</li> */}
									<li>
										<a>
											<i className="icon-calendar" />
											{moment(blog?.createdAt).format(
												"DD MMMM, YYYY"
											)}
										</a>
									</li>
								</ul>
							</div>
						</div>
						{/* <div className="col-lg-5 breadcrumbs-form md-mt-10">
								<div
									className="breadcrumbs-social ml-30 md-ml-0"
									data-bs-toggle="modal"
									data-bs-target="#shareIocns"
								>
									<a href="#">
										<i className="icon-share" /> Share
									</a>
								</div>
							</div> */}
					</div>
				</div>
				{/* </div> */}
				<div className="blog-detail-conent pb-80 md-pb-20">
					<div className="container">
						<div className="row">
							<div className="col-lg-8 col-md-12">
								<div className="blog-area">
									<div className="blog-description">
										<p className="des white-color mb-30">
											{blog?.highlightContent}
										</p>
										<p className="mb-45">
											{blog?.description}
										</p>
										<div className="des-heading">
											<h4 className="mb-15">
												{blog?.feature}
											</h4>
											{JSON.parse(
												blog?.featureContent || "[]"
											)?.map((ele, index) => (
												<p
													className={`${
														blog?.featureContent
															.length ===
														index + 1
															? "mb-40"
															: ""
													}`}
												>
													{ele}
												</p>
											))}
										</div>
										<div className="blockquote mb-45">
											<p className="des-active">
												{blog?.quote}
											</p>
										</div>
									</div>
									{/* <div className="Tokenomics-item mb-55">
									<h4 className="mb-20">Tokenomics</h4>
									<div className="project-service d-flex align-items-center">
										<div className="project-image">
											<img
												src="assets/images/project/explore-image.png"
												alt="Project-image"
											/>
										</div>
										<div className="project-content d-flex">
											<div className="project-price mr-65">
												<div className="project-sale darkslateblue">
													<span>Marketing</span>
													<h5>18.00%</h5>
												</div>
												<div className="project-sale cyan">
													<span>Team</span>
													<h5>7.5%</h5>
												</div>
												<div className="project-sale dodgerBlue">
													<span>Advisors</span>
													<h5>10.00%</h5>
												</div>
												<div className="project-sale turquoise">
													<span>Ecosystem</span>
													<h5>16.33%</h5>
												</div>
											</div>
											<div className="project-price">
												<div className="project-sale springGreen">
													<span>Private Sale</span>
													<h5>30.00%</h5>
												</div>
												<div className="project-sale darkturquoise">
													<span>Staking</span>
													<h5>9.50%</h5>
												</div>
												<div className="project-sale turquoises">
													<span>Liquidity</span>
													<h5>12.00%</h5>
												</div>
											</div>
										</div>
									</div>
								</div> */}
									<div className="igo-blog">
										{blog?.igoFacts && (
											<>
												<h4>IGO Facts</h4>
												<p className="mb-20">
													{blog.igoFacts}
												</p>
											</>
										)}
										<div className="igo-menu mb-45">
											<ul className="igo-list">
												<li>
													<span>
														Name: {blog?.tokenName}
													</span>
												</li>
												<li>
													<span>
														Token Symbol:{" "}
														{blog?.tokenSymbol}
													</span>
												</li>
												<li>
													<span>
														Total supply:{" "}
														{blog?.totalSupply}
													</span>
												</li>
												<li>
													<span>
														Hardcap: {blog?.hardCap}
													</span>
												</li>
												<li>
													<span>
														IGO Date:{" "}
														{moment(
															blog?.igoDate
														).fromNow()}
													</span>
												</li>
												<li>
													<span>
														Allocation:
														{/* $400K (including
													5% success fee) */}
														{blog?.allocation}
													</span>
												</li>
												<li>
													<span>
														IGO Price: {blog?.price}
													</span>
												</li>
												{/* <li>
													<span>
														Vesting: 20% at TGE,
														then 13,33% every month
														for 6 months
													</span>
												</li> */}
											</ul>
										</div>
									</div>
									<div className="about-blog">
										{blog?.aboutIgo && (
											<>
												<h4 className="mb-15">
													About {blog?.igo?.name}
												</h4>
												<p className="mb-45">
													{blog?.aboutIgo}
												</p>
											</>
										)}
										{/* <h4 className="mb-15">About {blog?.igo?.name}</h4>
									<p className="mb-45">
										Randomised words which don't look even
										slightly believable. If you are going to
										use a passage
										<br /> of Lorem Ipsum, you need to be
										sure there isn't anything embarrassing.
										<br /> making it over 2000 years old.
									</p> */}
										{/* <div className="about-menu mb-80">
										<div className="about-list">
											<ul className="about-listing">
												<li>
													<a href="#">igo</a>
												</li>
												<li>
													<a href="#">crypto</a>
												</li>
												<li>
													<a href="#">marketplace</a>
												</li>
												<li>
													<a href="#">trade</a>
												</li>
											</ul>
										</div>
										<div className="breadcrumbs-form md-mt-10">
											<div
												className="breadcrumbs-social about-breadcrumbs ml-30 md-ml-0"
												data-bs-toggle="modal"
												data-bs-target="#shareIocns"
											>
												<a href="#">
													<i className="icon-share" />{" "}
													Share
												</a>
											</div>
										</div>
									</div>
									<div className="blog-contact mb-75">
										<div className="previous-item">
											<div className="previous-image">
												<img
													src="assets/images/blog/blog-previous.png"
													alt="Blog-previous"
												/>
											</div>
											<div className="previous-text">
												<span>Previous</span>
												<h5>
													<a href="#">
														How to Create Your 1st
														<br /> Crypto NFTs{" "}
														<img
															src="assets/images/blog/recent-title.png"
															alt="Banner"
														/>
													</a>
												</h5>
											</div>
										</div>
										<div className="next-item">
											<div className="next-text">
												<span>Next</span>
												<h5>
													<a href="#">
														The new token is
														<br /> launching this
														planet
													</a>
												</h5>
											</div>
											<div className="previous-image">
												<img
													src="assets/images/blog/blog-next.png"
													alt="Blog-previous"
												/>
											</div>
										</div>
									</div> */}
									</div>
									{/* <CommentProvider>
										<Comment blog={blog} />
									</CommentProvider> */}
								</div>
							</div>
							<div className="col-lg-4 col-md-12">
								<div className="categories-area">
									<Categorys />
									<div className="post-item mb-40">
										<div className="post-shade">
											<h4 className="blog-title mb-20">
												Recent Posts{" "}
												<img
													src="assets/images/project/menu-image.png"
													alt="project"
												/>
											</h4>
										</div>
										{blogs
											?.slice(0, 3)
											?.map((ele, index) => (
												<div
													className="recent-content"
													key={index}
												>
													<div
														className="recent-image"
														style={{
															width: "110px",
															height: "100px",
														}}
													>
														<img
															src={ele?.imageUrl}
															alt="Recent"
															// height={100}
															// width={110}
															style={{
																objectFit:
																	"cover",
																height: "100px",
																width: "100px",
															}}
														/>
													</div>
													<div className="recent-text">
														<span>
															{moment(
																ele?.createdAt
															).format(
																"DD MMMM, YYYY"
															)}
														</span>
														<h5>
															<div
																style={{
																	cursor: "pointer",
																}}
																onClick={() =>
																	onClickBlogHandler(
																		ele
																	)
																}
															>
																{ele.title}
															</div>
														</h5>
													</div>
												</div>
											))}
									</div>
									<div className="tag-menu">
										{/* <div className="post-shade">
										<h4 className="blog-title mb-30">
											Tags{" "}
											<img
												src="assets/images/project/menu-image.png"
												alt="project"
											/>
										</h4>
									</div> */}
										{/* <div className="menu-list">
										<ul>
											<li>
												<a href="#">igo</a>
											</li>
											<li>
												<a href="#">crypto</a>
											</li>
											<li>
												<a href="#">marketplace</a>
											</li>
										</ul>
										<ul>
											<li>
												<a href="#">launchpad</a>
											</li>
											<li>
												<a href="#">ido</a>
											</li>
											<li>
												<a href="#">web 3.0</a>
											</li>
										</ul>
									</div> */}
									</div>
								</div>
								{/* <div className="newsletter-item active-shape hover-shape-inner">
								<h4 className="title mb-15">
									GET ALERTS 💌 FOR NEW IGOs &amp; IDOs
								</h4>
								<div className="dsc mb-44">
									Sign up for newsletter to get more IGO/IDO
									News and Updates
								</div>
								<div className="newsletter-link">
									<form>
										<input
											type="email"
											name="email"
											placeholder="Email Address"
										/>
										<div className="newsletter-btn text-center black-shape-big">
											<input
												type="submit"
												name="submit"
												defaultValue="Subscribe"
											/>
											<span className="hover-shape1" />
											<span className="hover-shape2" />
											<span className="hover-shape3" />
										</div>
									</form>
								</div>
								<span className="border-shadow shadow-1" />
								<span className="border-shadow shadow-2" />
								<span className="border-shadow shadow-3" />
								<span className="border-shadow shadow-4" />
								<span className="hover-shape-bg hover_shape1" />
								<span className="hover-shape-bg hover_shape2" />
								<span className="hover-shape-bg hover_shape3" />
							</div> */}
							</div>
						</div>
					</div>
				</div>
			</Box>
		</Wrapper>
	);
};

export default BlogDetails;
