import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import { ErrorOutlineOutlined } from "@mui/icons-material";

interface ErrorProps {
	message: string;
	secondaryMessage?: string;
}

const Error: FC<ErrorProps> = ({ message, secondaryMessage }) => {
	return (
		<Stack alignItems={"center"} justifyContent={"center"} spacing={2} minHeight={"40vh"}>
			<ErrorOutlineOutlined color="error" fontSize={"large"} />
			<Stack alignItems={"center"} maxWidth={"350px"} textAlign={"center"}>
				<Typography variant="h6" fontWeight={500}>
					{message}
				</Typography>
				{secondaryMessage && <Typography variant="body2">{secondaryMessage}</Typography>}
			</Stack>
			<Stack direction={"row"} spacing={2}>
				<Button LinkComponent={Link} href="/" variant="contained">
					Przejdź na stronę główną
				</Button>
			</Stack>
		</Stack>
	);
};

export default Error;
