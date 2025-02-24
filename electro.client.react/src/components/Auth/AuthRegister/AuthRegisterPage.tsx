"use client";
import React, { useState } from "react";
import { Grid2 as Grid, Card, CardContent, Button, TextField, IconButton, InputAdornment, CardHeader, Stack, Checkbox, FormControlLabel, FormControl, FormHelperText } from "@mui/material";
import { EmailOutlined, LockOutlined, PersonOutlineRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import AuthAccountBenefits from "@/components/Shared/Auth/AuthAccountBenefits";
import { Formik, FormikHelpers } from "formik";
import { useDispatch, useSelector } from "@/libs/Store";
import { RegisterUserCommand } from "@/libs/api-contract/api-contract";
import { registerUser } from "@/libs/Auth/thunks";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import FullScreenLoader from "@/components/Layout/FullScreenLoader/FullScreenLoader";
import { translateErrorMessage } from "@/libs/api-contract/Error";
import TextInput from "@/components/Shared/TextInput/TextInput";
import { usePermissionGuard } from "@/hooks/PermissionGuard/usePermissionGuard";

interface RegisterUserForm extends RegisterUserCommand {
	firstName: string;
	lastName: string;
	repeatPassword: string;
	consents: boolean;
}

const AuthRegisterPage = () => {
	usePermissionGuard({ denyAuth: true, redirectTo: "/" });
	const router = useRouter();
	const [showPass, setShowPass] = useState(false);
	const dispatch = useDispatch();
	const authLoadingSelector = useSelector((store) => store.AuthStore.isLoading);
	const authErrorSelector = useSelector((store) => store.AuthStore.error);

	const toggleShowPassword = () => {
		setShowPass(!showPass);
	};

	const handleRegisterSubmit = async (values: RegisterUserForm, formikHelpers: FormikHelpers<RegisterUserForm>) => {
		const registerUserCommand: RegisterUserCommand = {
			email: values.email,
			password: values.password,
		};
		try {
			await dispatch(registerUser(registerUserCommand));
			router.replace("/");
		} catch (e) {}
	};

	const validationSchema = Yup.object<RegisterUserForm>({
		firstName: Yup.string().min(2, "Imię musi mieć co najmniej 2 znaki").required("Imię jest wymagane"),
		lastName: Yup.string().min(2, "Nazwisko musi mieć co najmniej 2 znaki").required("Nazwisko jest wymagane"),
		email: Yup.string().email("Nieprawidłowy adres email").required("Email jest wymagany"),
		password: Yup.string().min(8, "Hasło musi mieć co najmniej 8 znaków").required("Hasło jest wymagane"),
		repeatPassword: Yup.string()
			.oneOf([Yup.ref("password")], "Hasła muszą być takie same")
			.required("Hasło jest wymagane"),
		consents: Yup.boolean().oneOf([true], "Musisz zaakceptować regulamin").required("Musisz zaakceptować regulamin"),
	});

	const initialValues: RegisterUserForm = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		repeatPassword: "",
		consents: false,
	};

	return (
		<Grid container spacing={2}>
			<Grid size={{ xs: 12, md: 6 }}>
				<Card variant="elevation" elevation={4}>
					<CardHeader title="Załóż konto"></CardHeader>
					<CardContent>
						<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRegisterSubmit}>
							{({ submitForm, handleChange, handleBlur, values, touched, errors }) => (
								<Stack spacing={2}>
									<TextInput
										size="small"
										variant="outlined"
										label="Imie"
										name="firstName"
										id="firstName"
										value={values.firstName}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.firstName && Boolean(errors.firstName)}
										helperText={touched.firstName && <>{errors.firstName}</>}
										autoComplete="firstName"
										fullWidth
										slotProps={{
											input: {
												startAdornment: (
													<InputAdornment position="start">
														<PersonOutlineRounded />
													</InputAdornment>
												),
											},
										}}
									/>
									<TextInput
										size="small"
										variant="outlined"
										label="Nazwisko"
										name="lastName"
										id="lastName"
										value={values.lastName}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.lastName && Boolean(errors.lastName)}
										helperText={touched.lastName && <>{errors.lastName}</>}
										autoComplete="lastName"
										fullWidth
										slotProps={{
											input: {
												startAdornment: (
													<InputAdornment position="start">
														<PersonOutlineRounded />
													</InputAdornment>
												),
											},
										}}
									/>
									<TextInput
										size="small"
										variant="outlined"
										label="Email"
										name="email"
										id="email"
										value={values.email}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.email && Boolean(errors.email)}
										helperText={touched.email && <>{errors.email}</>}
										autoComplete="email"
										fullWidth
										slotProps={{
											input: {
												startAdornment: (
													<InputAdornment position="start">
														<EmailOutlined></EmailOutlined>
													</InputAdornment>
												),
											},
										}}
									/>
									<TextInput
										size="small"
										variant="outlined"
										label="Hasło"
										name="password"
										type={showPass ? "text" : "password"}
										id="password"
										value={values.password}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.password && Boolean(errors.password)}
										helperText={touched.password && <>{errors.password}</>}
										autoComplete="current-password"
										fullWidth
										slotProps={{
											input: {
												startAdornment: (
													<InputAdornment position="start">
														<LockOutlined></LockOutlined>
													</InputAdornment>
												),
												endAdornment: (
													<InputAdornment position="end">
														<IconButton onClick={toggleShowPassword} edge="end">
															{showPass ? <Visibility /> : <VisibilityOff />}
														</IconButton>
													</InputAdornment>
												),
											},
										}}
									/>
									<TextInput
										size="small"
										variant="outlined"
										label="Powtórz hasło"
										name="repeatPassword"
										type="password"
										id="repeatPassword"
										value={values.repeatPassword}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.repeatPassword && Boolean(errors.repeatPassword)}
										helperText={touched.repeatPassword && <>{errors.repeatPassword}</>}
										fullWidth
										slotProps={{
											input: {
												startAdornment: (
													<InputAdornment position="start">
														<LockOutlined></LockOutlined>
													</InputAdornment>
												),
											},
										}}
									/>
									<FormControl error={touched.consents && Boolean(errors.consents)}>
										<FormControlLabel
											control={<Checkbox size="small" name="consents" id="consents" checked={values.consents} onChange={handleChange} onBlur={handleBlur} />}
											label="Akceptuję regulamin sklepu"
										/>
										{touched.consents && <FormHelperText>{errors.consents}</FormHelperText>}
									</FormControl>

									{authErrorSelector && authErrorSelector.statusCode && <FormHelperText error>{translateErrorMessage(authErrorSelector.message)}</FormHelperText>}

									<Button type="submit" variant="contained" color="primary" onClick={submitForm}>
										Załóż konto
									</Button>
								</Stack>
							)}
						</Formik>
					</CardContent>
				</Card>
			</Grid>
			<Grid size={{ xs: 12, md: 6 }}>
				<Card elevation={0}>
					<CardHeader title="Masz już konto?" />
					<CardContent>
						<Button variant="outlined" color="primary" fullWidth LinkComponent={Link} href="/auth/login">
							Zaloguj się
						</Button>
					</CardContent>
				</Card>
				<AuthAccountBenefits />
			</Grid>
			<FullScreenLoader isVisible={authLoadingSelector}></FullScreenLoader>
		</Grid>
	);
};

export default AuthRegisterPage;
