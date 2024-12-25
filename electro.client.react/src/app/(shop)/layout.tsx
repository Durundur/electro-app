"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "../globals.css";
import { Container, ThemeProvider } from "@mui/material";
import theme from "../theme";
import ReduxProvider from "@/libs/ReduxProvider";
import Navbar from "@/components/Layout/LayoutNavbar/Navbar";

const ShopLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<html lang="en">
			<body>
				<AppRouterCacheProvider>
					<ThemeProvider theme={theme}>
						<ReduxProvider>
							<Navbar />
							<Container disableGutters sx={{ paddingTop: 2, paddingBottom: 2 }}>
								{children}
							</Container>
						</ReduxProvider>
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
};

export default ShopLayout;
