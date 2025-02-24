"use client";
import { useDispatch, useSelector } from "@/libs/Store";
import { Button, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProductCatalogList } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogList/thunk";
import { clearProductCatalogListState } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogList/slice";
import AdminProductCatalogList from "@/components/Admin/AdminProductCatalog/AdminProductCatalogList/AdminProductCatalogList";
import { useBreadcrumbs } from "@/hooks/Breadcrumbs/useBreadcrumbs";
import FullScreenLoader from "@/components/Layout/FullScreenLoader/FullScreenLoader";
import Error from "@/components/Layout/Error/Error";
import { usePermissionGuard } from "@/hooks/PermissionGuard/usePermissionGuard";

const ProductCatalogPage: FC = () => {
	useBreadcrumbs([
		{ label: "electro", link: "/" },
		{ label: "Panel administratora", link: "/admin" },
		{ label: "Katalog produktów", link: "/admin/product-catalog/list" },
	]);
	usePermissionGuard({
		allowedRoles: ["ADMIN"],
		requireAuth: true,
	});

	const router = useRouter();
	const dispatch = useDispatch();
	const productCatalogSelector = useSelector((state) => state.AdminProductCatalogListPageStore);
	const productCatalogData = productCatalogSelector.data!;
	const [pagination, setPagination] = useState({
		page: 1,
		pageSize: 10,
	});

	useEffect(() => {
		dispatch(fetchProductCatalogList({ page: pagination.page, pageSize: pagination.pageSize }));

		return () => {
			dispatch(clearProductCatalogListState());
		};
	}, [pagination.page, pagination.pageSize]);

	const handleCreateProduct = () => {
		router.push("/admin/product-catalog/new");
	};

	if (productCatalogSelector.data && !productCatalogSelector.error && !productCatalogSelector.isLoading) {
		return (
			<Stack spacing={2}>
				<Stack direction={"row-reverse"}>
					<Button onClick={handleCreateProduct} variant="outlined">
						Nowy produkt
					</Button>
				</Stack>
				<AdminProductCatalogList productCatalogData={productCatalogData} onPaginationChange={setPagination} />
			</Stack>
		);
	}
	if (productCatalogSelector.error && !productCatalogSelector.isLoading) return <Error message="Wystąpił błąd podczas pobierania produktów"></Error>;
	return <FullScreenLoader isVisible />;
};

export default ProductCatalogPage;
