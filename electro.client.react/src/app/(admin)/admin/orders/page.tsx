"use client";
import AdminOrdersList from "@/components/Admin/AdminOrders/AdminOrdersList/AdminOrdersList";
import Error from "@/components/Layout/Error/Error";
import FullScreenLoader from "@/components/Layout/FullScreenLoader/FullScreenLoader";
import { useBreadcrumbs } from "@/hooks/Breadcrumbs/useBreadcrumbs";
import { fetchAdminOrdersList } from "@/libs/Admin/AdminOrders/thunk";
import { useDispatch, useSelector } from "@/libs/Store";
import { Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";

const AdminOrdersPage: FC = () => {
	useBreadcrumbs([
		{ label: "electro", link: "/" },
		{ label: "Panel administratora", link: "/admin" },
		{ label: "Zamówienia", link: "/admin/orders" },
	]);
	const dispatch = useDispatch();
	const ordersListSelector = useSelector((store) => store.AdminOrdersStore.list.data);
	const ordersListErrorSelector = useSelector((store) => store.AdminOrdersStore.list.error);
	const ordersListIsLoadingSelector = useSelector((store) => store.AdminOrdersStore.list.isLoading);
	const [pagination, setPagination] = useState({
		page: 1,
		pageSize: 10,
	});

	useEffect(() => {
		dispatch(fetchAdminOrdersList({ page: pagination.page, pageSize: pagination.pageSize }));
	}, [pagination.page, pagination.pageSize]);

	if (ordersListSelector && !ordersListIsLoadingSelector && !ordersListErrorSelector)
		return (
			<Stack spacing={2}>
				<AdminOrdersList onPaginationChange={setPagination} ordersListData={ordersListSelector!} />
			</Stack>
		);
	if (!ordersListIsLoadingSelector && ordersListErrorSelector) return <Error message="Wystąpił bląd podczas pobierania listy zamówień"></Error>;
	return <FullScreenLoader isVisible />;
};

export default AdminOrdersPage;
