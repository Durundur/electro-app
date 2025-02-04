"use client";
import * as React from "react";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import "../globals.css";
import { Box, ThemeProvider } from "@mui/material";
import theme from "../theme";
import { AccountTreeOutlined, FormatListNumberedOutlined, PlaylistAddOutlined, ShoppingCart } from "@mui/icons-material";
import { AppProvider } from "@toolpad/core/nextjs";
import Logo from "@/components/Layout/LayoutNavbar/Logo";
import { Branding, Navigation } from "@toolpad/core/AppProvider";

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	const navigation: Navigation = [
		{
			segment: "orders",
			title: "Zamówienia",
			icon: <ShoppingCart />,
		},
		{
			segment: "product-catalog",
			title: "Katalog produktów",
			icon: <ShoppingCart />,
			children: [
				{
					segment: "list",
					title: "Lista",
					icon: <FormatListNumberedOutlined />,
				},
				{
					segment: "new",
					title: "Nowy produkt",
					icon: <PlaylistAddOutlined />,
				},
			],
		},
		{
			segment: "product-hierarchy",
			title: "Hierarchia",
			icon: <AccountTreeOutlined />,
		},
	];

	const branding: Branding = {
		homeUrl: "/",
		logo: <Logo />,
		title: "",
	};

	return (
		<ThemeProvider theme={theme}>
			<AppProvider branding={branding} navigation={navigation}>
				<DashboardLayout
					sx={{
						".MuiToolbar-root a": {
							display: "block",
						},
						".MuiToolbar-root > .MuiStack-root > .MuiStack-root": {
							alignItems: "center",
						},
						".MuiToolbar-root a div": {
							height: "auto",
						},
					}}
				>
					<Box padding={2}>{children}</Box>
				</DashboardLayout>
			</AppProvider>
		</ThemeProvider>
	);
};

export default AdminLayout;
