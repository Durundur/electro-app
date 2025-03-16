import React, { FC } from "react";
import { Backdrop, Box, CircularProgress, Fade } from "@mui/material";
import { usePageTransitionContext } from "@/contexts/PageTransition/PageTransitionContext";

interface PageTransitionProps {
	children: React.ReactNode;
}

const PageTransition: FC<PageTransitionProps> = ({ children }) => {
	const { isLoading, isEnabled } = usePageTransitionContext();

	if (!isEnabled) {
		return <>{children}</>;
	}

	return (
		<>
			<Box>{children}</Box>
			<Fade in={isLoading} timeout={500}>
				<Backdrop
					sx={{
						zIndex: (theme) => theme.zIndex.drawer + 1,
						bgcolor: "rgba(0, 0, 0, 0.2)",
					}}
					open={isLoading}
				>
					<CircularProgress color="primary" size={100} thickness={2.5} />
				</Backdrop>
			</Fade>
		</>
	);
};

export default PageTransition;
