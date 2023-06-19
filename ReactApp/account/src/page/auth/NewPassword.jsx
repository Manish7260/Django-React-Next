import Input from "../../component/Input";
import Button from "../../component/Button";
import { useState } from "react";
import axios from "axios";

function NewPassword(){

    let getotp = localStorage.getItem('otp');
    getotp = parseInt(getotp)

    const [password, setPassword] = useState({
        otp : getotp, 
        password : "",
        confirmPassword : "",
    });

    const handleInput = (e) =>{
      let name = e.target.name;
      let value = e.target.value;
      console.log(name , " : ", value)
      setPassword({
        ...password,
        [name]:value,
      })  
    }
    
    const handleSubmit = (e) => {
      e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/forgettedpassword/", password)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        if (error.response.status === 400) {
          console.log("Bad request:", error.response.data);
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
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">
                        <form onSubmit={handleSubmit}>
                          <h5
                            className="fw-normal mb-3 pb-3"
                            style={{ letterSpacing: 1 }}
                          >
                            Change Your Password
                          </h5>
                          <div className="form-outline mb-4">
                            <Input 
                              type="password"
                              name="password"
                              inputClass="form-control form-control-lg"
                              label="Password"
                              onChange={handleInput}
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <Input 
                              type="password"
                              name="confirm_password"
                              inputClass="form-control form-control-lg"
                              label="Confirm Password"
                              onChange={handleInput}
                            />
                          </div>
                          <div className="pt-1 mb-4">
                            <Button type="submit" value="Update" inputClass="btn btn-dark btn-lg btn-block" />
                          </div>
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
export default NewPassword;