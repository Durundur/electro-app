import { AddOutlined, DeleteOutlined, SaveOutlined } from "@mui/icons-material";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { FC, useEffect } from "react";
import GroupGeneralInfoPanel from "./GroupGeneralInfoPanel";
import { useDispatch, useSelector } from "@/libs/Store";

import { AttributeDefinitionCommand, CreateOrUpdateGroupCommand, GetGroupResult } from "@/libs/api-contract/api-contract";
import AttributeDefinitionPanel from "../AttributeDefinition/AttributeDefinitionPanel";
import { createOrUpdateGroup, deleteGroup, fetchGroup } from "@/libs/Admin/AdminProductHierarchy/thunk";
import { addGroupAttribute, clearGroup, deleteGroupAttribute, setSelectedItem, updateGroupAttribute } from "@/libs/Admin/AdminProductHierarchy/slice";

const GroupPanels: FC = () => {
	const dispatch = useDispatch();
	const groupSelector = useSelector((state) => state.AdminProductHierarchyPageStore.group);
	const groupAttributes = groupSelector.data?.attributes ?? [];
	const selectedItemSelector = useSelector((state) => state.AdminProductHierarchyPageStore.selectedItem);

	useEffect(() => {
		if (selectedItemSelector.id) {
			dispatch(fetchGroup(selectedItemSelector.id));
		}
		return () => {
			dispatch(clearGroup());
		};
	}, [selectedItemSelector.id]);

	const handleSaveGroup = (values: CreateOrUpdateGroupCommand) => {
		values.attributes = groupAttributes;
		dispatch(createOrUpdateGroup(values));
	};

	const handleDeleteGroup = () => {
		if (selectedItemSelector.id != groupSelector.data?.id?.toString()) return;
		dispatch(deleteGroup(selectedItemSelector.id!));
	};

	const handleCreateCategory = () => {
		const parentId = parseInt(selectedItemSelector.id!);
		dispatch(setSelectedItem({ id: undefined, type: "category", parentId }));
	};

	const formValidationSchema = yup.object({
		name: yup.string().required("Nazwa jest wymagana"),
		active: yup.bool().required(),
		photo: yup.string(),
		icon: yup.string(),
		description: yup.string(),
		displayOrder: yup.number(),
	});

	const getInitialValues = (group?: GetGroupResult) => {
		let initialValues: CreateOrUpdateGroupCommand = {
			id: undefined,
			name: "",
			description: "",
			active: false,
			photo: "",
			icon: "",
			displayOrder: 1,
		};
		if (group) {
			initialValues = {
				id: group.id,
				name: group.name,
				description: group.description,
				active: group.active,
				photo: group.photo,
				icon: group.icon,
				displayOrder: group.displayOrder,
			};
		}
		return initialValues;
	};

	const handleSaveAttribute = (attribute: AttributeDefinitionCommand) => {
		const isNewAttribute = !attribute.id;

		if (isNewAttribute) {
			dispatch(addGroupAttribute(attribute));
		} else {
			dispatch(updateGroupAttribute(attribute));
		}
	};

	const handleDeleteAttribute = (attributeId: string) => {
		dispatch(deleteGroupAttribute(attributeId));
	};

	return (
		<Formik enableReinitialize initialValues={getInitialValues(groupSelector.data)} onSubmit={handleSaveGroup} validateOnChange={true} validationSchema={formValidationSchema}>
			{(formik) => (
				<Stack direction={"column"} spacing={2}>
					<Stack justifyContent={"end"}>
						<Stack direction={"row"} justifyContent={"end"} spacing={2}>
							<Button onClick={() => formik.handleSubmit()} startIcon={<SaveOutlined />} variant="outlined">
								Zapisz
							</Button>
							<Button onClick={handleCreateCategory} startIcon={<AddOutlined />} variant="outlined">
								Nowa kategoria
							</Button>
							<Button onClick={handleDeleteGroup} startIcon={<DeleteOutlined />} variant="outlined">
								Usuń
							</Button>
						</Stack>
					</Stack>
					{groupSelector.isLoading ? (
						<Box display={"flex"} justifyContent={"center"} alignItems={"center"} minHeight={"20vh"}>
							<CircularProgress />
						</Box>
					) : (
						<>
							<GroupGeneralInfoPanel formik={formik} />
							<AttributeDefinitionPanel attributes={groupAttributes} onSaveAttribute={handleSaveAttribute} onDeleteAttribute={handleDeleteAttribute} />
						</>
					)}
				</Stack>
			)}
		</Formik>
	);
};

export default GroupPanels;
