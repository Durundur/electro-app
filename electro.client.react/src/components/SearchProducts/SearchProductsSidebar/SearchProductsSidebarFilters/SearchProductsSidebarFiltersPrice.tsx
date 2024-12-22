import { buildQueryString } from "@/libs/Helpers/QueryHelper";
import { useSelector } from "@/libs/Store";
import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";

const SearchProductsSidebarFiltersPrice: FC = () => {
	const router = useRouter();
	const filtersSelector = useSelector((store) => store.SearchProducts.urlParams.filters);
	const paginationSelector = useSelector((store) => store.SearchProducts.urlParams.pagination);
	const hierarchySelector = useSelector((store) => store.SearchProducts.urlParams.hierarchy);
	const from = filtersSelector["from"]?.[0] ?? "";
	const to = filtersSelector["to"]?.[0] ?? "";
	const [priceRangeInput, setPriceRangeInput] = useState({
		from,
		to,
	});

	useEffect(() => {
		setPriceRangeInput({ from, to });
	}, [from, to]);

	const timeoutId = useRef<number>();

	const handleEnterNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		const id = e.target.id as "from" | "to";
		let value = e.target.value;
		value = value.replace(",", ".");
		if (!/^\d*\.?\d*$/.test(value)) {
			return;
		}
		setPriceRangeInput((prev) => {
			return {
				...prev,
				[id]: value,
			};
		});

		if (timeoutId.current) {
			clearTimeout(timeoutId.current);
		}

		timeoutId.current = window.setTimeout(() => {
			const newParams = { ...hierarchySelector, ...paginationSelector, ...filtersSelector, from: [priceRangeInput.from], to: [priceRangeInput.to], [id]: value, page: 1 };
			router.push(`?${buildQueryString(newParams)}`, { scroll: true });
		}, 1200);
	};

	return (
		<Stack paddingX={1.5}>
			<Typography variant="body1">Cena</Typography>
			<Stack direction={"row"} alignItems={"center"} spacing={2}>
				<TextField
					id="from"
					size="small"
					placeholder="od"
					value={priceRangeInput.from}
					onChange={handleEnterNumber}
					slotProps={{
						input: {
							endAdornment: <InputAdornment position="end">zł</InputAdornment>,
						},
						htmlInput: {
							style: {
								textAlign: "center",
							},
						},
					}}
				/>
				<span>-</span>
				<TextField
					id="to"
					size="small"
					placeholder="do"
					value={priceRangeInput.to}
					onChange={handleEnterNumber}
					slotProps={{
						input: {
							endAdornment: <InputAdornment position="end">zł</InputAdornment>,
						},
						htmlInput: {
							style: {
								textAlign: "center",
							},
						},
					}}
				/>
			</Stack>
		</Stack>
	);
};

export default SearchProductsSidebarFiltersPrice;
