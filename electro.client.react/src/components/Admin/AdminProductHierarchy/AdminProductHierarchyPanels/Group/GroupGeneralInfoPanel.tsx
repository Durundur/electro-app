"use client";
import { useSelector } from "@/libs/Store";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControl, FormControlLabel, FormLabel, Grid2 as Grid, Switch, TextField, Typography } from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import { FC } from "react";
import { FormikProps } from "formik";

interface GroupGeneralInfoPanelProps {
	formik: FormikProps<any>;
}

const GroupGeneralInfoPanel: FC<GroupGeneralInfoPanelProps> = ({ formik }) => {
	const groupSelector = useSelector((state) => state.AdminProductHierarchyPageStore.group);
	const group = groupSelector.data;

	return (
		<Accordion defaultExpanded>
			<AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="GroupGeneralInfoPanel-content" id="GroupGeneralInfoPanel-header">
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
							multiline
							rows={2}
							id="description"
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
					<Grid size={{ xs: 4 }}>
						<TextField
							size="small"
							variant="outlined"
							label="Zdjęcie"
							type="text"
							id="photo"
							value={formik.values["photo"]}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched["photo"] && Boolean(formik.errors["photo"])}
							helperText={formik.touched["photo"] && <>{formik.errors["photo"]}</>}
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
							label="Ikona"
							type="text"
							id="icon"
							value={formik.values["icon"]}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched["icon"] && Boolean(formik.errors["icon"])}
							helperText={formik.touched["icon"] && <>{formik.errors["icon"]}</>}
							slotProps={{
								input: {
									startAdornment: <></>,
								},
							}}
							fullWidth
						/>
					</Grid>
				</Grid>
				{group?.id && (
					<Grid container spacing={2} sx={{ marginTop: 2 }}>
						<Grid size={{ xs: 6 }}>
							<div>
								<Typography variant="body2">Utworzone</Typography>
								<Typography>{new Date(group.createdAt!).toLocaleString()}</Typography>
							</div>
						</Grid>
						<Grid size={{ xs: 6 }}>
							<div>
								<Typography variant="body2">Ostatnia modyfikacja</Typography>
								<Typography>{new Date(group.modifiedAt!).toLocaleString()}</Typography>
							</div>
						</Grid>
					</Grid>
				)}
			</AccordionDetails>
		</Accordion>
	);
};

export default GroupGeneralInfoPanel;
