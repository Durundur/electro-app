import React from "react";
import { Backdrop, Box, CircularProgress, Fade } from "@mui/material";

interface FullScreenLoaderProps {
	isVisible: boolean;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ isVisible }) => {
	return (
		<Fade in={isVisible} timeout={500}>
			<Backdrop
				sx={{
					zIndex: (theme) => theme.zIndex.drawer + 1,
					bgcolor: "rgba(0, 0, 0, 0.2)",
				}}
				open={isVisible}
			>
				<CircularProgress color="primary" size={100} thickness={2.5} />
			</Backdrop>
		</Fade>
	);
};

export default FullScreenLoader;
