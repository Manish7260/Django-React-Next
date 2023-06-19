/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";
import * as Yup from "yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "redux/reducers";
import { useFormik } from "formik";
import { userLoginAction } from "redux/actions/userActions";
import { Box } from "@mui/material";
import Wrapper from "./Wrapper";
import ScrollToTop from "./ScrollToTop";

export default function SignIn() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { token, authenticated, loading } = useSelector(userState);

	// console.log("user :>> ", user.attributes);

	useEffect(() => {
		if (token && authenticated) {
			navigate("/");
		}
	}, []);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().required("email is required"),
			password: Yup.string().required("password is required"),
		}),
		onSubmit: async (values, helpers) => {
			try {
				await dispatch(userLoginAction({ payload: values, navigate }));
			} catch (err) {
				console.log("err", err);
			}
		},
	});
	return (
		<Wrapper>
			<ScrollToTop />
			<Box>
				{/* <div className="SignUp_SignIn_Form_Sect">
        <div className="SignUp_SignIn_Form_SectBG" />
        <div className="container">
          <div className="SignUp_SignIn_Form_Content">
            <div className="SignUp_SignIn_Form signInForm">
              <h2>log In</h2>
              <h3>
                Inter your email address and password to get access your account
              </h3>
              <form action="">
                <div className="EmailFild">
                  <lable>Email Address</lable>
                  <input type="email" placeholder="Enter your email address" />
                </div>
                <div className="PasswordFild">
                  <lable>Password</lable>
                  <input type="email" placeholder="Enter your password" />
                </div>
                <div className="forgetPassBtnSect">
                  <div className="KYC_TramsAndCondetionSect m-0">
                    <label className="container">
                      Remember me
                      <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="ForgetPass">
                    <Link to="/forgot-password">
                      <a>Forget Password ?</a>
                    </Link>
                  </div>
                </div>
                <a href="/">
                  <div className="project-btn-area text-center black-shape-bigCustom">
                    <button>Sign In</button>
                    <span className="hover-shape1" />
                    <span className="hover-shape2" />
                    <span className="hover-shape3" />
                  </div>
                </a>
              </form>
              <h4>
                Don’t have an account ?{" "}
                <Link to="/signup">
                  <a>Sign up now !</a>
                </Link>
              </h4>
            </div>
            <div className="singUpformShadow" />
          </div>
        </div>
      </div> */}
				{loading && <Loader />}
				<div className="SignUp_SignIn_Form_Sect">
					<div className="SignUp_SignIn_Form_SectBG" />
					<div className="container">
						<div className="SignUp_SignIn_Form_Content">
							<div className="SignUp_SignIn_Form signInForm">
								<h2>log In</h2>
								<h3>
									Inter your email address and password to get
									access your account
								</h3>
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
									<div
										className="PasswordFild"
										style={{
											marginBottom: "23px",
										}}
									>
										<span>Password</span>
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
												className=" text-danger"
												style={{
													margin: "0px",
													fontSize: "12px",
												}}
											>
												{formik.errors.password}
											</span>
										)}
									</div>
									{/* <div className="forgetPassBtnSect">
									<div className="KYC_TramsAndCondetionSect m-0">
										<lable className="container">
											Remember me
											<input type="checkbox" />
											<span className="checkmark" />
										</lable>
									</div>
									<div className="ForgetPass">
										<Link to="/forgot-password">
											{" "}
											<a>Forget Password ?</a>
										</Link>
									</div>
								</div> */}
									<div className="project-btn-area text-center black-shape-bigCustom">
										<input
											className="btn_custom"
											type="submit"
											value="Sign In"
											disabled={loading}
										/>
										<span className="hover-shape1" />
										<span className="hover-shape2" />
										<span className="hover-shape3" />
									</div>
								</form>
								<h4>
									Don’t have an account ?
									<Link to="/signup">
										<a>Sign up now !</a>
									</Link>
								</h4>

								<h4>
									<Link to="/forget-password">
										<a>Forget Password !</a>
									</Link>
								</h4>
							</div>
							<div className="singUpformShadow" />
						</div>
					</div>
				</div>
			</Box>
		</Wrapper>
	);
}
