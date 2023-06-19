import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog, setValue }) => {
	const navigate = useNavigate();
	const routeChange = () => {
		navigate("/blog-detail", {
			state: {
				...blog,
			},
		});
	};
	const search = (search) => {
		setValue(search);
	};
	return (
		<div className="col-md-4 pb-40">
			<div
				className="Latest_Articles_Card wow fadeInUp"
				data-wow-delay="0.2s"
				data-wow-duration="0.4s"
			>
				<div className="Article_Img">
					<LazyLoadImage
						alt={blog?.title}
						className="img-fluid"
						src={blog?.imageUrl}
						effect="blur"
					/>

					{/* <img src={blog?.image} alt="img" className="img-fluid" /> */}
				</div>
				<div className="Article_Details">
					<h2
					// onClick={() => search(blog?.category?.name)}
					>
						{blog?.category?.name?.toUpperCase()}
						<span>
							&nbsp; . &nbsp;
							{moment(blog.createdAt).format("DD MMMM, YYYY")}
						</span>
					</h2>
					<h3>
						<a>{blog?.title}</a>
					</h3>
					<p>{blog?.description?.slice(0, 120)}</p>
					<span
						onClick={routeChange}
						style={{
							cursor: "pointer",
						}}
					>
						<span>
							<img src="assets/images/icons/munis.svg" alt="" />
						</span>{" "}
						READ MORE
					</span>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
