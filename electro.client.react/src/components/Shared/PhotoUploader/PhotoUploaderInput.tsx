import React from "react";
import { Typography, Card, Stack } from "@mui/material";

import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

interface PhotoUploaderInputProps {
	onNewFile: (files: File[]) => void;
}

const PhotoUploaderInput: React.FC<PhotoUploaderInputProps> = ({ onNewFile }) => {
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const filesArray = Array.from(event.target.files);
			onNewFile(filesArray);
			event.target.value = "";
		}
	};
	return (
		<Card
			sx={(theme) => ({
				position: "relative",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				paddingBottom: "75%",
				cursor: "pointer",
				transition: theme.transitions.create(["background-color", "transform"], {
					duration: theme.transitions.duration.short,
					easing: theme.transitions.easing.easeInOut,
				}),
				"&:hover": {
					backgroundColor: theme.palette.action.hover,
				},
			})}
		>
			<Stack
				width={"100%"}
				height={"100%"}
				alignItems="center"
				justifyContent="center"
				spacing={1}
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					pointerEvents: "none",
				}}
			>
				<FileUploadOutlinedIcon />
				<Typography variant="body1">Dodaj zdjęcie</Typography>
			</Stack>
			<input
				type="file"
				accept="image/*"
				multiple
				onChange={handleFileChange}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					opacity: 0,
					cursor: "pointer",
				}}
			/>
		</Card>
	);
};

export default PhotoUploaderInput;
