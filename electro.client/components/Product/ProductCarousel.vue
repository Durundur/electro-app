<template>
	<v-carousel
		height="auto"
		hide-delimiters>
		<v-carousel-item
			v-for="(items, index) in productPerGrid"
			:key="`carousel-item-${index}`">
			<ProductGrid
				:key="`product-grid-${index}-${items.length}`"
				:products="items"
				:rows="rows"
				:columns="columns" />
			</v-carousel-item>
	</v-carousel>
</template>

<script setup lang="ts">
	import { useDisplay } from "vuetify";
	import type { IProductOverview } from "~/types/Product/Product";

	const props = defineProps<{
		products: IProductOverview[];
		rows: { xs: number; sm: number; md: number; lg: number; xl: number };
		columns: { xs: number; sm: number; md: number; lg: number; xl: number };
	}>();

	const { smAndDown, mdAndDown, lgAndDown, xlAndDown } = useDisplay();
   
	const currentColumns = computed(() => {
		if (smAndDown.value) return props.columns.xs;
		if (mdAndDown.value) return props.columns.sm;
		if (lgAndDown.value) return props.columns.md;
		if (xlAndDown.value) return props.columns.lg;
		return props.columns.xl;
	});
    
	const currentRows = computed(() => {
		if (smAndDown.value) return props.rows.xs;
		if (mdAndDown.value) return props.rows.sm;
		if (lgAndDown.value) return props.rows.md;
		if (xlAndDown.value) return props.rows.lg;
		return props.rows.xl;
	});

	const itemsPerPage = computed(() => currentRows.value * currentColumns.value);
    
	const productPerGrid = computed(() => {
		const newProducts = [...props.products]; // Nowa referencja
		const temp = [];
		for (let i = 0; i < newProducts.length; i += itemsPerPage.value) {
			temp.push(
			newProducts.slice(i, i + itemsPerPage.value),
			);
		}
		return temp;
	});


	watch(
  () => props.products,
  (newProducts) => {
    // Sprawdź czy zmiana jest wykrywana i wymuś odświeżenie produktu w ProductGrid
    console.log("Products changed:", newProducts);
  }
);
</script>