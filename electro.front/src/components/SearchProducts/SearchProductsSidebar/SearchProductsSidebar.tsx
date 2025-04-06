import { Card, Stack } from "@mui/material";
import { FC } from "react";
import SearchProductsSidebarCategories from "./SearchProductsSidebarCategories";
import SearchProductsSidebarFilters from "./SearchProductsSidebarFilters/SearchProductsSidebarFilters";

const SearchProductsSidebar: FC = () => {
	return (
		<Card>
			<Stack direction={"column"}>
				<SearchProductsSidebarCategories />
				<SearchProductsSidebarFilters />
			</Stack>
		</Card>
	);
};

export default SearchProductsSidebar;
