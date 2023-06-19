import styled from "styled-components";

export const Main = styled.div`
  margin-top: 20px;
  margin-left: 400px;
  display: flex;
`;

export const Input = styled.input`
  width: 500px;
  line-height: 30px;
  border-radius: 20px;
  border: 1px solid grey;
  margin-right: 10px;
  font-size: 15px;
  padding: 5px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Notify = styled.a`
  width: 35px;
  background-color: red;
  height: 35px;
  border-radius: 50%;
  margin-top: 3px;
  position: absolute;
  right: 100px;
`;

export const Profile = styled.a`
  width: 35px;
  background-color: green;
  height: 35px;
  border-radius: 50%;
  margin-top: 3px;
  position: absolute;
  right: 50px;
  color: white;
  padding-top: 8px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

export const SocialUser = styled.div`
  display: flex;
`