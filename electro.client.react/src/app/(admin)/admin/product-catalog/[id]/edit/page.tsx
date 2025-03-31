"use client";
import { Box, Button, Stack } from "@mui/material";
import { Formik } from "formik";
import { FC, useEffect } from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "@/libs/Store";
import { uploadPhotos } from "@/libs/PhotoUploader/thunk";
import GeneralInfoPanel from "@/components/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/Panels/GeneralInfoPanel";
import PhotosPanel from "@/components/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/Panels/PhotosPanel";
import DescriptionPanel from "@/components/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/Panels/DescriptionPanel";
import AttributesPanel from "@/components/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/Panels/AttributesPanel";
import { createOrUpdateProduct, fetchProduct } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/thunk";
import { initialValues as defaultInitialValues } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/initialValues";
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
	const productSelector = useSelector((store) => store.AdminProductCatalogNewEditPageStore.product.data);
	const errorSelector = useSelector((store) => store.AdminProductCatalogNewEditPageStore.product.error);

	usePageTransition([isLoadingProductSelector, isLoadingProductHierarchySelector, isLoadingAttributesDefinitionsSelector, isLoadingSaveActionSelector]);

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

	const validationSchema = yup.object<IProductForm>({
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
		promotionAmount: yup.number().optional(),
		promotionCurrency: yup.string().when("promotionAmount", {
			is: (val: number) => val !== undefined && val !== null,
			then: (schema) => schema.required("Waluta promocji jest wymagana gdy podano cenę promocyjną"),
		}),
		promotionStartDate: yup.date().optional(),
		promotionEndDate: yup.date().when("promotionStartDate", {
			is: (val: Date) => val !== undefined && val !== null,
			then: (schema) => schema.min(yup.ref("promotionStartDate"), "Data końca musi być późniejsza niż data początku"),
		}),
		promotionIsActive: yup.boolean().optional(),
	});

	const initialValues: IProductForm = productSelector ? mapGetProductResultToForm(productSelector) : defaultInitialValues;

	if (errorSelector) return <Error message="Wystąpił błąd podczas pobierania produktu"></Error>;
	return (
		productSelector && (
			<Box>
				<Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmitEditProduct} validationSchema={validationSchema}>
					{(formik) => (
						<Stack spacing={2} direction={"column"}>
							<Stack direction={"row"} alignItems={"center"} justifyContent={"end"} spacing={2}>
								<Button variant="outlined" onClick={() => formik.handleSubmit()}>
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
