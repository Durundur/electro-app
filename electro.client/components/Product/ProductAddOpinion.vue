<template>
	<v-sheet
		class="pa-4 mb-4"
		rounded="lg"
		border
		flat>
		<p class="d-block text-center mb-4">Masz ten produkt?</p>
		<div class="mx-auto my-4 button-limit">
			<v-dialog
				max-width="520px"
				persistent>
				<template v-slot:activator="{ props: activatorProps }">
					<v-btn
						v-bind="activatorProps"
						class="text-none"
						color="primary"
						block>
						Dodaj opinię
					</v-btn>
				</template>
				<template v-slot:default="{ isActive }">
					<v-card rounded="lg">
						<v-card-title class="d-flex justify-space-between align-center">
							Dodaj opinię
							<v-btn
								class="d-inline"
								@click="isActive.value = false"
								icon="mdi-close"
								variant="text"></v-btn>
						</v-card-title>
						<v-card-text>
							<div class="d-flex align-center">
								<v-img
									width="100px"
									:src="product.photos[0]"></v-img>
								<span>{{ product.name }}</span>
							</div>
							<div class="d-flex flex-column my-4">
								<span class="d-block text-center">Twoja ocena produktu</span>
								<ProductRatingStars v-model="rating" />
							</div>
							<span class="d-block mb-4">
								Napisz, co myślisz o tym produkcie:
							</span>
							<div>
								<v-form>
									<v-textarea
										persistent-hint
										hint="Pamiętaj, że Twoja opinia powinna dotyczyć produktu i jego funkcjonalności."
										density="compact"
										label="Twoja opinia"
										auto-grow
										variant="outlined"
										class="mb-4"></v-textarea>
									<v-text-field
										density="compact"
										variant="outlined"
										label="Imię"></v-text-field>
									<v-text-field
										density="compact"
										variant="outlined"
										label="E-mail"></v-text-field>
								</v-form>
							</div>
							<div class="d-flex">
								<v-spacer></v-spacer>
								<v-btn
									class="text-none"
									color="primary"
									variant="elevated">
									Dodaj opinię
								</v-btn>
							</div>
						</v-card-text>
					</v-card>
				</template>
			</v-dialog>
		</div>
	</v-sheet>
</template>
<script>
	export default {
		props: {
			product: {
				type: Object,
			},
		},
		data() {
			return {
				rating: 2,
			};
		},
		watch: {
			rating(v) {
				console.log(v);
			},
		},
	};
</script>
<style>
	@media only screen and (min-width: 600px) {
		.button-limit {
			width: 50%;
		}
	}
</style>
