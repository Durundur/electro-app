import { Card, CardContent, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { formatAmount } from "@/libs/Helpers/Formatters";
import { DeliveryOption } from "@/libs/Cart/interfaces";
import { useDispatch, useSelector } from "@/libs/Store";
import { setDeliveryOption } from "@/libs/Cart/slice";
import { DeliveryMethod } from "@/libs/api-contract/rest-api-contract";

const CheckoutDeliverySection: FC = () => {
	const deliveryOptions: DeliveryOption[] = [
		{
			name: "Kurier Express",
			value: DeliveryMethod.CourierExpress,
			amount: 15.99,
			currency: "PLN",
		},
		{
			name: "Kurier",
			value: DeliveryMethod.CourierStandard,
			amount: 12.99,
			currency: "PLN",
		},
		{
			name: "Kurier Pobranie",
			value: DeliveryMethod.CourierCashOnDelivery,
			amount: 13.99,
			currency: "PLN",
		},
		{
			name: "Paczkomat",
			value: DeliveryMethod.Locker,
			amount: 10.99,
			currency: "PLN",
		},
		{
			name: "Odbiór w Żabce",
			value: DeliveryMethod.PickupZabka,
			amount: 7.99,
			currency: "PLN",
		},
	];

	const deliveryOptionSelector = useSelector((state) => state.CartStore.checkout.deliveryOption);
	const isDeliveryOptionValidSelector = useSelector((state) => state.CartStore.checkout.isDeliveryOptionValid);
	const selectedDeliveryOptionValue = deliveryOptionSelector?.value;
	const dispatch = useDispatch();

	const handleDeliveryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const option = deliveryOptions.find((o) => o.value === value);
		if (option) {
			dispatch(setDeliveryOption(option));
		}
	};

	return (
		<Card>
			<CardContent>
				<Stack spacing={2}>
					<Typography component={"p"} variant="h6" fontWeight={500}>
						Sposób dostawy
					</Typography>
					<FormControl error={!isDeliveryOptionValidSelector}>
						<RadioGroup value={selectedDeliveryOptionValue} onChange={handleDeliveryChange}>
							{deliveryOptions.map((option) => (
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
										label={<DeliveryOptionLabel option={option} />}
									/>
									<Divider></Divider>
								</div>
							))}
						</RadioGroup>
						<FormHelperText>{!isDeliveryOptionValidSelector ? "Proszę wybrać sposób dostawy." : ""}</FormHelperText>
					</FormControl>
				</Stack>
			</CardContent>
		</Card>
	);
};

interface DeliveryOptionLabelProps {
	option: DeliveryOption;
}

const DeliveryOptionLabel: FC<DeliveryOptionLabelProps> = ({ option }) => {
	return (
		<Stack sx={{ width: "100%" }} direction={"row"} justifyContent={"space-between"} padding={2}>
			<Typography>{option.name}</Typography>
			<Typography fontWeight={500}>{`${formatAmount(option.amount, option.currency)}`}</Typography>
		</Stack>
	);
};

export default CheckoutDeliverySection;
