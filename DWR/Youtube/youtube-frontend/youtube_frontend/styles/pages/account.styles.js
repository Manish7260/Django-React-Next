import styled from "styled-components";

export const Main = styled.div`
  margin-top: 40px;
  margin-left: 300px;
`;

export const Heading = styled.p`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: bold;
`;

export const Title = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 50px;
  font-size: 22px;
`;

export const Text = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: grey;
  margin-top: 12px;
`;

export const HR = styled.hr`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ChildHeading = styled(Heading)`
  font-size: 15px;
`;

export const Link = styled.a`
  margin-left: 90px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: bold;
  color: #2869d9;
`;

export const LinkGroup = styled.div`
  display: flex;
  margin-top: 20px;
`;
