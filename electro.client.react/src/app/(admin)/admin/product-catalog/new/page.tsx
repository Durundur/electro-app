"use client";
import { Box, Button, Stack } from "@mui/material";
import { Formik } from "formik";
import { FC, useEffect } from "react";
import * as yup from "yup";
import { CreateOrUpdateProductCommand } from "@/libs/api-contract/api-contract";
import { useDispatch, useSelector } from "@/libs/Store";
import { uploadPhotos } from "@/libs/PhotoUploader/thunk";
import GeneralInfoPanel from "@/components/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/Panels/GeneralInfoPanel";
import PhotosPanel from "@/components/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/Panels/PhotosPanel";
import DescriptionPanel from "@/components/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/Panels/DescriptionPanel";
import AttributesPanel from "@/components/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/Panels/AttributesPanel";
import { createOrUpdateProduct } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/thunk";
import { initialValues } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/initialValues";
import { useBreadcrumbs } from "@/hooks/Breadcrumbs/useBreadcrumbs";
import { usePermissionGuard } from "@/hooks/PermissionGuard/usePermissionGuard";
import { usePageTransition } from "@/hooks/PageTransition/usePageTransition";
import { useRouter } from "next/navigation";
import { clearProductState } from "@/libs/ProductPage/slice";
import { clearAttributesDefinitionsState, clearProductHierarchyState, clearSaveActionState } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/slice";

const ProductCatalogNewPage: FC = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	useBreadcrumbs([
		{ label: "electro", link: "/" },
		{ label: "Panel administratora", link: "/admin" },
		{ label: "Katalog produktów", link: "/admin/product-catalog/list" },
		{ label: "Nowy produkt" },
	]);
	usePermissionGuard({
		allowedRoles: ["ADMIN"],
		requireAuth: true,
	});

	const isLoadingProductSelector = useSelector((store) => store.AdminProductCatalogNewEditPageStore.product.isLoading);
	const isLoadingProductHierarchySelector = useSelector((store) => store.AdminProductCatalogNewEditPageStore.productHierarchy.isLoading);
	const isLoadingAttributesDefinitionsSelector = useSelector((store) => store.AdminProductCatalogNewEditPageStore.attributesDefinitions.isLoading);
	const isLoadingSaveActionSelector = useSelector((store) => store.AdminProductCatalogNewEditPageStore.saveAction.isLoading);

	usePageTransition([isLoadingProductSelector, isLoadingProductHierarchySelector, isLoadingAttributesDefinitionsSelector, isLoadingSaveActionSelector]);

	const successSaveActionSelector = useSelector((store) => store.AdminProductCatalogNewEditPageStore.saveAction.success);

	useEffect(() => {
		if (successSaveActionSelector) {
			router.push("/admin/product-catalog/list");
		}
	}, [successSaveActionSelector]);

	useEffect(() => {
		return () => {
			dispatch(clearProductState());
			dispatch(clearProductHierarchyState());
			dispatch(clearAttributesDefinitionsState());
			dispatch(clearSaveActionState());
		};
	}, []);

	const handleSubmitCreateProduct = async (values: CreateOrUpdateProductCommand) => {
		const photos = await dispatch(uploadPhotos());
		values.photos = photos;
		dispatch(createOrUpdateProduct(values));
	};

	const validationSchema = yup.object<CreateOrUpdateProductCommand>({
		name: yup.string().required("Nazwa jest wymagana"),
		amount: yup.number().required("Cena jest wymagana"),
		currency: yup.string().required("Waluta jest wymagana"),
		status: yup.string().required("Status jest wymagany"),
		stockQuantityDelta: yup.number().required("Stan magazynowy jest wymagany"),
		groupId: yup.number().optional(),
		categoryId: yup.number().optional(),
		subCategoryId: yup.number().optional(),
		photos: yup.array().of(yup.string()).required("Zdjęcia są wymagane"),
		description: yup.string().required("Opis jest wymagany"),
		attributes: yup.array().of(
			yup.object({
				id: yup.string().required(),
				value: yup.string().required("Wartość atrybutu jest wymagana"),
				isPrimary: yup.boolean().required(),
			})
		),
	});

	return (
		<Box>
			<Formik initialValues={initialValues} onSubmit={handleSubmitCreateProduct} validationSchema={validationSchema}>
				{(formik) => (
					<Stack spacing={2} direction={"column"}>
						<Stack direction={"row"} alignItems={"center"} justifyContent={"end"} spacing={2}>
							<Button variant="outlined" onClick={() => formik.submitForm()}>
								Zapisz
							</Button>
						</Stack>
						<GeneralInfoPanel formik={formik}></GeneralInfoPanel>
						<PhotosPanel formik={formik} />
						<DescriptionPanel formik={formik} />
						<AttributesPanel formik={formik} />
					</Stack>
				)}
			</Formik>
		</Box>
	);
};

export default ProductCatalogNewPage;
