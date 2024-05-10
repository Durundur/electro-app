<template>
	<v-app-bar
		:absolute="true"
		:floating="true">
		<Container>
			<v-row class="ma-0">
				<NuxtLink
					to="/"
					style="display: block">
					<Logo />
				</NuxtLink>
				<v-spacer></v-spacer>
				<SearchInput />
				<v-spacer></v-spacer>
				<div class="d-flex ga-2 align-center">
					<v-btn
						size="small"
						variant="text"
						icon="mdi-heart-outline">
						<v-badge
							color="primary"
							content="1">
							<v-icon size="large"></v-icon>
						</v-badge>
					</v-btn>
					<v-btn
						size="small"
						variant="text"
						icon="mdi-cart-outline">
						<v-badge
							color="primary"
							content="10">
							<v-icon size="large"></v-icon>
						</v-badge>
					</v-btn>
					<template v-if="!$auth.isLoggedIn()">
						<v-btn
							flat
							size="small"
							link
							to="/auth/login"
							variant="elevated"
							color="primary"
							class="ml-4 text-none text-body-2">
							Zaloguj się
						</v-btn>
						<v-btn
							size="small"
							flat
							link
							to="/auth/register"
							variant="outlined"
							color="primary"
							class="text-none text-body-2">
							Załóż konto
						</v-btn>
					</template>
					<AccountIconAndMenu v-else/>
				</div>
			</v-row>
		</Container>
	</v-app-bar>
</template>
<script>
	export default {
		data() {
			return {};
		},
	};
</script>
<style></style>
