import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormikProps } from "formik";
import { FC } from "react";
import { CreateOrUpdateProductCommand } from "@/libs/api-contract/api-contract";
import PhotoUploader from "@/components/Shared/PhotoUploader/PhotoUploader";

interface PhotosPanelProps {
	formik: FormikProps<CreateOrUpdateProductCommand>;
}

const PhotosPanel: FC<PhotosPanelProps> = ({ formik }) => {
	const initialPhotos = formik.values.photos ?? [];

	return (
		<Accordion defaultExpanded>
			<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
				Zdjęcia
			</AccordionSummary>
			<AccordionDetails>
				<PhotoUploader initialPhotos={initialPhotos} />
			</AccordionDetails>
		</Accordion>
	);
};

export default PhotosPanel;
