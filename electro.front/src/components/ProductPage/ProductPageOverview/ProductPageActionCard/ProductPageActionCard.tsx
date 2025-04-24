import { FC } from "react";
import { Card, Stack, Typography, Button } from "@mui/material";
import { ShoppingCartOutlined, CheckCircleOutlineRounded, AccessTimeRounded, LocalShippingOutlined, ErrorOutline } from "@mui/icons-material";
import { GetProductResult, ProductStatus } from "@/libs/api-contract/rest-api-contract";
import { formatAmount } from "@/libs/Helpers/Formatters";
import QuantityInput from "@/components/Shared/QuantityInput/QuantityInput";
import Link from "next/link";
import { buildQueryString } from "@/libs/Helpers/QueryHelper";

interface ProductPageActionCardProps {
	product: GetProductResult;
	onAddToCart: (quantity: number) => void;
	quantity: number;
	setQuantity: (quantity: number) => void;
}

const ProductPageActionCard: FC<ProductPageActionCardProps> = ({ product, onAddToCart, quantity, setQuantity }) => {
	const isOutOfStock = product?.stockQuantity === 0;
	const isDiscontinued = product?.status === ProductStatus.Discontinued;
	const isDraft = product?.status === ProductStatus.Draft;
	const isAvailableForPurchase = !isOutOfStock && !isDiscontinued && product?.status === ProductStatus.Active;

	const getSimilarProductsLink = () => {
		const params = {
			group: product?.groupId,
			category: product?.categoryId,
			subCategory: product?.subCategoryId,
		};
		return `/search?${buildQueryString(params)}`;
	};

	const renderAvailabilityInfo = () => {
		if (isDraft) {
			return (
				<Stack direction="row" sx={{ padding: 1 }} spacing={2} alignItems="center">
					<ErrorOutline />
					<div>
						<Typography variant="body2">Produkt jeszcze niedostępny</Typography>
						<Typography variant="caption" color="text.secondary">
							Sprawdź później
						</Typography>
					</div>
				</Stack>
			);
		}

		if (isDiscontinued) {
			return (
				<Stack direction="row" sx={{ padding: 1 }} spacing={2} alignItems="center">
					<ErrorOutline />
					<div>
						<Typography variant="body2">Produkt wycofany ze sprzedaży</Typography>
						<Link href={getSimilarProductsLink()}>
							<Typography variant="caption">Wyszukaj podobne produkty</Typography>
						</Link>
					</div>
				</Stack>
			);
		}

		if (isOutOfStock) {
			return (
				<Stack direction="row" sx={{ padding: 1 }} spacing={2} alignItems="center">
					<ErrorOutline />
					<div>
						<Typography variant="body2">Produkt obecnie niedostępny</Typography>
						<Typography variant="caption" color="text.secondary">
							Sprawdź później
						</Typography>
					</div>
				</Stack>
			);
		}

		return (
			<Stack direction="row" sx={{ padding: 1 }} spacing={2} alignItems="center">
				<CheckCircleOutlineRounded />
				<div>
					<Typography variant="body2">Dostępny</Typography>
					<Typography variant="caption" color="text.secondary">
						{product?.stockQuantity} sztuk w magazynie
					</Typography>
				</div>
			</Stack>
		);
	};

	return (
		<Card sx={{ padding: 2 }}>
			<Stack spacing={2}>
				{isAvailableForPurchase && (
					<>
						<Stack direction="row" alignItems="center" justifyContent="space-between">
							<QuantityInput value={quantity} id={product?.id!} onChange={(q) => setQuantity(q)} />
							<Stack>
								{product.promotion && (
									<Typography variant="h6" textAlign="end">
										{formatAmount(product?.promotion?.promotionalPrice?.amount!, product?.promotion?.promotionalPrice?.currency!)}
									</Typography>
								)}
								<Typography variant={product.promotion ? "body2" : "h6"} textAlign="end" sx={{ textDecoration: product.promotion ? "line-through" : "none" }}>
									{formatAmount(product?.amount!, product?.currency!)}
								</Typography>
							</Stack>
						</Stack>
						<Button onClick={() => onAddToCart(quantity)} variant="contained" color="success" startIcon={<ShoppingCartOutlined />} disabled={quantity === 0}>
							Dodaj do koszyka
						</Button>
					</>
				)}

				{renderAvailabilityInfo()}

				{isAvailableForPurchase && (
					<>
						<Stack direction="row" sx={{ padding: 1 }} spacing={2} alignItems="center">
							<AccessTimeRounded />
							<div>
								<Typography variant="body2">Kup teraz, a otrzymasz jutro</Typography>
								<Typography variant="caption" color="text.secondary">
									Dowiedz się więcej
								</Typography>
							</div>
						</Stack>
						<Stack direction="row" sx={{ padding: 1 }} spacing={2} alignItems="center">
							<LocalShippingOutlined />
							<div>
								<Typography variant="body2">Darmowa dostawa</Typography>
								<Typography variant="caption" color="text.secondary">
									Sprawdź szczegóły
								</Typography>
							</div>
						</Stack>
					</>
				)}
			</Stack>
		</Card>
	);
};

export default ProductPageActionCard;
