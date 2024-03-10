<template>
	<div class="my-4">
		<Carousel></Carousel>
	</div>
	<Container>
		<ProductsGrid header="Polecamy" :products="items"></ProductsGrid>
		<ProductsSlide header="Bestsellery" :products="items"></ProductsSlide>
	</Container>
</template>
<script>
export default {
	data() {
		return {
			items: [
				{
					image: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2024/2/pr_2024_2_9_14_15_27_92_05.jpg',
					title: 'Xiaomi 14 Ultra 16/512GB Black',
					price: 6799.99
				},
				{
					image: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/6/pr_2023_6_26_15_14_19_493_00.jpg',
					title: 'Rode NT1 5th Gen Black - Mikrofon pojemnościowy',
					price: 1249.0
				},
				{
					image: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2024/3/pr_2024_3_5_8_41_3_896_00.jpg',
					title: 'Apple MacBook Air M3/8GB/256/Mac OS Północ 8R GPU',
					price: 5999.0
				},
				{
					image: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/9/pr_2023_9_27_11_57_25_663_00.jpg',
					title: 'Philips 55PML9008 55" MINILED 4K 120Hz Ambilight 3 Dolby Atmos',
					price: 1249.0
				},
				{
					image: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/6/pr_2023_6_26_15_14_19_493_00.jpg',
					title: 'Rode NT1 5th Gen Black - Mikrofon pojemnościowy',
					price: 3999.99
				},
				{
					image: 'https://allegro.stati.pl/AllegroIMG/PRODUCENCI/KINGSTON/FURY%20Renegade/RGB/kingston-renegade-rgb-white-dwa-moduly.jpg',
					title: 'Kingston FURY 32GB (2x16GB) 6800MHz CL36 Renegade RGB White XMP',
					price: 849.0
				},
				{
					image: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/9/pr_2020_9_23_13_23_42_498_00.jpg',
					title: 'Samsung 1TB M.2 PCIe Gen4 NVMe 980 PRO',
					price: 389.0
				}
			]
		};
	}
};
</script>
