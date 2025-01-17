"use client";
import AdminOrderDetailsDelivery from "@/components/Admin/AdminOrders/AdminOrderDetails/AdminOrderDetailsDelivery/AdminOrderDetailsDelivery";
import AdminOrderDetailsHeader from "@/components/Admin/AdminOrders/AdminOrderDetails/AdminOrderDetailsHeader/AdminOrderDetailsHeader";
import AdminOrderDetailsPayment from "@/components/Admin/AdminOrders/AdminOrderDetails/AdminOrderDetailsPayment/AdminOrderDetailsPayment";
import AdminOrderDetailsProducts from "@/components/Admin/AdminOrders/AdminOrderDetails/AdminOrderDetailsProducts/AdminOrderDetailsProducts";
import AdminOrderDetailsProgress from "@/components/Admin/AdminOrders/AdminOrderDetails/AdminOrderDetailsProgress/AdminOrderDetailsProgress";
import AdminOrderDetailsRecipient from "@/components/Admin/AdminOrders/AdminOrderDetails/AdminOrderDetailsRecipient/AdminOrderDetailsRecipient";
import AdminOrderDetailsSummary from "@/components/Admin/AdminOrders/AdminOrderDetails/AdminOrderDetailsSummary/AdminOrderDetailsSummary";
import FullScreenLoader from "@/components/Layout/FullScreenLoader/FullScreenLoader";
import { fetchAdminOrderDetails } from "@/libs/Admin/AdminOrders/thunk";
import { useDispatch, useSelector } from "@/libs/Store";
import { Grid2, Stack } from "@mui/material";
import { FC, useEffect } from "react";

interface AdminOrderDetailsPageParams {
	params: { id: string };
}

const AdminOrderDetailsPage: FC<AdminOrderDetailsPageParams> = ({ params }) => {
	const dispatch = useDispatch();
	const orderDetailsSelector = useSelector((store) => store.AdminOrdersStore.details.data);
	const errorOrderDetailsSelector = useSelector((store) => store.AdminOrdersStore.details.error);
	const isLoadingSelector = useSelector((store) => store.AdminOrdersStore.details.isLoading);

	useEffect(() => {
		dispatch(fetchAdminOrderDetails(params.id));
	}, []);

	const totalProductsCost = orderDetailsSelector?.products?.reduce((acc, product) => acc + product.price?.amount! * product.quantity!, 0);

	if (orderDetailsSelector && !errorOrderDetailsSelector) {
		return (
			<Stack spacing={4}>
				<AdminOrderDetailsHeader orderId={orderDetailsSelector.id!} />
				<AdminOrderDetailsProgress currentStatus={orderDetailsSelector.status!} />
				<Grid2 container>
					<Grid2 size={{ xs: 6 }}>
						<AdminOrderDetailsRecipient recipient={orderDetailsSelector.recipient!} />
					</Grid2>
					<Grid2 size={{ xs: 6 }}>
						<Stack spacing={2}>
							<AdminOrderDetailsPayment payment={orderDetailsSelector.payment!} />
							<AdminOrderDetailsDelivery delivery={orderDetailsSelector.delivery!} />
						</Stack>
					</Grid2>
				</Grid2>
				<AdminOrderDetailsProducts products={orderDetailsSelector.products!} />
				<Grid2 container justifyContent={"end"}>
					<Grid2 size={{ xs: 12, sm: 6, lg: 4 }} justifyContent={"center"}>
						<AdminOrderDetailsSummary
							totalProductsCost={{ amount: totalProductsCost, currency: orderDetailsSelector?.totalPrice!.currency! }}
							deliveryCost={orderDetailsSelector.delivery?.cost!}
							paymentCost={orderDetailsSelector.payment?.cost!}
							totalCost={orderDetailsSelector.totalPrice!}
						/>
					</Grid2>
				</Grid2>
			</Stack>
		);
	}
	if (errorOrderDetailsSelector && !isLoadingSelector) {
		return <>error</>;
	}
	return <FullScreenLoader isVisible />;
};

export default AdminOrderDetailsPage;
