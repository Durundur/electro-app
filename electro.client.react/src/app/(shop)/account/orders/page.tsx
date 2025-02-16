"use client";
import AccountOrdersList from "@/components/Account/AccountOrdersList/AccountOrdersList";
import FullScreenLoader from "@/components/Layout/FullScreenLoader/FullScreenLoader";
import { clearAccountOrders } from "@/libs/Account/slice";
import { getAccountOrders } from "@/libs/Account/thunks";
import { useDispatch, useSelector } from "@/libs/Store";
import { Pagination, Stack } from "@mui/material";
import { FC, useEffect } from "react";
import AccountOrdersListHeader from "@/components/Account/AccountOrdersList/AccountOrdersListHeader/AccountOrdersListHeader";
import AccountOrdersListEmpty from "@/components/Account/AccountOrdersList/AccountOrdersListEmpty/AccountOrdersListEmpty";
import Error from "@/components/Layout/Error/Error";

const AccountOrdersPage: FC = () => {
	const dispatch = useDispatch();
	const userId = useSelector((store) => store.AuthStore.user.id);
	const accountOrdersListIsLoading = useSelector((store) => store.AccountStore.list.isLoading);
	const accountOrdersListError = useSelector((store) => store.AccountStore.list.error);
	const accountOrdersList = useSelector((store) => store.AccountStore.list.data);

	const page = useSelector((store) => store.AccountStore.list.data?.page) ?? 1;
	const pageSize = useSelector((store) => store.AccountStore.list.data?.pageSize) ?? 8;
	const pageCount = useSelector((store) => store.AccountStore.list.data?.pageCount) ?? 1;

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
			<Stack spacing={1}>
				<AccountOrdersListHeader />
				<Error message={"Wystąpił błąd podczas ładowania zamówień"}></Error>
			</Stack>
		);
	}

	if (accountOrdersList?.orders?.length === 0) {
		return (
			<Stack spacing={1}>
				<AccountOrdersListHeader />
				<AccountOrdersListEmpty />
			</Stack>
		);
	}

	if (!accountOrdersListError && accountOrdersList) {
		return (
			<Stack spacing={1}>
				<FullScreenLoader isVisible={accountOrdersListIsLoading} />
				<AccountOrdersListHeader />
				<AccountOrdersList />
				<Stack justifyContent={"center"} alignItems={"center"} paddingTop={2}>
					<Pagination onChange={handlePageChange} page={page} count={pageCount} variant="outlined" shape="rounded" />
				</Stack>
			</Stack>
		);
	}

	return <FullScreenLoader isVisible={true} />;
};

export default AccountOrdersPage;
