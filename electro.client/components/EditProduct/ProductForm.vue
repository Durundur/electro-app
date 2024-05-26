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
					class="text-none"
					size="small"
					@click="emitSaveEvent">
					Zapisz
				</v-btn>
			</v-card-title>
			<v-card-text>
				<v-row>
					<v-col>
						<v-text-field
							v-model.trim="product.name"
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
							v-model.number="product.price.price"
							type="number"
							density="compact"
							variant="outlined"
							label="Cena"
							hide-details="auto"
							prepend-inner-icon="mdi-cash"></v-text-field>
					</v-col>
					<v-col>
						<v-text-field
							v-model.number="product.price.newPrice"
							type="number"
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
							v-model="selectedGroup"
							:items="groups"
							clearable
							item-title="name"
							return-object
							density="compact"
							variant="outlined"
							label="Grupa"
							hide-details="auto"></v-select>
					</v-col>
					<v-col>
						<v-select
							v-model="selectedCategory"
							:items="categories"
							clearable
							return-object
							item-title="name"
							density="compact"
							variant="outlined"
							label="Kategoria"
							no-data-text="Brak opcji dla wybranej grupy."
							hide-details="auto"></v-select>
					</v-col>
					<v-col>
						<v-select
							v-model="selectedSubCategory"
							:items="subCategories"
							clearable
							return-object
							item-title="name"
							density="compact"
							variant="outlined"
							label="Podkategoria"
							no-data-text="Brak opcji dla wybranej kategorii."
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
							v-model.number="product.stockQuantity"
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
<script setup>
	import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter";
	import ImageCompress from "quill-image-compress";
	definePageMeta({
		layout: "admin",
	});
	const props = defineProps({
		defaultProduct: {
			type: Object,
			required: true,
		},
	});
	const { $api } = useNuxtApp();
	const emit = defineEmits(["save"]);

	const product = ref({ ...props.defaultProduct });
	const groups = ref([]);
	const selectedGroup = ref(product.value.group || null);
	const selectedCategory = ref(product.value.category || null);
	const selectedSubCategory = ref(product.value.subCategory || null);

	const { data: groupsRes } = await useAsyncData(() =>
		$api.get("api/groups/allGroups"),
	);

	if (groupsRes.value.ok) {
		groups.value = groupsRes.value.data;
	} else {
		$toast.error("Błąd podczas pobierania kategorii.");
	}

	const categories = computed(() => {
		if (selectedGroup.value) {
			const { id, name } = selectedGroup.value;
			const group = groups.value.find((g) => g.id === id && g.name === name);
			return group?.categories || [];
		}
		return [];
	});

	const subCategories = computed(() => {
		if (selectedCategory.value) {
			const { id, name } = selectedCategory.value;
			const category = categories.value.find(
				(c) => c.id === id && c.name === name,
			);
			return category?.subCategories || [];
		}
		return [];
	});

	watch(selectedGroup, (newVal) => {
		if (newVal && newVal.id && newVal.name) {
			product.value.group = { id: newVal.id, name: newVal.name };
		} else {
			product.value.group = null;
			selectedCategory.value = null;
			selectedSubCategory.value = null;
		}
	});

	watch(selectedCategory, (newVal) => {
		if (newVal && newVal.id && newVal.name) {
			product.value.category = { id: newVal.id, name: newVal.name };
		} else {
			product.value.category = null;
			selectedSubCategory.value = null;
		}
	});

	watch(selectedSubCategory, (newVal) => {
		if (newVal && newVal.id && newVal.name) {
			product.value.subCategory = { id: newVal.id, name: newVal.name };
		} else {
			product.value.subCategory = null;
		}
	});

	function emitSaveEvent() {
		emit("save", product.value);
	}

	const quillModules = ref([
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
	]);
</script>
<style scoped>
	.v-tooltip :deep(.v-overlay__content) {
		font-size: 10px;
	}
	:deep(.ql-editor) {
		min-height: 300px;
	}
</style>
