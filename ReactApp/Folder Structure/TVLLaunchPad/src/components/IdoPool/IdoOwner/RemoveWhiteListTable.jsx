import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Wrapper from "components/Wrapper";
import {
	Box,
	InputBase,
	Pagination,
	PaginationItem,
	Stack,
	styled,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { whitelistState } from "redux/reducers/whitelistSlice";
import { getAllWhiteList } from "redux/actions/whiteListAction";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "components/Loader/Loader";
import { idoState } from "redux/reducers/idoSlice";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: 15,
	backgroundColor: "#000",

	marginLeft: 0,
	width: "50%",
	// [theme.breakpoints.up('sm')]: {
	//   marginLeft: theme.spacing(1),
	//   width: 'auto',
	// },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: "2px",
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const columns = [
	{ id: "address", label: "Address", minWidth: 500 },
	{ id: "status", label: "Status", minWidth: 10 },
];

const RemoveWhiteListTable = () => {
	const { pageNo, data, totalPages, count, loading } =
		useSelector(whitelistState);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { ido, userAccount } = useSelector(idoState);

	// const params = useLocation();

	//local state
	const [search, setSearch] = useState();

	const handlepageChange = useCallback(
		(event, item) => {
			let pageno;
			if (item.type === "next") {
				pageno = pageNo + 1;
			} else if (item.type === "previous") {
				pageno = pageNo - 1;
			} else {
				pageno = item.page;
			}
			dispatch(
				getAllWhiteList({
					pageNo: pageno,
					status: "remove",
				})
			);
		},
		[pageNo, dispatch]
	);

	// useEffect(() => {
	// 	if (!params.state) return;
	// 	dispatch(setIdoAction({ ...params.state }));
	// }, [dispatch, params.state, currentChainId, userAccount]);

	useEffect(() => {
		if (
			!ido?.whiteList ||
			(!ido?.isWhiteListVisible && ido?.ownerAddress !== userAccount)
		) {
			return navigate("/ido-details");
		}
		dispatch(
			getAllWhiteList({
				status: "remove",
			})
		);
	}, []);

	useEffect(() => {
		if (search === undefined) return;

		console.log("calls");
		const timer = setTimeout(() => {
			dispatch(
				getAllWhiteList({
					status: "remove",
					search: search,
				})
			);
		}, 800);

		return () => clearTimeout(timer);
	}, [search]);

	return (
		<Wrapper>
			{loading && <Loader />}
			<div className="gamfi-breadcrumbs-section">
				<div className="container">
					<div className="row">
						<div className="col-lg-5">
							<div className="breadcrumbs-area sec-heading">
								<div
									style={{ position: "relative" }}
									className="sub-inner mb-15"
								>
									<Link
										className="breadcrumbs-link"
										to="/ido-details"
									>
										Ido-Details
									</Link>
									<span className="sub-title">
										Removed Whitelisted-user
									</span>
									<img
										className="heading-left-image"
										src="assets/images/icons/steps.png"
										alt="Steps-Image"
									/>
									{/* <Box
												position="absolute"
												right="100px"
												display="flex"
												top="45px"
												alignItems="center"
											>
												<Link to="/projects-grid">
													<i
														style={{
															fontSize: "30px",
															color: "#F0B600",
														}}
														className="fas fa-th"
													></i>
												</Link>
												<Link to="/projects-list">
													<i
														style={{
															fontSize: "30px",
															marginLeft: "20px",
														}}
														className="fas fa-list"
													></i>
												</Link>
											</Box> */}
								</div>
								<h2 className="title mb-0">
									Removed Whitelisted User
								</h2>
							</div>
						</div>
						<div className="col-lg-7 breadcrumbs-form md-mt-40">
							<form onSubmit={Search}>
								<input
									type="text"
									id="Search"
									name="search"
									placeholder="Search by name, token, address"
									value={search}
									onInput={(e) => setSearch(e.target.value)}
								/>
								<span className="submit">
									<i
										className="icon-search"
										onClick={Search}
									/>
									<input type="submit" />
								</span>
							</form>
							{/* <div className="btn-area">
										<Link to="/calendar">
											<a className="readon black-shape">
												<i className="icon-calendar" />
												<span className="btn-text">
													Calendar
												</span>
												<span className="hover-shape1" />
												<span className="hover-shape2" />
												<span className="hover-shape3" />
											</a>
										</Link>
									</div> */}
						</div>
					</div>
				</div>
			</div>
			<Box
				display="flex"
				justifyContent="space-around"
				sx={{ marginY: "5%" }}
			>
				<Box>
					{/* <Box sx={{ flexGrow: 1 }}>
						<AppBar
							position="static"
							sx={{ background: "#76757f73" }}
						>
							<Toolbar>
								<IconButton
									size="large"
									edge="start"
									color="inherit"
									aria-label="open drawer"
									sx={{ mr: 2 }}
								></IconButton>
								<Typography
									variant="h6"
									noWrap
									component="div"
									sx={{
										flexGrow: 1,
										display: { xs: "none", sm: "block" },
									}}
								>
									Whitelisted user
								</Typography>
								<Search>
									<SearchIconWrapper>
										<SearchIcon />
									</SearchIconWrapper>
									<StyledInputBase
										placeholder="Search…"
										inputProps={{ "aria-label": "search" }}
										onChange={(e) =>
											setSearch(e.target.value)
										}
									/>
								</Search>
							</Toolbar>
						</AppBar>
					</Box> */}
					<Paper
						sx={{
							width: "100%",
							overflowX: "hidden",
							background: "#1d1d21",
						}}
					>
						<TableContainer
							sx={{
								maxHeight: 700,
								width: "700px",
								overflowX: "hidden",
							}}
						>
							<Table stickyHeader aria-label="sticky table">
								<TableHead sx={{ background: "#76757f" }}>
									<TableRow sx={{ background: "#76757f" }}>
										{columns.map((column) => (
											<TableCell
												sx={{ background: "#76757f" }}
												key={column.id}
												align={column.align}
												style={{
													minWidth: column.minWidth,
												}}
											>
												{column.label}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{data.map((row) => {
										return (
											<TableRow
												hover
												role="checkbox"
												tabIndex={-1}
												key={row.code}
											>
												{columns.map((column) => {
													const value =
														row[column.id];
													return (
														<TableCell
															key={column.id}
															align={column.align}
														>
															{column.format &&
															typeof value ===
																"number"
																? column.format(
																		value
																  )
																: value}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
					<Stack spacing={2}>
						<Pagination
							page={pageNo}
							count={totalPages}
							renderItem={(item) => {
								return (
									<PaginationItem
										slots={{
											previous: ArrowBackIcon,
											next: ArrowForwardIcon,
										}}
										{...item}
										onClick={(event) => {
											handlepageChange(event, item);
										}}
										selected={pageNo === item.page}
									/>
								);
							}}
						/>
					</Stack>
				</Box>
			</Box>
		</Wrapper>
	);
};

export default RemoveWhiteListTable;
