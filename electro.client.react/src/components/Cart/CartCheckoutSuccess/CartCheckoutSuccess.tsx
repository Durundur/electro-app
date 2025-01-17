import { CheckCircleOutlined } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface CartCheckoutSuccessProps {
	orderId: string
}

const CartCheckoutSuccess: FC<CartCheckoutSuccessProps> = ({orderId}) => {
	return (
		<Stack alignItems={"center"} justifyContent={"center"} spacing={2} minHeight={"40vh"}>
			<CheckCircleOutlined fontSize={"large"} />
			<Stack alignItems={"center"}>
				<Typography variant="h6" fontWeight={500}>
					Przyjęliśmy Twoje zamówienie
				</Typography>
			</Stack>
			<Typography>Numer Twojego zamówienia: {orderId}</Typography>
			<Button LinkComponent={Link} href="/" variant="contained">
				Wróć na stronę główną
			</Button>
		</Stack>
	);
};

export default CartCheckoutSuccess;
