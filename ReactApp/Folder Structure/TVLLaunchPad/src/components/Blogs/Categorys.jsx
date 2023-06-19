import Loader from "components/Loader/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBlogsActions, getCategorysActions } from "redux/actions/blogAction";
import { blogState } from "redux/reducers";

const Categorys = () => {
	const { loading, categorys } = useSelector(blogState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (search === "") {
			dispatch(
				getCategorysActions({
					search,
				})
			);
			return;
		}

		const timer = setTimeout(() => {
			dispatch(
				getCategorysActions({
					search,
				})
			);
		}, 800);

		return () => clearTimeout(timer);
	}, [search]);

	const handleSearch = async (e) => {
		e.preventDefault();
	};

	const onCategoryClickHandler = async (category) => {
		const payload = {
			search: category,
			pageno: 1,
		};
		await dispatch(getBlogsActions(payload));
		navigate("/blog");
	};
	return (
		<>
			{loading && <Loader />}
			<div className="categories-item">
				<form
					className="catergories-form mb-35"
					onSubmit={handleSearch}
				>
					<input
						type="text"
						id="Search"
						name="search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="search here ..."
					/>
					<span className="submit">
						<a href="#">
							<i className="icon-search" />
						</a>
					</span>
				</form>
				<div className="categories-summary">
					<h4 className="blog-title mb-15">
						Categories{" "}
						<img
							src="assets/images/project/menu-image.png"
							alt="project"
						/>
					</h4>
					<ul className="list">
						{categorys.map((ele) => (
							<li
								style={{
									cursor: "pointer",
								}}
								onClick={() =>
									onCategoryClickHandler(ele?.name)
								}
							>
								<a>{ele?.name}</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default Categorys;
