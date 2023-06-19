/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegisterAction } from "redux/actions";
import { userState } from "redux/reducers";
import { registerUser } from "redux/services";
import * as Yup from "yup";
import Loader from "./Loader/Loader";
import Wrapper from "./Wrapper";
import ScrollToTop from "./ScrollToTop";

const SignUp = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { loading } = useSelector(userState);
	console.log("loading", loading);

	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			username: Yup.string().required("username is required"),
			email: Yup.string().email().required("email is required"),
			password: Yup.string().required("password is required"),
		}),
		onSubmit: async (values, helpers) => {
			try {
				const formdata = new FormData();

				formdata.append("username", values.username);
				formdata.append("email", values.email);
				formdata.append("password", values.password);

				const res = await dispatch(
					userRegisterAction({ payload: formdata, navigate })
				);

				console.log("res", res);

				// navigate("/signin");
			} catch (err) {
				console.log("err.message", err.message);
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
            <div className="SignUp_SignIn_Form">
              <h2>Create Account</h2>
              <h3>
                Inter your name, valid email address and password to register
                your account
              </h3>
              <form action="">
                <div className="FullNameFild">
                  <lable>Full Name</lable>
                  <input type="text" placeholder="Enter your name" />
                </div>
                <div className="EmailFild">
                  <lable>Email Address</lable>
                  <input type="email" placeholder="Enter your email address" />
                </div>
                <div className="PasswordFild">
                  <lable>Password</lable>
                  <input type="email" placeholder="Enter your password" />
                </div>
                <div className="KYC_TramsAndCondetionSect mt-0">
                  <label className="container">
                    I accept the <a href="#">Term of Conditions</a> and{" "}
                    <a href="#">Privacy Policy</a>
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                </div>
                <a href="/">
                  <div className="project-btn-area text-center black-shape-bigCustom">
                    <button>Register Account</button>
                    <span className="hover-shape1" />
                    <span className="hover-shape2" />
                    <span className="hover-shape3" />
                  </div>
                </a>
              </form>
              <h4>
                Already have an account ?{" "}
                <Link to="/signin">
                  <a>Sign in now !</a>
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
							<div className="SignUp_SignIn_Form">
								<h2>Create Account</h2>
								<h3>
									Inter your name, valid email address and
									password to register your account
								</h3>
								<form noValidate onSubmit={formik.handleSubmit}>
									<div
										className="FullNameFild"
										style={{
											marginBottom: "23px",
										}}
									>
										<span>Username</span>
										<input
											type="text"
											placeholder="Enter Username"
											name="username"
											values={formik.values.username}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											style={{
												marginBottom: "0px",
											}}
										/>

										{Boolean(
											formik.touched.username &&
												formik.errors.username
										) && (
											<span
												className=" text-danger"
												style={{
													margin: "0px",
													fontSize: "12px",
												}}
											>
												{formik.errors.username}
											</span>
										)}
									</div>
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
												className="text-danger"
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
											value="Register Account"
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
							</div>
							<div className="singUpformShadow" />
						</div>
					</div>
				</div>
			</Box>
		</Wrapper>
	);
};

export default SignUp;
