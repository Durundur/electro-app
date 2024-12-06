import { FC } from "react";
import OpinionsStats from "./OpinionsStats";
import OpinionsWall from "./OpinionsWall";
import { opinions } from "./data";
import { Stack } from "@mui/material";

interface OpinionsSectionProps {}

const OpinionsSection: FC<OpinionsSectionProps> = () => {
	return (
		<Stack spacing={2}>
			<OpinionsStats avgOpinionsRating={3.5} opinionsCount={60} opinionsStats={opinions.stats} />
			<OpinionsWall opinions={opinions.opinions.data} />
		</Stack>
	);
};

export default OpinionsSection;
