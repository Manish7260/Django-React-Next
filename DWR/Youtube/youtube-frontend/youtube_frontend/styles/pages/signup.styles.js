import styled from "styled-components";

export const Button = styled.button`
  background-color: #50adff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100px;
  margin: 20px 10px;
  height: 50px;
  font-size: 20px;
`;

export const FormControl = styled.div`
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

export const Input = styled.input`
  border: 1px solid lightgrey;
  line-height: 45px;
  border-radius: 8px;
  font-size: 20px;
  padding: 0px 15px;
  &:focus {
    outline: 4px solid #89d4ff;
    transition: outline 0.1s;
  }
`;
export const Main = styled.div`
  border: 1px solid black;
  width: 750px;
  margin: auto;
  margin-top: 160px;
  padding: 20px 40px;
  border-radius: 5px;
  @media (max-width: 769px) {
    width: 90%;
    margin-top: 80px;
    margin-bottom: 40px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const H3 = styled.p`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 30px;
  margin: 30px 10px;
`;

export const Label = styled.label`
  font-size: 17px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;

export const Div = styled.div`
  display: flex;
  @media (max-width: 769px) {
    display: flex;
    flex-direction: column;
  }
`;
export const ErrorLabel = styled.label`
  color: red;
`;
export const GenderInput = styled(Input)`
  margin: 0px 10px;
`;

export const GenderDiv = styled.div`
  display: flex;
  margin-top: 5px 0px;
`;
