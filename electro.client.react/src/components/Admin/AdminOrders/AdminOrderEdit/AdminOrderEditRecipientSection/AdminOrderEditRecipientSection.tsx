import { UpdateOrderCommandFlat } from "@/app/(admin)/admin/orders/[id]/edit/page";
import EditSectionLayout from "@/components/Layout/EditSectionLayout/EditSectionLayout";
import TextInput from "@/components/Shared/TextInput/TextInput";
import { RecipientType } from "@/libs/api-contract/api-contract";
import { FormControl, FormControlLabel, FormLabel, Grid2, Radio, RadioGroup, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { FC } from "react";

interface AdminOrderEditRecipientSectionProps {
	formik: FormikProps<UpdateOrderCommandFlat>;
}

const AdminOrderEditRecipientSection: FC<AdminOrderEditRecipientSectionProps> = ({ formik }) => {
	const receiverType = formik.values.recipientType;

	return (
		<EditSectionLayout title="Informacje o odbiorcy" subtitle="Edytuj informacje o odbiorcy">
			<Grid2 container columnSpacing={2} rowSpacing={2}>
				<Grid2 size={{ xs: 12 }}>
					<FormControl size="small">
						<FormLabel>
							<Typography fontWeight={500}>Typ odbiorcy</Typography>
						</FormLabel>
						<RadioGroup
							row
							value={receiverType ?? ""}
							onChange={(e) => {
								formik.setFieldValue("recipientType", e.target.value);
								formik.setFieldValue("recipientFirstName", "");
								formik.setFieldValue("recipientSurname", "");
								formik.setFieldValue("recipientCompanyName", "");
								formik.setFieldValue("recipientTaxIdentificationNumber", "");
							}}
						>
							<FormControlLabel value={RecipientType.Personal} control={<Radio size="small" />} label="Osoba prywatna" />
							<FormControlLabel value={RecipientType.Company} control={<Radio size="small" />} label="Firma" />
						</RadioGroup>
					</FormControl>
				</Grid2>
				{receiverType === RecipientType.Personal && <PersonalRecipientForm formik={formik}></PersonalRecipientForm>}
				{receiverType === RecipientType.Company && <CompanyRecipientForm formik={formik}></CompanyRecipientForm>}
			</Grid2>
		</EditSectionLayout>
	);
};

export default AdminOrderEditRecipientSection;

interface PersonalRecipientFormProps {
	formik: FormikProps<UpdateOrderCommandFlat>;
}

const PersonalRecipientForm: FC<PersonalRecipientFormProps> = ({ formik }) => {
	return (
		<>
			<Grid2 size={{ xs: 6 }}>
				<TextInput
					size="small"
					variant="outlined"
					label="Imię"
					id="firstName"
					value={formik.values.recipientFirstName}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={Boolean(formik.touched.recipientFirstName && formik.errors.recipientFirstName)}
					helperText={formik.touched.recipientFirstName && formik.errors.recipientFirstName}
					fullWidth
				/>
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<TextInput
					size="small"
					variant="outlined"
					label="Nazwisko"
					id="surname"
					value={formik.values.recipientSurname}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={Boolean(formik.touched.recipientSurname && formik.errors.recipientSurname)}
					helperText={formik.touched.recipientSurname && formik.errors.recipientSurname}
					fullWidth
				/>
			</Grid2>
			<SharedRecipientForm formik={formik} />
		</>
	);
};

interface CompanyRecipientFormProps {
	formik: FormikProps<UpdateOrderCommandFlat>;
}

const CompanyRecipientForm: FC<CompanyRecipientFormProps> = ({ formik }) => {
	return (
		<>
			<Grid2 size={{ xs: 6 }}>
				<TextInput
					size="small"
					variant="outlined"
					label="Nazwa firmy"
					id="companyName"
					value={formik.values.recipientCompanyName}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={Boolean(formik.touched.recipientCompanyName && formik.errors.recipientCompanyName)}
					helperText={formik.touched.recipientCompanyName && formik.errors.recipientCompanyName}
					fullWidth
				/>
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<TextInput
					size="small"
					variant="outlined"
					label="NIP"
					id="taxIdentificationNumber"
					value={formik.values.recipientTaxIdentificationNumber}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={Boolean(formik.touched.recipientTaxIdentificationNumber && formik.errors.recipientTaxIdentificationNumber)}
					helperText={formik.touched.recipientTaxIdentificationNumber && formik.errors.recipientTaxIdentificationNumber}
					fullWidth
				/>
			</Grid2>
			<SharedRecipientForm formik={formik} />
		</>
	);
};

interface SharedRecipientFormProps {
	formik: FormikProps<UpdateOrderCommandFlat>;
}

const SharedRecipientForm: FC<SharedRecipientFormProps> = ({ formik }) => {
	return (
		<>
			<Grid2 size={{ xs: 6 }}>
				<TextInput
					size="small"
					variant="outlined"
					label="Numer telefonu"
					id="phoneNumber"
					value={formik.values.recipientPhoneNumber}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={Boolean(formik.touched.recipientPhoneNumber && formik.errors.recipientPhoneNumber)}
					helperText={formik.touched.recipientPhoneNumber && formik.errors.recipientPhoneNumber}
					fullWidth
				/>
			</Grid2>
			<Grid2 size={{ xs: 7 }}>
				<TextInput
					size="small"
					variant="outlined"
					label="Ulica"
					id="street"
					value={formik.values.recipientStreet}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={Boolean(formik.touched.recipientStreet && formik.errors.recipientStreet)}
					helperText={formik.touched.recipientStreet && formik.errors.recipientStreet}
					fullWidth
				/>
			</Grid2>
			<Grid2 size={{ xs: 5 }}>
				<TextInput
					size="small"
					variant="outlined"
					label="Numer domu/lokalu"
					id="houseNumber"
					value={formik.values.recipientHouseNumber}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={Boolean(formik.touched.recipientHouseNumber && formik.errors.recipientHouseNumber)}
					helperText={formik.touched.recipientHouseNumber && formik.errors.recipientHouseNumber}
					fullWidth
				/>
			</Grid2>
			<Grid2 size={{ xs: 4 }}>
				<TextInput
					size="small"
					variant="outlined"
					label="Kod pocztowy"
					id="postalCode"
					value={formik.values.recipientPostalCode}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={Boolean(formik.touched.recipientPostalCode && formik.errors.recipientPostalCode)}
					helperText={formik.touched.recipientPostalCode && formik.errors.recipientPostalCode}
					fullWidth
				/>
			</Grid2>
			<Grid2 size={{ xs: 8 }}>
				<TextInput
					size="small"
					variant="outlined"
					label="Miejscowość"
					id="city"
					value={formik.values.recipientCity}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={Boolean(formik.touched.recipientCity && formik.errors.recipientCity)}
					helperText={formik.touched.recipientCity && formik.errors.recipientCity}
					fullWidth
				/>
			</Grid2>
		</>
	);
};
