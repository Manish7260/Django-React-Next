import React from "react";
import styled from "styled-components";
import Link from "next/link";

import { NavbarContainer, Logo, Ul, Li } from "@/styles/pages/navbar.styles";

const SettingNavbar = () => {
  return (
    <SettingNavbarContainer>
      <Link href="/">
        <Logo src="/images/logo.webp" />
      </Link>
      <P>Settings</P>
      <Ul>
        <Li>Account</Li>
        <Li>Notifications</Li>
        <Li>Advanced Settings</Li>
      </Ul>
    </SettingNavbarContainer>
  );
};

export default SettingNavbar;

const SettingNavbarContainer = styled(NavbarContainer)`
  width: 230px;
`;

const P = styled.p`
  margin-top: 30px;
  font-weight: bolder;
  font-size: 20px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: #9b9b9b;
`;
