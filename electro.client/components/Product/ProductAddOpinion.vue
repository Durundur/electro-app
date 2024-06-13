<template>
	<v-sheet
		class="pa-4 mb-4"
		rounded="lg"
		border
		flat>
		<p class="d-block text-center mb-4">Masz ten produkt?</p>
		<div class="mx-auto my-4 button-limit">
			<v-dialog
				v-model="isDialogOpen"
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
							<div class="my-4 text-center">
								<p>Twoja ocena produktu</p>
								<v-rating
									v-model="opinion.rating"
									half-increments
									color="primary"
									hover></v-rating>
							</div>
							<span class="d-block mb-4">
								Napisz, co myślisz o tym produkcie:
							</span>
							<v-form
								ref="opinionForm"
								@submit.prevent="onSubmitOpinion">
								<div>
									<v-textarea
										v-model="opinion.review"
										:rules="$v.required"
										persistent-hint
										hint="Pamiętaj, że Twoja opinia powinna dotyczyć produktu i jego funkcjonalności."
										density="compact"
										label="Twoja opinia"
										auto-grow
										variant="outlined"
										class="mb-4"></v-textarea>
									<v-text-field
										v-model="opinion.authorDisplayName"
										:rules="$v.required"
										density="compact"
										variant="outlined"
										label="Imię"></v-text-field>
									<v-text-field
										:rules="$v.required"
										density="compact"
										variant="outlined"
										label="E-mail"></v-text-field>
								</div>
								<div class="d-flex">
									<v-spacer></v-spacer>
									<v-btn
										class="text-none"
										color="primary"
										variant="elevated"
										type="submit">
										Dodaj opinię
									</v-btn>
								</div>
							</v-form>
						</v-card-text>
					</v-card>
				</template>
			</v-dialog>
		</div>
	</v-sheet>
</template>
<script setup>
	const props = defineProps({
		product: {
			type: Object,
			required: true,
		},
	});
	const { $api, $toast } = useNuxtApp();
	const emit = defineEmits(["new-opinion"]);
	const isDialogOpen = ref(false);
	const opinion = ref({
		review: "",
		authorDisplayName: "",
		rating: null,
		productId: null,
	});
	const opinionForm = ref(null);

	async function onSubmitOpinion() {
		if (opinionForm.value.isValid) {
			opinion.value.productId = props.product.id;
			const response = await $api.post(
				`api/opinions/product/${props.product.id}`,
				opinion.value,
			);
			if (!response.ok) {
				$toast.error("Błąd podczas dodawania opinii");
				return;
			}
			$toast.success("Pomyślnie dodano opinię");
			isDialogOpen.value = false;
			opinionForm.value.reset();
			emit("new-opinion", response.data);
		}
	}
</script>
<style>
	@media only screen and (min-width: 600px) {
		.button-limit {
			width: 50%;
		}
	}
</style>
