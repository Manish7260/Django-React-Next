import React from "react";
import Link from "next/link";
import { NavbarContainer, Logo, Ul, Li } from "@/styles/pages/navbar.styles";

const Navbar = () => {
  return (
    <NavbarContainer>
      <Link href="/">
        <Logo src="/images/logo.webp" />
      </Link>

      <Ul>
        <Link href="/">
          <Li>Home</Li>
        </Link>
        <Li>Subscriptions</Li>
        <Li>Watch Later</Li>
        <Li>
        <Link href={"/liked"}>Liked Videos</Link>
        </Li>
        
        <Li>Explore</Li>
        <Li>
          <Link href="/settings">Settings</Link>
        </Li>
        <Li>
          <Link href="/channel">Your Channel</Link>
        </Li>
      </Ul>
    </NavbarContainer>
  );
};

export default Navbar;
