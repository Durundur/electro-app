<template>
  <v-container class="pa-0">
    <v-row v-for="rowIndex in currentRows" :key="rowIndex" dense>
      <v-col
        v-for="(item, colIndex) in getItemsForRow(rowIndex)"
        :key="`grid-item-${rowIndex}-${colIndex}`"
        :cols="12 / currentColumns"
      >
        <ProductGridItem :product="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';
import type { IProductOverview } from '~/types/Product/Product';

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

watch(() => props.products, () => console.log(props.products));

const getItemsForRow = (rowIndex: number) => {
  const newItems = [...props.products];
  const startIndex = (rowIndex - 1) * currentColumns.value;
  const endIndex = startIndex + currentColumns.value;
  return newItems.slice(startIndex, endIndex);
};

watch(
  () => props.products,
  (newProducts) => {
    console.log("ProductGrid products changed:", newProducts);
  }
);
</script>
