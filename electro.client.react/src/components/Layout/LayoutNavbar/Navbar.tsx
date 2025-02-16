"use client";
import { AppBar, Container, Stack, Toolbar } from "@mui/material";
import React, { FC } from "react";
import ProfileIcons from "./ProfileIcon";
import SearchInput from "./NavbarSearchInput/NavbarSearchInput";
import Logo from "./Logo";
import AuthButtons from "./AuthButtons";
import ProductHierarchy from "./NavbarProductHierarchy/NavbarProductHierarchy";
import { useSelector } from "@/libs/Store";
import CartIcon from "./CartIcon";

const Navbar: FC = () => {
	const isLoggedInSelector = useSelector((store) => store.AuthStore.auth.isAuthenticated);

	return (
		<AppBar color="transparent" position="relative">
			<Container disableGutters sx={{ paddingX: { xs: 2, lg: 0 } }}>
				<Toolbar
					disableGutters
					sx={{
						width: "100%",
						justifyContent: "space-between",
					}}
				>
					<Logo href="/" />
					<SearchInput></SearchInput>
					<Stack direction={"row"} spacing={2}>
						{isLoggedInSelector ? <ProfileIcons></ProfileIcons> : <AuthButtons></AuthButtons>}
						<CartIcon />
					</Stack>
				</Toolbar>
				<ProductHierarchy></ProductHierarchy>
			</Container>
		</AppBar>
	);
};

export default Navbar;
