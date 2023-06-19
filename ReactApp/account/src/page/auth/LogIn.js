import Input from "../../component/Input";
import Button from "../../component/Button";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {

    const [login, setLogin] = useState({
        email :"",
        password : "",
    });

    const navigator = useNavigate()

    const [errors, setErrors] = useState(false);
    const [disableButton, setButton] = useState(false);
    const [emailValidated, setEmailValidated] = useState(false);
    
    let message = "";
   
    let handleInput = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      
      if (name==='email'){
        checkEmail(value)
      }

      setLogin({
        ...login, 
        [name] : value,
      });
    }

    useEffect(() => {
      if (
        emailValidated === false ||
        login.password.length<8
      ) {
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
    axios 
      .post("http://127.0.0.1:8000/api/token/", login)
      .then((response) => {
        if (response.data===false) {
          setErrors(true)
        }
        else {
          setErrors(false)
          message = response.data
          let accessToken = response.data.access;
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('IsAuthenticated', true);
          navigator('/dashboard')
        }
        console.log(response.data)
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.detail);
        } else {
          console.log("Request failed:", error.message);
        }
      });
    }

    return (
      <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                    //   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    src="https://i.pinimg.com/videos/thumbnails/originals/7b/04/a6/7b04a69a160332209b3edcacfbbc80f6.0000000.jpg"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          />
                          <span className="h1 fw-bold mb-0">Logo</span>
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: 1 }}
                        >
                          Sign into your account
                        </h5>
                        <div className="form-outline mb-4">
                          <Input 
                            type="email"
                            name="email"
                            inputClass="form-control form-control-lg"
                            label="Email Address"
                            onChange={handleInput}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <Input 
                            type="password"
                            name="password"
                            inputClass="form-control form-control-lg"
                            label="Password"
                            onChange={handleInput}
                          />
                          {errors ? (
                            <label className="form-label text-danger">
                              Please Enter Valid Email and password
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="pt-1 mb-4">
                          <Button type="submit" value="Login" inputClass="btn btn-dark btn-lg btn-block" disabled={disableButton}/>
                        </div>
                        <a className="small text-muted" href="/forgetpassword">
                          Forgot password?
                        </a>
                        <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                          Don't have an account?{" "}
                          <a href="/" style={{ color: "#393f81" }}>
                            Register here
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default LoginForm;