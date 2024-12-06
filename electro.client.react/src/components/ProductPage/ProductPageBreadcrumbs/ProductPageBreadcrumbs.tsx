import { FC } from "react";
import { Breadcrumbs as MBreadcrumbs } from "@mui/material";
import { NavigateNextOutlined } from "@mui/icons-material";
import Link from "next/link";
import { GetProductResult } from "@/libs/api-contract/api-contract";
import { useSelector } from "@/libs/Store";

interface ProductPageBreadcrumbs {
	product: GetProductResult;
}

const ProductPageBreadcrumbs: FC<ProductPageBreadcrumbs> = ({ product }) => {
	const productHierarchySelector = useSelector((store) => store.Layout.data);
	const group = productHierarchySelector.groups?.find((g) => g.id === product.groupId);
	const category = group?.categories?.find((c) => c.id === product.categoryId);
	const subCategory = category?.subCategories?.find((sc) => sc.id === product.subCategoryId);

	const getBreadcrumbsItems = () => {
		const breadcrumbs = [];

		breadcrumbs.push(
			<Link key={"breadcrumb-group-item"} color="inherit" href={`/search`}>
				electro
			</Link>
		);

		if (group && group.id && group.name) {
			breadcrumbs.push(
				<Link key={"breadcrumb-group-item"} color="inherit" href={`/search?group=${group.id}`}>
					{group.name}
				</Link>
			);
		}

		if (group && category && category.id && category.name) {
			breadcrumbs.push(
				<Link key={"breadcrumb-category-item"} color="inherit" href={`/search?group=${group.id}&category=${category.id}`}>
					{category.name}
				</Link>
			);
		}

		if (group && category && subCategory && subCategory.id && subCategory.name) {
			breadcrumbs.push(
				<Link key={"breadcrumb-subcategory-item"} color="inherit" href={`/search?group=${group.id}&category=${category.id}&subCategory=${subCategory.id}`}>
					{subCategory.name}
				</Link>
			);
		}

		return breadcrumbs;
	};

	return (
		<MBreadcrumbs separator={<NavigateNextOutlined fontSize="small" />} aria-label="breadcrumb">
			{getBreadcrumbsItems()}
		</MBreadcrumbs>
	);
};

export default ProductPageBreadcrumbs;
