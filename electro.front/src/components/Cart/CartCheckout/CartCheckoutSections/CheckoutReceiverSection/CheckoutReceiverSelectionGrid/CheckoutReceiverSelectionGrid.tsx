import { Box, Button, FormHelperText, Grid2, Stack } from "@mui/material";
import { FC } from "react";
import CheckoutReceiverSectionGridItem from "./CheckoutReceiverSectionGridItem/CheckoutReceiverSectionCard";
import { GetRecipientsResultItem } from "@/libs/api-contract/api-contract";
import { useSelector } from "@/libs/Store";

interface CheckoutReceiverSelectionGridProps {
	recipients: GetRecipientsResultItem[];
	onAddNew: () => void;
	onEdit: (recipient: GetRecipientsResultItem) => void;
}

const CheckoutReceiverSelectionGrid: FC<CheckoutReceiverSelectionGridProps> = ({ recipients, onAddNew, onEdit }) => {
	const isRecipientOptionValidSelector = useSelector((state) => state.CartStore.checkout.isRecipientOptionValid);

	return (
		<Stack spacing={2}>
			<Grid2 container spacing={2} alignItems={"stretch"}>
				{recipients.map((r) => (
					<Grid2 size={{ xs: 4 }} key={r.id}>
						<CheckoutReceiverSectionGridItem recipient={r} onEdit={onEdit} />
					</Grid2>
				))}
			</Grid2>
			<Box display={"flex"} justifyContent={"center"}>
				<Button variant="contained" onClick={onAddNew}>
					Dodaj nowe dane
				</Button>
			</Box>
			<FormHelperText error={!isRecipientOptionValidSelector}>{!isRecipientOptionValidSelector ? "Proszę wybrać dane odbiorcy." : ""}</FormHelperText>
		</Stack>
	);
};

export default CheckoutReceiverSelectionGrid;
