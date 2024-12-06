"use client";
import React, { useState } from "react";
import { Grid2 as Grid, Card, CardContent, Button, TextField, IconButton, InputAdornment, CardHeader, Stack } from "@mui/material";
import { EmailOutlined, LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import AuthAccountBenefits from "@/components/Shared/Auth/AuthAccountBenefits";

const AuthLoginPage = () => {
	const [loginCredentials, setLoginCredentials] = useState({
		email: "",
		password: "",
	});
	const [showPass, setShowPass] = useState(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLoginCredentials({
			...loginCredentials,
			[event.target.name]: event.target.value,
		});
	};

	const toggleShowPassword = () => {
		setShowPass(!showPass);
	};

	const handleLoginSubmit = (event: React.FormEvent) => {
		event.preventDefault();
	};

	const fillTestAccount = () => {
		setLoginCredentials({
			email: "admin@test.com",
			password: "123",
		});
	};

	return (
		<Grid container spacing={2}>
			<Grid size={{ xs: 12, md: 6 }}>
				<Card variant="elevation" elevation={4}>
					<CardHeader title="Login In"></CardHeader>
					<CardContent>
						<form onSubmit={handleLoginSubmit}>
							<Stack spacing={2}>
								<TextField
									size="small"
									variant="outlined"
									label="Email"
									name="email"
									value={loginCredentials.email}
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
									value={loginCredentials.password}
									onChange={handleChange}
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
									autoComplete="current-password"
									fullWidth
								/>

								<Button variant="text" size="small">
									Forgot Password?
								</Button>

								<Button variant="contained" color="primary" onClick={fillTestAccount}>
									Test Account
								</Button>

								<Button type="submit" variant="contained" color="primary">
									Log In
								</Button>
							</Stack>
						</form>
					</CardContent>
				</Card>
			</Grid>
			<Grid size={{ xs: 12, md: 6 }}>
				<Card elevation={0}>
					<CardHeader title="Don't have an account?"></CardHeader>
					<CardContent>
						<Button variant="outlined" color="primary" fullWidth LinkComponent={Link} href="/auth/register">
							Register
						</Button>
					</CardContent>
				</Card>
				<AuthAccountBenefits />
			</Grid>
		</Grid>
	);
};

export default AuthLoginPage;
