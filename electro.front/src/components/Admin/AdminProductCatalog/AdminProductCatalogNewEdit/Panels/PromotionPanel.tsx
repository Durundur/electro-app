import EditSectionLayout from "@/components/Layout/EditSectionLayout/EditSectionLayout";
import TextInput from "@/components/Shared/TextInput/TextInput";
import { IProductForm } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/interfaces";
import { ExpandMoreRounded } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, Grid2, MenuItem } from "@mui/material";
import { FormikProps } from "formik";
import { FC } from "react";
import dayjs from "dayjs";
import SelectInput from "@/components/Shared/SelectInput/SelectInput";

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
				<EditSectionLayout subtitle="Edytuj informacje o promocji">
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
								id="promotionAmount"
								name="promotionAmount"
								type="number"
								value={formik.values.promotionAmount}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.promotionAmount && Boolean(formik.errors.promotionAmount)}
								helperText={formik.touched.promotionAmount && formik.errors.promotionAmount}
								fullWidth
							/>
						</Grid2>
						<Grid2 size={{ xs: 6 }}>
							<SelectInput
								fullWidth
								size="small"
								label="Waluta promocji"
								id="promotionCurrency"
								name="promotionCurrency"
								displayEmpty
								value={formik.values.promotionCurrency}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.promotionCurrency && Boolean(formik.errors.promotionCurrency)}
								helperText={formik.touched.promotionCurrency && formik.errors.promotionCurrency ? formik.errors.promotionCurrency : undefined}
							>
								<MenuItem value={""}>Wybierz walutę</MenuItem>
								<MenuItem value={"PLN"}>PLN</MenuItem>
								<MenuItem value={"USD"}>USD</MenuItem>
								<MenuItem value={"EUR"}>EUR</MenuItem>
							</SelectInput>
						</Grid2>
						<Grid2 size={{ xs: 6 }}>
							<DatePicker
								label="Data rozpoczęcia"
								name="promotionStartDate"
								value={formik.values.promotionStartDate ? dayjs(formik.values.promotionStartDate) : null}
								onChange={(date) => formik.setFieldValue("promotionStartDate", date?.toDate())}
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
								onChange={(date) => formik.setFieldValue("promotionEndDate", date?.toDate())}
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
