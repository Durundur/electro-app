<template>
	<ProductForm
		@save="saveProduct"
		:defaultProduct="product"></ProductForm>
</template>
<script>
	import utlis from "~/utlis";
	definePageMeta({
		layout: "admin",
	});
	export default {
		data() {
			return {
				product: {
					name: "",
					group: null,
					category: null,
					subCategory: null,
					price: {
						newPrice: null,
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
				},
			};
		},
		methods: {
			saveProduct() {
				const files = this.product.photos;
				Promise.all(
					files.map(async (file, index) => {
						if (file instanceof File) {
							this.product.photos[index] = await utlis.convertFileToBase64(
								file,
							);
						} else {
							this.product.photos[index] = file;
						}
					}),
				).then(async () => {
					const response = await this.$nuxt.$api.post(
						"api/products",
						this.product,
					);
				});
			},
		},
	};
</script>
