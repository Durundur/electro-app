import { AddOutlined, DeleteOutlined, SaveOutlined } from "@mui/icons-material";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { Formik } from "formik";
import { FC, useEffect } from "react";
import * as yup from "yup";
import CategoryGeneralInfoPanel from "./CategoryGeneralInfoPanel";
import { useDispatch, useSelector } from "@/libs/Store";

import { AttributeDefinitionCommand, CreateOrUpdateCategoryCommand, GetCategoryResult } from "@/libs/api-contract/api-contract";
import AttributeDefinitionPanel from "../AttributeDefinition/AttributeDefinitionPanel";
import { createOrUpdateCategory, deleteCategory, fetchCategory } from "@/libs/Admin/AdminProductHierarchy/thunk";
import { addCategoryAttribute, clearCategory, deleteCategoryAttribute, setSelectedItem, updateCategoryAttribute } from "@/libs/Admin/AdminProductHierarchy/slice";

const CategoryPanels: FC = () => {
	const dispatch = useDispatch();
	const categorySelector = useSelector((state) => state.AdminProductHierarchy.category);
	const attributes = categorySelector.data?.attributes ?? [];
	const selectedItemSelector = useSelector((state) => state.AdminProductHierarchy.selectedItem);

	console.log(selectedItemSelector);

	useEffect(() => {
		if (selectedItemSelector.id) {
			dispatch(fetchCategory(selectedItemSelector.id));
		}
		return () => {
			dispatch(clearCategory());
		};
	}, [selectedItemSelector.id]);

	const handleSaveCategory = (values: CreateOrUpdateCategoryCommand) => {
		values.attributes = attributes;
		if (values.id) {
			values.groupId = categorySelector.data?.groupId;
		} else {
			values.groupId = selectedItemSelector.parentId;
		}
		dispatch(createOrUpdateCategory(values));
	};

	const handleDeleteCategory = () => {
		if (selectedItemSelector.id != categorySelector.data?.id?.toString()) return;
		dispatch(deleteCategory(selectedItemSelector.id!));
	};

	const handleCreateSubCategory = () => {
		const parentId = parseInt(selectedItemSelector.id!);
		dispatch(setSelectedItem({ id: undefined, type: "subCategory", parentId }));
	};

	const handleSaveAttribute = (attribute: AttributeDefinitionCommand) => {
		const isNewAttribute = !attribute.id;

		if (isNewAttribute) {
			dispatch(addCategoryAttribute(attribute));
		} else {
			dispatch(updateCategoryAttribute(attribute));
		}
	};

	const handleDeleteAttribute = (attributeId: string) => {
		dispatch(deleteCategoryAttribute(attributeId));
	};

	const formValidationSchema = yup.object({
		name: yup.string().required("Nazwa jest wymagana"),
		active: yup.bool().required(),
		description: yup.string(),
		displayOrder: yup.number(),
	});

	const getInitialValues = (category?: GetCategoryResult) => {
		let initialValues: CreateOrUpdateCategoryCommand = {
			id: undefined,
			name: "",
			description: "",
			active: false,
			displayOrder: 1,
		};
		if (category) {
			initialValues = {
				id: category.id,
				name: category.name,
				description: category.description,
				active: category.active,
				displayOrder: category.displayOrder,
			};
		}
		return initialValues;
	};

	return (
		<Formik enableReinitialize initialValues={getInitialValues(categorySelector.data)} onSubmit={handleSaveCategory} validateOnChange={true} validationSchema={formValidationSchema}>
			{(formik) => (
				<Stack direction={"column"} spacing={2}>
					<Stack justifyContent={"end"}>
						<Stack direction={"row"} justifyContent={"end"} spacing={2}>
							<Button onClick={() => formik.handleSubmit()} startIcon={<SaveOutlined />} variant="outlined">
								Zapisz
							</Button>
							<Button onClick={handleCreateSubCategory} startIcon={<AddOutlined />} variant="outlined">
								Nowa podkategoria
							</Button>
							<Button onClick={handleDeleteCategory} startIcon={<DeleteOutlined />} variant="outlined">
								Usuń
							</Button>
						</Stack>
					</Stack>
					{categorySelector.isLoading ? (
						<Box display={"flex"} justifyContent={"center"} alignItems={"center"} minHeight={"20vh"}>
							<CircularProgress />
						</Box>
					) : (
						<>
							<CategoryGeneralInfoPanel formik={formik} />
							<AttributeDefinitionPanel attributes={attributes} onDeleteAttribute={handleDeleteAttribute} onSaveAttribute={handleSaveAttribute} />
						</>
					)}
				</Stack>
			)}
		</Formik>
	);
};

export default CategoryPanels;
