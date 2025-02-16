import { NavigateNextOutlined } from "@mui/icons-material";
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface AccountOrderDetailsHeaderProps {
	orderId: string;
	orderNumber: number;
}

const AccountOrderDetailsHeader: FC<AccountOrderDetailsHeaderProps> = ({ orderId, orderNumber }) => {
	const breadcrumbs = [
		<Link key={"breadcrumb-group-item"} color="inherit" href={`/`}>
			electro
		</Link>,
		<Link key={"breadcrumb-group-item"} color="inherit" href={`/account/orders`}>
			Zamówienia
		</Link>,
		<Link key={"breadcrumb-group-item"} color="inherit" href={`/account/orders/${orderId}`}>
			Szczegóły
		</Link>,
	];

	return (
		<Stack spacing={1}>
			<Breadcrumbs separator={<NavigateNextOutlined fontSize="small" />} aria-label="breadcrumb">
				{breadcrumbs}
			</Breadcrumbs>
			<Stack>
				<Typography variant={"h6"}>Szczegóły zamówienia nr.</Typography>
				<Typography fontWeight={500} variant="body2">#{orderNumber}</Typography>
			</Stack>
		</Stack>
	);
};

export default AccountOrderDetailsHeader;
