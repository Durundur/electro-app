<template>
	<v-app-bar
		:absolute="true"
		:height="100">
		<Container style="padding-bottom: 0 !important">
			<v-row
				no-gutters
				align="center"
				class="my-2">
				<NuxtLink
					to="/"
					style="display: block">
					<Logo />
				</NuxtLink>
				<v-spacer></v-spacer>
				<SearchInput />
				<v-spacer></v-spacer>
				<div class="d-flex ga-2 align-center">
					<CartButton />
					<AccountButton v-if="authStore.isLoggedIn" />
					<template v-else>
						<v-btn
							flat
							size="small"
							to="/auth/login"
							variant="elevated"
							color="primary"
							class="ml-4 text-none text-body-2">
							{{ $i18n.t('Auth.LoginTitle') }}
						</v-btn>
						<v-btn
							size="small"
							to="/auth/register"
							variant="outlined"
							color="primary"
							class="text-none text-body-2">
							{{ $i18n.t('Auth.RegisterSubmit') }}
						</v-btn>
					</template>
				</div>
			</v-row>
			<v-row no-gutters>
				<ProductHierarchy />
			</v-row>
		</Container>
	</v-app-bar>
</template>
<script setup lang="ts">
	const {$i18n} = useNuxtApp();
	const authStore = useAuthStore();
</script>
