<template>
	<NuxtLayout>
		<Container class="fill-height">
			<v-row justify="center">
				<v-col cols="12">
					<p class="text-h2 text-center text-primary font-weight-bold">
						{{ error?.statusCode }}
					</p>
				</v-col>
				<v-col cols="12">
					<p class="text-center text-h6">Upps.</p>
					<p class="text-center text-h6 font-weight-bold">
						{{
							error?.statusCode === 404
								? "Strona o podanym adresie nie istnieje."
								: error?.message
						}}
					</p>
				</v-col>
				<v-btn
					color="primary"
					class="text-none ma-3"
					@click="handleError">
					Wróc na stronę główną
				</v-btn>
			</v-row>
		</Container>
	</NuxtLayout>
</template>
<script setup>
	const error = useError();
	const handleError = () => {
		clearError({ redirect: "/" });
	};
</script>
