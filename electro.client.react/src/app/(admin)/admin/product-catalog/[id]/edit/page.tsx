"use client";
import { Box, Button, Stack } from "@mui/material";
import { Formik } from "formik";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "@/libs/Store";
import { uploadPhotos } from "@/libs/PhotoUploader/thunk";
import GeneralInfoPanel from "@/components/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/Panels/GeneralInfoPanel";
import PhotosPanel from "@/components/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/Panels/PhotosPanel";
import DescriptionPanel from "@/components/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/Panels/DescriptionPanel";
import AttributesPanel from "@/components/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/Panels/AttributesPanel";
import { createOrUpdateProduct, fetchProduct } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/thunk";
import { initialValues as defaultInitialValues, validationSchema } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/ProductForm";
import { useBreadcrumbs } from "@/hooks/Breadcrumbs/useBreadcrumbs";
import Error from "@/components/Layout/Error/Error";
import { usePermissionGuard } from "@/hooks/PermissionGuard/usePermissionGuard";
import { usePageTransition } from "@/hooks/PageTransition/usePageTransition";
import { useRouter } from "next/navigation";
import { clearProductState } from "@/libs/ProductPage/slice";
import { clearAttributesDefinitionsState, clearProductHierarchyState, clearSaveActionState } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/slice";
import { IProductForm } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/interfaces";
import { mapFormToCreateOrUpdateCommand, mapGetProductResultToForm } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/services";
import PromotionPanel from "@/components/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/Panels/PromotionPanel";

interface ProductCatalogEditPageProps {
	params: { id: string };
}

const ProductCatalogEditPage: FC<ProductCatalogEditPageProps> = ({ params }) => {
	const dispatch = useDispatch();
	const router = useRouter();

	useBreadcrumbs([{ label: "electro", link: "/" }, { label: "Panel administratora", link: "/admin" }, { label: "Katalog produktów", link: "/admin/product-catalog/list" }, { label: "Edycja" }]);

	usePermissionGuard({
		allowedRoles: ["ADMIN"],
		requireAuth: true,
	});

	const isLoadingProductSelector = useSelector((store) => store.AdminProductCatalogNewEditPageStore.product.isLoading);
	const isLoadingProductHierarchySelector = useSelector((store) => store.AdminProductCatalogNewEditPageStore.productHierarchy.isLoading);
	const isLoadingAttributesDefinitionsSelector = useSelector((store) => store.AdminProductCatalogNewEditPageStore.attributesDefinitions.isLoading);
	const isLoadingSaveActionSelector = useSelector((store) => store.AdminProductCatalogNewEditPageStore.saveAction.isLoading);
	const isLoadingPhotoUploaderSelector = useSelector((store) => store.PhotoUploaderStore.isLoading);
	const productSelector = useSelector((store) => store.AdminProductCatalogNewEditPageStore.product.data);
	const errorSelector = useSelector((store) => store.AdminProductCatalogNewEditPageStore.product.error);

	usePageTransition([isLoadingProductSelector, isLoadingProductHierarchySelector, isLoadingAttributesDefinitionsSelector, isLoadingSaveActionSelector, isLoadingPhotoUploaderSelector]);

	const successSaveActionSelector = useSelector((store) => store.AdminProductCatalogNewEditPageStore.saveAction.success);

	useEffect(() => {
		if (successSaveActionSelector) {
			router.push("/admin/product-catalog/list");
		}
	}, [successSaveActionSelector]);

	useEffect(() => {
		if (!params.id) return;
		dispatch(fetchProduct(params.id));

		return () => {
			dispatch(clearProductState());
			dispatch(clearProductHierarchyState());
			dispatch(clearAttributesDefinitionsState());
			dispatch(clearSaveActionState());
		};
	}, [params.id]);

	const handleSubmitEditProduct = async (values: IProductForm) => {
		const photos = await dispatch(uploadPhotos());
		values.photos = photos;
		const command = mapFormToCreateOrUpdateCommand(values);
		dispatch(createOrUpdateProduct(command));
	};

	const scrollToError = () => {
		const firstErrorElement = document.querySelector(".Mui-error");
		if (firstErrorElement) {
			firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	const initialValues: IProductForm = productSelector ? mapGetProductResultToForm(productSelector) : defaultInitialValues;

	if (errorSelector) return <Error message="Wystąpił błąd podczas pobierania produktu"></Error>;
	return (
		productSelector && (
			<Box>
				<Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmitEditProduct} validationSchema={validationSchema}>
					{(formik) => (
						<Stack spacing={2} direction={"column"}>
							<Stack direction={"row"} alignItems={"center"} justifyContent={"end"} spacing={2}>
								<Button
									variant="outlined"
									onClick={() => {
										formik.submitForm();
										if (!formik.isValid) scrollToError();
									}}
								>
									Zapisz
								</Button>
							</Stack>
							<GeneralInfoPanel formik={formik}></GeneralInfoPanel>
							<PhotosPanel formik={formik} />
							<DescriptionPanel formik={formik} />
							<AttributesPanel formik={formik} />
							<PromotionPanel formik={formik} />
						</Stack>
					)}
				</Formik>
			</Box>
		)
	);
};

export default ProductCatalogEditPage;
