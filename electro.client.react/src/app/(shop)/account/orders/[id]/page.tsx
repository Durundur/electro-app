"use client";
import AccountOrderDetailsDelivery from "@/components/Account/AccountOrderDetails/AccountOrderDetailsDelivery/AccountOrderDetailsDelivery";
import AccountOrderDetailsHeader from "@/components/Account/AccountOrderDetails/AccountOrderDetailsHeader/AdminOrderDetailsHeader";
import AccountOrderDetailsPayment from "@/components/Account/AccountOrderDetails/AccountOrderDetailsPayment/AccountOrderDetailsPayment";
import AccountOrderDetailsProducts from "@/components/Account/AccountOrderDetails/AccountOrderDetailsProducts/AccountOrderDetailsProducts";
import AccountOrderDetailsProgress from "@/components/Account/AccountOrderDetails/AccountOrderDetailsProgress/AccountOrderDetailsProgress";
import AccountOrderDetailsRecipient from "@/components/Account/AccountOrderDetails/AccountOrderDetailsRecipient/AccountOrderDetailsRecipient";
import AccountOrderDetailsSummary from "@/components/Account/AccountOrderDetails/AccountOrderDetailsSummary/AccountOrderDetailsSummary";
import FullScreenLoader from "@/components/Layout/FullScreenLoader/FullScreenLoader";
import { useBreadcrumbs } from "@/hooks/Breadcrumbs/useBreadcrumbs";
import { usePermissionGuard } from "@/hooks/PermissionGuard/usePermissionGuard";
import { clearAccountOrderDetails } from "@/libs/Account/slice";
import { getAccountOrderDetails } from "@/libs/Account/thunks";
import { useDispatch, useSelector } from "@/libs/Store";
import { Grid2, Stack } from "@mui/material";
import { FC, useEffect } from "react";

interface AccountOrderDetailsPageParams {
	params: { id: string };
}

const AccountOrderDetailsPage: FC<AccountOrderDetailsPageParams> = ({ params }) => {
	useBreadcrumbs([{ label: "electro", link: "/" }, { label: "Zamówienia", link: "/account/orders" }, { label: "Szczegóły" }]);
	usePermissionGuard({
		allowedRoles: ["USER", "ADMIN"],
		requireAuth: true,
	});
	const dispatch = useDispatch();
	const userId = useSelector((store) => store.AuthStore.user.id);
	const orderDetailsIsLoading = useSelector((store) => store.AccountStore.details.isLoading);
	const orderDetailsError = useSelector((store) => store.AccountStore.details.error);
	const orderDetails = useSelector((store) => store.AccountStore.details.data);

	const totalProductsCost = orderDetails?.products?.reduce((acc, product) => acc + product.price?.amount! * product.quantity!, 0);

	useEffect(() => {
		if (!userId) return;
		dispatch(getAccountOrderDetails({ orderId: params.id, userId }));

		return () => {
			dispatch(clearAccountOrderDetails());
		};
	}, [userId]);

	if (!orderDetailsError && orderDetails) {
		return (
			<Stack spacing={2}>
				<AccountOrderDetailsHeader orderId={orderDetails.id!} orderNumber={orderDetails.number!}></AccountOrderDetailsHeader>
				<AccountOrderDetailsProgress status={orderDetails.status!}></AccountOrderDetailsProgress>
				<Grid2 container>
					<Grid2 size={{ xs: 6 }}>
						<AccountOrderDetailsRecipient recipient={orderDetails.recipient!} />
					</Grid2>
					<Grid2 size={{ xs: 6 }}>
						<Stack spacing={2}>
							<AccountOrderDetailsPayment payment={orderDetails.payment!} />
							<AccountOrderDetailsDelivery delivery={orderDetails.delivery!} />
						</Stack>
					</Grid2>
				</Grid2>
				<AccountOrderDetailsProducts products={orderDetails.products!} />
				<Grid2 container justifyContent={"end"}>
					<Grid2 size={{ xs: 12, sm: 6, lg: 4 }} justifyContent={"center"}>
						<AccountOrderDetailsSummary
							totalProductsCost={{ amount: totalProductsCost, currency: orderDetails?.totalPrice!.currency! }}
							deliveryCost={orderDetails.delivery?.cost!}
							paymentCost={orderDetails.payment?.cost!}
							totalCost={orderDetails.totalPrice!}
						/>
					</Grid2>
				</Grid2>
			</Stack>
		);
	}

	return <FullScreenLoader isVisible={orderDetailsIsLoading} />;
};

export default AccountOrderDetailsPage;
