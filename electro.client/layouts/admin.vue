<template>
	<v-app>
		<v-app-bar
			:absolute="true"
			:floating="false">
			<div class="d-flex flex-row align-center justify-space-between w-100">
				<div class="d-flex align-center">
					<v-app-bar-nav-icon
						variant="text"
						size="small"
						class="mx-4"
						@click.stop="drawer = !drawer"></v-app-bar-nav-icon>
					<NuxtLink
						to="/"
						style="display: block">
						<Logo />
					</NuxtLink>
				</div>
				<div class="px-4">
					<AccountIconAndMenu />
				</div>
			</div>
		</v-app-bar>
		<v-navigation-drawer
			:absolute="true"
			permanent
			v-model="drawer"
			:location="$vuetify.display.mobile ? 'left' : undefined">
			<v-list-item
				link
				title="Produkty"
				prepend-icon="mdi-cart-outline"
				to="/admin/products"</v-list-item>
			<v-list-item
				link
				title="Nowy produkt"
				prepend-icon="mdi-cart-outline"
				to="/admin/products/edit"></v-list-item>
			<v-list-item
				link
				title="Grupy"
				prepend-icon="mdi-group"
				to="/admin/groups"></v-list-item>
		</v-navigation-drawer>
		<v-main>
			<slot></slot>
		</v-main>
	</v-app>
</template>
<script>
	export default {
		data() {
			return {
				drawer: true,
			};
		},
	};
</script>
