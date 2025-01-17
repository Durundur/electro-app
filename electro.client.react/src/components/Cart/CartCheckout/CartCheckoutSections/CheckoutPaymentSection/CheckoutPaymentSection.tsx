import { PaymentOption } from "@/libs/Cart/interfaces";
import { setPaymentOption } from "@/libs/Cart/slice";
import { formatAmount } from "@/libs/Helpers/Formatters";
import { useDispatch, useSelector } from "@/libs/Store";
import { PaymentMethod } from "@/libs/api-contract/api-contract";
import { Card, CardContent, Divider, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { FC } from "react";

const CheckoutPaymentSection: FC = () => {
	const paymentOptions: PaymentOption[] = [
		{ name: "Blik", value: PaymentMethod.Blik, amount: 0, currency: "PLN" },
		{ name: "Google Pay", value: PaymentMethod.GooglePay, amount: 0, currency: "PLN" },
		{ name: "Przelew tradycyjny", value: PaymentMethod.BankTransfer, amount: 0, currency: "PLN" },
		{ name: "Przelew błyskawiczny", value: PaymentMethod.InstantTransfer, amount: 1.99, currency: "PLN" },
		{ name: "Karta płatnicza", value: PaymentMethod.CreditCard, amount: 0, currency: "PLN" },
	];

	const paymentOptionSelector = useSelector((state) => state.CartStore.checkout.paymentOption);
	const isPaymentOptionValidSelector = useSelector((state) => state.CartStore.checkout.isPaymentOptionValid);
	const selectedPaymentOptionValue = paymentOptionSelector?.value;
	const dispatch = useDispatch();

	const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const option = paymentOptions.find((o) => o.value === value);
		if (option) {
			dispatch(setPaymentOption(option));
		}
	};

	return (
		<Card>
			<CardContent>
				<Stack spacing={2}>
					<Typography component={"p"} variant="h6" fontWeight={500}>
						Sposób płatności
					</Typography>
					<FormControl error={!isPaymentOptionValidSelector}>
						<RadioGroup value={selectedPaymentOptionValue} onChange={handlePaymentChange}>
							{paymentOptions.map((option) => (
								<div key={`option-${option.value}`}>
									<FormControlLabel
										sx={{
											width: "100%",
											".MuiFormControlLabel-label": {
												width: "100%",
											},
										}}
										key={option.value}
										value={option.value}
										control={<Radio />}
										label={<PaymentOptionLabel option={option} />}
									/>
									<Divider></Divider>
								</div>
							))}
						</RadioGroup>
						<FormHelperText>{!isPaymentOptionValidSelector ? "Proszę wybrać sposób płatności." : ""}</FormHelperText>
					</FormControl>
				</Stack>
			</CardContent>
		</Card>
	);
};

interface PaymentOptionLabelProps {
	option: PaymentOption;
}

const PaymentOptionLabel: FC<PaymentOptionLabelProps> = ({ option }) => {
	return (
		<Stack sx={{ width: "100%" }} direction={"row"} justifyContent={"space-between"} padding={2}>
			<Typography>{option.name}</Typography>
			<Typography fontWeight={500}>{`${formatAmount(option.amount, option.currency, 0)}`}</Typography>
		</Stack>
	);
};

export default CheckoutPaymentSection;
