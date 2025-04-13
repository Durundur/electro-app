"use client";
import AdminOrdersList from "@/components/Admin/AdminOrders/AdminOrdersList/AdminOrdersList";
import Error from "@/components/Layout/Error/Error";
import { useBreadcrumbs } from "@/hooks/Breadcrumbs/useBreadcrumbs";
import { usePermissionGuard } from "@/hooks/PermissionGuard/usePermissionGuard";
import { usePageTransition } from "@/hooks/PageTransition/usePageTransition";
import { fetchAdminOrdersList } from "@/libs/Admin/AdminOrders/thunk";
import { useDispatch, useSelector } from "@/libs/Store";
import { Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { clearAdminOrdersListState } from "@/libs/Admin/AdminOrders/slice";

const AdminOrdersPage: FC = () => {
	useBreadcrumbs([
		{ label: "electro", link: "/" },
		{ label: "Panel administratora", link: "/admin" },
		{ label: "Zamówienia", link: "/admin/orders" },
	]);
	usePermissionGuard({
		allowedRoles: ["ADMIN"],
		requireAuth: true,
	});
	const dispatch = useDispatch();
	const ordersListSelector = useSelector((store) => store.AdminOrdersStore.list.data);
	const ordersListErrorSelector = useSelector((store) => store.AdminOrdersStore.list.error);
	const ordersListIsLoadingSelector = useSelector((store) => store.AdminOrdersStore.list.isLoading);
	const [pagination, setPagination] = useState({
		page: 1,
		pageSize: 10,
	});

	usePageTransition([ordersListIsLoadingSelector]);

	useEffect(() => {
		dispatch(fetchAdminOrdersList({ page: pagination.page, pageSize: pagination.pageSize }));
		return () => {
			dispatch(clearAdminOrdersListState());
		};
	}, [pagination.page, pagination.pageSize]);

	if (ordersListErrorSelector) return <Error message="Wystąpił bląd podczas pobierania listy zamówień"></Error>;
	return (
		ordersListSelector && (
			<Stack spacing={2}>
				<AdminOrdersList onPaginationChange={setPagination} ordersListData={ordersListSelector!} />
			</Stack>
		)
	);
};

export default AdminOrdersPage;
