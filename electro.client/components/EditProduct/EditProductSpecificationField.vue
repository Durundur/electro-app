<template>
	<v-col cols="4">
		<div class="d-flex align-center ga-2">
			<v-text-field
				v-model="field.fieldName"
				density="compact"
				variant="outlined"
				label="Nazwa pola"
				class="mr-4"
				hide-details="auto"></v-text-field>
			<v-tooltip
				text="Usuń pole"
				location="bottom">
				<template v-slot:activator="{ props }">
					<v-btn
						v-bind="props"
						density="comfortable"
						size="x-small"
						variant="elevated"
						color="error"
						icon="mdi-trash-can-outline"
						@click="removeField"></v-btn>
				</template>
			</v-tooltip>
			<v-tooltip
				text="Dodaj wartość pola"
				location="bottom">
				<template v-slot:activator="{ props }">
					<v-btn
						v-bind="props"
						density="comfortable"
						size="x-small"
						variant="elevated"
						color="success"
						icon="mdi-plus"
						@click="addFieldValue"></v-btn>
				</template>
			</v-tooltip>
		</div>
	</v-col>
	<v-col>
		<div v-if="Array.isArray(field.fieldValue)">
			<div
				v-for="(fieldValue, fieldValueIndex) in field.fieldValue"
				:key="index"
				class="d-flex align-center ga-2 mb-2">
				<v-text-field
					v-model="field.fieldValue[fieldValueIndex]"
					density="compact"
					variant="outlined"
					label="Wartość pola"
					hide-details="auto"
					:class="{ 'mr-7': fieldValueIndex === 0 }"></v-text-field>
				<v-tooltip
					text="Usuń wartość pola"
					location="bottom"
					v-if="fieldValueIndex !== 0">
					<template v-slot:activator="{ props }">
						<v-btn
							v-bind="props"
							density="comfortable"
							size="x-small"
							variant="elevated"
							color="error"
							icon="mdi-trash-can-outline"
							@click="removeFieldValue(fieldValueIndex)"></v-btn>
					</template>
				</v-tooltip>
			</div>
		</div>
	</v-col>
</template>

<script>
	export default {
		props: {
			field: {
				type: Object,
				required: true,
			},
			index: {
				type: Number,
				required: true,
			},
		},
		methods: {
			removeField() {
				this.$emit("remove-field", this.index);
			},
			removeFieldValue(index) {
				this.$emit("remove-field-value", this.index, index);
			},
			addFieldValue() {
				this.$emit("add-field-value", this.index);
			},
		},
	};
</script>
