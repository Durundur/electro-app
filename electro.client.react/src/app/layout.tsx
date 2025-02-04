"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import AuthProvider from "@/components/Auth/AuthProvider/AuthProvider";
import ReduxProvider from "@/libs/ReduxProvider";
import CartProvider from "@/components/Cart/CartProvider/CartProvider";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<html lang="en">
			<body>
				<AppRouterCacheProvider>
					<ReduxProvider>
						<AuthProvider>
							<CartProvider>{children}</CartProvider>
						</AuthProvider>
					</ReduxProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
};

export default RootLayout;
