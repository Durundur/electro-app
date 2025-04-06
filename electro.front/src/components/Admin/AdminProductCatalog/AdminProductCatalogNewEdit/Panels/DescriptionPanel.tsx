import { FormikProps } from "formik";
import { FC } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import { IProductForm } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/interfaces";
import Editor from "@/components/Shared/Editor/Editor";

interface DescriptionPanelProps {
	formik: FormikProps<IProductForm>;
}

const DescriptionPanel: FC<DescriptionPanelProps> = ({ formik }) => {
	return (
		<Accordion defaultExpanded>
			<AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1-content" id="panel1-header">
				Opis
			</AccordionSummary>
			<AccordionDetails>
				<Editor value={formik.values.description} onChange={(value) => formik.setFieldValue("description", value)}></Editor>
			</AccordionDetails>
		</Accordion>
	);
};

export default DescriptionPanel;
