import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid2 as Grid, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import { FormikProps } from "formik";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "@/libs/Store";
import { CreateOrUpdateProductCommand } from "@/libs/api-contract/api-contract";
import { clearProductHierarchyState } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/slice";
import { fetchProductHierarchy } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/thunk";

interface GeneralInfoPanelProps {
	formik: FormikProps<CreateOrUpdateProductCommand>;
}

const GeneralInfoPanel: FC<GeneralInfoPanelProps> = ({ formik }) => {
	const dispatch = useDispatch();
	const productHierarchySelector = useSelector((store) => store.AdminProductCatalogNewEditPageStore.productHierarchy);

	const selectedGroupId = formik.values.groupId || 0;
	const selectedCategoryId = formik.values.categoryId || 0;

	const groups = productHierarchySelector.data?.groups;
	const categories = groups?.find((g) => g.id === selectedGroupId)?.categories;
	const subCategories = categories?.find((c) => c.id === selectedCategoryId)?.subCategories;

	useEffect(() => {
		dispatch(fetchProductHierarchy());
		return () => {
			dispatch(clearProductHierarchyState());
		};
	}, []);

	const handleGroupChange = (formik: FormikProps<CreateOrUpdateProductCommand>, newGroupId: number | string) => {
		formik.setFieldValue("groupId", newGroupId);
		formik.setFieldValue("categoryId", 0);
		formik.setFieldValue("subCategoryId", 0);
	};

	const handleCategoryChange = (formik: FormikProps<CreateOrUpdateProductCommand>, newCategoryId: number | string) => {
		formik.setFieldValue("categoryId", newCategoryId);
		formik.setFieldValue("subCategoryId", 0);
	};

	const handleSubCategoryChange = (formik: FormikProps<CreateOrUpdateProductCommand>, newSubCategoryId: number | string) => {
		formik.setFieldValue("subCategoryId", newSubCategoryId);
	};

	return (
		<Accordion defaultExpanded>
			<AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1-content" id="panel1-header">
				Informacje ogólne
			</AccordionSummary>
			<AccordionDetails>
				<Stack direction="column" spacing={2}>
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
					<Grid container spacing={2}>
						<Grid size={{ xs: 4 }}>
							<TextField
								size="small"
								variant="outlined"
								label="Cena"
								type="number"
								id="amount"
								value={formik.values["amount"]}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched["amount"] && Boolean(formik.errors["amount"])}
								helperText={formik.touched["amount"] && <>{formik.errors["amount"]}</>}
								slotProps={{
									input: {
										startAdornment: <></>,
									},
								}}
								fullWidth
							/>
						</Grid>
						<Grid size={{ xs: 4 }}>
							<FormControl size="small" fullWidth error={formik.touched["currency"] && Boolean(formik.errors["currency"])}>
								<InputLabel id="priceCurrency-label">Waluta</InputLabel>
								<Select
									labelId="priceCurrency-label"
									id="currency"
									label="Waluta"
									value={formik.values["currency"]}
									onChange={(event) => formik.setFieldValue("currency", event.target.value)}
									onBlur={formik.handleBlur}
								>
									<MenuItem value={""}>Wybierz walutę</MenuItem>
									<MenuItem value={"PLN"}>PLN</MenuItem>
									<MenuItem value={"USD"}>USD</MenuItem>
									<MenuItem value={"EUR"}>EUR</MenuItem>
								</Select>
								{formik.touched["currency"] && formik.errors["currency"] && <FormHelperText>{formik.errors["currency"] as string}</FormHelperText>}
							</FormControl>
						</Grid>
					</Grid>
					<Grid container spacing={2} size={{ xs: 6 }}>
						<Grid>
							<FormControlLabel
								control={<Checkbox size="small" id="active" checked={formik.values["active"]} onChange={formik.handleChange} onBlur={formik.handleBlur} />}
								label="Czy aktywny?"
							/>
						</Grid>
						<Grid>
							<TextField
								size="small"
								variant="outlined"
								label="Dostępna ilość"
								type="number"
								id="stockQuantity"
								value={formik.values["stockQuantity"]}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched["stockQuantity"] && Boolean(formik.errors["stockQuantity"])}
								helperText={formik.touched["stockQuantity"] && <>{formik.errors["stockQuantity"]}</>}
								slotProps={{
									input: {
										startAdornment: <></>,
									},
								}}
								fullWidth
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid size={{ xs: 4 }}>
							<FormControl size="small" fullWidth>
								<InputLabel id="group-label">Grupa</InputLabel>
								<Select
									labelId="group-label"
									id="groupId"
									label="Grupa"
									value={formik.values["groupId"]}
									onChange={(event) => handleGroupChange(formik, event.target.value)}
									error={formik.touched["groupId"] && Boolean(formik.errors["groupId"])}
								>
									<MenuItem value={0} defaultValue={0}>
										Wybierz grupę
									</MenuItem>
									{groups?.map((group) => (
										<MenuItem key={group.id} value={group.id}>
											{group.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid size={{ xs: 4 }}>
							<FormControl size="small" fullWidth>
								<InputLabel id="category-label">Kategoria</InputLabel>
								<Select
									labelId="category-label"
									id="categoryId"
									label="Kategoria"
									value={formik.values["categoryId"]}
									onChange={(event) => handleCategoryChange(formik, event.target.value)}
									error={formik.touched["categoryId"] && Boolean(formik.errors["categoryId"])}
									fullWidth
								>
									<MenuItem value={0} defaultValue={0}>
										Wybierz kategorię
									</MenuItem>
									{categories?.map((category) => (
										<MenuItem key={category.id} value={category.id}>
											{category.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid size={{ xs: 4 }}>
							<FormControl size="small" fullWidth>
								<InputLabel id="subCategory-label">Podkategoria</InputLabel>
								<Select
									labelId="subCategory-label"
									id="subCategoryId"
									label="Podkategoria"
									value={formik.values["subCategoryId"]}
									onChange={(event) => handleSubCategoryChange(formik, event.target.value)}
									error={formik.touched["subCategoryId"] && Boolean(formik.errors["subCategoryId"])}
								>
									<MenuItem value={0} defaultValue={0}>
										Wybierz podkategorię
									</MenuItem>
									{subCategories?.map((subCategory) => (
										<MenuItem key={subCategory.id} value={subCategory.id}>
											{subCategory.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};

export default GeneralInfoPanel;
