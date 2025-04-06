import { Card, CardContent, Grid2, Stack, Typography } from "@mui/material";
import { FC } from "react";
import CartCheckoutConfirmProduct from "./CartCheckoutConfirmProduct";
import { useSelector } from "@/libs/Store";
import { GetRecipientsResultItem, RecipientType } from "@/libs/api-contract/api-contract";

const CartCheckoutConfirmSections: FC = () => {
	const deliveryOptionSelecor = useSelector((store) => store.CartStore.checkout.deliveryOption);
	const paymentOptionSelecor = useSelector((store) => store.CartStore.checkout.paymentOption);
	const recipientSelector = useSelector((store) => store.CartStore.checkout.recipientOption);
	const cartProductsSelector = useSelector((store) => store.CartStore.cart.data?.products);

	return (
		<Card>
			<CardContent>
				<Stack spacing={2}>
					<div>
						<Typography component={"p"} variant="h6" fontWeight={500}>
							Podsumowanie
						</Typography>
						<Typography variant="body2">Poniżej możesz sprawdzić swoje zamówienie przed jego realizacją.</Typography>
					</div>
					<Grid2 container direction={"row"} alignItems={"baseline"}>
						<Grid2 size={{ xs: 4 }}>
							<Typography fontWeight={500}>Dane odbiorcy przesyłki:</Typography>
						</Grid2>
						<Grid2>
							{recipientSelector && recipientSelector.type === RecipientType.Personal && <CartCheckoutConfirmPersonalReceiver recipient={recipientSelector} />}
							{recipientSelector && recipientSelector.type === RecipientType.Company && <CartCheckoutConfirmCompanyReceiver recipient={recipientSelector} />}
						</Grid2>
					</Grid2>
					<Grid2 container direction={"row"} alignItems={"baseline"}>
						<Grid2 size={{ xs: 4 }}>
							<Typography fontWeight={500}>Sposób płatności:</Typography>
						</Grid2>
						<Grid2>
							<Typography>{paymentOptionSelecor?.name}</Typography>
						</Grid2>
					</Grid2>
					<Grid2 container direction={"row"} alignItems={"baseline"}>
						<Grid2 size={{ xs: 4 }}>
							<Typography fontWeight={500}>Sposób dostawy:</Typography>
						</Grid2>
						<Grid2>
							<Typography>{deliveryOptionSelecor?.name}</Typography>
						</Grid2>
					</Grid2>
					<Stack spacing={2}>
						<Typography fontWeight={500}>Produkty</Typography>
						<Stack spacing={2}>{cartProductsSelector && cartProductsSelector.map((p) => <CartCheckoutConfirmProduct product={p} key={p.productId} />)}</Stack>
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
};

interface ReceiverProps {
	recipient: GetRecipientsResultItem;
}

const CartCheckoutConfirmCompanyReceiver: FC<ReceiverProps> = ({ recipient }) => {
	return (
		<div>
			<Typography paddingY={0.5} fontWeight={500}>
				{recipient.companyName}
			</Typography>
			<Typography variant="body2">
				{recipient.street} {recipient.houseNumber}
			</Typography>
			<Typography variant="body2">
				{recipient.postalCode} {recipient.city}
			</Typography>
			<Typography variant="body2">telefon: {recipient.phoneNumber}</Typography>
			<Typography variant="body2">NIP: {recipient.taxIdentificationNumber}</Typography>
		</div>
	);
};

const CartCheckoutConfirmPersonalReceiver: FC<ReceiverProps> = ({ recipient }) => {
	return (
		<div>
			<Typography paddingY={0.5} fontWeight={500}>
				{recipient.firstName} {recipient.surname}
			</Typography>
			<Typography variant="body2">
				{recipient.street} {recipient.houseNumber}
			</Typography>
			<Typography variant="body2">
				{recipient.postalCode} {recipient.city}
			</Typography>
			<Typography variant="body2">telefon: {recipient.phoneNumber}</Typography>
		</div>
	);
};

export default CartCheckoutConfirmSections;
