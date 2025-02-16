import { UpdateOrderCommandFlat } from "@/app/(admin)/admin/orders/[id]/edit/page";
import EditSectionLayout from "@/components/Layout/EditSectionLayout/EditSectionLayout";
import TextInput from "@/components/Shared/TextInput/TextInput";
import { Grid2 } from "@mui/material";
import { FormikProps } from "formik";
import { FC } from "react";

interface AdminOrderEditDeliverySectionProps {
	formik: FormikProps<UpdateOrderCommandFlat>;
}

const AdminOrderEditDeliverySection: FC<AdminOrderEditDeliverySectionProps> = ({ formik }) => {
	return (
		<EditSectionLayout title="Informacje o wysyłce" subtitle="Edytuj informacje o wysyłce">
			<Grid2 container>
				<Grid2 size={{ xs: 6 }}>
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
					/>
				</Grid2>
			</Grid2>
		</EditSectionLayout>
	);
};

export default AdminOrderEditDeliverySection;
