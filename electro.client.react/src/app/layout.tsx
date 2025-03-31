"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import AuthProvider from "@/components/Auth/AuthProvider/AuthProvider";
import ReduxProvider from "@/libs/ReduxProvider";
import CartProvider from "@/components/Cart/CartProvider/CartProvider";
import Theme from "./theme/Theme";
import "./global.css";
import { PageTransitionProvider } from "@/contexts/PageTransition/PageTransitionContext";
import PageTransition from "@/components/Layout/PageTransition/PageTransition";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<html lang="en">
			<body>
				<AppRouterCacheProvider>
					<ReduxProvider>
						<AuthProvider>
							<CartProvider>
								<Theme>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<PageTransitionProvider>
											<PageTransition>{children}</PageTransition>
										</PageTransitionProvider>
									</LocalizationProvider>
								</Theme>
							</CartProvider>
						</AuthProvider>
					</ReduxProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
};

export default RootLayout;
