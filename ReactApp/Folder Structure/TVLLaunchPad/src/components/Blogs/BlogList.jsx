import { Box } from "@mui/material";
import Loader from "components/Loader/Loader";
import ScrollToTop from "components/ScrollToTop";
import Wrapper from "components/Wrapper";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBlogsActions } from "redux/actions/blogAction";
import { blogState } from "redux/reducers";
import { clearBlogSearch } from "redux/reducers/blogSlice";
import { scrollToTopFun } from "utils";
import BlogCard from "./BlogCard";

const BlogList = () => {
	const { blogs, loading, pageNo, totalpages, blogSearch } =
		useSelector(blogState);
	const dispatch = useDispatch();

	//state
	const [search, setSearch] = useState(null);

	const getBlogs = useCallback(
		(pageno = 1, value) => {
			const payload = {
				search: value,
				pageno,
			};
			dispatch(getBlogsActions(payload));
		},
		[dispatch]
	);

	useEffect(() => {
		scrollToTopFun();
	}, [blogs]);

	//previospage
	const previosPage = useCallback(() => {
		pageNo - 1 >= 1 && getBlogs(pageNo - 1);
	}, [pageNo, getBlogs]);

	//nextpage
	const nextPage = useCallback(() => {
		pageNo + 1 <= totalpages && getBlogs(pageNo + 1);
	}, [pageNo, getBlogs]);

	useEffect(() => {
		getBlogs(1, blogSearch);
	}, []);

	const resetSearch = () => {
		dispatch(clearBlogSearch());
		setSearch("");
	};
	console.log("search", search);
	useEffect(() => {
		console.log("hear");
		if (search === null) return;
		if (search === "") {
			getBlogs(1, "");
			return;
		}
		const timer = setTimeout(() => {
			getBlogs(1, search);
		}, 400);

		return () => clearTimeout(timer);
	}, [search]);

	return (
		<>
			{loading && <Loader />}
			<Wrapper>
				<Box>
					<div className="gamfi-breadcrumbs-section">
						<div className="container">
							<div className="row">
								<div className="col-lg-5">
									<div className="breadcrumbs-area sec-heading">
										<div className="sub-inner mb-15">
											<Link
												className="breadcrumbs-link"
												to="/"
											>
												HOME
											</Link>
											<span className="sub-title">
												Blogs
											</span>
											<img
												className="heading-left-image"
												src="assets/images/icons/steps.png"
												alt="Steps-Image"
											/>
										</div>
										<h2 className="title mb-0">
											Latest Blogs
										</h2>
									</div>
								</div>
								<div className="col-lg-7 breadcrumbs-form md-pt-30">
									<form className="m-0">
										<input
											type="text"
											id="Search"
											name="search"
											onChange={(e) =>
												setSearch(e.target.value)
											}
											placeholder="Search by articles , categories"
										/>
										<span className="submit">
											<i className="icon-search" />
											<input type="submit" />
										</span>
									</form>
									<div
										className="btn-area"
										style={{
											marginLeft: "5px",
											cursor: "pointer",
										}}
									>
										<span onClick={resetSearch}>
											<a className="readon black-shape">
												<span className="btn-text">
													Reset Search
												</span>
												<span className="hover-shape1" />
												<span className="hover-shape2" />
												<span className="hover-shape3" />
											</a>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="Latest_Articles_Sect">
						<div className="container">
							<div className="row">
								{blogs?.map((blog, index) => (
									<BlogCard
										setValue={setSearch}
										blog={blog}
										key={index}
									/>
								))}
								{blogs?.length <= 0 && (
									<h1 className="text-center">
										No Blogs Founds
									</h1>
								)}
							</div>
							<div className="gamfi-navigation text-center mt-10">
								<ul>
									{blogs?.length > 0 && (
										<ul>
											<li>
												<a onClick={previosPage}>
													<i className="icon-Vector" />
												</a>
											</li>
											{[...Array(totalpages).keys()].map(
												(pg, index) => (
													<li key={index}>
														<a
															className={`${
																pageNo ===
																pg + 1
																	? "active"
																	: ""
															}`}
															onClick={() =>
																getBlogs(pg + 1)
															}
														>
															{pg + 1}
														</a>
													</li>
												)
											)}
											<li>
												<a onClick={nextPage}>
													<i className="icon-arrow_right" />
												</a>
											</li>
										</ul>
									)}
								</ul>
							</div>
						</div>
					</div>
				</Box>
			</Wrapper>
		</>
	);
};

export default BlogList;
