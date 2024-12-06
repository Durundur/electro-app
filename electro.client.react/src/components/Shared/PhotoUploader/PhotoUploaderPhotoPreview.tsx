import React, { useMemo } from "react";
import { Box, Button, Card, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

interface PhotoUploaderPhotoPreviewProps {
	id: number;
	photo: string | File;
	onDelete: (id: number) => void;
}

const PhotoUploaderPhotoPreview: React.FC<PhotoUploaderPhotoPreviewProps> = ({ photo, id, onDelete }) => {
	const photoSrc = useMemo(() => {
		if (photo instanceof File) {
			return URL.createObjectURL(photo);
		}
		return photo;
	}, [photo]);

	const handleDeleteFile = (event: React.MouseEvent) => {
		event.stopPropagation();
		onDelete(id);
	};

	return (
		<Card
			sx={{
				position: "relative",
				paddingBottom: "75%",
				borderRadius: 1,
				overflow: "hidden",
				backgroundImage: `url(${photoSrc})`,
				backgroundSize: "contain",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				"&:hover .photo-actions": {
					visibility: "visible",
				},
			}}
		>
			<Box
				component={Card}
				className="photo-actions"
				sx={{
					position: "absolute",
					bottom: 8,
					left: "50%",
					transform: "translateX(-50%)",
					display: "flex",
					visibility: "hidden",
				}}
			>
				<IconButton size="small" color="error" onClick={handleDeleteFile} onPointerDown={(e) => e.stopPropagation()}>
					<Delete />
				</IconButton>
			</Box>
		</Card>
	);
};

export default PhotoUploaderPhotoPreview;
