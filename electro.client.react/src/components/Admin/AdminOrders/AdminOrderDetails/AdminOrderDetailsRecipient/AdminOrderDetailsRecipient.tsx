import { Recipient, RecipientType } from "@/libs/api-contract/api-contract";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

interface AdminOrderDetailsRecipientProps {
	recipient: Recipient;
}

const AdminOrderDetailsRecipient: FC<AdminOrderDetailsRecipientProps> = ({ recipient }) => {
	const isCompany = recipient.type === RecipientType.Company;
	return (
		<Stack>
			<Typography fontWeight={500} variant="subtitle1">Odbiorca</Typography>
			{isCompany ? (
				<Typography paddingY={0.5}>{recipient.companyName}</Typography>
			) : (
				<Typography paddingY={0.5}>
					{recipient.firstName} {recipient.surname}
				</Typography>
			)}
			<Typography variant="body2">
				{recipient.street} {recipient.houseNumber}
			</Typography>
			<Typography variant="body2">
				{recipient.postalCode} {recipient.city}
			</Typography>
			<Typography variant="body2">telefon: {recipient.phoneNumber}</Typography>
			{isCompany && <Typography variant="body2">NIP: {recipient.taxIdentificationNumber}</Typography>}
		</Stack>
	);
};

export default AdminOrderDetailsRecipient;
