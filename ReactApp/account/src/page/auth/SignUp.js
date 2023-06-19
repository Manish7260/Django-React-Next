import Input from "../../component/Input";
import RadioInput from "../../component/RadioInput";
import Button from "../../component/Button";
import { useState, useEffect } from "react";
import axios from "axios";

function SignUpForm() {
  const [accounts, setAccounts] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false);
  const [confirmPassValidated, setconfirmPassValidated] = useState(false);
  const [disableButton, setButton] = useState(false);

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

  useEffect(() => {
    if (
      checkFields() ||
      emailValidated === false ||
      confirmPassValidated === false
    ) {
      setButton(true);
    } else {
      setButton(false);
      console.log(accounts);
    }
  }, [handleInput]);

  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "password2" && value.length >= accounts.password.length) {
      confirmPassword(accounts.password, value);
    } else if (name === "email" && value.length !== 0) {
      checkEmail(value);
    }
    setAccounts({
      ...accounts,
      [name]: value,
    });
  }

  const confirmPassword = (pass, confirm_pass) => {
    if (pass === confirm_pass) {
      setconfirmPassValidated(true);
    } else {
      setconfirmPassValidated(false);
    }
  };

  const checkFields = () => {
    if (
      accounts.first_name.length === 0 ||
      accounts.last_name.length === 0 ||
      accounts.email.length === 0 ||
      accounts.password.length < 8 ||
      accounts.password2.length < 8 ||
      accounts.password !== accounts.password2
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/register/", accounts)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          console.log("Bad request:", error.response.data);
        } else {
          console.log("Request failed:", error.message);
        }
      });
  };

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong card-registration">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                    Create Your Account
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <Input
                            name="first_name"
                            inputClass="form-control form-control-lg"
                            label="First Name"
                            onChange={handleInput}
                          />
                          {errors && accounts.first_name.length === 0 ? (
                            <label className="form-label text-danger">
                              Enter First Name
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <Input
                            name="last_name"
                            inputClass="form-control form-control-lg"
                            label="Last Name"
                            onChange={handleInput}
                          />
                          {errors && accounts.last_name.length === 0 ? (
                            <label className="form-label text-danger">
                              Enter Last Name
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <Input
                            type="email"
                            name="email"
                            inputClass="form-control form-control-lg"
                            label="Email "
                            onChange={handleInput}
                          />
                          {errors && accounts.email.length === 0 ? (
                            <label className="form-label text-danger">
                              Enter Email Id{" "}
                            </label>
                          ) : (
                            ""
                          )}
                          {!emailValidated && accounts.email.length !== 0 ? (
                            <label className="form-label text-danger">
                              Email Id is not valid{" "}
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <h6 className="mb-2 pb-2">Gender: </h6>
                        <RadioInput
                          name="gender"
                          firstValue="Female"
                          secondValue="Male"
                          onChange={handleInput}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <Input
                            type="password"
                            name="password"
                            inputClass="form-control form-control-lg"
                            label="Password"
                            onChange={handleInput}
                          />
                          {errors && accounts.password.length === 0 ? (
                            <label className="form-label text-danger">
                              Enter Password
                            </label>
                          ) : (
                            ""
                          )}
                          {errors &&
                          accounts.password.length > 0 &&
                          accounts.password.length < 8 ? (
                            <label className="form-label text-danger">
                              Password Must contain minimum 8 character
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <Input
                            type="password"
                            name="password2"
                            inputClass="form-control form-control-lg"
                            label="Confirm Password"
                            onChange={handleInput}
                          />
                          {errors && accounts.password2.length === 0 ? (
                            <label className="form-label text-danger">
                              Confirm Your Password
                            </label>
                          ) : (
                            ""
                          )}
                          {!confirmPassValidated &&
                          accounts.password.length <=
                            accounts.password2.length &&
                          accounts.password2.length !== 0 ? (
                            <label className="form-label text-danger">
                              Password and Confirm Password Does not match
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    {/* <div className="row">
                      <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <CheckBoxInput type="checkbox" name="showpassword" inputClass="form-check-input" label="Show Password &nbsp;" labelClass="form-check-label" onChange={displayPassword}/>
                      </div></div></div> */}

                    <Button
                      type="submit"
                      value="Submit"
                      disabled={disableButton}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUpForm;
