import { FC } from "react";
import { Masonry } from "@mui/lab";
import OpinionCard from "./OpinionCard";
import { GetProductOpinionsResultOpinion } from "@/libs/api-contract/rest-api-contract";
import { Pagination, Stack } from "@mui/material";

interface OpinionsWallProps {
	opinions: GetProductOpinionsResultOpinion[];
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;
}

const OpinionsWall: FC<OpinionsWallProps> = ({ opinions, totalPages, currentPage, onPageChange }) => {
	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		onPageChange(value);
	};

	return (
		<>
			<Masonry columns={{ xs: 1, sm: 1, md: 2 }} spacing={2}>
				{opinions.map((opinion, i) => (
					<OpinionCard key={`opinion-content-${i}`} opinion={opinion}></OpinionCard>
				))}
			</Masonry>
			{opinions.length > 0 && (
				<Stack justifyContent={"center"} alignItems={"center"}>
					<Pagination onChange={handlePageChange} page={currentPage} count={totalPages} variant="outlined" shape="rounded" />
				</Stack>
			)}
		</>
	);
};

export default OpinionsWall;
