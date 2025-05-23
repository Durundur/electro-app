import { Card, CardContent, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import CheckoutReceiverForm from "./CheckoutReceiverForm/CheckoutReceiverForm";
import CheckoutReceiverSelectionGrid from "./CheckoutReceiverSelectionGrid/CheckoutReceiverSelectionGrid";
import { fetchRecipients } from "@/libs/Cart/thunks";
import { useDispatch, useSelector } from "@/libs/Store";
import { GetRecipientsResultItem } from "@/libs/api-contract/rest-api-contract";

const CheckoutReceiverSection: FC = () => {
	const dispatch = useDispatch();
	const recipientsSelector = useSelector((store) => store.CartStore.checkoutRecipients.data);
	const recipientsErrorSelector = useSelector((store) => store.CartStore.checkoutRecipients.error);
	const hasSavedRecipients = recipientsSelector && !recipientsErrorSelector && recipientsSelector.recipients && recipientsSelector.recipients.length > 0;

	const [viewMode, setViewMode] = useState<"list" | "form">(hasSavedRecipients ? "list" : "form");
	const [editingRecipient, setEditingRecipient] = useState<GetRecipientsResultItem | null>(null);
	const userId = useSelector((store) => store.AuthStore.user.id);

	useEffect(() => {
		if (!userId) return;
		dispatch(fetchRecipients(userId));
	}, [userId]);

	useEffect(() => {
		if (hasSavedRecipients) {
			setViewMode("list");
		} else {
			setViewMode("form");
		}
	}, [hasSavedRecipients]);

	const handleAddNewClick = () => {
		setEditingRecipient(null);
		setViewMode("form");
	};

	const handleEditClick = (recipient: GetRecipientsResultItem) => {
		setEditingRecipient(recipient);
		setViewMode("form");
	};

	const handleFormCancel = () => {
		setEditingRecipient(null);
		setViewMode("list");
	};

	return (
		<Card>
			<CardContent>
				<Stack spacing={2}>
					<Typography component={"p"} variant="h6" fontWeight={500}>
						Dane odbiorcy przesyłki
					</Typography>
					{viewMode === "list" && hasSavedRecipients && <CheckoutReceiverSelectionGrid recipients={recipientsSelector.recipients!} onAddNew={handleAddNewClick} onEdit={handleEditClick} />}
					{viewMode === "form" && <CheckoutReceiverForm recipient={editingRecipient} onCancel={handleFormCancel} />}
				</Stack>
			</CardContent>
		</Card>
	);
};

export default CheckoutReceiverSection;
