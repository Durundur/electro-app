"use client";
import { useSelector } from "@/libs/Store";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, Grid2 as Grid, TextField, Typography } from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import { FC } from "react";
import { FormikProps } from "formik";

interface CategoryGeneralInfoPanelProps {
	formik: FormikProps<any>;
}

const CategoryGeneralInfoPanel: FC<CategoryGeneralInfoPanelProps> = ({ formik }) => {
	const category = useSelector((store) => store.AdminProductHierarchyPageStore.category.data);

	return (
		<Accordion defaultExpanded>
			<AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="CategoryGeneralInfoPanel-content" id="CategoryGeneralInfoPanel-header">
				Podstawowe informacje
			</AccordionSummary>
			<AccordionDetails>
				<Grid container spacing={2}>
					<Grid size={{ xs: 4 }}>
						<TextField
							size="small"
							variant="outlined"
							label="Nazwa"
							type="text"
							id="name"
							value={formik.values["name"]}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched["name"] && Boolean(formik.errors["name"])}
							helperText={formik.touched["name"] && <>{formik.errors["name"]}</>}
							slotProps={{
								input: {
									startAdornment: <></>,
								},
							}}
							fullWidth
						/>
					</Grid>
					<Grid size={{ xs: 4 }}>
						<TextField
							size="small"
							variant="outlined"
							label="Kolejność wyświetlania"
							type="text"
							id="displayOrder"
							value={formik.values["displayOrder"]}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched["displayOrder"] && Boolean(formik.errors["displayOrder"])}
							helperText={formik.touched["displayOrder"] && <>{formik.errors["displayOrder"]}</>}
							slotProps={{
								input: {
									startAdornment: <></>,
								},
							}}
							fullWidth
						/>
					</Grid>
					<Grid size={{ xs: 4 }}>
						<FormControlLabel
							control={<Checkbox size="small" id="active" checked={formik.values["active"]} onChange={formik.handleChange} onBlur={formik.handleBlur} />}
							label="Czy aktywny?"
						/>
					</Grid>
					<Grid size={{ xs: 4 }}>
						<TextField
							size="small"
							variant="outlined"
							label="Opis"
							type="text"
							id="description"
							multiline
							rows={2}
							value={formik.values["description"]}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched["description"] && Boolean(formik.errors["description"])}
							helperText={formik.touched["description"] && <>{formik.errors["description"]}</>}
							slotProps={{
								input: {
									startAdornment: <></>,
								},
							}}
							fullWidth
						/>
					</Grid>
				</Grid>
				{category?.id && (
					<Grid container spacing={2} sx={{ marginTop: 2 }}>
						<Grid size={{ xs: 6 }}>
							<div>
								<Typography variant="body2">Utworzone</Typography>
								<Typography>{new Date(category.createdAt!).toLocaleString()}</Typography>
							</div>
						</Grid>
						<Grid size={{ xs: 6 }}>
							<div>
								<Typography variant="body2">Ostatnia modyfikacja</Typography>
								<Typography>{new Date(category.modifiedAt!).toLocaleString()}</Typography>
							</div>
						</Grid>
					</Grid>
				)}
			</AccordionDetails>
		</Accordion>
	);
};

export default CategoryGeneralInfoPanel;
