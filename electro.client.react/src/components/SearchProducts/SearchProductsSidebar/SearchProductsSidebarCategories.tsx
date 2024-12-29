import { fetchProductHierarchy } from "@/libs/SearchProducts/thunk";
import { useDispatch, useSelector } from "@/libs/Store";
import { buildQueryString } from "@/libs/Helpers/QueryHelper";
import { Box, Typography } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import TreeItem from "@/components/Shared/TreeItem/TreeItem";
import { ISearchProductsStateUrlParamsHierarchy } from "@/libs/SearchProducts/interfaces";

const SearchProductsSidebarCategories: FC = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const hierarchyParamsSelector = useSelector((store) => store.SearchProductsPageStore.urlParams.hierarchy);
	const productHierarchySelector = useSelector((store) => store.SearchProductsPageStore.productHierarchy);
	const [expandedItems, setExpandedItems] = useState<string[]>([]);
	const groups = productHierarchySelector.data?.groups ?? [];

	const getSelectedItems = (params: ISearchProductsStateUrlParamsHierarchy) => {
		const ids = [];
		params.group ? ids.push(`group-${params.group}`) : null;
		params.category ? ids.push(`category-${params.category}`) : null;
		params.subCategory ? ids.push(`subCategory-${params.subCategory}`) : null;
		return ids;
	};

	useEffect(() => {
		setExpandedItems(getSelectedItems(hierarchyParamsSelector));
	}, [hierarchyParamsSelector]);

	useEffect(() => {
		dispatch(fetchProductHierarchy());
	}, []);

	const handleExpandedItemsChange = (event: React.SyntheticEvent, itemIds: string[]) => {
		setExpandedItems((prev) => {
			const newExpandedItems = itemIds.filter((itemId) => !prev.includes(itemId));
			return [...newExpandedItems, ...prev.filter((itemId) => itemIds.includes(itemId))];
		});
	};

	const handleSelectedItemsChange = (event: React.SyntheticEvent, itemIds: string[]) => {
		const itemId = itemIds[0];
		if (!itemId) return;
		const [type, idStr] = itemId.split("-");
		const id = parseInt(idStr);

		let group: number | undefined;
		let category: number | undefined;
		let subCategory: number | undefined;

		if (type === "group") {
			group = id;
		} else if (type === "category") {
			groups.forEach((g) => {
				g.categories?.forEach((c) => {
					if (c.id === id) {
						group = g.id;
						category = c.id;
					}
				});
			});
		} else if (type === "subCategory") {
			groups.forEach((g) => {
				g.categories?.forEach((c) => {
					c.subCategories?.forEach((sc) => {
						if (sc.id === id) {
							group = g.id;
							category = c.id;
							subCategory = sc.id;
						}
					});
				});
			});
		}
		router.push(`?${buildQueryString({ group, category, subCategory, page: 1, pageSize: 5 })}`, { scroll: true });
	};

	return (
		<Box>
			<Typography variant="body1" fontWeight={500} paddingY={0.5} paddingX={1.5}>
				Kategorie
			</Typography>
			<SimpleTreeView
				multiSelect={true}
				selectedItems={getSelectedItems(hierarchyParamsSelector)}
				onSelectedItemsChange={handleSelectedItemsChange}
				expandedItems={expandedItems}
				onExpandedItemsChange={handleExpandedItemsChange}
			>
				{groups.map((group) => (
					<TreeItem itemId={`group-${group.id}`} label={group.name} key={`group-${group.id}`}>
						{group?.categories?.map((category) => (
							<TreeItem itemId={`category-${category.id}`} label={category.name} key={`category-${category.id}`}>
								{category?.subCategories?.map((subCategory) => <TreeItem itemId={`subCategory-${subCategory.id}`} label={subCategory.name} key={`subCategory-${subCategory.id}`} />)}
							</TreeItem>
						))}
					</TreeItem>
				))}
			</SimpleTreeView>
		</Box>
	);
};

export default SearchProductsSidebarCategories;
