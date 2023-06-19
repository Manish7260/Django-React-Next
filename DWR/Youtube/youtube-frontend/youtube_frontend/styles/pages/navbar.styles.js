import styled from "styled-components";

export const NavbarContainer = styled.nav`
  width: 200px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 700px;
`;

export const Logo = styled.img`
  margin-top: 10px;
  width: 100px;
  height: auto;
`;

export const Ul = styled.ul`
  list-style-type: none;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

export const Li = styled.li`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  height: 45px;
  display: inline-block;
  padding: 15px;
  border-radius: 5px;
  &:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }
`;
