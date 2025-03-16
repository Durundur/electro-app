"use client";
import { useDispatch, useSelector } from "@/libs/Store";
import { Button, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProductCatalogList } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogList/thunk";
import { clearProductCatalogListState } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogList/slice";
import AdminProductCatalogList from "@/components/Admin/AdminProductCatalog/AdminProductCatalogList/AdminProductCatalogList";
import { useBreadcrumbs } from "@/hooks/Breadcrumbs/useBreadcrumbs";
import Error from "@/components/Layout/Error/Error";
import { usePermissionGuard } from "@/hooks/PermissionGuard/usePermissionGuard";
import { usePageTransition } from "@/hooks/PageTransition/usePageTransition";

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

	const productCatalogSelector = useSelector((state) => state.AdminProductCatalogListPageStore.data);
	const productCatalogErrorSelector = useSelector((state) => state.AdminProductCatalogListPageStore.error);
	const isLoadingProductCatalogSelector = useSelector((state) => state.AdminProductCatalogListPageStore.isLoading);

	usePageTransition([isLoadingProductCatalogSelector]);

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

	if (productCatalogErrorSelector) return <Error message="Wystąpił błąd podczas pobierania produktów"></Error>;
	return (
		productCatalogSelector && (
			<Stack spacing={2}>
				<Stack direction={"row-reverse"}>
					<Button onClick={handleCreateProduct} variant="outlined">
						Nowy produkt
					</Button>
				</Stack>
				<AdminProductCatalogList productCatalogData={productCatalogSelector} onPaginationChange={setPagination} />
			</Stack>
		)
	);
};

export default ProductCatalogPage;
