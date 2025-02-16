import { GetOrderDetailsResultProduct } from "@/libs/api-contract/api-contract";
import { Grid2, Stack, Typography } from "@mui/material";
import { FC } from "react";
import AdminOrderDetailsProductsItem from "./AdminOrderDetailsProductsItem";

interface AdminOrderDetailsProductsProps {
	products: GetOrderDetailsResultProduct[];
}

const AdminOrderDetailsProducts: FC<AdminOrderDetailsProductsProps> = ({ products }) => {
	return (
		<Stack spacing={2}>
			<Typography fontWeight={500}>
				Produkty
			</Typography>
			<Grid2 container columnSpacing={2} rowSpacing={2}>
				{products.map((p) => (
					<Grid2 size={{ xs: 12, md: 6 }} key={p.id}>
						<AdminOrderDetailsProductsItem product={p} />
					</Grid2>
				))}
			</Grid2>
		</Stack>
	);
};

export default AdminOrderDetailsProducts;
