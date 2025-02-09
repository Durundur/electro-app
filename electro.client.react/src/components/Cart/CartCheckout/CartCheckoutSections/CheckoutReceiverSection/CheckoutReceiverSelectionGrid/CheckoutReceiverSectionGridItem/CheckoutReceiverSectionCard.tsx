import { setRecipientOption } from "@/libs/Cart/slice";
import { deleteRecipient } from "@/libs/Cart/thunks";
import { useDispatch, useSelector } from "@/libs/Store";
import { GetRecipientsResultItem, RecipientType } from "@/libs/api-contract/api-contract";
import { Box, Card, CardActionArea, CardContent, Grid2, Stack, Typography } from "@mui/material";
import { FC } from "react";

interface CheckoutReceiverSectionGridItemProps {
	recipient: GetRecipientsResultItem;
	onEdit: (recipient: GetRecipientsResultItem) => void;
}

const CheckoutReceiverSectionGridItem: FC<CheckoutReceiverSectionGridItemProps> = ({ recipient, onEdit }) => {
	const dispatch = useDispatch();
	const isCompany = recipient.type === RecipientType.Company;
	const isSelected = useSelector((store) => store.CartStore.checkout.recipientOption?.id === recipient.id);
	const userId = useSelector((store) => store.AuthStore.user.id);

	const handleDeleteClick = () => {
		if (!recipient.id || !userId) return;
		dispatch(deleteRecipient(recipient.id, userId));
	};

	const handleSelectRecipient = () => {
		dispatch(setRecipientOption(recipient));
	};

	return (
		<Card
			sx={(theme) => ({
				backgroundColor: isSelected ? theme.palette.action.active2 : "initial",
				height: "100%",
			})}
		>
			<CardActionArea sx={{ height: "100%" }} onClick={handleSelectRecipient}>
				<CardContent sx={{ height: "100%" }}>
					<Grid2 container direction={"column"} sx={{ height: "100%" }} spacing={1}>
						<Grid2 size={{ xs: "grow" }}>{isCompany ? <CompanyReceiverCardContent recipient={recipient} /> : <PersonalReceiverCardContent recipient={recipient} />}</Grid2>
						<Grid2 size={{ xs: "auto" }}>
							<Stack direction={"row"} spacing={1}>
								<Box
									onClick={() => onEdit(recipient)}
									sx={(theme) => ({
										padding: "6px 8px",
										color: theme.palette.primary.main,
										fontSize: theme.typography.fontSize,
										lineHeight: "1.75rem",
										width: "65px",
										borderRadius: "6px",
										textAlign: "center",
										cursor: "pointer",
										"&:hover": {
											backgroundColor: theme.palette.action.hover,
										},
									})}
								>
									Edytuj
								</Box>
								<Box
									onClick={() => handleDeleteClick()}
									sx={(theme) => ({
										padding: "6px 8px",
										color: theme.palette.primary.main,
										fontSize: theme.typography.fontSize,
										lineHeight: "1.75rem",
										width: "65px",
										borderRadius: "6px",
										textAlign: "center",
										cursor: "pointer",
										"&:hover": {
											backgroundColor: theme.palette.action.hover,
										},
									})}
								>
									Usuń
								</Box>
							</Stack>
						</Grid2>
					</Grid2>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

interface CompanyReceiverCardContentProps {
	recipient: GetRecipientsResultItem;
}

const CompanyReceiverCardContent: FC<CompanyReceiverCardContentProps> = ({ recipient }) => {
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

interface PersonalReceiverCardContentProps {
	recipient: GetRecipientsResultItem;
}

const PersonalReceiverCardContent: FC<PersonalReceiverCardContentProps> = ({ recipient }) => {
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

export default CheckoutReceiverSectionGridItem;
