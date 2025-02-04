import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { ChevronRightRounded } from "@mui/icons-material";
import { FC } from "react";
import { useDispatch, useSelector } from "@/libs/Store";
import { formatAmount } from "@/libs/Helpers/Formatters";
import { useRouter } from "next/navigation";
import { validateCart } from "@/libs/Cart/thunks";
import { getValidateCartCommand } from "@/libs/Cart/services";

interface CartSummaryProps {}

const CartSummary: FC<CartSummaryProps> = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const cartSelector = useSelector((store) => store.CartStore.cart.data);
	const userProfileId = useSelector((store) => store.AuthStore.userProfile.id);

	const handleNextStepClick = async () => {
		if (!cartSelector) return;
		const validationErrors = await dispatch(validateCart(getValidateCartCommand(cartSelector, userProfileId)));
		if (Array.isArray(validationErrors) && validationErrors.length === 0) {
			router.replace("/cart/checkout");
		}
	};

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
					<Button variant="contained" onClick={handleNextStepClick} fullWidth endIcon={<ChevronRightRounded />}>
						Wybierz dostawę i płatność
					</Button>
					<Typography variant="body2">Nie zwlekaj, produkty w koszyku nie są rezerwowane.</Typography>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default CartSummary;
