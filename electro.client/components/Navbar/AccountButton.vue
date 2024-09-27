<template>
	<v-menu open-on-hover>
		<template #activator="{ props }">
			<v-btn
				v-bind="props"
				size="small"
				variant="text"
				icon="mdi-account-outline">
				<v-icon size="large"></v-icon>
			</v-btn>
		</template>
		<v-list>
			<v-list-item
				slim
				density="compact"
				link
				to="/account/">
				<template v-slot:prepend>
					<v-icon icon="mdi-account-outline"></v-icon>
				</template>
				<v-list-item-subtitle class="default-text">
					{{ $i18n.t('Auth.YourAccount') }}
				</v-list-item-subtitle>
			</v-list-item>
			<v-list-item
				slim
				density="compact"
				link
				to="/account/orders">
				<template v-slot:prepend>
					<v-icon icon="mdi-clipboard-text-multiple-outline"></v-icon>
				</template>
				<v-list-item-subtitle class="default-text">
					{{ $i18n.t('Auth.Orders') }}
				</v-list-item-subtitle>
			</v-list-item>
			<v-list-item
				v-if="isAdmin"
				slim
				density="compact"
				link
				to="/admin">
				<template v-slot:prepend>
					<v-icon icon="mdi-security"></v-icon>
				</template>
				<v-list-item-subtitle class="default-text">
					{{ $i18n.t('Auth.AdminPanel') }}
				</v-list-item-subtitle>
			</v-list-item>
			<v-list-item
				slim
				density="compact"
				link
				to="/account/settings">
				<template v-slot:prepend>
					<v-icon icon="mdi-cog-outline"></v-icon>
				</template>
				<v-list-item-subtitle class="default-text">
					{{ $i18n.t('Auth.Settings') }}
				</v-list-item-subtitle>
			</v-list-item>
			<v-list-item
				slim
				density="compact"
				@click="authStore.logout">
				<template v-slot:prepend>
					<v-icon icon="mdi-logout"></v-icon>
				</template>
				<v-list-item-subtitle class="default-text">
					{{ $i18n.t('Auth.Logout') }}
				</v-list-item-subtitle>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script setup lang="ts">
	const { $i18n } = useNuxtApp();
	const authStore = useAuthStore();
	const isAdmin = computed(() => authStore.store.authData?.roles.includes("Admin"));
</script>

<style scoped>
	:deep(.v-list-item__content) {
		padding: 8px 0;
	}
</style>
