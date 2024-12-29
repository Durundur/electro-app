import { Breadcrumbs, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useSelector } from "@/libs/Store";
import { NavigateNextOutlined } from "@mui/icons-material";
import Link from "next/link";

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

	const getBreadcrumbsItems = () => {
		const breadcrumbs = [];

		breadcrumbs.push(
			<Link key={"breadcrumb-group-item"} color="inherit" href={`/search`}>
				electro
			</Link>
		);

		if (group && group.name) {
			breadcrumbs.push(
				<Link key={"breadcrumb-group-item"} color="inherit" href={`/search?group=${groupId}`}>
					{group.name}
				</Link>
			);
		}
		if (category && category.name) {
			breadcrumbs.push(
				<Link key={"breadcrumb-category-item"} color="inherit" href={`/search?group=${groupId}&category=${categoryId}`}>
					{category.name}
				</Link>
			);
		}
		if (subCategory && subCategory.name) {
			breadcrumbs.push(
				<Link key={"breadcrumb-subCategory-item"} color="inherit" href={`/search?group=${groupId}&category=${categoryId}&subCategory=${subCategoryId}`}>
					{subCategory.name}
				</Link>
			);
		}

		return breadcrumbs;
	};

	return (
		<Stack spacing={1}>
			<Breadcrumbs separator={<NavigateNextOutlined fontSize="small" />} aria-label="breadcrumb">
				{getBreadcrumbsItems()}
			</Breadcrumbs>
			<Typography variant="h5">{getHeaderText()}</Typography>
		</Stack>
	);
};

export default SearchProductsHeader;
