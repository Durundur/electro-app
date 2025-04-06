import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { Box, IconButton, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import { Navigation, Grid } from "swiper/modules";

interface ResponsiveBreakpoint {
	xs?: number;
	sm?: number;
	md?: number;
	lg?: number;
	xl?: number;
}

interface ProductCardContainerProps {
	children: ReactNode[];
	rows?: ResponsiveBreakpoint | number;
	cols: ResponsiveBreakpoint | number;
	slidesPerGroup?: ResponsiveBreakpoint | number;
	spaceBetween?: number;
	navigation?: boolean;
}

const ProductCardContainer: FC<ProductCardContainerProps> = ({ children, rows = 1, cols = 4, slidesPerGroup = 1, spaceBetween = 12, navigation = true }) => {
	const theme = useTheme();

	const getBreakpointValue = (value: ResponsiveBreakpoint | number, breakpoint: keyof ResponsiveBreakpoint): number => {
		if (typeof value === "number") return value;

		const breakpoints: (keyof ResponsiveBreakpoint)[] = ["xl", "lg", "md", "sm", "xs"];
		const breakpointIndex = breakpoints.indexOf(breakpoint);

		for (let i = breakpointIndex; i < breakpoints.length; i++) {
			if (value[breakpoints[i]] !== undefined) {
				return value[breakpoints[i]]!;
			}
		}

		return typeof value === "number" ? value : 1;
	};

	return (
		<Box
			sx={{
				"& .swiper": {
					padding: "8px",
				},
			}}
		>
			<Swiper
				touchStartPreventDefault={false}
				modules={[Navigation, Grid]}
				spaceBetween={spaceBetween}
				breakpoints={{
					[theme.breakpoints.values.xs]: {
						grid: {
							rows: getBreakpointValue(rows, "xs"),
							fill: "row",
						},
						slidesPerView: getBreakpointValue(cols, "xs"),
						slidesPerGroup: getBreakpointValue(slidesPerGroup, "xs"),
					},
					[theme.breakpoints.values.sm]: {
						grid: {
							rows: getBreakpointValue(rows, "sm"),
							fill: "row",
						},
						slidesPerView: getBreakpointValue(cols, "sm"),
						slidesPerGroup: getBreakpointValue(slidesPerGroup, "sm"),
					},
					[theme.breakpoints.values.md]: {
						grid: {
							rows: getBreakpointValue(rows, "md"),
							fill: "row",
						},
						slidesPerView: getBreakpointValue(cols, "md"),
						slidesPerGroup: getBreakpointValue(slidesPerGroup, "md"),
					},
					[theme.breakpoints.values.lg]: {
						grid: {
							rows: getBreakpointValue(rows, "lg"),
							fill: "row",
						},
						slidesPerView: getBreakpointValue(cols, "lg"),
						slidesPerGroup: getBreakpointValue(slidesPerGroup, "lg"),
					},
					[theme.breakpoints.values.xl]: {
						grid: {
							rows: getBreakpointValue(rows, "xl"),
							fill: "row",
						},
						slidesPerView: getBreakpointValue(cols, "xl"),
						slidesPerGroup: getBreakpointValue(slidesPerGroup, "xl"),
					},
				}}
			>
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

export default ProductCardContainer;
