import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import NoRecordsImage from "./NoRecordsImage.svg";
import { FC } from "react";

const SearchProductsListNoRecords: FC = () => {
	return (
		<Stack direction={"column"} alignItems="center" spacing={2}>
			<Image src={NoRecordsImage} alt="No Records Found" width={150} height={150} />
			<Typography variant="h6">Brak wyników dla wybranych filtrów</Typography>
		</Stack>
	);
};

export default SearchProductsListNoRecords;
