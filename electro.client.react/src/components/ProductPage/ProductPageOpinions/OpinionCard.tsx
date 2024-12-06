import { PersonOutlineRounded, CheckCircle, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Box, Card, CardHeader, Rating, Typography, CardContent, IconButton, CardActions, Stack, Button } from "@mui/material";
import { FC } from "react";

interface OpinionCardProps {
	opinion: {};
}

const OpinionCard: FC<OpinionCardProps> = ({ opinion }) => {
	const handleRate = async (action: "like" | "dislike") => {};

	return (
		<Card>
			<CardHeader
				subheader={
					<Box display="flex" alignItems="center">
						<Rating value={opinion.rating} precision={0.5} readOnly size="small" />
						<Box flexGrow={1} />
						<Typography variant="body2">{new Date(opinion.createdAt).toLocaleDateString()}</Typography>
					</Box>
				}
			/>
			<CardContent>
				<Stack spacing={1}>
					<Typography variant="body2">{opinion.review}</Typography>
					<Stack direction={"row"} alignItems="center" spacing={1}>
						<PersonOutlineRounded fontSize="large" />
						<Box>
							<Typography variant="body1">{opinion.authorDisplayName}</Typography>
							{opinion.isVerifiedPurchase && (
								<Stack direction={"row"} alignItems="center" spacing={1}>
									<CheckCircle color="success" fontSize="inherit" />
									<Typography variant="caption">Potwierdzony zakup</Typography>
								</Stack>
							)}
						</Box>
					</Stack>
				</Stack>
			</CardContent>
			<Stack direction={"row"} paddingX={2} paddingBottom={2} spacing={1}>
				<Button variant="outlined" color={"success"} onClick={() => handleRate("like")} startIcon={<ThumbUp />}>
					{opinion.likes}
				</Button>
				<Button variant="outlined" color={"error"} onClick={() => handleRate("dislike")} startIcon={<ThumbDown />}>
					{opinion.dislikes}
				</Button>
			</Stack>
		</Card>
	);
};

export default OpinionCard;
