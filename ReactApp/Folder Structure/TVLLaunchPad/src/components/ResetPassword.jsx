import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userState } from "redux/reducers";
import * as Yup from "yup";
import Wrapper from "./Wrapper";
import ScrollToTop from "./ScrollToTop";
import { Box } from "@mui/material";
import Loader from "./Loader/Loader";
import { useEffect, useState } from "react";
import {
	userOtpAction,
	userResetPasswordAction,
} from "redux/actions/userActions";
import OtpInput from "./common/OtpInput";

const ResetPassword = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useLocation();

	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");

	useEffect(() => {
		console.log("params.state?.email", params.state?.email);
		setEmail(params.state?.email);
	}, [params.state]);

	const { loading } = useSelector(userState);

	const formik = useFormik({
		initialValues: {
			otp: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: Yup.object({
			password: Yup.string().required("password is required"),
			confirmPassword: Yup.string().oneOf(
				[Yup.ref("password"), null],
				"Password dose not match"
			),
		}),
		onSubmit: async (values, helpers) => {
			try {
				otpValidation(otp);

				const payload = {
					...values,
					email,
					otp,
				};

				await dispatch(userResetPasswordAction({ payload, navigate }));

				// console.log("res", res);

				// navigate("/signin");
			} catch (err) {
				console.log("err.message", err.message);
			}
		},
	});

	const otpValidation = (otp) => {
		console.log("otp?.length", otp?.length, otp);
		if (otp?.length < 6) {
			formik.setFieldError("otp", "Please enter valid otp");
			return;
		}
	};

	const resendOtp = () => {
		dispatch(userOtpAction({ payload: { email } }));
	};

	return (
		<Wrapper>
			<ScrollToTop />
			<Box>
				{loading && <Loader />}
				<div className="SignUp_SignIn_Form_Sect">
					<div className="SignUp_SignIn_Form_SectBG" />
					<div className="container">
						<div className="SignUp_SignIn_Form_Content">
							<div className="SignUp_SignIn_Form">
								<h2>Password Reset</h2>
								<h3>create your new password</h3>
								<form noValidate onSubmit={formik.handleSubmit}>
									<div
										className="FullNameFild"
										style={{
											marginBottom: "23px",
										}}
									>
										<span>ENTER OTP</span>
										<OtpInput
											value={otp}
											onChange={(val) => setOtp(val)}
										/>

										{Boolean(
											formik.touched.otp &&
												formik.errors.otp
										) && (
											<span
												className=" text-danger"
												style={{
													margin: "0px",
													fontSize: "12px",
												}}
											>
												{formik.errors.otp}
											</span>
										)}
									</div>
									<div
										className="EmailFild"
										style={{
											marginBottom: "23px",
										}}
									>
										<span>password</span>
										<input
											type="password"
											placeholder="Enter your password"
											name="password"
											value={formik.values.password}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											style={{
												marginBottom: "0px",
											}}
										/>
										{Boolean(
											formik.touched.password &&
												formik.errors.password
										) && (
											<span
												className="text-danger"
												style={{
													margin: "0px",
													fontSize: "12px",
												}}
											>
												{formik.errors.password}
											</span>
										)}
									</div>

									<div
										className="PasswordFild"
										style={{
											marginBottom: "23px",
										}}
									>
										<span>Confirm Password</span>
										<input
											type="password"
											placeholder="Enter your password"
											name="confirmPassword"
											value={
												formik.values.confirmPassword
											}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											style={{
												marginBottom: "0px",
											}}
										/>
										{Boolean(
											formik.touched.confirmPassword &&
												formik.errors.confirmPassword
										) && (
											<span
												className="text-danger"
												style={{
													margin: "0px",
													fontSize: "12px",
												}}
											>
												{formik.errors.confirmPassword}
											</span>
										)}
									</div>
									{/* <div className="KYC_TramsAndCondetionSect mt-0">
									<lable className="container">
										I accept the{" "}
										<a href="#">Term of Conditions</a> and{" "}
										<a href="#">Privacy Policy</a>
										<input type="checkbox" />
										<span className="checkmark" />
									</lable>
								</div> */}
									<div className="project-btn-area text-center black-shape-bigCustom">
										<input
											className="btn_custom"
											type="submit"
											value="Reset password"
										/>

										<span className="hover-shape1" />
										<span className="hover-shape2" />
										<span className="hover-shape3" />
									</div>
								</form>
								<h4>
									Already have an account ?{" "}
									<Link to="/signin">
										<a>Sign in now !</a>
									</Link>
								</h4>

								<h4>
									<span
										onClick={resendOtp}
										style={{ cursor: "pointer" }}
									>
										Resend otp!
									</span>
								</h4>
							</div>
							<div className="singUpformShadow" />
						</div>
					</div>
				</div>
			</Box>
		</Wrapper>
	);
};

export default ResetPassword;
