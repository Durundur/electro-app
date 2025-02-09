import { GetProductCatalogResult } from "@/libs/api-contract/api-contract";
import { IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { FC } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { translateProductStatus } from "@/libs/Helpers/Translations/ProductsTranslations";

interface AdminProductCatalogListProps {
	productCatalogData: GetProductCatalogResult;
	onPaginationChange: (pagination: { page: number; pageSize: number }) => void;
}

const AdminProductCatalogList: FC<AdminProductCatalogListProps> = ({ productCatalogData, onPaginationChange }) => {
	const { products, page, pageSize, pageCount } = productCatalogData;
	const rowCount = (pageSize ?? 0) * (pageCount ?? 0);
	const router = useRouter();

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", flex: 1, disableColumnMenu: true },
		{ field: "name", headerName: "Nazwa", flex: 4, disableColumnMenu: true },
		{ field: "status", headerName: "Status", flex: 2, disableColumnMenu: true, valueFormatter: (v) => translateProductStatus(v) },
		{ field: "stockQuantity", headerName: "Stan magazynowy", flex: 2, disableColumnMenu: true },
		{
			field: "actions",
			headerName: "Akcje",
			flex: 1,
			sortable: false,
			filterable: false,
			align: "right",
			headerAlign: "right",
			disableColumnMenu: true,
			renderCell: (params) => (
				<>
					<IconButton size="small" onClick={() => handleEditProduct(params.row.id)}>
						<EditIcon fontSize="small" />
					</IconButton>
					<IconButton size="small" onClick={() => handleDeleteProduct(params.row.id)}>
						<DeleteIcon fontSize="small" />
					</IconButton>
				</>
			),
		},
	];

	const handleEditProduct = (productId: string) => {
		router.push(`/product-catalog/edit/${productId}`);
	};

	const handleDeleteProduct = (productId: string) => {};

	const handlePaginationChange = (model: GridPaginationModel) => {
		onPaginationChange({
			page: model.page + 1,
			pageSize: model.pageSize,
		});
	};

	if (!products) return <Typography align="center">Brak produktów</Typography>;
	return (
		<DataGrid
			onPaginationModelChange={handlePaginationChange}
			paginationModel={{ page: page! - 1, pageSize: pageSize! }}
			rows={products}
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
