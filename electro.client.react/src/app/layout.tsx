"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import AuthProvider from "@/components/Auth/AuthProvider/AuthProvider";
import ReduxProvider from "@/libs/ReduxProvider";
import CartProvider from "@/components/Cart/CartProvider/CartProvider";
import Theme from "./theme/Theme";
import "./global.css";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<html lang="en">
			<body style={{ width: "100vw" }}>
				<AppRouterCacheProvider>
					<ReduxProvider>
						<AuthProvider>
							<CartProvider>
								<Theme>{children}</Theme>
							</CartProvider>
						</AuthProvider>
					</ReduxProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
};

export default RootLayout;
