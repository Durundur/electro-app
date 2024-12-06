import React, { useState, FC } from "react";
import { Box, Typography, Rating, LinearProgress, Grid2 as Grid, Card, Button, Stack } from "@mui/material";

interface OpinionsStatsProps {
	opinionsStats: any[];
	avgOpinionsRating: number;
	opinionsCount: number;
}

const OpinionsStats: FC<OpinionsStatsProps> = ({ opinionsStats, avgOpinionsRating = 0, opinionsCount = 0 }) => {
	const [activeRatingFilter, setActiveRatingFilter] = useState<number | undefined>(undefined);

	const toggleRatingFilter = (rating: number) => {
		setActiveRatingFilter((prev) => (prev === rating ? undefined : rating));
	};

	const isActiveRatingFilter = (rating: number) => activeRatingFilter === rating;

	return (
		<Box>
			<Grid container alignItems="center" justifyContent={"center"} rowSpacing={2} columnSpacing={4}>
				<Grid size={{ xs: 12, sm: 6, md: 6 }} textAlign="center">
					<Box>
						<Typography variant="h4" component="span">
							{avgOpinionsRating}
						</Typography>
						<Typography component="span" ml={1}>
							/6
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
								onClick={() => stats.count !== 0 && toggleRatingFilter(stats.rating)}
								display="flex"
								alignItems="center"
								gap={1}
								sx={(theme) => ({
									cursor: stats.count !== 0 ? "pointer" : "default",
									borderRadius: 1,
									padding: 0.5,
									backgroundColor: isActiveRatingFilter(stats.rating) ? theme.palette.action.hover : "transparent",
									boxShadow: isActiveRatingFilter(stats.rating) ? theme.shadows[1] : "none",
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
									value={(stats.count / opinionsCount) * 100}
									sx={(theme) => ({
										width: "100%",
										height: 10,
										borderRadius: 6,
										backgroundColor: isActiveRatingFilter(stats.rating) ? "grey.300" : "grey.200",
										"& .MuiLinearProgress-bar": {
											backgroundColor: isActiveRatingFilter(stats.rating) ? theme.palette.common.gold : "grey.300",
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
				<Grid size={{ xs: 12, sm: 6, md: 6 }}>
					<Card>
						<Stack spacing={2} padding={2}>
							<Typography align="center">Masz ten produkt?</Typography>
							<Button fullWidth variant="outlined">
								Dodaj opinie
							</Button>
						</Stack>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
};

export default OpinionsStats;
