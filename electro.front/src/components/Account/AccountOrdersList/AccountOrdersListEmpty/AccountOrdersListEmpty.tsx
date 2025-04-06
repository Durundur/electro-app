import { Button, Stack, Typography, createSvgIcon } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

const AccountOrdersListEmpty: FC = () => {
	return (
		<Stack alignItems={"center"} justifyContent={"center"} spacing={2} minHeight={"40vh"}>
			<PackageIcon fontSize={"large"} />
			<Stack alignItems={"center"}>
				<Typography variant="h6" fontWeight={500}>
					Twoja historia zamówień jest pusta.
				</Typography>
				<Typography variant="body2">Szukasz inspiracji?</Typography>
			</Stack>
			<Stack direction={"row"} spacing={2}>
				<Button LinkComponent={Link} href="/" variant="contained">
					Odwiedź stronę główną
				</Button>
			</Stack>
		</Stack>
	);
};

const PackageIcon = createSvgIcon(
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="1em" height="1em">
		<path
			fill="currentColor"
			d="m223.68 66.15l-88-48.15a15.88 15.88 0 0 0-15.36 0l-88 48.17a16 16 0 0 0-8.32 14v95.64a16 16 0 0 0 8.32 14l88 48.17a15.88 15.88 0 0 0 15.36 0l88-48.17a16 16 0 0 0 8.32-14V80.18a16 16 0 0 0-8.32-14.03M128 32l80.34 44l-29.77 16.3l-80.35-44Zm0 88L47.66 76l33.9-18.56l80.34 44ZM40 90l80 43.78v85.79l-80-43.75Zm176 85.78l-80 43.79v-85.75l32-17.51V152a8 8 0 0 0 16 0v-44.45L216 90v85.77Z"
		></path>
	</svg>,
	"PackageIcon"
);

export default AccountOrdersListEmpty;
