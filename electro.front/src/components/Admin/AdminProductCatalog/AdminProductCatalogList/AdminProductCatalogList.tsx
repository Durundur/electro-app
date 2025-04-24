import { GetProductCatalogResult } from "@/libs/api-contract/rest-api-contract";
import { IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { FC } from "react";
import { EditRounded, DeleteRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { translateProductStatus } from "@/libs/Helpers/Translations/ProductsTranslations";

interface AdminProductCatalogListProps {
	productCatalogData: GetProductCatalogResult;
	onPaginationChange: (pagination: { page: number; pageSize: number }) => void;
}

const AdminProductCatalogList: FC<AdminProductCatalogListProps> = ({ productCatalogData, onPaginationChange }) => {
	const { items, page, pageSize, totalPages } = productCatalogData;
	const rowCount = (pageSize ?? 0) * (totalPages ?? 0);
	const router = useRouter();

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", flex: 1, disableColumnMenu: true },
		{ field: "name", headerName: "Nazwa", flex: 4, disableColumnMenu: true },
		{ field: "status", headerName: "Status", flex: 2, disableColumnMenu: true, valueFormatter: (v) => translateProductStatus(v) },
		{ field: "stockQuantity", headerName: "Stan magazynowy", flex: 2, disableColumnMenu: true },
		{
			field: " ",
			flex: 1,
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			align: "center",
			renderCell: (params) => (
				<>
					<IconButton size="small" onClick={() => handleEditProduct(params.row.id)}>
						<EditRounded fontSize="small" />
					</IconButton>
					<IconButton size="small" onClick={() => handleDeleteProduct(params.row.id)}>
						<DeleteRounded fontSize="small" />
					</IconButton>
				</>
			),
		},
	];

	const handleEditProduct = (productId: string) => {
		router.push(`/admin/product-catalog/${productId}/edit`);
	};

	const handleDeleteProduct = (productId: string) => {};

	const handlePaginationChange = (model: GridPaginationModel) => {
		onPaginationChange({
			page: model.page + 1,
			pageSize: model.pageSize,
		});
	};

	if (!items) return <Typography align="center">Brak produktów</Typography>;
	return (
		<DataGrid
			onPaginationModelChange={handlePaginationChange}
			paginationModel={{ page: page! - 1, pageSize: pageSize! }}
			rows={items}
			rowCount={rowCount}
			paginationMode="server"
			columns={columns}
			pageSizeOptions={[10, 20]}
			disableRowSelectionOnClick
			checkboxSelection={false}
		/>
	);
};

export default AdminProductCatalogList;
