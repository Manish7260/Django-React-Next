import { useState } from "react";
import Input from "../../component/Input";
import axios from "axios";
import Button from "../../component/Button";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
    const [email, setEmail] = useState({
      email : "",
    });

    const navigate = useNavigate()
  
    const handleInput = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      console.log(name, " : ", value);
      setEmail({
        ...email,
        [name]: value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .post("http://127.0.0.1:8000/generatetoken/", email)
        .then((response) => {
          console.log(response.data);
          navigate('/verifyotp');
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
                            type="email"
                            name="email"
                            inputClass="form-control form-control-lg"
                            label="Email"
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
  
  export default ForgetPassword;