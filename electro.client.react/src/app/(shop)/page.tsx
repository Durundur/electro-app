import ShopRootBestsellersSection from "@/components/ShopRootPage/ShopRootBestsellersSection/ShopRootBestsellersSection";
import { Grid2, Typography } from "@mui/material";
import { FC } from "react";

const ShopRootPage: FC = () => {
	return (
		<Grid2 container>
			<Grid2 size={{ xs: 3 }}></Grid2>
			<Grid2 size={{ xs: 9 }}></Grid2>
			<Grid2 size={{ xs: 12 }}>
				<Typography variant="h6">Bestsellery</Typography>
				<ShopRootBestsellersSection></ShopRootBestsellersSection>
			</Grid2>
		</Grid2>
	);
};

export default ShopRootPage;
