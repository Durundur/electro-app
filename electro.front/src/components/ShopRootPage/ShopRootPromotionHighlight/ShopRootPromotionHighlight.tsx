"use client";
import { useDispatch, useSelector } from "@/libs/Store";
import { useEffect } from "react";
import { getPromotionHighlight } from "@/libs/ShopRootPage/thunk";
import { clearPromotionHighlightState } from "@/libs/ShopRootPage/slice";
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography, Stack } from "@mui/material";
import { formatAmount } from "@/libs/Helpers/Formatters";
import Link from "next/link";

const ShopRootPromotionHighlight = () => {
	const dispatch = useDispatch();

	const promotionHighlightSelector = useSelector((state) => state.ShopRootPageStore.promotionHighlight.data);
	const product = promotionHighlightSelector;
	const discountPercentage = product?.amount && product?.promotion?.amount ? Math.floor(((product.amount - product.promotion.amount) / product.amount) * 100) : 0;

	useEffect(() => {
		dispatch(getPromotionHighlight());

		return () => {
			dispatch(clearPromotionHighlightState());
		};
	}, []);

	return (
		product && (
			<Card sx={{ height: "100%" }}>
				<CardActionArea
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "stretch",
						alignItems: "stretch",
						height: "100%",
						position: "relative",
					}}
					component={Link}
					href={`/product/${product?.id}`}
				>
					<CardContent sx={{ position: "relative" }}>
						<Typography variant="h6" fontWeight="bold">
							Gorąca promocja dnia
						</Typography>
						<Box
							sx={{
								top: 16,
								right: 16,
								position: "absolute",
								backgroundColor: "primary.main",
								color: "white",
								borderRadius: "50%",
								width: 60,
								height: 60,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								flexDirection: "column",
								boxShadow: 3,
							}}
						>
							<Typography variant="h6">-{discountPercentage}%</Typography>
						</Box>
					</CardContent>
					<CardMedia
						component="img"
						image={product?.photo}
						alt={product?.name}
						sx={{
							aspectRatio: "4/3",
							objectFit: "contain",
						}}
					></CardMedia>
					<CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
						<Typography
							variant="h6"
							gutterBottom
							sx={{
								overflow: "hidden",
								textOverflow: "ellipsis",
								display: "-webkit-box",
								WebkitLineClamp: "2",
								WebkitBoxOrient: "vertical",
							}}
						>
							{product?.name}
						</Typography>
						<Stack direction="row" spacing={2} alignItems="baseline">
							<Typography variant="h6">{formatAmount(product?.promotion?.amount!, product?.promotion?.currency!)}</Typography>
							<Typography sx={{ textDecoration: "line-through" }}>{formatAmount(product?.amount!, product?.currency!)}</Typography>
						</Stack>
					</CardContent>
				</CardActionArea>
			</Card>
		)
	);
};

export default ShopRootPromotionHighlight;
