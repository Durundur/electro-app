import { Pagination, Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

interface ISearchProductsListPaginationParams {
	page: number;
	pageCount: number;
}

const SearchProductsListPagination: FC<ISearchProductsListPaginationParams> = ({ page, pageCount }) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		const params = new URLSearchParams(searchParams?.toString() || "");
		params.set("page", value.toString());
		router.push(`?${params.toString()}`);
	};

	return (
		<Stack justifyContent={"center"} alignItems={"center"}>
			<Pagination onChange={handlePageChange} page={page} count={pageCount} variant="outlined" shape="rounded" />
		</Stack>
	);
};

export default SearchProductsListPagination;
