<template>
	<v-card
		rounded="0"
		elevation="0">
		<v-card-text class="py-2 px-2">
			<v-row
				dense
				align="center"
				class="w-100">
				<v-col
					cols="4"
					sm="2">
					<NuxtLink
						:to="`/product/${product.productId}`"
						style="display: block; text-decoration: none; color: unset">
						<v-img
							class="mx-auto"
							:aspect-ratio="4 / 3"
							:max-width="100"
							:src="product.photo"></v-img>
					</NuxtLink>
				</v-col>
				<v-col>
					<v-row
						dense
						align="center">
						<v-col>
							<NuxtLink
								:to="`/product/${product.productId}`"
								style="display: block; text-decoration: none; color: unset">
								<p class="text-body-2">{{ product.name }}</p>
							</NuxtLink>
						</v-col>
						<v-col
							align="center"
							sm="2"
							class="d-none d-sm-block">
							<span>{{ product.count }} szt.</span>
						</v-col>
						<v-col
							align="center"
							sm="2"
							class="d-none d-sm-block">
							<p
								v-if="product.price.oldPrice"
								class="text-no-wrap text-caption d-block text-decoration-line-through">
								{{ $formatters.priceFormatter(product.price.oldPrice) }} zł
							</p>
							<p class="text-no-wrap">
								{{ $formatters.priceFormatter(product.price.price) }} zł
							</p>
						</v-col>
					</v-row>
					<v-row
						dense
						class="d-flex d-sm-none">
						<v-col align="end">
							<span>{{ product.count }} szt.</span>
						</v-col>
						<v-col align="end">
							<span class="text-no-wrap pl-4">
								{{ $formatters.priceFormatter(product.price.price) }} zł
							</span>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>
<script setup>
	const props = defineProps({
		product: {
			type: Object,
		},
	});
</script>
