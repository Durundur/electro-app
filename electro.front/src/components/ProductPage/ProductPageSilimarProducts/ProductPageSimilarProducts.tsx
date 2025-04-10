import ProductCard from "@/components/Shared/ProductCard/ProductCard";
import ProductContainer from "@/components/Shared/ProductCardContainer/ProductCardContainer";
import { getSimilarProducts } from "@/libs/ProductPage/thunk";
import { useDispatch, useSelector } from "@/libs/Store";
import { useEffect } from "react";

interface ProductPageSimilarProductsProps {
	productId: string;
}

const ProductPageSimilarProducts: React.FC<ProductPageSimilarProductsProps> = ({ productId }) => {
	const dispatch = useDispatch();

	const similarProductsSelector = useSelector((state) => state.ProductPageStore.similarProducts.data);

	useEffect(() => {
		if (!productId) return;
		dispatch(getSimilarProducts(productId, 10));
	}, [productId]);

	const similarProducts = similarProductsSelector?.products?.map((product) => (
		<ProductCard
			key={product.id}
			id={product.id!}
			name={product.name!}
			photo={product.photo!}
			amount={product.amount!}
			currency={product.currency!}
			promotionAmount={product.promotion?.amount}
			promotionCurrency={product.promotion?.currency}
		></ProductCard>
	));

	return (
		similarProducts && (
			<ProductContainer cols={5} slidesPerGroup={2}>
				{similarProducts}
			</ProductContainer>
		)
	);
};

export default ProductPageSimilarProducts;
