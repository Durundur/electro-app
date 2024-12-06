import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

const AuthButtons: FC = () => {
	return (
		<Stack direction='row' spacing={2}>
			<Button sx={{ textTransform: 'none' }} href="/auth/login" LinkComponent={Link} variant="contained">Login</Button>
			<Button sx={{ textTransform: 'none' }} href="/auth/register" LinkComponent={Link} variant="outlined">Register</Button>
		</Stack>
	);
};

export default AuthButtons;
