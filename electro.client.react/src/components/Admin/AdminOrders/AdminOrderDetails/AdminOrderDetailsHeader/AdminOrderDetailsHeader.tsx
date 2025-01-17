import { Stack, Typography } from "@mui/material";
import { FC } from "react";

interface AdminOrderDetailsHeaderProps {
	orderId: string;
}

const AdminOrderDetailsHeader: FC<AdminOrderDetailsHeaderProps> = ({ orderId }) => {
	return (
		<Stack>
			<Typography variant={"body2"}>Zamówienie nr</Typography>
			<Typography fontWeight={500}>#{orderId}</Typography>
		</Stack>
	);
};

export default AdminOrderDetailsHeader;
