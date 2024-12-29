import { useDispatch, useSelector } from "@/libs/Store";
import { FC } from "react";
import GroupPanels from "./Group/GroupPanels";
import CategoryPanels from "./Category/CategoryPanels";
import SubCategoryPanels from "./SubCategory/SubCategoryPanels";
import { AddOutlined } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { setSelectedItem } from "@/libs/Admin/AdminProductHierarchy/slice";

const AdminProductHierarchyPanels: FC = () => {
	const selectedItem = useSelector((state) => state.AdminProductHierarchyPageStore.selectedItem);

	const getPanel = () => {
		if (!selectedItem.id && !selectedItem.type) return <SelectElementInfo />;
		switch (selectedItem.type) {
			case "group":
				return <GroupPanels />;
			case "category":
				return <CategoryPanels />;
			case "subCategory":
				return <SubCategoryPanels />;
		}
	};

	return <>{getPanel()}</>;
};

const SelectElementInfo: FC = () => {
	const dispatch = useDispatch();
	const onNewGroupHandler = () => {
		dispatch(setSelectedItem({ id: undefined, type: "group" }));
	};

	return (
		<Stack direction={"column"} spacing={2}>
			<Stack justifyContent={"end"}>
				<Stack direction={"row"} justifyContent={"end"} spacing={2}>
					<Button onClick={() => onNewGroupHandler()} startIcon={<AddOutlined />} variant="outlined">
						Nowa grupa
					</Button>
				</Stack>
			</Stack>
			<Typography textAlign={"center"}>Wybierz element z menu</Typography>
		</Stack>
	);
};

export default AdminProductHierarchyPanels;
