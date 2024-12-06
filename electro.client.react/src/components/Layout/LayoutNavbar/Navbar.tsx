"use client";
import { AppBar, Container, Stack, Toolbar, useTheme } from "@mui/material";
import React, { FC } from "react";
import ProfileIcons from "./ProfileIcons";
import SearchInput from "./NavbarSearchInput/NavbarSearchInput";
import Logo from "./Logo";
import AuthButtons from "./AuthButtons";
import ProductHierarchy from "./NavbarProductHierarchy/NavbarProductHierarchy";

const Navbar: FC = () => {
	const isLoggedIn = true;
	return (
		<AppBar color="transparent" position="relative">
			<Container disableGutters>
				<Toolbar
					disableGutters
					sx={{
						width: "100%",
						justifyContent: "space-between",
					}}
				>
					<Logo />
					<SearchInput></SearchInput>
					{isLoggedIn ? <ProfileIcons></ProfileIcons> : <AuthButtons></AuthButtons>}
				</Toolbar>
				<ProductHierarchy></ProductHierarchy>
			</Container>
		</AppBar>
	);
};

export default Navbar;
