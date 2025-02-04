import { Button, FormControlLabel, Grid2, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { FC, useState } from "react";
import { CreateOrUpdateRecipientCommand, GetRecipientsResultItem, RecipientType } from "@/libs/api-contract/api-contract";
import { useDispatch, useSelector } from "@/libs/Store";
import { createOrUpdateRecipient } from "@/libs/Cart/thunks";

interface CheckoutReceiverFormProps {
	recipient: GetRecipientsResultItem | null;
	onCancel: () => void;
}

const CheckoutReceiverForm: FC<CheckoutReceiverFormProps> = ({ recipient, onCancel }) => {
	const dispatch = useDispatch();
	const initialReceiverType = recipient?.type ?? RecipientType.Personal;
	const [receiverType, setReceiverType] = useState<RecipientType>(initialReceiverType);
	const userProfileId = useSelector((store) => store.AuthStore.userProfile.id);

	const validationSchema = Yup.object<CreateOrUpdateRecipientCommand>().shape({
		type: Yup.mixed<RecipientType>().oneOf(Object.values(RecipientType)).required(),
		firstName: Yup.string().when("type", {
			is: RecipientType.Personal,
			then: (schema) => schema.required("Imię jest wymagane"),
		}),
		surname: Yup.string().when("type", {
			is: RecipientType.Personal,
			then: (schema) => schema.required("Nazwisko jest wymagane"),
		}),
		phoneNumber: Yup.string()
			.matches(/^\d{9}$/, "Numer telefonu musi składać się z 9 cyfr")
			.required("Numer telefonu jest wymagany"),
		street: Yup.string().required("Ulica jest wymagana"),
		houseNumber: Yup.string().required("Numer domu/lokalu jest wymagany"),
		postalCode: Yup.string()
			.matches(/^\d{2}-\d{3}$/, "Kod pocztowy musi być w formacie xx-xxx")
			.required("Kod pocztowy jest wymagany"),
		city: Yup.string().required("Miejscowość jest wymagana"),
		companyName: Yup.string().when("type", {
			is: RecipientType.Company,
			then: (schema) => schema.required("Nazwa firmy jest wymagana"),
		}),
		taxIdentificationNumber: Yup.string()
			.matches(/^\d{10}$/, "NIP musi składać się z 10 cyfr")
			.when("type", {
				is: RecipientType.Company,
				then: (schema) => schema.required("NIP jest wymagany"),
			}),
	});

	const initialValues: CreateOrUpdateRecipientCommand = {
		id: recipient?.id ?? undefined,
		type: initialReceiverType,
		firstName: recipient?.firstName ?? "",
		surname: recipient?.surname ?? "",
		companyName: recipient?.companyName ?? "",
		taxIdentificationNumber: recipient?.taxIdentificationNumber ?? "",

		phoneNumber: recipient?.phoneNumber ?? "",
		street: recipient?.street ?? "",
		houseNumber: recipient?.houseNumber ?? "",
		postalCode: recipient?.postalCode ?? "",
		city: recipient?.city ?? "",
	};

	const handleSubmit = (values: CreateOrUpdateRecipientCommand) => {
		if (!userProfileId) return;
		dispatch(createOrUpdateRecipient(values, userProfileId)).then(() => {
			onCancel();
		});
	};

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} enableReinitialize onSubmit={handleSubmit}>
			{(formik) => (
				<Stack spacing={2}>
					<RadioGroup
						row
						value={receiverType}
						onChange={(e) => {
							setReceiverType(e.target.value as RecipientType);
							formik.setFieldValue("type", e.target.value);
							formik.setFieldValue("firstName", "");
							formik.setFieldValue("surname", "");
							formik.setFieldValue("companyName", "");
							formik.setFieldValue("taxIdentificationNumber", "");
						}}
					>
						<FormControlLabel value="Personal" control={<Radio />} label="Osoba prywatna" />
						<FormControlLabel value="Company" control={<Radio />} label="Firma" />
					</RadioGroup>
					{receiverType === RecipientType.Personal && <PersonalReceiverForm formik={formik} />}
					{receiverType === RecipientType.Company && <CompanyReceiverForm formik={formik} />}
					<Stack direction={"row"} justifyContent={"center"} spacing={4}>
						<Button variant="contained" onClick={onCancel}>
							Anuluj
						</Button>
						<Button variant="contained" onClick={() => formik.submitForm()}>
							Zapisz
						</Button>
					</Stack>
				</Stack>
			)}
		</Formik>
	);
};

export default CheckoutReceiverForm;

interface CompanyReceiverFormProps {
	formik: FormikProps<CreateOrUpdateRecipientCommand>;
}

const CompanyReceiverForm: FC<CompanyReceiverFormProps> = ({ formik }) => {
	console.log(formik);
	return (
		<Stack spacing={2}>
			<TextField
				size="small"
				variant="outlined"
				label="Nazwa firmy"
				id="companyName"
				value={formik.values.companyName}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={Boolean(formik.touched.companyName && formik.errors.companyName)}
				helperText={formik.touched.companyName && <>{formik.errors.companyName}</>}
				fullWidth
			/>
			<TextField
				size="small"
				variant="outlined"
				label="NIP"
				id="taxIdentificationNumber"
				value={formik.values.taxIdentificationNumber}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={Boolean(formik.touched.taxIdentificationNumber && formik.errors.taxIdentificationNumber)}
				helperText={formik.touched.taxIdentificationNumber && <>{formik.errors.taxIdentificationNumber}</>}
				fullWidth
			/>
			<SharedReceiverFields formik={formik} />
		</Stack>
	);
};

interface PersonalReceiverFormProps {
	formik: FormikProps<CreateOrUpdateRecipientCommand>;
}

const PersonalReceiverForm: FC<PersonalReceiverFormProps> = ({ formik }) => {
	return (
		<Stack spacing={2}>
			<TextField
				size="small"
				variant="outlined"
				label="Imię"
				id="firstName"
				value={formik.values.firstName}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={Boolean(formik.touched.firstName && formik.errors.firstName)}
				helperText={formik.touched.firstName && <>{formik.errors.firstName}</>}
				fullWidth
			/>
			<TextField
				size="small"
				variant="outlined"
				label="Nazwisko"
				id="surname"
				value={formik.values.surname}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={Boolean(formik.touched.surname && formik.errors.surname)}
				helperText={formik.touched.surname && <>{formik.errors.surname}</>}
				fullWidth
			/>
			<SharedReceiverFields formik={formik} />
		</Stack>
	);
};

interface SharedReceiverFieldsProps {
	formik: FormikProps<CreateOrUpdateRecipientCommand>;
}

const SharedReceiverFields: FC<SharedReceiverFieldsProps> = ({ formik }) => (
	<Stack spacing={2}>
		<TextField
			size="small"
			variant="outlined"
			label="Numer telefonu"
			id="phoneNumber"
			value={formik.values.phoneNumber}
			onChange={formik.handleChange}
			onBlur={formik.handleBlur}
			error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
			helperText={formik.touched.phoneNumber && <>{formik.errors.phoneNumber}</>}
			fullWidth
		/>
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 8 }}>
				<TextField
					size="small"
					variant="outlined"
					label="Ulica"
					id="street"
					value={formik.values.street}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={Boolean(formik.touched.street && formik.errors.street)}
					helperText={formik.touched.street && <>{formik.errors.street}</>}
					fullWidth
				/>
			</Grid2>
			<Grid2 size={{ xs: 4 }}>
				<TextField
					size="small"
					variant="outlined"
					label="Numer domu/lokalu"
					id="houseNumber"
					value={formik.values.houseNumber}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={Boolean(formik.touched.houseNumber && formik.errors.houseNumber)}
					helperText={formik.touched.houseNumber && <>{formik.errors.houseNumber}</>}
					fullWidth
				/>
			</Grid2>
		</Grid2>
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 4 }}>
				<TextField
					size="small"
					variant="outlined"
					label="Kod pocztowy"
					id="postalCode"
					value={formik.values.postalCode}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={Boolean(formik.touched.postalCode && formik.errors.postalCode)}
					helperText={formik.touched.postalCode && <>{formik.errors.postalCode}</>}
					fullWidth
				/>
			</Grid2>
			<Grid2 size={{ xs: 8 }}>
				<TextField
					size="small"
					variant="outlined"
					label="Miejscowość"
					id="city"
					value={formik.values.city}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={Boolean(formik.touched.city && formik.errors.city)}
					helperText={formik.touched.city && <>{formik.errors.city}</>}
					fullWidth
				/>
			</Grid2>
		</Grid2>
	</Stack>
);
