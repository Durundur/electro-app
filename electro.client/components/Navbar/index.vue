<template>
	<v-app-bar :absolute="true" :floating="true">
		<Container>
			<v-row class="ma-0">
				<NuxtLink style="display: block">
					<Logo />
				</NuxtLink>
				<v-spacer></v-spacer>
				<SearchInput />
				<v-spacer></v-spacer>
				<div class="d-flex ga-2">
					<v-btn size="small" variant="text" icon="mdi-heart-outline">
						<v-badge color="primary" content="1">
							<v-icon size="large"></v-icon>
						</v-badge>
					</v-btn>
					<v-btn size="small" variant="text" icon="mdi-cart-outline">
						<v-badge color="primary" content="10">
							<v-icon size="large"></v-icon>
						</v-badge>
					</v-btn>
					<v-btn size="small" variant="text" icon="mdi-account-outline">
						<v-icon size="large"></v-icon>
					</v-btn>
				</div>
			</v-row>
		</Container>
	</v-app-bar>
</template>
<script></script>
<style></style>
