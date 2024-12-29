import { DeleteOutlined, SaveOutlined } from "@mui/icons-material";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { Formik } from "formik";
import { FC, useEffect } from "react";
import * as yup from "yup";
import SubCategoryGeneralInfoPanel from "./SubCategoryGeneralInfoPanel";
import { useDispatch, useSelector } from "@/libs/Store";

import { AttributeDefinitionCommand, CreateOrUpdateSubCategoryCommand, GetSubCategoryResult } from "@/libs/api-contract/api-contract";
import AttributeDefinitionPanel from "../AttributeDefinition/AttributeDefinitionPanel";
import { createOrUpdateSubCategory, fetchSubCategory, deleteSubCategory } from "@/libs/Admin/AdminProductHierarchy/thunk";
import { addSubCategoryAttribute, clearSubCategory, deleteSubCategoryAttribute, updateSubCategoryAttribute } from "@/libs/Admin/AdminProductHierarchy/slice";

const SubCategoryPanels: FC = () => {
	const dispatch = useDispatch();
	const subCategorySelector = useSelector((state) => state.AdminProductHierarchyPageStore.subCategory);
	const attributes = subCategorySelector.data?.attributes ?? [];
	const selectedItemSelector = useSelector((state) => state.AdminProductHierarchyPageStore.selectedItem);

	useEffect(() => {
		if (selectedItemSelector.id) {
			dispatch(fetchSubCategory(selectedItemSelector.id));
		}
		return () => {
			dispatch(clearSubCategory());
		};
	}, [selectedItemSelector.id]);

	const handleSaveSubCategory = (values: CreateOrUpdateSubCategoryCommand) => {
		values.attributes = attributes;
		if (values.id) {
			values.categoryId = subCategorySelector.data?.categoryId;
		} else {
			values.categoryId = selectedItemSelector.parentId;
		}
		dispatch(createOrUpdateSubCategory(values));
	};

	const handleDeleteSubCategory = () => {
		if (selectedItemSelector.id != subCategorySelector.data?.id?.toString()) return;
		dispatch(deleteSubCategory(selectedItemSelector.id!));
	};

	const handleSaveAttribute = (attribute: AttributeDefinitionCommand) => {
		const isNewAttribute = !attribute.id;

		if (isNewAttribute) {
			dispatch(addSubCategoryAttribute(attribute));
		} else {
			dispatch(updateSubCategoryAttribute(attribute));
		}
	};

	const handleDeleteAttribute = (attributeId: string) => {
		dispatch(deleteSubCategoryAttribute(attributeId));
	};

	const formValidationSchema = yup.object({
		name: yup.string().required("Nazwa jest wymagana"),
		active: yup.bool().required(),
		description: yup.string(),
		displayOrder: yup.number(),
	});

	const getInitialValues = (subCategory?: GetSubCategoryResult) => {
		let initialValues: CreateOrUpdateSubCategoryCommand = {
			id: undefined,
			name: "",
			description: "",
			active: false,
			displayOrder: 1,
		};
		if (subCategory) {
			initialValues = {
				id: subCategory.id,
				name: subCategory.name,
				description: subCategory.description,
				active: subCategory.active,
				displayOrder: subCategory.displayOrder,
			};
		}
		return initialValues;
	};

	return (
		<Formik enableReinitialize initialValues={getInitialValues(subCategorySelector.data)} onSubmit={handleSaveSubCategory} validateOnChange={true} validationSchema={formValidationSchema}>
			{(formik) => (
				<Stack direction={"column"} spacing={2}>
					<Stack justifyContent={"end"}>
						<Stack direction={"row"} justifyContent={"end"} spacing={2}>
							<Button onClick={() => formik.handleSubmit()} startIcon={<SaveOutlined />} variant="outlined">
								Zapisz
							</Button>
							<Button onClick={handleDeleteSubCategory} startIcon={<DeleteOutlined />} variant="outlined">
								Usuń
							</Button>
						</Stack>
					</Stack>
					{subCategorySelector.isLoading ? (
						<Box display={"flex"} justifyContent={"center"} alignItems={"center"} minHeight={"20vh"}>
							<CircularProgress />
						</Box>
					) : (
						<>
							<SubCategoryGeneralInfoPanel formik={formik} />
							<AttributeDefinitionPanel attributes={attributes} onDeleteAttribute={handleDeleteAttribute} onSaveAttribute={handleSaveAttribute} />
						</>
					)}
				</Stack>
			)}
		</Formik>
	);
};

export default SubCategoryPanels;
