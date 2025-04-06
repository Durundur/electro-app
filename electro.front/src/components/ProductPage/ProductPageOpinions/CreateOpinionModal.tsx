import { FC, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Button, Rating, Box, Typography, IconButton, Stack } from "@mui/material";
import { Close } from "@mui/icons-material";
import * as yup from "yup";
import { CreateOpinionCommand } from "@/libs/api-contract/api-contract";
import { useDispatch, useSelector } from "@/libs/Store";
import { Formik } from "formik";
import TextInput from "@/components/Shared/TextInput/TextInput";
import { createOpinion, getOpinions, getOpinionsStats } from "@/libs/ProductPage/thunk";
import { clearCreateOpinionState } from "@/libs/ProductPage/slice";

interface CreateOpinionModalProps {
	open: boolean;
	onClose: () => void;
	productId: string;
	productName: string;
	productImage?: string;
}

const CreateOpinionModal: FC<CreateOpinionModalProps> = ({ open, onClose, productId, productName, productImage }) => {
	const dispatch = useDispatch();

	const isLoggedIn = useSelector((store) => store.AuthStore.auth.isAuthenticated);
	const createOpinionSelector = useSelector((store) => store.ProductPageStore.createOpinion.data);
	const createOpinionIsLoadingSelector = useSelector((store) => store.ProductPageStore.createOpinion.isLoading);
	const createOpinionErrorSelector = useSelector((store) => store.ProductPageStore.createOpinion.error);

	const initialValues: CreateOpinionCommand = {
		rating: 0,
		content: "",
		authorDisplayName: "",
		productId: productId,
	};

	const validationSchema = yup.object({
		rating: yup.number().min(0, "Ocena jest wymagana").required("Ocena jest wymagana"),
		content: yup.string().required("Opinia jest wymagana").min(10, "Opinia musi mieć minimum 10 znaków"),
		authorDisplayName: yup.string().required("Imię jest wymagane"),
	});

	const handleSubmit = (values: CreateOpinionCommand) => {
		dispatch(createOpinion(values));
	};

	useEffect(() => {
		if (!createOpinionIsLoadingSelector && !createOpinionErrorSelector && createOpinionSelector) {
			onClose();
			dispatch(
				getOpinions(productId, {
					page: 1,
					pageSize: 8,
				})
			);
			dispatch(getOpinionsStats(productId));
		}
	}, [createOpinionSelector, createOpinionIsLoadingSelector, createOpinionErrorSelector]);

    useEffect(() => {
        if (!isLoggedIn) onClose();
        
        return () => {
            dispatch(clearCreateOpinionState());
        };
    }, [open, isLoggedIn]);

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				Dodaj opinię
				<IconButton onClick={onClose}>
					<Close />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
					{(formik) => (
						<Stack spacing={2}>
							<Stack direction={"row"} alignItems="center" spacing={4}>
								{productImage && <Box component="img" src={productImage} sx={{ width: 100, height: 100, objectFit: "contain" }} />}
								<Typography>{productName}</Typography>
							</Stack>

							<Stack direction={"column"} alignItems={"center"} spacing={1}>
								<Typography gutterBottom>Twoja ocena produktu</Typography>
								<Rating name="rating" value={formik.values.rating} onChange={(_, value) => formik.setFieldValue("rating", value)} precision={0.5} size="large" />
								{formik.touched.rating && formik.errors.rating && (
									<Typography color="error" variant="caption">
										{formik.errors.rating}
									</Typography>
								)}
							</Stack>

							<TextInput
								fullWidth
								multiline
								rows={4}
								label="Twoja opinia"
								name="content"
								value={formik.values.content}
								onChange={formik.handleChange}
								error={formik.touched.content && Boolean(formik.errors.content)}
								helperText={(formik.touched.content && formik.errors.content) || "Pamiętaj, że Twoja opinia powinna dotyczyć produktu i jego funkcjonalności."}
							/>

							<TextInput
								fullWidth
								label="Imię"
								name="authorDisplayName"
								size="small"
								value={formik.values.authorDisplayName}
								onChange={formik.handleChange}
								error={formik.touched.authorDisplayName && Boolean(formik.errors.authorDisplayName)}
								helperText={formik.touched.authorDisplayName && formik.errors.authorDisplayName}
							/>

							<Button onClick={formik.submitForm} variant="contained" color="primary">
								Dodaj opinię
							</Button>
						</Stack>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	);
};

export default CreateOpinionModal;
