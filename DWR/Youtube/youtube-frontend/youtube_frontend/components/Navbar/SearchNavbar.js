import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import {
  Main,
  Input,
  Notify,
  Profile,
  SocialUser
} from "@/styles/pages/searchnavbar.styles";

import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useUser } from '@auth0/nextjs-auth0/client';

const SearchNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [searchValue, setSearchValue] = useState();

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  console.log(user && user)

  const open = Boolean(anchorEl);

  const default_user = Cookies.get("user");
  const profileInitial = default_user ? default_user.charAt(0).toUpperCase() : "";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const router = useRouter();

  const handleInput = (e) => {
    setSearchValue(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/",
      query: "search=" + searchValue,
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Main>
      <form onSubmit={handleSubmit}>
        <Input type="text" placeholder="Search" onInput={handleInput} />
      </form>
      <Notify></Notify>
      <Profile
        dangerouslySetInnerHTML={{ __html: profileInitial }}
        onClick={handleClick}
      ></Profile>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {user && (
          <MenuItem onClick={handleClose}>
            <Link href="#">{user.name}</Link>
          </MenuItem>
        )}
        <MenuItem onClick={handleClose}>
          <Link href="settings/">Account</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="channel/">Your Channel</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="auth/changepassword">Change Password</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="auth/logout/">Logout</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <a href="/api/auth/login/">Social Login</a>  
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <a href="/api/auth/logout">Social Logout</a>
        </MenuItem>
      </Menu>
    </Main>
  );
};

export default SearchNavbar;
