"use client";
import * as React from "react";
import { Box, Stack } from "@mui/material";
import AdminSideMenu from "@/components/Layout/AdminSideMenu/AdminSideMenu";
import PageBreadcrumbs from "@/components/Layout/PageBreadcrumbs/PageBreadcrumbs";

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<Stack direction={"row"}>
			<AdminSideMenu />
			<Box
				sx={{
					flexGrow: 1,
					flexShrink: 1,
					minWidth: 0,
					p: 3,
				}}
			>
				<PageBreadcrumbs />
				{children}
			</Box>
		</Stack>
	);
};

export default AdminLayout;
