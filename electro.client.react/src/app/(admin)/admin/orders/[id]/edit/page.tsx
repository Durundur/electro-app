"use client";
import AdminOrderEditDeliverySection from "@/components/Admin/AdminOrders/AdminOrderEdit/AdminOrderEditDeliverySection/AdminOrderEditDeliverySection";
import AdminOrderEditGeneralSection from "@/components/Admin/AdminOrders/AdminOrderEdit/AdminOrderEditGeneralSection/AdminOrderEditGeneralSection";
import AdminOrderEditRecipientSection from "@/components/Admin/AdminOrders/AdminOrderEdit/AdminOrderEditRecipientSection/AdminOrderEditRecipientSection";
import Error from "@/components/Layout/Error/Error";
import FullScreenLoader from "@/components/Layout/FullScreenLoader/FullScreenLoader";
import { useBreadcrumbs } from "@/hooks/Breadcrumbs/useBreadcrumbs";
import { usePermissionGuard } from "@/hooks/PermissionGuard/usePermissionGuard";
import { getAdminOrderEdit, putAdminOrderEdit } from "@/libs/Admin/AdminOrders/thunk";
import { useDispatch, useSelector } from "@/libs/Store";
import { OrderStatus, RecipientType, UpdateOrderCommand } from "@/libs/api-contract/api-contract";
import { Button, Stack } from "@mui/material";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import * as Yup from "yup";

interface AdminOrderEditPageProps {
	params: { id: string };
}

export interface UpdateOrderCommandFlat {
	orderId: string;
	status: OrderStatus;
	trackingNumber?: string;
	recipientType: RecipientType;
	recipientCompanyName?: string;
	recipientTaxIdentificationNumber?: string;
	recipientFirstName?: string;
	recipientSurname?: string;
	recipientCity: string;
	recipientHouseNumber: string;
	recipientPhoneNumber: string;
	recipientPostalCode: string;
	recipientStreet: string;
}

const AdminOrderEditPage: FC<AdminOrderEditPageProps> = ({ params }) => {
	useBreadcrumbs([{ label: "electro", link: "/" }, { label: "Panel administratora", link: "/admin" }, { label: "Zamówienia", link: "/admin/orders" }, { label: "Edycja" }]);
	usePermissionGuard({
		allowedRoles: ["ADMIN"],
		requireAuth: true,
	});
	const orderId = params.id;
	const dispatch = useDispatch();
	const orderSelector = useSelector((store) => store.AdminOrdersStore.edit.data);
	const loadingSelector = useSelector((store) => store.AdminOrdersStore.edit.isLoading);
	const errorSelector = useSelector((store) => store.AdminOrdersStore.edit.error);
	const resultSelector = useSelector((store) => store.AdminOrdersStore.edit.result);
	const router = useRouter();

	const validationSchema = Yup.object<UpdateOrderCommandFlat>().shape({
		status: Yup.mixed<OrderStatus>().oneOf(Object.values(OrderStatus)).required("Status zamówienia jest wymagany"),
		trackingNumber: Yup.string().optional().notRequired(),
		recipientType: Yup.mixed<RecipientType>().oneOf(Object.values(RecipientType)).required("Typ odbiorcy jest wymagany"),

		recipientFirstName: Yup.string().when("recipientType", {
			is: RecipientType.Personal,
			then: (schema) => schema.required("Imię jest wymagane"),
		}),

		recipientSurname: Yup.string().when("recipientType", {
			is: RecipientType.Personal,
			then: (schema) => schema.required("Nazwisko jest wymagane"),
		}),

		recipientPhoneNumber: Yup.string()
			.matches(/^\d{9}$/, "Numer telefonu musi składać się z 9 cyfr")
			.required("Numer telefonu jest wymagany"),

		recipientStreet: Yup.string().required("Ulica jest wymagana"),

		recipientHouseNumber: Yup.string().required("Numer domu/lokalu jest wymagany"),

		recipientPostalCode: Yup.string()
			.matches(/^\d{2}-\d{3}$/, "Kod pocztowy musi być w formacie xx-xxx")
			.required("Kod pocztowy jest wymagany"),

		recipientCity: Yup.string().required("Miejscowość jest wymagana"),

		recipientCompanyName: Yup.string().when("recipientType", {
			is: RecipientType.Company,
			then: (schema) => schema.required("Nazwa firmy jest wymagana"),
		}),

		recipientTaxIdentificationNumber: Yup.string()
			.matches(/^\d{10}$/, "NIP musi składać się z 10 cyfr")
			.when("recipientType", {
				is: RecipientType.Company,
				then: (schema) => schema.required("NIP jest wymagany"),
			}),
	});

	const initialValues: UpdateOrderCommandFlat = {
		orderId: orderSelector?.id!,
		status: orderSelector?.status!,
		trackingNumber: orderSelector?.delivery?.trackingNumber ?? "",
		recipientType: orderSelector?.recipient?.type!,
		recipientCompanyName: orderSelector?.recipient?.companyName ?? "",
		recipientTaxIdentificationNumber: orderSelector?.recipient?.taxIdentificationNumber ?? "",
		recipientFirstName: orderSelector?.recipient?.firstName ?? "",
		recipientSurname: orderSelector?.recipient?.surname ?? "",
		recipientCity: orderSelector?.recipient?.city ?? "",
		recipientHouseNumber: orderSelector?.recipient?.houseNumber ?? "",
		recipientPhoneNumber: orderSelector?.recipient?.phoneNumber ?? "",
		recipientPostalCode: orderSelector?.recipient?.postalCode ?? "",
		recipientStreet: orderSelector?.recipient?.street ?? "",
	};

	useEffect(() => {
		dispatch(getAdminOrderEdit(orderId));
	}, [orderId]);

	const handleSubmit = (values: UpdateOrderCommandFlat) => {
		const command: UpdateOrderCommand = {
			orderId: values.orderId,
			status: values.status,
			trackingNumber: values.trackingNumber,
			recipient: {
				type: values.recipientType,
				companyName: values.recipientCompanyName,
				taxIdentificationNumber: values.recipientTaxIdentificationNumber,
				firstName: values.recipientFirstName,
				surname: values.recipientSurname,
				city: values.recipientCity,
				houseNumber: values.recipientHouseNumber,
				phoneNumber: values.recipientPhoneNumber,
				postalCode: values.recipientPostalCode,
				street: values.recipientStreet,
			},
		};
		dispatch(putAdminOrderEdit(command));
	};

	useEffect(() => {
		if (loadingSelector) return;
		if (!errorSelector && resultSelector) {
			router.replace("/admin/orders/");
		}
	}, [errorSelector, loadingSelector, resultSelector]);

	if (orderSelector && !errorSelector && !loadingSelector) {
		return (
			<Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit} validationSchema={validationSchema}>
				{(formik) => (
					<Stack spacing={2}>
						<Stack spacing={2}>
							<AdminOrderEditGeneralSection formik={formik}></AdminOrderEditGeneralSection>
							<AdminOrderEditDeliverySection formik={formik}></AdminOrderEditDeliverySection>
							<AdminOrderEditRecipientSection formik={formik}></AdminOrderEditRecipientSection>
						</Stack>
						<Stack direction={"row"} justifyContent={"end"} spacing={2}>
							<Button variant="outlined">Anuluj</Button>
							<Button variant="contained" onClick={formik.submitForm}>
								Zapisz
							</Button>
						</Stack>
					</Stack>
				)}
			</Formik>
		);
	}
	if (errorSelector && !loadingSelector) return <Error message="Wystąpił błąd podczas pobierania szczegółów zamówienia."></Error>;
	return <FullScreenLoader isVisible />;
};

export default AdminOrderEditPage;
