import { Stack, Typography } from "@mui/material";
import { FC } from "react";

interface AdminOrderDetailsHeaderProps {
	orderNumber: number;
}

const AdminOrderDetailsHeader: FC<AdminOrderDetailsHeaderProps> = ({ orderNumber }) => {
	return (
		<Stack>
			<Typography variant={"body2"}>Zamówienie nr</Typography>
			<Typography fontWeight={500}>#{orderNumber}</Typography>
		</Stack>
	);
};

export default AdminOrderDetailsHeader;
