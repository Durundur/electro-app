"use client";
import { Container } from "@mui/material";
import Navbar from "@/components/Layout/LayoutNavbar/Navbar";
import PageBreadcrumbs from "@/components/Layout/PageBreadcrumbs/PageBreadcrumbs";

const ShopLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
			<Navbar />
			<Container disableGutters sx={{ paddingY: 2, paddingX: { xs: 2, lg: 0 } }}>
				<PageBreadcrumbs />
				{children}
			</Container>
		</>
	);
};

export default ShopLayout;
