import { Card, Stack } from "@mui/material";
import { FC } from "react";
import SearchProductsSidebarCategories from "./SearchProductsSidebarCategories";
import SearchProductsSidebarFilters from "./SearchProductsSidebarFilters";

const SearchProductsSidebar: FC = () => {
	return (
		<Card variant="elevation">
			<Stack direction={"column"}>
				<SearchProductsSidebarCategories />
				<SearchProductsSidebarFilters />
			</Stack>
		</Card>
	);
};

export default SearchProductsSidebar;
