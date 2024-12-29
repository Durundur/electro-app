"use client";
import { useDispatch, useSelector } from "@/libs/Store";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProductCatalogList } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogList/thunk";
import { clearProductCatalogListState } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogList/slice";
import AdminProductCatalogList from "@/components/Admin/AdminProductCatalog/AdminProductCatalogList/AdminProductCatalogList";

const ProductCatalogPage: FC = () => {
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
		router.push("/product-catalog/new");
	};

	if (productCatalogSelector.isLoading) return <CircularProgress />;
	if (productCatalogSelector.error || !productCatalogData) return <Typography align="center">Error</Typography>;
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
};

export default ProductCatalogPage;
