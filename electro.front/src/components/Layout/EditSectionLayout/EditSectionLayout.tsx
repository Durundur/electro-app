import { Grid2, Typography } from "@mui/material";
import { ReactNode } from "react";

interface EditSectionLayoutProps {
	title?: string;
	subtitle?: string;
	children: ReactNode;
}

const EditSectionLayout: React.FC<EditSectionLayoutProps> = ({ title, subtitle, children }) => {
	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 12, md: 3 }} alignItems={"baseline"}>
				{title && <Typography fontWeight={500}>{title}</Typography>}
				{subtitle && (
					<Typography variant="caption" color="textSecondary">
						{subtitle}
					</Typography>
				)}
			</Grid2>
			<Grid2 size={{ xs: 12, md: 6 }}>{children}</Grid2>
		</Grid2>
	);
};

export default EditSectionLayout;
