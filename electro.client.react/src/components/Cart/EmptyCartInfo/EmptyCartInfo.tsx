import { FC } from "react";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

interface EmptyCartInfoProps {
	isLoggedIn?: boolean;
}

const EmptyCartInfo: FC<EmptyCartInfoProps> = ({ isLoggedIn }) => {
	const infoForLoggedIn = <Typography variant="body2">Szukasz inspiracji zakupowych?</Typography>;
	const defaultInfo = <Typography variant="body2">Zaloguj się, aby sprawdzić zapisane produkty lub zainspiruj się</Typography>;

	return (
		<Stack alignItems={"center"} justifyContent={"center"} spacing={2} minHeight={"40vh"}>
			<ShoppingCartOutlined fontSize={"large"} />
			<Stack alignItems={"center"}>
				<Typography variant="h6" fontWeight={500}>
					Koszyk jest pusty
				</Typography>
				{isLoggedIn ? infoForLoggedIn : defaultInfo}
			</Stack>
			<Stack direction={"row"} spacing={2}>
				<Button LinkComponent={Link} href="/" variant="contained">
					Odwiedź stronę główną
				</Button>
				{!isLoggedIn && (
					<Button LinkComponent={Link} href="/auth/login" variant="outlined">
						Zaloguj się
					</Button>
				)}
			</Stack>
		</Stack>
	);
};

export default EmptyCartInfo;
