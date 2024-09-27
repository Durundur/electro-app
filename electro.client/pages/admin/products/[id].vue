<template>
	<ProductForm
		@save="onSaveProduct"
		:defaultProduct="product"></ProductForm>
</template>
<script setup>
	import utlis from "~/utlis";
	definePageMeta({
		layout: "admin",
		allowAnonymous: false
	});

	const { $api, $toast } = useNuxtApp();
	const route = useRoute();
	const product = ref({});
	const { data: productRes } = await useAsyncData(() =>
		$api.get(`api/products/${route.params.id}`),
	);
	if (productRes.value.ok) {
		product.value = productRes.value.data;
	}

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
		const response = await $api.put(`api/products/${route.params.id}`, product);
		if (!response.ok) {
			$toast.error(response.data.message);
		}
		$toast.success("Pomyślnie zapisano");
	}
</script>
