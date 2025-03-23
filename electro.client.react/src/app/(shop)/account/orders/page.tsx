"use client";
import AccountOrdersList from "@/components/Account/AccountOrdersList/AccountOrdersList";
import { clearAccountOrders } from "@/libs/Account/slice";
import { getAccountOrders } from "@/libs/Account/thunks";
import { useDispatch, useSelector } from "@/libs/Store";
import { Pagination, Stack } from "@mui/material";
import { FC, useEffect } from "react";
import AccountOrdersListHeader from "@/components/Account/AccountOrdersList/AccountOrdersListHeader/AccountOrdersListHeader";
import AccountOrdersListEmpty from "@/components/Account/AccountOrdersList/AccountOrdersListEmpty/AccountOrdersListEmpty";
import Error from "@/components/Layout/Error/Error";
import { useBreadcrumbs } from "@/hooks/Breadcrumbs/useBreadcrumbs";
import { usePermissionGuard } from "@/hooks/PermissionGuard/usePermissionGuard";
import { usePageTransition } from "@/hooks/PageTransition/usePageTransition";

const AccountOrdersPage: FC = () => {
	useBreadcrumbs([
		{ label: "electro", link: "/" },
		{ label: "Zamówienia", link: "/account/orders" },
	]);
	usePermissionGuard({
		allowedRoles: ["USER", "ADMIN"],
		requireAuth: true,
	});
	const dispatch = useDispatch();
	const userId = useSelector((store) => store.AuthStore.user.id);
	const accountOrdersListIsLoading = useSelector((store) => store.AccountStore.list.isLoading);
	const accountOrdersListError = useSelector((store) => store.AccountStore.list.error);
	const accountOrdersList = useSelector((store) => store.AccountStore.list.data);

	const page = useSelector((store) => store.AccountStore.list.data?.page) ?? 1;
	const pageSize = useSelector((store) => store.AccountStore.list.data?.pageSize) ?? 8;
	const totalPages = useSelector((store) => store.AccountStore.list.data?.totalPages) ?? 1;

	usePageTransition([accountOrdersListIsLoading]);

	useEffect(() => {
		if (!userId) return;
		dispatch(getAccountOrders({ userId, page, pageSize }));

		return () => {
			dispatch(clearAccountOrders());
		};
	}, [userId]);

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		if (!userId) return;
		dispatch(getAccountOrders({ userId, page: value, pageSize }));
	};

	if (accountOrdersListError) {
		return (
			<Stack spacing={2}>
				<AccountOrdersListHeader />
				<Error message={"Wystąpił błąd podczas ładowania zamówień"}></Error>
			</Stack>
		);
	}

	return (
		accountOrdersList && (
			<Stack spacing={2}>
				<AccountOrdersListHeader />
				{accountOrdersList.items?.length ? (
					<>
						<AccountOrdersList />
						<Stack justifyContent="center" alignItems="center" paddingTop={2}>
							<Pagination onChange={handlePageChange} page={page} count={totalPages} variant="outlined" shape="rounded" />
						</Stack>
					</>
				) : (
					<AccountOrdersListEmpty />
				)}
			</Stack>
		)
	);
};

export default AccountOrdersPage;
