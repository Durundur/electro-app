<template>
	<v-alert
		class="text-body-3"
		type="warning"
		variant="tonal"
		:text="text"
		@click:close="cartStore.removeMessage(messageIndex)"
		closable
		density="compact"></v-alert>
</template>
<script lang="ts" setup>
	export interface ICartMessageProps {
		text: string;
		messageIndex: number;
	}
	const props = defineProps<ICartMessageProps>();
	const cartStore = useCartStore();
</script>
