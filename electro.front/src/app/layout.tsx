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
import { ApiTypeProvider } from "@/contexts/ApiType/ApiTypeContext";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<html lang="en">
			<head>
				<link rel="stylesheet" href="/richtexteditor/rte_theme_default.css" />
				<script src="/richtexteditor/rte.js" defer></script>
				<script src="/richtexteditor/plugins/all_plugins.js" defer></script>
			</head>
			<body>
				<AppRouterCacheProvider>
					<ReduxProvider>
						<ApiTypeProvider>
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
						</ApiTypeProvider>
					</ReduxProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
};

export default RootLayout;
