import { ProductAttributeResult } from "@/libs/api-contract/rest-api-contract";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

interface ProductPageSpecificationPrimaryProps {
	specification: ProductAttributeResult[];
}

const ProductPageSpecificationPrimary: FC<ProductPageSpecificationPrimaryProps> = ({ specification }) => {
	const primarySpecification = specification.filter((s) => s.isPrimary).sort() ?? [];

	return (
		<Stack spacing={0.5}>
			{primarySpecification.map((item, i) => (
				<Typography component={"p"} variant="caption" noWrap key={`small-specification-item-${i}`}>
					{item.name}: {item.value}
				</Typography>
			))}
		</Stack>
	);
};

export default ProductPageSpecificationPrimary;
