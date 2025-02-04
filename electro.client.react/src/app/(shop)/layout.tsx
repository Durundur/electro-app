"use client";
import "../globals.css";
import { Container, ThemeProvider } from "@mui/material";
import theme from "../theme";
import Navbar from "@/components/Layout/LayoutNavbar/Navbar";

const ShopLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<ThemeProvider theme={theme}>
			<Navbar />
			<Container disableGutters sx={{ paddingTop: 2, paddingBottom: 2 }}>
				{children}
			</Container>
		</ThemeProvider>
	);
};

export default ShopLayout;
