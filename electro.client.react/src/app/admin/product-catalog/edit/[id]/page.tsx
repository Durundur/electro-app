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
import { fetchProduct } from "@/libs/ProductPage/thunk";
import { initialValues as defaultInitialValues } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/initialValues";

interface ProductCatalogEditPageProps {
	params: { id: string };
}

const ProductCatalogEditPage: FC<ProductCatalogEditPageProps> = ({ params }) => {
	const dispatch = useDispatch();
	const productSelector = useSelector((store) => store.AdminProductCatalogNewEdit.product.data)!;

	useEffect(() => {
		if (!params.id) return;
		dispatch(fetchProduct(params.id));
	}, [params.id]);

	const handleSubmitEditProduct = async (values: CreateOrUpdateProductCommand) => {
		const photos = await dispatch(uploadPhotos());
		values.photos = photos;
		dispatch(createOrUpdateProduct(values));
	};

	const validationSchema = yup.object<CreateOrUpdateProductCommand>({
		id: yup.string().required(),
		name: yup.string().required("Nazwa jest wymagana"),
		amount: yup.number().required("Cena jest wymagana"),
		currency: yup.string().required("Waluta jest wymagana"),
		active: yup.bool().required(),
		status: yup.string().optional(),
		stockQuantity: yup.number().required("Stan magazynowy jest wymagany"),
		groupId: yup.number().required(),
		categoryId: yup.number().required(),
		subCategoryId: yup.number().required(),
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

	const initialValues: CreateOrUpdateProductCommand = productSelector
		? {
				id: productSelector.id,
				name: productSelector.name || "",
				amount: productSelector.amount || 0,
				currency: productSelector.currency || "",
				active: productSelector.active || false,
				status: "",
				//status: productSelector.status || "",
				stockQuantity: productSelector.stockQuantity || 0,
				groupId: productSelector.groupId || 0,
				categoryId: productSelector.categoryId || 0,
				subCategoryId: productSelector.subCategoryId || 0,
				photos: productSelector.photos || [],
				description: productSelector.description || "",
				attributes:
					productSelector.attributes?.map((attr) => ({
						id: attr.id,
						value: attr.value,
						isPrimary: attr.isPrimary,
					})) || [],
		  }
		: defaultInitialValues;
	return (
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
					</Stack>
				)}
			</Formik>
		</Box>
	);
};

export default ProductCatalogEditPage;
