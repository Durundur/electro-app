<template>
	<v-container fluid>
		<v-card
			class="mb-4"
			border
			flat
			rounded="lg">
			<v-card-title class="d-flex justify-space-between align-center">
				<span>Informacje o produkcie</span>
				<v-btn
					color="success"
					prepend-icon="mdi-content-save"
					variant="elevated"
					class="text-none"
					flat
					size="small"
					@click="emitSaveEvent">
					Zapisz
				</v-btn>
			</v-card-title>
			<v-card-text>
				<v-row>
					<v-col>
						<v-text-field
							v-model="product.name"
							density="compact"
							variant="outlined"
							label="Nazwa"
							hide-details="auto"
							prepend-inner-icon="mdi-tag-text-outline"></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field
							v-model="product.price.price"
							density="compact"
							variant="outlined"
							label="Cena"
							hide-details="auto"
							prepend-inner-icon="mdi-cash"></v-text-field>
					</v-col>
					<v-col>
						<v-text-field
							v-model="product.price.newPrice"
							density="compact"
							variant="outlined"
							label="Nowa Cena"
							hide-details="auto"></v-text-field>
					</v-col>
					<v-col>
						<v-select
							v-model="product.price.currency"
							density="compact"
							variant="outlined"
							:items="['PLN', 'EUR', 'USD']"
							label="Waluta"
							hide-details="auto"></v-select>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-select
							v-model="product.group"
							density="compact"
							variant="outlined"
							label="Grupa"
							hide-details="auto"></v-select>
					</v-col>
					<v-col>
						<v-select
							v-model="product.category"
							density="compact"
							variant="outlined"
							label="Kategoria"
							hide-details="auto"></v-select>
					</v-col>
					<v-col>
						<v-select
							v-model="product.subCategory"
							density="compact"
							variant="outlined"
							:items="[]"
							label="Podkategoria"
							hide-details="auto"></v-select>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
		<v-card
			class="mb-4"
			border
			flat
			rounded="lg">
			<v-card-title>Zdjęcia</v-card-title>
			<v-card-text>
				<FileUploader v-model="product.photos" />
			</v-card-text>
		</v-card>
		<v-card
			class="mb-4"
			border
			flat
			rounded="lg">
			<v-card-title>Opis</v-card-title>
			<v-card-text>
				<QuillEditor
					style="min-height: 300px"
					:modules="quillModules"
					v-model:content="product.description"
					contentType="html"
					toolbar="full"></QuillEditor>
			</v-card-text>
		</v-card>
		<v-card
			class="mb-4"
			border
			flat
			rounded="lg">
			<v-card-title>Specyfikacja</v-card-title>
			<v-card-text>
				<EditProductSpecification
					v-model="product.specification"></EditProductSpecification>
			</v-card-text>
		</v-card>
		<v-card
			class="mb-4"
			border
			flat
			rounded="lg">
			<v-card-title>Wyróżniona specyfikacja</v-card-title>
			<v-card-text>
				<v-row>
					<v-col cols="6">
						<v-combobox
							density="compact"
							label="Wybierz pola"
							variant="outlined"
							:items="product.specification"
							v-model="product.features"
							item-title="fieldName"
							item-value="fieldValue"
							hide-details
							return-object
							chips
							closable-chips
							multiple>
							<template v-slot:chip="{ props, item }">
								<v-chip
									v-bind="props"
									:text="`${item.title}: ${item.value}`"></v-chip>
							</template>
						</v-combobox>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
		<v-card
			class="mb-4"
			border
			flat
			rounded="lg">
			<v-card-title>Status oferty</v-card-title>
			<v-card-text>
				<v-row>
					<v-col cols="4">
						<v-text-field
							v-model="product.stockQuantity"
							density="compact"
							variant="outlined"
							label="Dostępna ilość"
							type="number"
							hide-details="auto"></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-checkbox
							:model-value="product.isArchived"
							color="primary"
							hide-details
							density="compact"
							label="Produkt archiwalny"></v-checkbox>
					</v-col>
					<v-col cols="12">
						<v-checkbox
							:model-value="product.isPublished"
							color="primary"
							hide-details
							density="compact"
							label="Produkt opublikowany"></v-checkbox>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</v-container>
</template>
<script>
	import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter";
	import ImageCompress from "quill-image-compress";
	definePageMeta({
		layout: "admin",
	});
	export default {
		props: {
			defaultProduct: {
				type: Object,
				required: true,
			},
		},
		data() {
			return {
				quillModules: [
					{
						name: "blotFormatter",
						module: BlotFormatter,
					},
					{
						name: "imageCompress",
						module: ImageCompress,
						options: {
							quality: 0.7, // default
							maxWidth: 1000, // default
							maxHeight: 1000, // default
							imageType: "image/jpeg", // default
							debug: true, // default
							suppressErrorLogging: false, // default
							insertIntoEditor: undefined, // default
						},
					},
				],
				product: { ...this.defaultProduct },
			};
		},
		methods: {
			emitSaveEvent() {
				this.$emit("save", this.product);
			},
		},
	};
</script>
<style scoped>
	.ql-container,
	.ql-editor {
		min-height: inherit;
	}
	.v-tooltip :deep(.v-overlay__content) {
		font-size: 10px;
	}
</style>
