import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { FC, ReactNode } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import { Navigation, Grid } from "swiper/modules";

interface ProductContainerProps {
	children: ReactNode[];
	rows?: number;
	cols?: number;
	slidesPerGroup?: number;
	spaceBetween?: number;
	navigation?: boolean;
}

const ProductContainer: FC<ProductContainerProps> = ({ children, rows = 1, cols = 4, slidesPerGroup = 1, spaceBetween = 12, navigation = true }) => {
	return (
		<Box
			sx={{
				"& .swiper": {
					padding: "8px",
				},
			}}
		>
			<Swiper grid={{ rows, fill: "row" }} slidesPerView={cols} slidesPerGroup={slidesPerGroup} spaceBetween={spaceBetween} modules={[Navigation, Grid]}>
				{children.map((child, i) => (
					<SwiperSlide key={`child-${i}`}>{child}</SwiperSlide>
				))}
				{navigation && <SliderNavigation />}
			</Swiper>
		</Box>
	);
};

const SliderNavigation: FC = () => {
	const swiper = useSwiper();
	return (
		<Box
			sx={{ pointerEvents: "none", "& .MuiIconButton-root": { pointerEvents: "auto" } }}
			position="absolute"
			top="50%"
			width="100%"
			left={0}
			right={0}
			display="flex"
			justifyContent="space-between"
			zIndex={10}
			style={{ transform: "translateY(-50%)" }}
		>
			<IconButton onClick={() => swiper.slidePrev()}>
				<ChevronLeftRounded />
			</IconButton>
			<IconButton onClick={() => swiper.slideNext()}>
				<ChevronRightRounded />
			</IconButton>
		</Box>
	);
};

export default ProductContainer;
