import { GetSearchFiltersResultElement } from "@/libs/api-contract/api-contract";
import { Box, Checkbox, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, Button } from "@mui/material";
import { FC, useState } from "react";
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import { useSelector } from "@/libs/Store";
import { ISearchProductsStateUrlParamsFilters } from "@/libs/SearchProducts/interfaces";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchProductsSidebarFiltersSelectProps {
	filter: GetSearchFiltersResultElement;
}

const MAX_VISIBLE_ITEMS = 4;

const SearchProductsSidebarFiltersSelect: FC<SearchProductsSidebarFiltersSelectProps> = ({ filter }) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const filterOptions = filter.values ?? [];
	const [isExpanded, setIsExpanded] = useState(false);
	const toggleExpand = () => setIsExpanded((prev) => !prev);
	const filterParamsSelector = useSelector((store) => store.SearchProducts.urlParams.filters);

	const getSelectedFilterValues = (params: ISearchProductsStateUrlParamsFilters, filter: GetSearchFiltersResultElement) => {
		const filterKey = getFilterUrlKey(filter);
        const encodedValues = params[filterKey] ?? [];
        return encodedValues.map((value) => decodeURIComponent(value));
	};

	const getFilterUrlKey = (filter: GetSearchFiltersResultElement): string => {
		const key = filter.attributeDefinitionId?.split("-")[4];
		const formattedKey = key!.toLowerCase();
		return formattedKey;
	};

    const sortSelectedOptions = (options: string[], selectedValues: string[] = []) => {
        const selected = options.filter((option) => selectedValues.includes(option));
        const unselected = options.filter((option) => !selectedValues.includes(option));
        return [...selected, ...unselected];
      };

	const handleSelectOption = (value: string) => {
		const filterKey = getFilterUrlKey(filter);
		const currentValues = getSelectedFilterValues(filterParamsSelector, filter) ?? [];

		const newValues = currentValues.includes(value) ? currentValues.filter((item) => item !== value) : [...currentValues, value];

		const updatedParams = new URLSearchParams(searchParams.toString());

		if (newValues.length > 0) {
			updatedParams.set(filterKey, newValues.map((v) => encodeURIComponent(v)).join(","));
		} else {
			updatedParams.delete(filterKey);
		}
		router.replace(`?${updatedParams.toString()}`, { scroll: false });
	};

	const filterValues = getSelectedFilterValues(filterParamsSelector, filter);
    const sortedOptions = sortSelectedOptions(filterOptions, filterValues);

	return (
		<Stack>
			<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} paddingX={1.5}>
				<Typography variant="body1" fontWeight={500} paddingY={0.5}>
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
