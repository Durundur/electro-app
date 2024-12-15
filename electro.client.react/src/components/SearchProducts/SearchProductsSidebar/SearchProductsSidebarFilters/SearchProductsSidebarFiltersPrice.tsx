import { buildQueryString } from "@/libs/Helpers/QueryHelper";
import { useSelector } from "@/libs/Store";
import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef } from "react";

const SearchProductsSidebarFiltersPrice: FC = () => {
	const router = useRouter();
	const urlParamsSelector = useSelector((store) => store.SearchProducts.urlParams);
	const filters = urlParamsSelector.filters;
	const from = filters["from"]?.[0] ?? "";
	const to = filters["to"]?.[0] ?? "";
	const inputValues = useRef<{ from: string; to: string }>({
		from: "",
		to: "",
	});

	useEffect(() => {
		inputValues.current = {
			from,
			to,
		};
	}, [from, to]);

	const timeoutId = useRef<number>();

	const handleEnterNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		const id = e.target.id as "from" | "to";
		let value = e.target.value;
		value = value.replace(",", ".");
		if (!/^\d*\.?\d*$/.test(value)) {
			return;
		}
		inputValues.current[id] = value;

		if (timeoutId.current) {
			clearTimeout(timeoutId.current);
		}

		timeoutId.current = window.setTimeout(() => {
			const { pagination, filters, hierarchy } = urlParamsSelector;

			const newParams = { ...hierarchy, ...pagination, ...filters, from: [inputValues.current.from], to: [inputValues.current.to], page: 1, pageSize: pagination.pageSize };
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
					defaultValue={inputValues.current.from}
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
					defaultValue={inputValues.current.to}
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
