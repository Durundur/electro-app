import { UpdateOrderCommandFlat } from "@/app/(admin)/admin/orders/[id]/edit/page";
import EditSectionLayout from "@/components/Layout/EditSectionLayout/EditSectionLayout";
import { translateOrderStatus } from "@/libs/Helpers/Translations/OrdersTranslations";
import { OrderStatus } from "@/libs/api-contract/api-contract";
import { FormControl, FormLabel, Grid2, MenuItem, Select, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { FC } from "react";

interface AdminOrderEditGeneralSectionProps {
	formik: FormikProps<UpdateOrderCommandFlat>;
}

const AdminOrderEditGeneralSection: FC<AdminOrderEditGeneralSectionProps> = ({ formik }) => {
	return (
		<EditSectionLayout title="Status zamówienia" subtitle="Edytuj informacje o statusie">
			<Grid2 container>
				<Grid2 size={{ xs: 6 }}>
					<FormControl size="small" fullWidth>
						<FormLabel id="orderStatus-label">
							<Typography fontWeight={500}>Status zamówienia</Typography>
						</FormLabel>
						<Select
							labelId="orderStatus-label"
							id="orderStatus"
							value={formik.values.status ?? ""}
							onChange={(event) => formik.setFieldValue("status", event.target.value)}
							error={formik.touched.status && Boolean(formik.errors.status)}
							onBlur={formik.handleBlur}
						>
							<MenuItem sx={{ display: "none" }} value={""}></MenuItem>
							{Object.values(OrderStatus).map((status) => (
								<MenuItem key={`orderStatus-${status}`} value={status}>
									{translateOrderStatus(status)}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid2>
			</Grid2>
		</EditSectionLayout>
	);
};

export default AdminOrderEditGeneralSection;
