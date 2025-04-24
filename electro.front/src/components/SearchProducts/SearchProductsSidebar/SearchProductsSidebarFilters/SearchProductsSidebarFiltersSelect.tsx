import { GetSearchFiltersResultElement } from "@/libs/api-contract/rest-api-contract";
import { Box, Checkbox, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, Button } from "@mui/material";
import { FC, useState } from "react";
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import { useSelector } from "@/libs/Store";
import { ISearchProductsStateUrlParamsFilters } from "@/libs/SearchProducts/interfaces";
import { useRouter, useSearchParams } from "next/navigation";
import { buildQueryString } from "@/libs/Helpers/QueryHelper";

interface SearchProductsSidebarFiltersSelectProps {
	filter: GetSearchFiltersResultElement;
}

const MAX_VISIBLE_ITEMS = 4;

const getSelectedFilterValues = (params: ISearchProductsStateUrlParamsFilters, filter: GetSearchFiltersResultElement) => {
	const filterKey = getFilterUrlKey(filter);
	const values = params[filterKey] ?? [];
	return values;
};

const getFilterUrlKey = (filter: GetSearchFiltersResultElement): string => {
	const key = filter.attributeDefinitionId?.split("-")[4];
	return key!.toLowerCase();
};

const sortSelectedOptions = (options: string[], selectedValues: string[] = []): string[] => {
	const selected = options.filter((option) => selectedValues.includes(option));
	const unselected = options.filter((option) => !selectedValues.includes(option));
	return [...selected, ...unselected];
};

const SearchProductsSidebarFiltersSelect: FC<SearchProductsSidebarFiltersSelectProps> = ({ filter }) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const filterOptions = filter.values ?? [];
	const [isExpanded, setIsExpanded] = useState(false);

	const filterParamsSelector = useSelector((store) => store.SearchProductsPageStore.urlParams.filters);
	const filterValues = getSelectedFilterValues(filterParamsSelector, filter);
	const sortedOptions = sortSelectedOptions(filterOptions, filterValues);

	const toggleExpand = () => setIsExpanded((prev) => !prev);

	const handleSelectOption = (value: string) => {
		const filterKey = getFilterUrlKey(filter);
		const currentValues = getSelectedFilterValues(filterParamsSelector, filter) ?? [];
		const newValues = currentValues.includes(value) ? currentValues.filter((item) => item !== value) : [...currentValues, value];
		const newParams = Object.fromEntries(searchParams);

		if (newValues.length > 0) {
			newParams[filterKey] = newValues.join(";");
		} else {
			newParams[filterKey] = "";
		}
		newParams["page"] = "1";
		router.push(`?${buildQueryString(newParams)}`, { scroll: false });
	};

	return (
		<Stack>
			<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} paddingX={1.5}>
				<Typography variant="body1" paddingY={0.5}>
					{filter.name}
				</Typography>
				{filterOptions.length > MAX_VISIBLE_ITEMS && (
					<Box paddingX={1.5}>
						<Button size="small" variant="text" startIcon={isExpanded ? <RemoveOutlined /> : <AddOutlined />} onClick={toggleExpand}>
							{isExpanded ? "Mniej" : "Więcej"}
						</Button>
					</Box>
				)}
			</Stack>
			<List disablePadding>
				{sortedOptions.slice(0, MAX_VISIBLE_ITEMS).map((value, index) => {
					const id = `filter-${filter.name}-${index}`;
					const isSelected = filterValues?.includes(value) ?? false;
					return (
						<ListItem key={value} disablePadding>
							<ListItemButton selected={isSelected} onClick={() => handleSelectOption(value)} dense sx={{ borderRadius: "6px" }}>
								<ListItemIcon>
									<Checkbox readOnly size="small" checked={isSelected} tabIndex={-1} disableRipple sx={{ paddingY: 0 }} />
								</ListItemIcon>
								<ListItemText id={id} primary={value} />
							</ListItemButton>
						</ListItem>
					);
				})}
				<Collapse in={isExpanded} timeout="auto" unmountOnExit>
					{sortedOptions.slice(MAX_VISIBLE_ITEMS).map((value, index) => {
						const id = `filter-${filter.name}-${index + MAX_VISIBLE_ITEMS}`;
						const isSelected = filterValues?.includes(value) ?? false;
						return (
							<ListItem key={value} disablePadding>
								<ListItemButton selected={isSelected} onClick={() => handleSelectOption(value)} dense sx={{ borderRadius: "6px" }}>
									<ListItemIcon>
										<Checkbox readOnly size="small" checked={isSelected} tabIndex={-1} disableRipple sx={{ paddingY: 0 }} />
									</ListItemIcon>
									<ListItemText id={id} primary={value} />
								</ListItemButton>
							</ListItem>
						);
					})}
				</Collapse>
			</List>
		</Stack>
	);
};

export default SearchProductsSidebarFiltersSelect;
