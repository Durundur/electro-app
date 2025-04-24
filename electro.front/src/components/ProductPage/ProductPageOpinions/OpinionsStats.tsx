import React, { FC } from "react";
import { Box, Typography, Rating, LinearProgress, Grid2 as Grid } from "@mui/material";
import { OpinionsStats as IOpinionsStats } from "@/libs/api-contract/rest-api-contract";

interface OpinionsStatsProps {
	opinionsStats: IOpinionsStats[];
	avgOpinionsRating: number;
	opinionsCount: number;
	onRatingChnage: (rating: number | undefined) => void;
	selectedRating?: number;
}

const OpinionsStats: FC<OpinionsStatsProps> = ({ opinionsStats, avgOpinionsRating, opinionsCount, onRatingChnage, selectedRating }) => {
	const toggleRatingFilter = (rating: number) => {
		if (selectedRating === rating) {
			onRatingChnage(undefined);
		} else {
			onRatingChnage(rating);
		}
	};

	const isActiveRatingFilter = (rating: number) => selectedRating === rating;

	return (
		<Box>
			<Grid container alignItems="center" justifyContent={"center"} rowSpacing={2} columnSpacing={4}>
				<Grid size={{ xs: 12, sm: 6, md: 6 }} textAlign="center">
					<Box>
						<Typography variant="h4" component="span">
							{avgOpinionsRating}
						</Typography>
						<Typography component="span" ml={1}>
							/5
						</Typography>
					</Box>
					<Rating value={avgOpinionsRating} precision={0.5} readOnly />
					<Typography variant="body2">({opinionsCount} opinii)</Typography>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 6 }}>
					<Box maxWidth={400} mx={"auto"}>
						{opinionsStats.map((stats) => (
							<Box
								key={stats.rating}
								onClick={() => stats.count !== 0 && toggleRatingFilter(stats.rating!)}
								display="flex"
								alignItems="center"
								gap={1}
								sx={(theme) => ({
									cursor: stats.count !== 0 ? "pointer" : "default",
									borderRadius: 1,
									padding: 0.5,
									backgroundColor: isActiveRatingFilter(stats.rating!) ? theme.palette.action.hover : "transparent",
									boxShadow: isActiveRatingFilter(stats.rating!) ? theme.shadows[1] : "none",
									transition: theme.transitions.create(["background-color", "box-shadow"], {
										easing: theme.transitions.easing.easeInOut,
										duration: theme.transitions.duration.standard,
									}),
									"&:hover": {
										"& .MuiTypography-root": {
											color: stats.count !== 0 ? theme.palette.common.gold : "inherit",
											transition: theme.transitions.create("color", {
												easing: theme.transitions.easing.easeOut,
												duration: theme.transitions.duration.short,
											}),
										},
										"& .MuiLinearProgress-bar": {
											backgroundColor: stats.count !== 0 ? theme.palette.common.gold : "grey.200",
											transition: theme.transitions.create("background-color", {
												easing: theme.transitions.easing.easeIn,
												duration: theme.transitions.duration.shorter,
											}),
										},
									},
								})}
							>
								<Rating value={stats.rating} readOnly max={1} size="small" />
								<Typography>{stats.rating}</Typography>
								<LinearProgress
									variant="determinate"
									value={(stats.count! / opinionsCount) * 100}
									sx={(theme) => ({
										width: "100%",
										height: 10,
										borderRadius: 6,
										backgroundColor: isActiveRatingFilter(stats.rating!) ? "grey.300" : "grey.200",
										"& .MuiLinearProgress-bar": {
											backgroundColor: isActiveRatingFilter(stats.rating!) ? theme.palette.common.gold : "grey.300",
											borderRadius: 6,
											transition: theme.transitions.create("background-color", {
												easing: theme.transitions.easing.easeInOut,
												duration: theme.transitions.duration.standard,
											}),
										},
									})}
								/>
								<Typography width={"30px"} align="center">
									{stats.count}
								</Typography>
							</Box>
						))}
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default OpinionsStats;
