import { Typography } from "@mui/material";
import { FC, useMemo } from "react";
import { useSelector } from "@/libs/Store";
import { Breadcrumb, useBreadcrumbs } from "@/hooks/Breadcrumbs/useBreadcrumbs";

const SearchProductsHeader: FC = () => {
	const productHierarchySelector = useSelector((store) => store.SearchProductsPageStore.productHierarchy);
	const hierarchyParamsSelector = useSelector((store) => store.SearchProductsPageStore.urlParams.hierarchy);
	const productHierarchy = productHierarchySelector.data;
	const { group: groupId, category: categoryId, subCategory: subCategoryId } = hierarchyParamsSelector ?? {};
	const group = productHierarchy?.groups?.find((g) => g.id === groupId);
	const category = group?.categories?.find((c) => c.id === categoryId);
	const subCategory = category?.subCategories?.find((sc) => sc.id === subCategoryId);

	const getHeaderText = () => {
		if (subCategory && subCategory.name) {
			return subCategory.name;
		}
		if (category && category.name) {
			return category.name;
		}
		if (group && group.name) {
			return group.name;
		}
	};

	const breadcrumbsItems = useMemo<Breadcrumb[]>(() => {
		const breadcrumbs: Breadcrumb[] = [];

		breadcrumbs.push({ label: "electro", link: "/" });

		if (group && group.name) {
			breadcrumbs.push({ label: group.name, link: `/search?group=${group.id}` });
		}
		if (category && category.name && group) {
			breadcrumbs.push({ label: category.name, link: `/search?group=${group.id}&category=${category.id}` });
		}
		if (subCategory && subCategory.name && category && group) {
			breadcrumbs.push({ label: subCategory.name, link: `/search?group=${group.id}&category=${category.id}&subCategory=${subCategory.id}` });
		}

		return breadcrumbs;
	}, [groupId, categoryId, subCategoryId, productHierarchy]);

	useBreadcrumbs(breadcrumbsItems);

	return (
		<Typography marginBottom={2} variant="h6">
			{getHeaderText()}
		</Typography>
	);
};

export default SearchProductsHeader;
