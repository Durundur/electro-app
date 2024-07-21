<template>
	<v-app-bar
		:height="100"
		:absolute="true"
		floating>
		<Container>
			<v-row class="ma-0 pt-2">
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
						icon="mdi-cart-outline"
						to="/cart">
						<v-badge
							:model-value="cartStore.cart.productsCount > 0"
							color="primary"
							:content="cartStore.cart.productsCount">
							<v-icon size="large"></v-icon>
						</v-badge>
					</v-btn>
					<AccountIconAndMenu v-if="authStore.isLoggedIn" />
					<template v-else>
						<v-btn
							flat
							size="small"
							to="/auth/login"
							variant="elevated"
							color="primary"
							class="ml-4 text-none text-body-2">
							Zaloguj się
						</v-btn>
						<v-btn
							size="small"
							to="/auth/register"
							variant="outlined"
							color="primary"
							class="text-none text-body-2">
							Załóż konto
						</v-btn>
					</template>
				</div>
				<div class="pt-2">
					<Categories />
				</div>
			</v-row>
		</Container>
	</v-app-bar>
</template>
<script setup>
	const authStore = useAuthStore();
	const cartStore = useCartStore();
</script>
