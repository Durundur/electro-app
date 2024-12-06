"use client";
import { FC } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, IconButton } from "@mui/material";
import { ChevronRightRounded, ChevronLeftRounded } from "@mui/icons-material";

interface SliderProps {
	photos: string[];
}

const ProductPageSlider: FC<SliderProps> = ({ photos }) => {
	return (
		<Swiper pagination loop modules={[Navigation, Pagination]} slidesPerView={1}>
			{photos.map((photo, i) => (
				<SwiperSlide key={`product-photo-${i}`}>
					<img src={photo} width={"100%"} alt={`product-photo-${i}`}></img>
				</SwiperSlide>
			))}
			<SliderNavigation></SliderNavigation>
		</Swiper>
	);
};

const SliderNavigation: FC = () => {
	const swiper = useSwiper();
	return (
		<Box position="absolute" top="50%" width="100%" display="flex" justifyContent="space-between" zIndex={10} style={{ transform: "translateY(-50%)" }}>
			<IconButton onClick={() => swiper.slidePrev()}>
				<ChevronLeftRounded />
			</IconButton>
			<IconButton onClick={() => swiper.slideNext()}>
				<ChevronRightRounded />
			</IconButton>
		</Box>
	);
};

export default ProductPageSlider;
