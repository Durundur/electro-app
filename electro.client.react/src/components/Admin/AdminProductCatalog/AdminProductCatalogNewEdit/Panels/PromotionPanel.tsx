import EditSectionLayout from "@/components/Layout/EditSectionLayout/EditSectionLayout";
import TextInput from "@/components/Shared/TextInput/TextInput";
import { IProductForm } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/interfaces";
import { ExpandMoreRounded } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, Grid2 } from "@mui/material";
import { FormikProps } from "formik";
import { FC } from "react";
import dayjs from "dayjs";

interface PromotionPanelProps {
	formik: FormikProps<IProductForm>;
}

const PromotionPanel: FC<PromotionPanelProps> = ({ formik }) => {
	return (
		<Accordion defaultExpanded>
			<AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="promotion-panel-content" id="promotion-panel-header">
				Promocja
			</AccordionSummary>
			<AccordionDetails>
				<EditSectionLayout title="Informacje o promocji" subtitle="Edytuj informacje o promocji">
					<Grid2 container spacing={2}>
						<Grid2 size={{ xs: 12 }}>
							<FormControlLabel
								control={
									<Checkbox
										size="small"
										id="promotionIsActive"
										name="promotionIsActive"
										checked={formik.values.promotionIsActive}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								}
								label="Aktywna promocja"
							/>
						</Grid2>
						<Grid2 size={{ xs: 6 }}>
							<TextInput
								size="small"
								variant="outlined"
								label="Cena promocyjna"
								type="number"
								id="promotionAmount"
								name="promotionAmount"
								value={formik.values.promotionAmount}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.promotionAmount && Boolean(formik.errors.promotionAmount)}
								helperText={formik.touched.promotionAmount && formik.errors.promotionAmount}
								fullWidth
							/>
						</Grid2>
						<Grid2 size={{ xs: 6 }}>
							<TextInput
								size="small"
								variant="outlined"
								label="Waluta promocji"
								type="text"
								id="promotionCurrency"
								name="promotionCurrency"
								value={formik.values.promotionCurrency}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.promotionCurrency && Boolean(formik.errors.promotionCurrency)}
								helperText={formik.touched.promotionCurrency && formik.errors.promotionCurrency}
								fullWidth
							/>
						</Grid2>
						<Grid2 size={{ xs: 6 }}>
							<DatePicker
								label="Data rozpoczęcia"
								name="promotionStartDate"
								value={formik.values.promotionStartDate ? dayjs(formik.values.promotionStartDate) : null}
								onChange={formik.handleChange}
								slotProps={{
									textField: {
										size: "small",
										fullWidth: true,
										error: formik.touched.promotionStartDate && Boolean(formik.errors.promotionStartDate),
										helperText: formik.touched.promotionStartDate && formik.errors.promotionStartDate,
									},
								}}
								sx={(theme) => ({
									"& legend > span": {
										display: "none",
									},
									"& label": {
										position: "initial",
										transform: "none",
										pointerEvents: "auto",
										fontSize: theme.typography.body1.fontSize,
										fontWeight: 500,
										color: theme.palette.text.secondary,
										marginBottom: 0.25,
										"&.Mui-focused, &.Mui-error": {
											color: theme.palette.text.secondary,
										},
									},
								})}
							/>
						</Grid2>
						<Grid2 size={{ xs: 6 }}>
							<DatePicker
								label="Data zakończenia"
								name="promotionEndDate"
								value={formik.values.promotionEndDate ? dayjs(formik.values.promotionEndDate) : null}
								onChange={formik.handleChange}
								slotProps={{
									textField: {
										size: "small",
										fullWidth: true,
										error: formik.touched.promotionEndDate && Boolean(formik.errors.promotionEndDate),
										helperText: formik.touched.promotionEndDate && formik.errors.promotionEndDate,
									},
								}}
								sx={(theme) => ({
									"& legend > span": {
										display: "none",
									},
									"& label": {
										position: "initial",
										transform: "none",
										pointerEvents: "auto",
										fontSize: theme.typography.body1.fontSize,
										fontWeight: 500,
										color: theme.palette.text.secondary,
										marginBottom: 0.25,
										"&.Mui-focused, &.Mui-error": {
											color: theme.palette.text.secondary,
										},
									},
								})}
							/>
						</Grid2>
					</Grid2>
				</EditSectionLayout>
			</AccordionDetails>
		</Accordion>
	);
};

export default PromotionPanel;
