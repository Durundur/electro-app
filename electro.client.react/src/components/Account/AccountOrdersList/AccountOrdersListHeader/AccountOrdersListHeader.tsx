import { NavigateNextOutlined } from "@mui/icons-material";
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

const AccountOrdersListHeader: FC = () => {
	const breadcrumbs = [
		<Link key={"breadcrumb-group-item"} color="inherit" href={`/`}>
			electro
		</Link>,
		<Link key={"breadcrumb-group-item"} color="inherit" href={`/account/orders`}>
			Zamówienia
		</Link>,
	];

	return (
		<Stack spacing={1}>
			<Breadcrumbs separator={<NavigateNextOutlined fontSize="small" />} aria-label="breadcrumb">
				{breadcrumbs}
			</Breadcrumbs>
			<Typography variant="h5">Historia zamówień</Typography>
		</Stack>
	);
};

export default AccountOrdersListHeader;
