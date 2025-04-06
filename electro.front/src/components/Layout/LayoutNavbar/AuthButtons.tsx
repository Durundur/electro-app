import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

const AuthButtons: FC = () => {
	return (
		<Stack direction="row" spacing={2}>
			<Button href="/auth/login" LinkComponent={Link} variant="contained">
				Logowanie
			</Button>
			<Button href="/auth/register" LinkComponent={Link} variant="outlined">
				Rejestracja
			</Button>
		</Stack>
	);
};

export default AuthButtons;
