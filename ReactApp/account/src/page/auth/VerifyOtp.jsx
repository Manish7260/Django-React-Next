import { useState } from "react";
import Input from "../../component/Input";
import axios from "axios";
import Button from "../../component/Button";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
    const [otp, setOtp] = useState({
      otp : "",
    });

    const navigate = useNavigate()
  
    const handleInput = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      console.log(name, " : ", value);
      setOtp({
        ...otp,
        [name]: value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .post("http://127.0.0.1:8000/verifytoken/", otp)
        .then((response) => {
          console.log(response.data);
          if(response.data===true){
            localStorage.setItem('otp',otp.otp.toString())
            navigate('/newpassword')
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            console.log(error.response.data.non_field_errors);
          } else {
            console.log("Request failed:", error.message);
          }
        });
    };

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
                          Forgetted Your Password
                        </h5>
                        <div className="form-outline mb-4">
                          <Input
                            type="text"
                            name="otp"
                            inputClass="form-control form-control-lg"
                            label="Enter Otp"
                            onChange={handleInput}
                          />
                        </div>
                        <div className="pt-1 mb-4">
                          <Button
                            type="submit"
                            value="Submit"
                            inputClass="btn btn-dark btn-lg btn-block"
                          />
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
  
  export default VerifyOtp;
  