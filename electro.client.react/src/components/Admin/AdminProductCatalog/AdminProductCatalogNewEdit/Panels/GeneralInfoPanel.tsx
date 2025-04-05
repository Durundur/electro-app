import { Accordion, AccordionDetails, AccordionSummary, Grid2 as Grid, MenuItem, Typography } from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import { FormikProps } from "formik";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "@/libs/Store";
import { ProductStatus } from "@/libs/api-contract/api-contract";
import { clearProductHierarchyState } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/slice";
import { fetchProductHierarchy } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/thunk";
import SelectInput from "@/components/Shared/SelectInput/SelectInput";
import { translateProductStatus } from "@/libs/Helpers/Translations/ProductsTranslations";
import TextInput from "@/components/Shared/TextInput/TextInput";
import { IProductForm } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/interfaces";
import EditSectionLayout from "@/components/Layout/EditSectionLayout/EditSectionLayout";

interface GeneralInfoPanelProps {
	formik: FormikProps<IProductForm>;
}

const GeneralInfoPanel: FC<GeneralInfoPanelProps> = ({ formik }) => {
	const dispatch = useDispatch();
	const productHierarchySelector = useSelector((store) => store.AdminProductCatalogNewEditPageStore.productHierarchy);
	const productSelector = useSelector((store) => store.AdminProductCatalogNewEditPageStore.product.data);

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

	const handleGroupChange = (formik: FormikProps<IProductForm>, newGroupId: number | string) => {
		formik.setFieldValue("groupId", newGroupId || undefined);
		formik.setFieldValue("categoryId", undefined);
		formik.setFieldValue("subCategoryId", undefined);
	};

	const handleCategoryChange = (formik: FormikProps<IProductForm>, newCategoryId: number | string) => {
		formik.setFieldValue("categoryId", newCategoryId || undefined);
		formik.setFieldValue("subCategoryId", undefined);
	};

	const handleSubCategoryChange = (formik: FormikProps<IProductForm>, newSubCategoryId: number | string) => {
		formik.setFieldValue("subCategoryId", newSubCategoryId || undefined);
	};

	return (
		<Accordion defaultExpanded>
			<AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1-content" id="panel1-header">
				Informacje ogólne
			</AccordionSummary>
			<AccordionDetails>
				<EditSectionLayout subtitle="Edytuj informacje o produkcie">
					<Grid container spacing={2}>
						<Grid size={{ xs: 12 }}>
							<TextInput
								size="small"
								variant="outlined"
								label="Nazwa"
								type="text"
								id="name"
								value={formik.values.name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.name && Boolean(formik.errors.name)}
								helperText={formik.touched.name && <>{formik.errors.name}</>}
								fullWidth
							></TextInput>
						</Grid>
						<Grid size={{ xs: 6, md: 3 }}>
							<TextInput
								size="small"
								variant="outlined"
								label="Cena"
								type="number"
								id="amount"
								value={formik.values.amount}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.amount && Boolean(formik.errors.amount)}
								helperText={formik.touched.amount && <>{formik.errors.amount}</>}
								fullWidth
							></TextInput>
						</Grid>
						<Grid size={{ xs: 6, md: 3 }}>
							<SelectInput
								fullWidth
								size="small"
								label="Waluta"
								id={"currency"}
								name={"currency"}
								displayEmpty
								value={formik.values.currency}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.currency && Boolean(formik.errors.currency)}
								helperText={formik.touched.currency && formik.errors.currency ? formik.errors.currency : undefined}
							>
								<MenuItem value={""}>Wybierz walutę</MenuItem>
								<MenuItem value={"PLN"}>PLN</MenuItem>
								<MenuItem value={"USD"}>USD</MenuItem>
								<MenuItem value={"EUR"}>EUR</MenuItem>
							</SelectInput>
						</Grid>
						<Grid size={{ xs: 6 }}>
							<SelectInput
								fullWidth
								size="small"
								label={"Status"}
								id={"status"}
								name={"status"}
								displayEmpty
								value={formik.values.status}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={Boolean(formik.touched.status && formik.errors.status)}
								helperText={formik.touched.status && formik.errors.status ? formik.errors.status : undefined}
							>
								{Object.values(ProductStatus).map((status) => (
									<MenuItem key={`status-${status}`} value={status}>
										{translateProductStatus(status)}
									</MenuItem>
								))}
							</SelectInput>
						</Grid>
						<Grid size={{ xs: 4 }}></Grid>
						<Grid size={{ xs: 12 }} alignSelf={"center"}>
							<Typography>Aktualny stan magazynowy: {productSelector?.stockQuantity ?? 0}</Typography>
						</Grid>
						<Grid size={{ xs: 6 }}>
							<TextInput
								size="small"
								variant="outlined"
								label="Zmiana stanu magazynowego"
								type="number"
								id="stockQuantityDelta"
								value={formik.values.stockQuantityDelta}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.stockQuantityDelta && Boolean(formik.errors.stockQuantityDelta)}
								helperText={formik.touched.stockQuantityDelta && <>{formik.errors.stockQuantityDelta}</>}
								fullWidth
							></TextInput>
						</Grid>
						<Grid size={{ xs: 12 }} alignSelf={"center"}>
							<Typography>Stan po zmianie: {(productSelector?.stockQuantity ?? 0) + (Number(formik.values.stockQuantityDelta) ?? 0)}</Typography>
						</Grid>
						<Grid size={{ xs: 4 }}>
							<SelectInput
								fullWidth
								size="small"
								label={"Grupa"}
								id={"groupId"}
								name={"groupId"}
								displayEmpty
								value={formik.values.groupId}
								onChange={(event) => handleGroupChange(formik, event.target.value)}
								onBlur={formik.handleBlur}
								error={formik.touched.groupId && Boolean(formik.errors.groupId)}
								helperText={formik.touched.groupId && formik.errors.groupId ? formik.errors.groupId : undefined}
							>
								<MenuItem value={undefined} defaultValue={undefined}>
									Wybierz grupę
								</MenuItem>
								{groups?.map((group) => (
									<MenuItem key={`group-select-${group.id}-${group.name}`} value={group.id}>
										{group.name}
									</MenuItem>
								))}
							</SelectInput>
						</Grid>
						<Grid size={{ xs: 4 }}>
							<SelectInput
								fullWidth
								size="small"
								label={"Kategoria"}
								id={"categoryId"}
								name={"categoryId"}
								displayEmpty
								value={formik.values.categoryId}
								onChange={(event) => handleCategoryChange(formik, event.target.value)}
								onBlur={formik.handleBlur}
								error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
								helperText={formik.touched.categoryId && formik.errors.categoryId ? formik.errors.categoryId : undefined}
							>
								<MenuItem value={undefined} defaultValue={undefined}>
									Wybierz kategorię
								</MenuItem>
								{categories?.map((category) => (
									<MenuItem key={`category-select-${category.id}-${category.name}`} value={category.id}>
										{category.name}
									</MenuItem>
								))}
							</SelectInput>
						</Grid>
						<Grid size={{ xs: 4 }}>
							<SelectInput
								fullWidth
								size="small"
								label={"Podkategoria"}
								id={"subCategoryId"}
								name={"subCategoryId"}
								displayEmpty
								value={formik.values.subCategoryId}
								onChange={(event) => handleSubCategoryChange(formik, event.target.value)}
								onBlur={formik.handleBlur}
								error={formik.touched.subCategoryId && Boolean(formik.errors.subCategoryId)}
								helperText={formik.touched.subCategoryId && formik.errors.subCategoryId ? formik.errors["subCategoryId"] : undefined}
							>
								<MenuItem value={undefined} defaultValue={undefined}>
									Wybierz podkategorię
								</MenuItem>
								{subCategories?.map((subCategory) => (
									<MenuItem key={`subCategory-select-${subCategory.id}-${subCategory.name}`} value={subCategory.id}>
										{subCategory.name}
									</MenuItem>
								))}
							</SelectInput>
						</Grid>
					</Grid>
				</EditSectionLayout>
			</AccordionDetails>
		</Accordion>
	);
};

export default GeneralInfoPanel;
