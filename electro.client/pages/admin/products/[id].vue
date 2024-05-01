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
					@click="save()">
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
				<v-file-input
					variant="solo-filled"
					:prependIcon="false"
					multiple
					single-line
					label="Dodaj zdjęcia"></v-file-input>
				<v-row>
					<template v-for="photo in product.photos">
						<v-col
							cols="6"
							sm="3"
							md="2">
							<v-hover>
								<template v-slot:default="{ isHovering, props }">
									<v-sheet
										v-bind="props"
										flat
										border
										rounded="lg"
										height="100%"
										style="position: relative">
										<v-img
											height="100%"
											rounded="lg"
											aspect-ratio="1/1"
											:src="photo"></v-img>
										<div v-if="isHovering">
											<v-btn
												style="
													position: absolute;
													bottom: 5%;
													left: 50%;
													transform: translateX(-50%);
												"
												v-bind="props"
												density="comfortable"
												size="small"
												variant="elevated"
												color="error"
												icon="mdi-trash-can-outline"></v-btn>
										</div>
									</v-sheet>
								</template>
							</v-hover>
						</v-col>
					</template>
					<v-col
						cols="6"
						sm="3"
						md="2">
						<v-sheet
							flat
							border
							rounded="lg"
							height="100%"
							class="text-body-2 d-flex flex-column justify-center align-center">
							<v-icon style="font-size: 38px">mdi-cloud-upload-outline</v-icon>
							<p>Dodaj plik</p>
						</v-sheet>
					</v-col>
				</v-row>
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
				<template v-for="(field, i) in product.specification">
					<v-row>
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
											icon="mdi-trash-can-outline"></v-btn>
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
											icon="mdi-plus"></v-btn>
									</template>
								</v-tooltip>
							</div>
						</v-col>
						<v-col>
							<template v-if="Array.isArray(field.fieldValue)">
								<div
									v-for="(fieldValue, i) in field.fieldValue"
									class="d-flex align-center ga-2 mb-2">
									<v-text-field
										v-model="field.fieldValue[i]"
										density="compact"
										variant="outlined"
										label="Wartość pola"
										hide-details="auto"></v-text-field>
									<v-tooltip
										text="Usuń wartość pola"
										location="bottom">
										<template v-slot:activator="{ props }">
											<v-btn
												v-bind="props"
												density="comfortable"
												size="x-small"
												variant="elevated"
												color="error"
												icon="mdi-trash-can-outline"></v-btn>
										</template>
									</v-tooltip>
								</div>
							</template>
							<div
								v-else
								class="d-flex align-center ga-2">
								<v-text-field
									v-model="field.fieldValue"
									density="compact"
									variant="outlined"
									label="Wartość pola"
									hide-details="auto"></v-text-field>
								<v-tooltip
									text="Usuń wartość pola"
									location="bottom">
									<template v-slot:activator="{ props }">
										<v-btn
											v-bind="props"
											density="comfortable"
											size="x-small"
											variant="elevated"
											color="error"
											icon="mdi-trash-can-outline"></v-btn>
									</template>
								</v-tooltip>
							</div>
						</v-col>
						<v-divider
							v-if="i !== product.specification.length - 1"
							class="ma-2"></v-divider>
					</v-row>
				</template>
			</v-card-text>
		</v-card>
		<v-card
			class="mb-4"
			border
			flat
			rounded="lg">
			<v-card-title>Wyróżniona specyfikacja</v-card-title>
			<v-card-text>
				<v-combobox
					density="compact"
					label="Specyfikacje"
					variant="outlined"
					:items="product.specification"
					v-model="product.mainSpecification"
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
							v-model="product.stock"
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
				product: {
					id: 123123,
					name: "OnePlus 12 5G 16/512GB Flowy Emerald 120Hz",
					price: {
						newPrice: null,
						price: 4999.0,
						currency: "PLN",
					},
					photos: [
						"https://cdn.x-kom.pl/i/setup/images/prod/big/2400x2000,,2024/1/pr_2024_1_17_11_18_19_433_01.jpg",
						"https://cdn.x-kom.pl/i/setup/images/prod/big/2400x2000,,2024/1/pr_2024_1_17_11_18_25_490_04.jpg",
						"https://cdn.x-kom.pl/i/setup/images/prod/big/product-large,,2024/1/pr_2024_1_17_11_18_31_250_07.jpg",
						"https://cdn.x-kom.pl/i/setup/images/prod/big/2400x2000,,2024/1/pr_2024_1_17_11_18_23_576_03.jpg",
						"https://cdn.x-kom.pl/i/setup/images/prod/big/product-large,,2024/1/pr_2024_1_17_11_18_33_201_08.jpg",
					],
					details: [
						{
							name: "Rodzaj",
							value: "Router bezprzewodowy",
						},
						{
							name: "Standard",
							value: "Wi-Fi 5",
						},
						{
							name: "Częstotliwość",
							value: "2.4 / 5 GHz",
						},
						{
							name: "Prędkość transmisji",
							value: "1200 Mb/s",
						},
					],
					specification: [
						{
							fieldName: "Procesor",
							fieldValue:
								"Qualcomm Snapdragon 8 gen 3 (1x 3.3 GHz, X4 + 5x 3.0 GHz, A720 + 2x 2.3 GHz)",
						},
						{
							fieldName: "układ graficzny",
							fieldValue: "Adreno 750",
						},
						{
							fieldName: "Pamięć RAM",
							fieldValue: "16 GB",
						},
						{
							fieldName: "Pamięć wbudowana",
							fieldValue: "512 GB",
						},
						{
							fieldName: "Typ ekranu",
							fieldValue: "Dotykowy, AMOLED",
						},
						{
							fieldName: "Częstotliwość odświeżania ekranu",
							fieldValue: "120Hz",
						},
						{
							fieldName: "Przekątna ekranu",
							fieldValue: '6,82"',
						},
						{
							fieldName: "Rozdzielczość ekranu",
							fieldValue: "3168 x 1440",
						},
						{
							fieldName: "Rozdzielczość aparatu - tył",
							fieldValue: [
								"50.0 Mpix",
								"48.0 Mpix - ultraszerokokątny",
								"64.0 Mpix - teleobiektyw",
							],
						},
						{
							fieldName: "Łączność",
							fieldValue: [
								"5G",
								"Wi-Fi",
								"NFC",
								"Bluetooth 5.4",
								"LoraWan",
								"BLE",
							],
						},
					],
					description: "",
				},
			};
		},
		methods: {
			save() {
				console.log(this.product.description);
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
