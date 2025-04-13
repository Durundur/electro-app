import { UpdateOrderCommandFlat } from "@/app/(admin)/admin/orders/[id]/edit/page";
import EditSectionLayout from "@/components/Layout/EditSectionLayout/EditSectionLayout";
import SelectInput from "@/components/Shared/SelectInput/SelectInput";
import TextInput from "@/components/Shared/TextInput/TextInput";
import { translateDeliveryMethod, translateDeliveryStatus } from "@/libs/Helpers/Translations/OrdersTranslations";
import { useSelector } from "@/libs/Store";
import { DeliveryMethod, DeliveryStatus } from "@/libs/api-contract/api-contract";
import { Grid2, MenuItem } from "@mui/material";
import { FormikProps } from "formik";
import { FC } from "react";

interface AdminOrderEditDeliverySectionProps {
	formik: FormikProps<UpdateOrderCommandFlat>;
	isTrackingNumberReadOnly?: boolean;
}

const AdminOrderEditDeliverySection: FC<AdminOrderEditDeliverySectionProps> = ({ formik, isTrackingNumberReadOnly = false }) => {
	const orderSelector = useSelector((store) => store.AdminOrdersStore.edit.data);
	const deliveryMethod = orderSelector?.delivery?.method;
	const deliveryStatus = orderSelector?.delivery?.status;

	return (
		<EditSectionLayout title="Informacje o wysyłce" subtitle="Edytuj informacje o wysyłce">
			<Grid2 container columnSpacing={2} rowSpacing={2}>
				<Grid2 size={{ xs: 12, sm: 6 }}>
					<SelectInput fullWidth size="small" label="Sposób dostawy" id={"deliveryMethod"} name={"deliveryMethod"} displayEmpty value={deliveryMethod} disabled>
						<MenuItem sx={{ display: "none" }} value={""}></MenuItem>
						{Object.values(DeliveryMethod).map((method) => (
							<MenuItem key={`deliveryMethod-option-${method}`} value={method}>
								{translateDeliveryMethod(method)}
							</MenuItem>
						))}
					</SelectInput>
				</Grid2>
				<Grid2 size={{ xs: 12, sm: 6 }}>
					<SelectInput fullWidth size="small" label="Status dostawy" id={"deliveryStatus"} name={"deliveryStatus"} displayEmpty value={deliveryStatus} disabled>
						<MenuItem sx={{ display: "none" }} value={""}></MenuItem>
						{Object.values(DeliveryStatus).map((status) => (
							<MenuItem key={`deliveryStatus-option-${status}`} value={status}>
								{translateDeliveryStatus(status)}
							</MenuItem>
						))}
					</SelectInput>
				</Grid2>
				<Grid2 size={{ xs: 12, sm: 6 }}>
					<TextInput
						size="small"
						variant="outlined"
						label="Numer przesyłki"
						type="text"
						id="trackingNumber"
						value={formik.values["trackingNumber"]}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched["trackingNumber"] && Boolean(formik.errors["trackingNumber"])}
						helperText={formik.touched["trackingNumber"] && <>{formik.errors["trackingNumber"]}</>}
						fullWidth
						disabled={!isTrackingNumberReadOnly}
					></TextInput>
				</Grid2>
			</Grid2>
		</EditSectionLayout>
	);
};

export default AdminOrderEditDeliverySection;
