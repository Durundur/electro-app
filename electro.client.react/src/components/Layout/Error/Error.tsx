import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

interface ErrorProps {
	message: string;
	secondaryMessage?: string;
}

const Error: FC<ErrorProps> = ({ message, secondaryMessage }) => {
	return (
		<Stack alignItems={"center"} justifyContent={"center"} spacing={2} minHeight={"40vh"}>
			<ErrorOutlineOutlinedIcon color="error" fontSize={"large"} />
			<Stack alignItems={"center"}>
				<Typography variant="h6" fontWeight={500}>
					{message}
				</Typography>
				{secondaryMessage && <Typography>{secondaryMessage}</Typography>}
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
