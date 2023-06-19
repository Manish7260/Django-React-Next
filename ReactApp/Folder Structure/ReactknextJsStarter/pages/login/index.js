import React, { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Link from 'next/link'

import {
  Button,
  ErrorMsg,
  Form,
  FormBlcok,
  FormGroup,
  Input,
  Label,
  Title,
  ForgotLink,
  GoogleLoginFooter,
  Image,
  Close,
  EyeIcon,
} from '../../styles/global/main.style'

import router from '../../utils/router'
import {
  LoginPageWrapper,
  LoginFormWrapper,
  LoginImageBlock,
  AccountLink,
} from '../../styles/pages/login.style'
import { csrfToken, providers, signIn } from 'next-auth/client'
import toaster from '../../utils/toaster'
import { redirectRoute } from '../../utils/cookie'
import MetaSEO from '../../components/SeoComponent'

const Login = (props) => {
  const { csrfToken, errorMsg, providers } = props
  const { register, errors, handleSubmit } = useForm()
  const [passwordShown, setPasswordShown] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const routers = useRouter()

  const metaDetail = {
    title: 'Yoyoboat | Login',
    desc: 'European Travel Destinations',
  }

  const closePage = () => {
    routers.push(router.HOME)
  }

  useEffect(() => {
    toaster('error', errorMsg)
  }, [errorMsg])

  const loginSubmitHandler = (e) => {
    setLoading(true)
    document.getElementById('loginForm').action =
      '/api/auth/callback/credentials'
    document.getElementById('loginForm').submit()
  }

  return (
    <Fragment>
      <MetaSEO metaDetail={metaDetail} />
      <LoginPageWrapper>
        <Close onClick={() => closePage()}>
          <img src="/images/close-icon.svg" alt="" />
        </Close>
        <LoginFormWrapper>
          <Title>Log in</Title>
          <Form
            onSubmit={handleSubmit(loginSubmitHandler)}
            method="post"
            name="loginForm"
            id="loginForm">
            <input
              name="csrfToken"
              type="hidden"
              defaultValue={csrfToken}
              ref={register}
            />
            <FormGroup isLoginFormGroup={true}>
              <Label>Email Address</Label>
              <FormBlcok>
                <Input
                  isInputFontLight={true}
                  type="text"
                  name="email"
                  className=""
                  ref={register({
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
              </FormBlcok>
              {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
            </FormGroup>
            <FormGroup isLoginFormGroup={true}>
              <Label>Password</Label>
              <FormBlcok>
                <Input
                  isInputFontLight={true}
                  type={passwordShown ? 'text' : 'password'}
                  name="password"
                  ref={register({ required: true, minLength: 6 })}
                />
                <EyeIcon>
                  <i
                    className={`${
                      passwordShown ? 'pw-view-icon' : 'pw-off-view-icon'
                    }`}
                    onClick={(e) => setPasswordShown(!passwordShown)}></i>
                </EyeIcon>
              </FormBlcok>
              {errors.password && errors.password.type === 'required' && (
                <ErrorMsg>Password is required</ErrorMsg>
              )}
              {errors.password && errors.password.type === 'minLength' && (
                <ErrorMsg>minimum length is 6</ErrorMsg>
              )}
            </FormGroup>
            <Link href={router.FORGOTPASS} passHref>
              <ForgotLink>Forgot Password?</ForgotLink>
            </Link>
            <Button isLoginButton={true} type="submit" disabled={isLoading}>
              {isLoading ? <i className="fa fa-spinner fa-spin"></i> : 'Log in'}
            </Button>
          </Form>
          <GoogleLoginFooter>
            {providers &&
              Object.values(providers).map((provider) => {
                if (provider.id == 'google')
                  return (
                    <Button
                      isGoogleLoginBtn={true}
                      onClick={() => signIn(provider.id)}
                      key={provider.name}>
                      <img src="/images/Google_Icon.svg" alt="" />
                      Log in with Google
                    </Button>
                  )
                else if (provider.id == 'facebook')
                  return (
                    provider.id == 'facebook' && (
                      <Button
                        isGoogleLoginBtn={true}
                        onClick={() => signIn(provider.id)}
                        key={provider.name}>
                        <img src="/images/facebook.svg" alt="" />
                        Log in with Facebook
                      </Button>
                    )
                  )
              })}
          </GoogleLoginFooter>
          <AccountLink>
            Don’t have an account?
            <Link href={router.SIGNUP} passHref>
              <ForgotLink>Sign up here</ForgotLink>
            </Link>
          </AccountLink>
        </LoginFormWrapper>
        <LoginImageBlock>
          <Image src="/images/login-page-img.png" alt="" />
        </LoginImageBlock>
      </LoginPageWrapper>
    </Fragment>
  )
}

export const getServerSideProps = async (context) => {
  const { query, req } = context
  let resultRoute = await redirectRoute(req)
  if (resultRoute.status) return resultRoute.redirectRoute

  let errorMsg = null
  if (query && query.error) {
    if (query.error == 'Callback') errorMsg = 'Request cancelled'
    else errorMsg = query.error
  }

  return {
    props: {
      csrfToken: await csrfToken(context),
      errorMsg: errorMsg,
      providers: await providers(context),
    },
  }
}

export default Login
