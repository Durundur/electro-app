import { AttributeDefinitionCommand, AttributeDefinitionResult, AttributeType } from "@/libs/api-contract/rest-api-contract";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
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
			isFilterable: false,
		};
		if (attribute) {
			initialValues = {
				id: attribute.id,
				name: attribute.name,
				description: attribute.description,
				isRequired: attribute.isRequired,
				type: attribute.type,
				isFilterable: attribute.isFilterable,
			};
		}
		return initialValues;
	};

	const formValidationSchema = yup.object({
		name: yup.string().required("Nazwa jest wymagana"),
		description: yup.string(),
		isRequired: yup.bool(),
		type: yup.string().required("Typ jest wymagany"),
		isFilterable: yup.bool(),
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

								<FormControl size="small" error={formik.touched["type"] && Boolean(formik.errors["type"])}>
									<InputLabel id="type-select-label">Typ</InputLabel>
									<Select
										labelId="type-select-label"
										id="type"
										label="Typ"
										value={formik.values.type || ""}
										onChange={(event) => formik.setFieldValue("type", event.target.value)}
										error={formik.touched.type && Boolean(formik.errors.type)}
										onBlur={formik.handleBlur}
										fullWidth
									>
										<MenuItem value="">Wybierz typ</MenuItem>
										<MenuItem value={AttributeType.Text}>Text</MenuItem>
										<MenuItem value={AttributeType.List}>List</MenuItem>
										<MenuItem value={AttributeType.Boolean}>Boolean</MenuItem>
									</Select>
									{formik.touched["type"] && formik.errors["type"] && <FormHelperText>{formik.errors["type"] as string}</FormHelperText>}
								</FormControl>

								<FormControlLabel control={<Checkbox size="small" id="isRequired" checked={formik.values["isRequired"]} onChange={formik.handleChange} />} label="Czy obowiązkowy" />

								<FormControlLabel
									control={<Checkbox size="small" id="isFilterable" checked={formik.values["isFilterable"]} onChange={formik.handleChange} />}
									label="Czy dostępny w filtrach"
								/>
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
