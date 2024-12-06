import { AttributeDefinitionCommand, AttributeDefinitionResult, AttributeType } from "@/libs/api-contract/api-contract";
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { Formik } from "formik";
import { FC } from "react";
import * as yup from "yup";

interface AttributeDialogProps {
	open: boolean;
	attribute?: AttributeDefinitionResult;
	onClose: () => void;
	onSave: (attribute: AttributeDefinitionCommand) => void;
}

const AttributeDefinitionDialog: FC<AttributeDialogProps> = ({ open, onClose, onSave, attribute }) => {
	const getInitialValues = (attribute?: AttributeDefinitionResult) => {
		let initialValues: AttributeDefinitionCommand = {
			id: undefined,
			name: "",
			description: "",
			isRequired: false,
			type: undefined,
		};
		if (attribute) {
			initialValues = {
				id: attribute.id,
				name: attribute.name,
				description: attribute.description,
				isRequired: attribute.isRequired,
				type: attribute.type,
			};
		}
		return initialValues;
	};

	const formValidationSchema = yup.object({
		name: yup.string().required("Nazwa jest wymagana"),
		description: yup.string(),
		isRequired: yup.bool(),
		type: yup.string(),
	});

	return (
		<Dialog disableEscapeKeyDown maxWidth="xs" fullWidth open={open} onClose={onClose}>
			<DialogTitle>{attribute?.id ? "Edytuj atrybut" : "Dodaj nowy atrybut"}</DialogTitle>
			<Formik enableReinitialize initialValues={getInitialValues(attribute)} onSubmit={onSave} validationSchema={formValidationSchema}>
				{(formik) => (
					<>
						<DialogContent>
							<Stack direction={"column"} marginTop={1} spacing={2}>
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
								<TextField
									margin="dense"
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

								<FormControl size="small">
									<InputLabel id="type-select-label">Typ</InputLabel>
									<Select
										labelId="type-select-label"
										id="type-select"
										label="Age"
										value={formik.values.type || ""}
										onChange={(event) => formik.setFieldValue("type", event.target.value)}
										error={formik.touched.type && Boolean(formik.errors.type)}
										fullWidth
									>
										<MenuItem value="">
											<em>Wybierz typ</em>
										</MenuItem>
										<MenuItem value={""}>String</MenuItem>
										<MenuItem value={""}>Number</MenuItem>
										<MenuItem value={""}>Boolean</MenuItem>
									</Select>
								</FormControl>

								<FormControlLabel control={<Checkbox size="small" id="isRequired" checked={formik.values["isRequired"]} onChange={formik.handleChange} />} label="Czy obowiązkowy" />
							</Stack>
						</DialogContent>
						<DialogActions>
							<Button onClick={onClose}>Anuluj</Button>
							<Button onClick={() => formik.submitForm()} variant="contained" color="primary">
								Zapisz
							</Button>
						</DialogActions>
					</>
				)}
			</Formik>
		</Dialog>
	);
};

export default AttributeDefinitionDialog;
