import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import { providers, signIn } from "next-auth/client";

import { axiosPost } from "../../utils/axois";

import { Button, ErrorMsg, Form, FormBlcok, FormGroup, Input, Label, Title, ForgotLink, GoogleLoginFooter, Image, Close, EyeIcon } from "../../styles/global/main.style";

import { LoginPageWrapper, LoginFormWrapper, LoginImageBlock, AccountLink } from "../../styles/pages/login.style";
import SeoComponent from "../../components/SeoComponent";
import router from "../../utils/router";
import toaster from "../../utils/toaster";
import apiRouter from "../../utils/apiRouter";
import { redirectRoute } from "../../utils/cookie";

const Signup = (props) => {
    const { providers } = props;
    const { register, errors, handleSubmit } = useForm();
    const [passwordShown, setPasswordShown] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const routers = useRouter();

    const metaDetail = { 
        'title': 'Yoyoboat | Signup', 
        'desc': 'European Travel Destinations'
    }

    const onSubmitSignup = async (values, e) => {
        setLoading(true);
        const { data, status, message } = await axiosPost(apiRouter.SIGNUP, values);
        setLoading(false);
        if (status == false) toaster("error", message);
        else {
            toaster("success", data.message);
            e.target.reset();
        }
    };

    const closePage = () => {
        routers.push(router.HOME);
    };

    return (
        <Fragment>
            <SeoComponent metaDetail={metaDetail} />
            <LoginPageWrapper>
                <Close onClick={() => closePage()}>
                    <img src="/images/close-icon.svg" alt="" />
                </Close>
                <LoginFormWrapper>
                    <Title>Create account</Title>
                    <Form onSubmit={handleSubmit(onSubmitSignup)} name="signup">
                        <FormGroup isLoginFormGroup={true}>
                            <Label>First Name</Label>
                            <FormBlcok>
                                <Input isInputFontLight={true} type="text" name="firstName" ref={register({ required: true })} />
                            </FormBlcok>
                            {errors.firstName && <ErrorMsg>First Name is required</ErrorMsg>}
                        </FormGroup>
                        <FormGroup isLoginFormGroup={true}>
                            <Label>Last Name</Label>
                            <FormBlcok>
                                <Input isInputFontLight={true} type="text" name="lastName" ref={register({ required: true })} />
                            </FormBlcok>
                            {errors.lastName && <ErrorMsg>Last Name is required</ErrorMsg>}
                        </FormGroup>
                        <FormGroup isLoginFormGroup={true}>
                            <Label>Email Address</Label>
                            <FormBlcok>
                                <Input
                                    isInputFontLight={true}
                                    type="text"
                                    name="email"
                                    ref={register({
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                />
                            </FormBlcok>
                            {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
                        </FormGroup>
                        <FormGroup isLoginFormGroup={true}>
                            <Label>Password</Label>
                            <FormBlcok>
                                <Input isInputFontLight={true} type={passwordShown ? "text" : "password"} name="password" ref={register({ required: true, minLength: 6 })} />
                                <EyeIcon>
                                    <i className={`${passwordShown ? "pw-view-icon" : "pw-off-view-icon"}`} onClick={(e) => setPasswordShown(!passwordShown)}></i>
                                </EyeIcon>
                            </FormBlcok>
                            {errors.password && errors.password.type === "required" && <ErrorMsg>Password is required</ErrorMsg>}
                            {errors.password && errors.password.type === "minLength" && <ErrorMsg>minimum length is 6</ErrorMsg>} 
                        </FormGroup>
                        <Button type="submit" isLoginButton={true} disabled={isLoading}>
                            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Sign up"}
                        </Button>
                    </Form>
                    <GoogleLoginFooter>
                        {Object.values(providers).map((provider) => {
                            if (provider.id == "google")
                                return (
                                    <Button isGoogleLoginBtn={true} onClick={() => signIn(provider.id)} key={provider.name}>
                                        <img src="/images/Google_Icon.svg" alt="" />
                                        Sign up with Google
                                    </Button>
                                );
                            else if (provider.id == "facebook")
                                return (
                                    provider.id == "facebook" && (
                                        <Button isGoogleLoginBtn={true} onClick={() => signIn(provider.id)} key={provider.name}>
                                            <img src="/images/facebook.svg" alt="" />
                                            Sign up with Facebook
                                        </Button>
                                    )
                                );
                        })}
                    </GoogleLoginFooter>
                    <AccountLink>
                        Already have an account?&nbsp;
                        <Link href={router.LOGIN} passHref>
                            <ForgotLink> Login here</ForgotLink>
                        </Link>
                    </AccountLink>
                </LoginFormWrapper>
                <LoginImageBlock>
                    <Image src="/images/landing-page-banner-img.png" alt="" />
                </LoginImageBlock>
            </LoginPageWrapper>
        </Fragment>
    );
};

export const getServerSideProps = async (context) => {
    const { query, req } = context;
    let resultRoute = await redirectRoute(req);
    if (resultRoute.status) return resultRoute.redirectRoute;

    let errorMsg = null;
    if (query && query.error) {
        if (query.error == "Callback") errorMsg = "Request cancelled";
        else errorMsg = query.error;
    }

    return {
        props: {
            providers: await providers(context),
        },
    };
};

export default Signup;
