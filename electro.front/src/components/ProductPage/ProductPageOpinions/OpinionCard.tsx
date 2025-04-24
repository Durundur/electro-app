import { createOpinionReaction } from "@/libs/ProductPage/thunk";
import { useDispatch, useSelector } from "@/libs/Store";
import { GetProductOpinionsResultOpinion, OpinionReactionType } from "@/libs/api-contract/rest-api-contract";
import { PersonOutlineRounded, CheckCircle, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Box, Card, CardHeader, Rating, Typography, CardContent, Stack, Button } from "@mui/material";
import { FC } from "react";

interface OpinionCardProps {
	opinion: GetProductOpinionsResultOpinion;
}

const OpinionCard: FC<OpinionCardProps> = ({ opinion }) => {
	const dispatch = useDispatch();

	const isLoading = useSelector((state) => state.ProductPageStore.createOpinionReaction.isLoading);
	const isLoggedIn = useSelector((state) => state.AuthStore.auth.isAuthenticated);

	const handleRate = async (action: OpinionReactionType) => {
		if (!opinion.id || isLoading || !isLoggedIn) return;
		dispatch(createOpinionReaction(opinion.id, action));
	};

	const isLiked = opinion.reactionType === OpinionReactionType.Like;
	const isDisliked = opinion.reactionType === OpinionReactionType.Dislike;

	return (
		<Card>
			<CardHeader
				subheader={
					<Box display="flex" alignItems="center">
						<Rating value={opinion.rating} precision={0.5} readOnly size="small" />
						<Box flexGrow={1} />
						<Typography variant="body2">{new Date(opinion.createdAt!).toLocaleDateString()}</Typography>
					</Box>
				}
			/>
			<CardContent>
				<Stack spacing={1}>
					<Typography variant="body2">{opinion.content}</Typography>
					<Stack direction={"row"} alignItems="center" spacing={1}>
						<PersonOutlineRounded fontSize="large" />
						<Box>
							<Typography variant="body1">{opinion.authorDisplayName}</Typography>
							{true && (
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
				<Button variant={isLiked ? "contained" : "outlined"} color={"success"} onClick={() => handleRate(OpinionReactionType.Like)} startIcon={<ThumbUp />}>
					{opinion.likesCount}
				</Button>
				<Button variant={isDisliked ? "contained" : "outlined"} color={"error"} onClick={() => handleRate(OpinionReactionType.Dislike)} startIcon={<ThumbDown />}>
					{opinion.dislikesCount}
				</Button>
			</Stack>
		</Card>
	);
};

export default OpinionCard;
