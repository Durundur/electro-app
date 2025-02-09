import { translateDeliveryMethod } from "@/libs/Helpers/Translations/OrdersTranslations";
import { Delivery } from "@/libs/api-contract/api-contract";
import { OpenInNewRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";

interface AdminOrderDetailsDeliveryProps {
	delivery: Delivery;
}

const AdminOrderDetailsDelivery: FC<AdminOrderDetailsDeliveryProps> = ({ delivery }) => {
	return (
		<Stack>
			<Typography fontWeight={500} variant="subtitle1">
				Dostawa
			</Typography>
			<Typography variant="body2">Sposób dostawy: {translateDeliveryMethod(delivery.method!)}</Typography>
			<Stack direction={"row"} alignItems={"center"} spacing={2}>
				<Typography variant="body2">Numer przesyłki: </Typography>
				<Button sx={{ paddingY: 0 }} size="small" variant="outlined" color="inherit" endIcon={<OpenInNewRounded fontSize="small" />}>
					852313067057
				</Button>
			</Stack>
		</Stack>
	);
};

export default AdminOrderDetailsDelivery;
