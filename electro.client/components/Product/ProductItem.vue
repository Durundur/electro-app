<template>
	<v-hover v-slot="{ isHovering, props }">
		<v-card class="ma-1" v-bind="props" :elevation="isHovering ? 4 : 0" :border="true" rounded="lg" href="/" hover :ripple="false">
			<v-img aspect-ratio="7/6" :src="product.image"></v-img>
			<v-card-text class="pa-2 text-body-1">
				<div class="title">{{ product.title }}</div>
			</v-card-text>
			<v-card-text class="pa-2">
				<div class="d-flex align-center" style="height: 40px">
					<span class="text-body-1">{{ product.price }} zł</span>
					<v-spacer></v-spacer>
					<v-fade-transition>
						<v-btn size="small" v-if="isHovering" color="success" icon="mdi-cart-plus"></v-btn>
					</v-fade-transition>
				</div>
			</v-card-text>
		</v-card>
	</v-hover>
</template>
<script>
export default {
	props: {
		product: {
			type: Object,
			required: true,
			default() {
				return { id: null, title: null, image: null, price: null };
			}
		}
	}
};
</script>
<style scoped>
:deep(.v-card__overlay) {
	background-color: inherit;
}
.title {
	font-size: 1em;
	line-height: 1em;
	height: 2em;
	overflow: hidden;
	white-space: normal;
	text-overflow: ellipsis;
}
</style>
