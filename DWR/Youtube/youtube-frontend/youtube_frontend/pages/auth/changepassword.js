import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import { FormControl, Input, Button } from "@/styles/pages/signup.styles";

import { Main } from "@/styles/pages/login.styles";

import { useRouter } from "next/router";

function changepassword() {
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name, " : ", value);
    setPassword({
      ...password,
      [name]: value,
    });
  };

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    console.log(config);
    axios
      .patch("http://127.0.0.1:8000/changepassword/", password, config)
      .then((response) => {
        console.log(response.data);
        if (response.data.code === 200) {
          router.push("/auth/login");
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          console.log("Bad request:", error.response.data);
        } else {
          console.log("Request failed:", error.message);
        }
        console.log(localStorage.getItem("access_token"));
      });
  };

  return (
    <>
      <Main>
        <h1>CHANGE PASSWORD</h1>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Input
              type="password"
              name="old_password"
              placeholder="Old Password"
              onChange={handleInput}
            />
          </FormControl>

          <FormControl>
            <Input
              type="password"
              name="new_password"
              placeholder="New Password"
              onChange={handleInput}
            />
          </FormControl>

          <Update>Update</Update>
        </form>
      </Main>
    </>
  );
}

export default changepassword;

const Update = styled(Button)`
  background-color: black;
`;
