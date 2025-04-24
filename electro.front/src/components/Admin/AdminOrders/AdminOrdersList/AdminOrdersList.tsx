import { translateOrderStatus } from "@/libs/Helpers/Translations/OrdersTranslations";
import { formatAmount } from "@/libs/Helpers/Formatters";
import { GetOrdersResult, OrderStatus } from "@/libs/api-contract/rest-api-contract";
import { OpenInNewRounded, EditRounded } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface AdminOrdersListProps {
	onPaginationChange: (pagination: { page: number; pageSize: number }) => void;
	ordersListData: GetOrdersResult;
}

const AdminOrdersList: FC<AdminOrdersListProps> = ({ onPaginationChange, ordersListData }) => {
	const router = useRouter();
	const { items: orders, page, pageSize, totalPages: pageCount } = ordersListData;
	const rowCount = (pageSize ?? 0) * (pageCount ?? 0);

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", flex: 1, disableColumnMenu: true },
		{ field: "totalPrice", headerName: "Wartość", flex: 2, disableColumnMenu: true, renderCell: (v) => <>{formatAmount(v.value.amount, v.value.currency)}</> },
		{
			field: "status",
			headerName: "Status",
			flex: 2,
			disableColumnMenu: true,
			renderCell: (params) => getStatusButton(params.value),
		},
		{ field: "createdAt", headerName: "Utworzono", flex: 2, disableColumnMenu: true, valueFormatter: (v) => new Date(v).toLocaleString() },
		{
			field: " ",
			flex: 1,
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			align: "center",
			renderCell: (params) => (
				<>
					<IconButton size="small" onClick={() => router.push(`/admin/orders/${params.row.id}/edit`)}>
						<EditRounded fontSize="small" />
					</IconButton>
					<IconButton size="small" onClick={() => router.push(`/admin/orders/${params.row.id}`)}>
						<OpenInNewRounded fontSize="small" />
					</IconButton>
				</>
			),
		},
	];

	const getStatusButton = (status: OrderStatus) => {
		const getStatusColor = (status: OrderStatus) => {
			switch (status) {
				case OrderStatus.Created:
					return "inherit";
				case OrderStatus.Processing:
					return "info";
				case OrderStatus.Paid:
					return "primary";
				case OrderStatus.Shipped:
					return "warning";
				case OrderStatus.Completed:
					return "success";
				case OrderStatus.Cancelled:
					return "error";
				default:
					return "inherit";
			}
		};

		return (
			<Button sx={{ pointerEvents: "none" }} size="small" variant="contained" color={getStatusColor(status)}>
				{translateOrderStatus(status)}
			</Button>
		);
	};

	const handlePaginationChange = (model: GridPaginationModel) => {
		onPaginationChange({
			page: model.page + 1,
			pageSize: model.pageSize,
		});
	};

	return (
		<DataGrid
			onPaginationModelChange={handlePaginationChange}
			paginationModel={{ page: page! - 1, pageSize: pageSize! }}
			rows={orders}
			rowCount={rowCount}
			paginationMode="server"
			columns={columns}
			pageSizeOptions={[10, 20]}
			disableRowSelectionOnClick
			checkboxSelection={false}
		/>
	);
};

export default AdminOrdersList;
