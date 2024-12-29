import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Grid2 as Grid } from "@mui/material";
import PhotoUploadInput from "./PhotoUploaderInput";
import PhotoPreview from "./PhotoUploaderPhotoPreview";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch, useSelector } from "@/libs/Store";
import { deletePhoto, uploadPhotos } from "@/libs/PhotoUploader/thunk";
import { photoUplaoderSetItems } from "@/libs/PhotoUploader/slice";

interface PhotoUploaderProps {
	initialPhotos: string[];
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ initialPhotos }) => {
	const { isLoading, result, error, items } = useSelector((store) => store.PhotoUploaderStore);
	const dispatch = useDispatch();

	useEffect(() => {
		const items = initialPhotos.map((photo, index) => ({
			id: index,
			photo,
		}));
		dispatch(photoUplaoderSetItems(items));
	}, [initialPhotos]);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			const oldIndex = items.findIndex((item) => item.id === active.id);
			const newIndex = items.findIndex((item) => item.id === over.id);
			dispatch(photoUplaoderSetItems(arrayMove(items, oldIndex, newIndex)));
		}
	};

	const handleNewFile = (files: File[]) => {
		const newItems = files.map((file, index) => ({
			id: items.length + index,
			photo: file,
		}));
		dispatch(photoUplaoderSetItems([...items, ...newItems]));
	};

	const handleDeleteFile = (id: number) => {
		const updatedItems = items.filter((item) => item.id !== id);
		dispatch(photoUplaoderSetItems(updatedItems));
	};

	return (
		<DndContext autoScroll={false} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={items.map((item) => item.id)}>
				<Grid container spacing={2}>
					{items.map((item) => (
						<Grid size={{ xs: 3 }} key={`grid-item-${item.id}`}>
							<SortablePhoto key={item.id} id={item.id} photo={item.photo} onDelete={handleDeleteFile} />
						</Grid>
					))}
					<Grid size={{ xs: 3 }}>
						<PhotoUploadInput onNewFile={handleNewFile} />
					</Grid>
				</Grid>
			</SortableContext>
		</DndContext>
	);
};

export default PhotoUploader;

interface SortablePhotoProps {
	id: number;
	photo: string | File;
	onDelete: (id: number) => void;
}

const SortablePhoto: React.FC<SortablePhotoProps> = ({ id, onDelete, photo }) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<PhotoPreview onDelete={onDelete} photo={photo} id={id} />
		</div>
	);
};
