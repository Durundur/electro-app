<template>
	<ProductForm
		@save="onSaveProduct"
		:defaultProduct="product"></ProductForm>
</template>
<script setup>
	import utlis from "~/utlis";
	definePageMeta({
		layout: "admin",
	});

	const { $api, $toast } = useNuxtApp();

	const product = ref({
		name: "",
		group: null,
		category: null,
		subCategory: null,
		price: {
			oldPrice: null,
			price: null,
			currency: "",
		},
		photos: [],
		features: [],
		specification: [],
		description: "",
		stockQuantity: null,
		isArchived: false,
		isPublished: false,
	});

	async function onSaveProduct(product) {
		const files = product.photos;
		if (files && files.length > 0) {
			try {
				const filesAsBase64 = await utlis.convertFilesToBase64Async(files);
				product.photos = filesAsBase64;
			} catch (ex) {
				$toast.error("Błąd przetwarzania plików");
				return;
			}
		}
		const response = await $api.post("api/products", product);
		if (!response.ok) {
			$toast.error(response.data.message);
		}
		$toast.success("Pomyślnie zapisano");
	}
</script>
