import EditSectionLayout from "@/components/Layout/EditSectionLayout/EditSectionLayout";
import SelectInput from "@/components/Shared/SelectInput/SelectInput";
import { translatePaymentMethod, translatePaymentStatus } from "@/libs/Helpers/Translations/OrdersTranslations";
import { useSelector } from "@/libs/Store";
import { PaymentMethod, PaymentStatus } from "@/libs/api-contract/rest-api-contract";
import { Grid2, MenuItem } from "@mui/material";
import { FC } from "react";

const AdminOrderEditPaymentSection: FC = () => {
	const orderSelector = useSelector((store) => store.AdminOrdersStore.edit.data);
	const paymentMethod = orderSelector?.payment?.method;
	const paymentStatus = orderSelector?.payment?.status;

	return (
		<EditSectionLayout title="Informacje o płatności">
			<Grid2 container columnSpacing={2} rowSpacing={2}>
				<Grid2 size={{ xs: 12, sm: 6 }}>
					<SelectInput fullWidth size="small" label="Sposób płatności" id={"paymentMethod"} name={"paymentMethod"} displayEmpty value={paymentMethod} disabled>
						<MenuItem sx={{ display: "none" }} value={""}></MenuItem>
						{Object.values(PaymentMethod).map((method) => (
							<MenuItem key={`paymentMethod-option-${method}`} value={method}>
								{translatePaymentMethod(method)}
							</MenuItem>
						))}
					</SelectInput>
				</Grid2>
				<Grid2 size={{ xs: 12, sm: 6 }}>
					<SelectInput fullWidth size="small" label="Status płatności" id={"paymentStatus"} name={"paymentStatus"} displayEmpty value={paymentStatus} disabled>
						<MenuItem sx={{ display: "none" }} value={""}></MenuItem>
						{Object.values(PaymentStatus).map((status) => (
							<MenuItem key={`paymentStatus-option-${status}`} value={status}>
								{translatePaymentStatus(status)}
							</MenuItem>
						))}
					</SelectInput>
				</Grid2>
			</Grid2>
		</EditSectionLayout>
	);
};

export default AdminOrderEditPaymentSection;
