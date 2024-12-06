import { Container, Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";
import Logo from "../LayoutNavbar/Logo";

const LayoutFooter: FC = () => {
	return (
		<Paper color="default" elevation={24} sx={{ boxShadow: 3 }}>
			<Container>
				<Stack alignItems={"center"} spacing={2} paddingY={2}>
					<Logo />
					<Typography align="center" sx={{ fontWeight: 600 }} variant="body1">
						&copy; Electro - All rights Reserved
					</Typography>
				</Stack>
			</Container>
		</Paper>
	);
};

export default LayoutFooter;
