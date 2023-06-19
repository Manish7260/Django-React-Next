import styled from "styled-components";

const Button = styled.button`
    background-color: orange;
    color: black;
    border:5px solid #008CBA;
    border-radius: 5px;
    transition-duration: 0.4s;
    border: none;
    padding : 16px 32px;
    opacity: 0.9;
    &:hover{
        background-color: #008CBA;
        color: white;
    }
`
export default Button;

