import { FC } from "react";
import { Masonry } from "@mui/lab";
import OpinionCard from "./OpinionCard";

interface OpinionsWallProps {
	opinions: any[];
}

const OpinionsWall: FC<OpinionsWallProps> = ({ opinions }) => {
	return (
		<Masonry columns={{ xs: 1, sm: 1, md: 2 }} spacing={2} sx={{ margin: "auto" }}>
			{opinions.map((opinion, i) => (
				<OpinionCard key={`opinion-content-${i}`} opinion={opinion}></OpinionCard>
			))}
		</Masonry>
	);
};

export default OpinionsWall;
