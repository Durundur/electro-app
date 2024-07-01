<template>
	<NuxtLayout name="default">
		<Container
			class="min-main-content-height text-center py-4 d-flex flex-column justify-center align-center">
			<p class="text-h2 text-center text-primary font-weight-bold">
				{{ error?.statusCode }}
			</p>

			<p class="text-center text-h6">Upps.</p>
			<p class="text-center text-h6 font-weight-bold">
				{{
					error?.statusCode === 404
						? "Strona o podanym adresie nie istnieje."
						: error?.message
				}}
			</p>

			<v-btn
				color="primary"
				class="text-none ma-3"
				@click="handleError">
				Wróc na stronę główną
			</v-btn>
		</Container>
	</NuxtLayout>
</template>
<script setup>
	const error = useError();
	const handleError = () => clearError({ redirect: "/" });
</script>
