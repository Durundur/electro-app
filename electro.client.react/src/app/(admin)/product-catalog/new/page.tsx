"use client";
import { Box, Button, Stack } from "@mui/material";
import { Formik } from "formik";
import { FC } from "react";
import * as yup from "yup";
import { CreateOrUpdateProductCommand } from "@/libs/api-contract/api-contract";
import { useDispatch } from "@/libs/Store";
import { uploadPhotos } from "@/libs/PhotoUploader/thunk";
import GeneralInfoPanel from "@/components/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/Panels/GeneralInfoPanel";
import PhotosPanel from "@/components/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/Panels/PhotosPanel";
import DescriptionPanel from "@/components/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/Panels/DescriptionPanel";
import AttributesPanel from "@/components/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/Panels/AttributesPanel";
import { createOrUpdateProduct } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/thunk";
import { initialValues } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/initialValues";

const ProductCatalogNewPage: FC = () => {
	const dispatch = useDispatch();

	const handleSubmitCreateProduct = async (values: CreateOrUpdateProductCommand) => {
		const photos = await dispatch(uploadPhotos());
		values.photos = photos;
		dispatch(createOrUpdateProduct(values));
	};

	const validationSchema = yup.object<CreateOrUpdateProductCommand>({
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
