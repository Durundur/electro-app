import { clearFilters } from "@/libs/SearchProducts/slice";
import { fetchFilters } from "@/libs/SearchProducts/thunk";
import { useDispatch, useSelector } from "@/libs/Store";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FC, useEffect } from "react";

const SearchProductsSidebarFilters: FC = () => {
	const dispatch = useDispatch();
	const productHierarchySelector = useSelector((store) => store.SearchProducts.productHierarchy);
	// const productHierarchyParams = productHierarchySelector.params;

	// useEffect(() => {
	// 	//dispatch(fetchFilters());
	// 	return () => {
	// 		dispatch(clearFilters());
	// 	};
	// }, [productHierarchyParams]);

	return (
		<Box>
			<Stack direction={"row"} justifyContent={"space-between"} paddingX={1.5}>
				<Typography variant="body1" fontWeight={500} paddingY={0.5}>
					Filtry
				</Typography>
				<Button color="inherit" size="small" variant="text">
					wyczyść
				</Button>
			</Stack>
		</Box>
	);
};

export default SearchProductsSidebarFilters;
