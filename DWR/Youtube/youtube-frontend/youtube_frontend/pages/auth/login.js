import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import { FormControl, Input, Button } from "@/styles/pages/signup.styles";

import { ForgetPassword, Main, NewUser } from "@/styles/pages/login.styles";

let GoogleLoginButton,
  FacebookLoginButton,
  LoginSocialGoogle,
  LoginSocialFacebook;
if (typeof window !== "undefined") {
  GoogleLoginButton = require("react-social-login-buttons").GoogleLoginButton;
  FacebookLoginButton =
    require("react-social-login-buttons").FacebookLoginButton;
  LoginSocialGoogle = require("reactjs-social-login").LoginSocialGoogle;
  LoginSocialFacebook = require("reactjs-social-login").LoginSocialFacebook;
}

export default function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(false);
  const [disableButton, setButton] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false);

  let message = "";
  const router = useRouter();

  let handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "email") {
      checkEmail(value);
    }

    setLogin({
      ...login,
      [name]: value,
    });
  };

  useEffect(() => {
    if (emailValidated === false || login.password.length < 8) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [handleInput]);

  const checkEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(e)) {
      setEmailValidated(true);
      return false;
    } else {
      setEmailValidated(false);
      return true;
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      axios
        .post("http://127.0.0.1:8000/api/token/", login)
        .then((response) => {
          if (response.data === false) {
            setErrors(true);
          } else {
            setErrors(false);
            message = response.data;
            let accessToken = response.data.access;
            let refreshToken = response.data.refresh;
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);
            Cookies.set("isAuthenticated", true);
            Cookies.set("user", login.email);
            router.push("/");
          }
          console.log(response.data);
        })
        .catch((error) => {
          if (error.response) {
            alert(error.response.data.detail);
          } else {
            console.log("Request failed:", error.message);
          }
        });
    }
  };

  return (
    <>
      <Main>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Input
              type="email"
              name="email"
              placeholder="Username"
              onChange={handleInput}
            />
          </FormControl>

          <FormControl>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInput}
            />
            {errors ? (
              <label className="form-label text-danger">
                Please Enter Valid Email and password
              </label>
            ) : (
              ""
            )}
          </FormControl>

          <Button disabled={disableButton}>Login</Button>
          
          {typeof window !== "undefined" && (
            <>
              <LoginSocialGoogle
                client_id={
                  "829811419121-k1njpth8alta8h1ii899a51rq6g5tev7.apps.googleusercontent.com"
                }
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={({ provider, data }) => {
                  console.log(provider, data);
                }}
                onReject={(err) => {
                  console.log(err);
                }}
              >
                <GoogleLoginButton />
              </LoginSocialGoogle>

              <LoginSocialFacebook
                appId="631545422255315"
                onResolve={(response) => {
                  console.log(response);
                }}
                onReject={(error) => {
                  console.log(error);
                }}
              >
                <FacebookLoginButton />
              </LoginSocialFacebook> 
              </>
          )}
        </form>
        
        <div>
          <ForgetPassword href="/auth/forgetpassword">
            Forget Password
          </ForgetPassword>
          <NewUser href="/auth/signup">Register New User</NewUser>
        </div>
      </Main>
    </>
  );
}
