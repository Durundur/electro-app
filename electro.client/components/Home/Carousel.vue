<template>
	<v-container class="w-full h-full pa-0 m-auto">
		<v-carousel
			cycle
			height="auto"
			hide-delimiters
			v-model="actualSlide"
			class="elevation-2">
			<v-carousel-item
				v-for="(slide, index) in items"
				:key="index">
				<template v-slot="item">
					<v-card :href="slide.link">
						<v-img :src="slide.src"></v-img>
					</v-card>
				</template>
			</v-carousel-item>
		</v-carousel>
		<v-row
			class="mx-4"
			no-gutters>
			<v-col
				v-for="(slide, index) in items"
				class="rounded-md"
				:class="{ 'active-label': actualSlide === index }">
				<v-btn
					block
					rounded="md"
					selected-class="active-btn"
					class="text-none active-btn"
					variant="text"
					@click="actualSlide = index">
					{{ slide.title }}
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
	export default {
		props: {
			items: {
				type: Array,
				default: () => [
					{
						src: "https://cdn.x-kom.pl/i/img/banners/1442x316,,b76d4ef9e2e049b3ac10ae7409d4fb32.jpg?filters=trim",
						title: "Sprzęt RTV taniej do 1500 zł",
						link: "https://lp.x-kom.pl/a/gwiazdorska-obsada/",
					},
					{
						src: "https://cdn.x-kom.pl/i/img/banners/1442x316,,be4dddcb53c245c6bcf10a628c2fb976.jpg?filters=trim",
						title: "Laptop dla nauczyciela",
						link: "https://lp.x-kom.pl/a/gwiazdorska-obsada/",
					},
					{
						src: "https://cdn.x-kom.pl/i/img/banners/1442x316,,123e77b923a4480499d94981f1bac40b.jpg?filters=trim",
						title: "Premiera Mac Book",
						link: "https://lp.x-kom.pl/a/gwiazdorska-obsada/",
					},
					{
						src: "https://cdn.x-kom.pl/i/img/banners/1442x316,,b00ed79bcce842b596c07e12c48ce8bd.jpg?filters=trim",
						title: "Lenovo tab",
						link: "https://lp.x-kom.pl/a/gwiazdorska-obsada/",
					},
				],
			},
		},
		data() {
			return {
				actualSlide: 0,
			};
		},
	};
</script>
<style scoped>
	:deep(.v-carousel) {
		border-radius: 20px;
	}
	.active-label {
		background: linear-gradient(
			to bottom,
			rgb(var(--v-theme-primary)) 5px,
			transparent 0px
		);
		background-size: 100% 100%;
	}
</style>
