"use client";
import React, { useState } from "react";
import { Grid2 as Grid, Card, CardContent, Button, TextField, IconButton, InputAdornment, CardHeader, Stack, FormHelperText } from "@mui/material";
import { EmailOutlined, LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import AuthAccountBenefits from "@/components/Shared/Auth/AuthAccountBenefits";
import { useDispatch, useSelector } from "@/libs/Store";
import { LoginUserCommand } from "@/libs/api-contract/api-contract";
import { loginUser } from "@/libs/Auth/thunks";
import FullScreenLoader from "@/components/Layout/FullScreenLoader/FullScreenLoader";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { translateErrorMessage } from "@/libs/api-contract/Error";
import TextInput from "@/components/Shared/TextInput/TextInput";

const AuthLoginPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [showPass, setShowPass] = useState(false);
	const authLoadingSelector = useSelector((store) => store.AuthStore.isLoading);
	const authErrorSelector = useSelector((store) => store.AuthStore.error);

	const toggleShowPassword = () => {
		setShowPass(!showPass);
	};

	const fillTestAccount = (setFieldValue: any) => {
		setFieldValue("email", "test@test.pl");
		setFieldValue("password", "test123!@#");
	};

	const handleLoginSubmit = async (loginUserCommand: LoginUserCommand, formikHelpers: FormikHelpers<LoginUserCommand>) => {
		try {
			await dispatch(loginUser(loginUserCommand));
			router.replace("/");
		} catch (e) {}
	};

	const validationSchema = Yup.object<LoginUserCommand>({
		email: Yup.string().email("Nieprawidłowy adres email").required("Email jest wymagany"),
		password: Yup.string().min(8, "Hasło musi mieć co najmniej 8 znaków").required("Hasło jest wymagane"),
	});

	const initialValues: LoginUserCommand = {
		email: "",
		password: "",
	};

	return (
		<Grid container spacing={2}>
			<Grid size={{ xs: 12, md: 6 }}>
				<Card variant="elevation" elevation={4}>
					<CardHeader title="Zaloguj się"></CardHeader>
					<CardContent>
						<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLoginSubmit}>
							{({ submitForm, handleChange, handleBlur, setFieldValue, values, touched, errors }) => (
								<Stack spacing={2}>
									<TextInput
										placeholder="lorem ipsum sob amennd"
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
										id="password"
										value={values.password}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.password && Boolean(errors.password)}
										helperText={touched.password && <>{errors.password}</>}
										type={showPass ? "text" : "password"}
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
									{authErrorSelector && authErrorSelector.statusCode && <FormHelperText error>{translateErrorMessage(authErrorSelector.message)}</FormHelperText>}
									<Button variant="text">Zapomniałeś hasło?</Button>
									<Button variant="contained" color="primary" onClick={() => fillTestAccount(setFieldValue)}>
										Testowe konto
									</Button>
									<Button type="submit" variant="contained" color="primary" onClick={submitForm}>
										Zaloguj się
									</Button>
								</Stack>
							)}
						</Formik>
					</CardContent>
				</Card>
			</Grid>
			<Grid size={{ xs: 12, md: 6 }}>
				<Card elevation={0}>
					<CardHeader title="Nie masz konta?"></CardHeader>
					<CardContent>
						<Button variant="outlined" color="primary" fullWidth LinkComponent={Link} href="/auth/register">
							Rejestracja
						</Button>
					</CardContent>
				</Card>
				<AuthAccountBenefits />
			</Grid>
			<FullScreenLoader isVisible={authLoadingSelector}></FullScreenLoader>
		</Grid>
	);
};

export default AuthLoginPage;
