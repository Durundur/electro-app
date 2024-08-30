<template>
	<NuxtLayout name="default">
		<Container
			class="h-inherit text-center d-flex flex-column justify-center align-center">
			<p class="text-h2 text-primary font-weight-bold">
				{{ error?.statusCode }}
			</p>

			<p>Upps.</p>
			<p class="text-h6 font-weight-bold">
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
