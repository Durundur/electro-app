import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { ChevronRightRounded } from "@mui/icons-material";
import { FC } from "react";
import { useSelector } from "@/libs/Store";
import { formatAmount } from "@/libs/Helpers/Formatters";

interface CartSummaryProps {}

const CartSummary: FC<CartSummaryProps> = () => {
	const cartSelector = useSelector((store) => store.CartStore.data);

	return (
		<Card>
			<CardContent>
				<Stack spacing={2}>
					<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
						<Typography>Do zapłaty</Typography>
						<Stack>
							<Typography variant="h6" fontWeight={500}>
								{formatAmount(cartSelector?.totalPrice?.amount!, cartSelector?.totalPrice?.currency!)}
							</Typography>
							<Typography alignSelf={"end"} variant="body2" fontWeight={300}>
								+ dostawa
							</Typography>
						</Stack>
					</Stack>
					<Button variant="contained" fullWidth endIcon={<ChevronRightRounded />}>
						Wybierz dostawę i płatność
					</Button>
					<Typography variant="body2">Nie zwlekaj, produkty w koszyku nie są rezerwowane.</Typography>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default CartSummary;
