import { GetUserOrderDetailsResultProduct } from "@/libs/api-contract/rest-api-contract";
import { Grid2, Stack, Typography } from "@mui/material";
import { FC } from "react";
import AccountOrderDetailsProductsItem from "./AccountOrderDetailsProductsItem/AccountOrderDetailsProductsItem";

interface AccountOrderDetailsProductsProps {
	products: GetUserOrderDetailsResultProduct[];
}

const AccountOrderDetailsProducts: FC<AccountOrderDetailsProductsProps> = ({ products }) => {
	return (
		<Stack spacing={2}>
			<Typography fontWeight={500}>Produkty</Typography>
			<Grid2 container rowSpacing={1} columnSpacing={1}>
				{products.map((product) => (
					<Grid2 size={{ xs: 12, md: 6 }} key={product.id}>
						<AccountOrderDetailsProductsItem product={product}></AccountOrderDetailsProductsItem>
					</Grid2>
				))}
			</Grid2>
		</Stack>
	);
};

export default AccountOrderDetailsProducts;
