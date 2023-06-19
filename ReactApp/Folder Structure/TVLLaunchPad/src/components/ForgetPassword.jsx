import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userState } from "redux/reducers";
import * as Yup from "yup";
import Wrapper from "./Wrapper";
import { Box } from "@mui/material";
import Loader from "./Loader/Loader";
import ScrollToTop from "./ScrollToTop";
import { userOtpAction } from "redux/actions/userActions";

const ForgetPassword = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { token, authenticated, loading } = useSelector(userState);

	// console.log("user :>> ", user.attributes);

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().required("email is required"),
		}),
		onSubmit: async (values, helpers) => {
			try {
				await dispatch(userOtpAction({ payload: values, navigate }));
			} catch (err) {
				console.log("err", err);
			}
		},
	});
	return (
		<Wrapper>
			<ScrollToTop />
			<Box>
				{loading && <Loader />}
				<div className="SignUp_SignIn_Form_Sect">
					<div className="SignUp_SignIn_Form_SectBG" />
					<div className="container">
						<div className="SignUp_SignIn_Form_Content">
							<div className="SignUp_SignIn_Form signInForm">
								<h2>Forget Password</h2>
								{/* <h3>
									Inter your email address and password to get
									access your account
								</h3> */}
								<form noValidate onSubmit={formik.handleSubmit}>
									<div
										className="EmailFild"
										style={{
											marginBottom: "23px",
										}}
									>
										<span>Email Address</span>
										<input
											type="email"
											placeholder="Enter your email address"
											name="email"
											value={formik.values.email}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											style={{
												marginBottom: "0px",
											}}
										/>
										{Boolean(
											formik.touched.email &&
												formik.errors.email
										) && (
											<span
												className=" text-danger"
												style={{
													margin: "0px",
													fontSize: "12px",
												}}
											>
												{formik.errors.email}
											</span>
										)}
									</div>

									<div className="project-btn-area text-center black-shape-bigCustom">
										<input
											className="btn_custom"
											type="submit"
											value="Send Otp"
											disabled={loading}
										/>
										<span className="hover-shape1" />
										<span className="hover-shape2" />
										<span className="hover-shape3" />
									</div>
								</form>
								{/* <h4>
									Don’t have an account ?
									<Link to="/signup">
										<a>Sign up now !</a>
									</Link>
								</h4> */}
							</div>
							<div className="singUpformShadow" />
						</div>
					</div>
				</div>
			</Box>
		</Wrapper>
	);
};

export default ForgetPassword;
