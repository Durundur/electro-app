"use client";
import React, { useState } from "react";
import { Grid, Card, CardContent, Button, TextField, IconButton, InputAdornment, CardHeader, Stack, Checkbox, FormControlLabel } from "@mui/material";
import { EmailOutlined, LockOutlined, PersonOutlineRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import AuthAccountBenefits from "@/components/Shared/Auth/AuthAccountBenefits";

const AuthRegisterPage = () => {
	const [registerCredentials, setRegisterCredentials] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		repeatPassword: "",
		consents: false,
	});
	const [showPass, setShowPass] = useState(false);

	const toggleShowPassword = () => {
		setShowPass(!showPass);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setRegisterCredentials({
			...registerCredentials,
			[name]: value,
		});
	};

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRegisterCredentials({
			...registerCredentials,
			consents: event.target.checked,
		});
	};

	const handleRegisterSubmit = (event: React.FormEvent) => {
		event.preventDefault();
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={6}>
				<Card variant="elevation" elevation={4}>
					<CardHeader title="Register"></CardHeader>
					<CardContent>
						<form onSubmit={handleRegisterSubmit}>
							<Stack spacing={2}>
								<TextField
									size="small"
									variant="outlined"
									label="First name"
									name="firstName"
									onChange={handleInputChange}
									value={registerCredentials.firstName}
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
								<TextField
									size="small"
									variant="outlined"
									label="Last name"
									name="lastName"
									onChange={handleInputChange}
									value={registerCredentials.lastName}
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
								<TextField
									size="small"
									variant="outlined"
									label="Email"
									name="email"
									onChange={handleInputChange}
									value={registerCredentials.email}
									autoComplete="username"
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
								<TextField
									size="small"
									variant="outlined"
									label="Password"
									name="password"
									type={showPass ? "text" : "password"}
									onChange={handleInputChange}
									value={registerCredentials.password}
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
								<TextField
									size="small"
									variant="outlined"
									label="Repeat password"
									name="repeatPassword"
									type="password"
									onChange={handleInputChange}
									value={registerCredentials.repeatPassword}
									autoComplete="current-password"
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
								<FormControlLabel control={<Checkbox size="small" checked={registerCredentials.consents} onChange={handleCheckboxChange} />} label="I accept the store regulations" />
								<Button type="submit" variant="contained" color="primary">
									Register
								</Button>
							</Stack>
						</form>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} md={6}>
				<Card elevation={0}>
					<CardHeader title="Have an account?" />
					<CardContent>
						<Button variant="outlined" color="primary" fullWidth LinkComponent={Link} href="/auth/login">
							Login
						</Button>
					</CardContent>
				</Card>
				<AuthAccountBenefits />
			</Grid>
		</Grid>
	);
};

export default AuthRegisterPage;
