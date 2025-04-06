import TreeItem from "@/components/Shared/TreeItem/TreeItem";
import { clearHierarchyState, setSelectedItem } from "@/libs/Admin/AdminProductHierarchy/slice";
import { fetchHierarchy } from "@/libs/Admin/AdminProductHierarchy/thunk";
import { useDispatch, useSelector } from "@/libs/Store";
import { Box, Card } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view";
import { FC, useEffect } from "react";

const AdminProductHierarchySidebar: FC = () => {
	const dispatch = useDispatch();
	const productHierarchySelector = useSelector((store) => store.AdminProductHierarchyPageStore.hierarchy);
	const groups = productHierarchySelector.data?.groups ?? [];

	useEffect(() => {
		dispatch(fetchHierarchy());

		return () => {
			dispatch(clearHierarchyState());
		};
	}, []);

	const handleSelectedItemsChange = (event: React.SyntheticEvent, itemId: string | null) => {
		if (!itemId) return;
		const [type, id] = itemId.split("-");
		let parentId: number | undefined;

		if (type === "category") {
			const group = groups.find((g) => g.categories?.some((c) => c.id === Number(id)));
			parentId = group?.id;
		} else if (type === "subCategory") {
			const group = groups.find((g) => g.categories?.some((c) => c.subCategories?.some((sc) => sc.id === Number(id))));
			const category = group?.categories?.find((c) => c.subCategories?.some((sc) => sc.id === Number(id)));
			parentId = category?.id;
		}

		const selectedItem = { type, id, parentId };
		dispatch(setSelectedItem(selectedItem));
	};

	return (
		<Card variant={"outlined"} sx={{ minHeight: "80vh" }}>
			<SimpleTreeView onSelectedItemsChange={handleSelectedItemsChange}>
				{groups.map((group) => (
					<TreeItem itemId={`group-${group.id}`} label={group.name} key={`group-${group.id}`}>
						{group?.categories?.map((category) => (
							<TreeItem itemId={`category-${category.id}`} label={category.name} key={`category-${category.id}`}>
								{category?.subCategories?.map((subCategory) => (
									<TreeItem itemId={`subCategory-${subCategory.id}`} label={subCategory.name} key={`subCategory-${subCategory.id}`} />
								))}
							</TreeItem>
						))}
					</TreeItem>
				))}
			</SimpleTreeView>
		</Card>
	);
};

export default AdminProductHierarchySidebar;
