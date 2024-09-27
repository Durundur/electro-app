<template>
	<v-dialog
		max-width="520px"
		class="rounded-lg"
		v-model="resetPassDialog"
		:persistent="true">
		<v-card
			rounded="lg"
			:elevation="4">
			<v-card-text class="py-4">
				<v-card-title class="pa-0">Przypominanie hasła</v-card-title>
				<p class="px-0 py-2 text-subtitle-2">
					Jeśli na ten e-mail jest założone konto, to wyślemy na niego
					wiadomość.
				</p>
				<v-form
					ref="resetPassForm"
					@submit.prevent="">
					<v-text-field
						v-model="resetPassEmail"
						class="mb-4"
						density="compact"
						variant="outlined"
						:rules="$v.required"
						label="Email"
						hide-details="auto"
						prepend-inner-icon="mdi-email-outline"></v-text-field>
					<v-btn
						block
						type="submit"
						class="text-none mb-4"
						color="primary">
						Oszyskaj hasło
					</v-btn>
					<v-btn
						block
						class="text-none"
						@click="
							resetPassDialog = false;
						">
						Anuluj
					</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>
<script lang="ts" setup>
	const resetPassDialog = ref(false);
	const resetPassEmail = ref("");
	const resetPassForm = ref(null);
</script>
