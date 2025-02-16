import { FormikProps } from "formik";
import { FC } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import { CreateOrUpdateProductCommand } from "@/libs/api-contract/api-contract";

interface DescriptionPanelProps {
	formik: FormikProps<CreateOrUpdateProductCommand>;
}

const DescriptionPanel: FC<DescriptionPanelProps> = ({ formik }) => {
	const APIKEY = "l35njw6nq1d3nwxyruvhs7d4e27zko8e67be6gq2ue7g7v9m";

	return (
		<Accordion defaultExpanded={false}>
			<AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1-content" id="panel1-header">
				Opis
			</AccordionSummary>
			<AccordionDetails>
				<Editor
					id="description-editor"
					apiKey={APIKEY}
					value={formik.values.description}
					onEditorChange={(newValue, editor) => formik.setFieldValue("description", newValue)}
					init={{
						height: 850,
						menubar: false,
						plugins: [
							"advlist",
							"autolink",
							"lists",
							"link",
							"image",
							"charmap",
							"preview",
							"anchor",
							"searchreplace",
							"visualblocks",
							"code",
							"fullscreen",
							"insertdatetime",
							"media",
							"table",
							"code",
							"help",
							"wordcount",
						],
						toolbar: "undo redo | blocks | " + "bold italic forecolor | alignleft aligncenter " + "alignright alignjustify | bullist numlist outdent indent | " + "removeformat | help",
						content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
					}}
				/>
			</AccordionDetails>
		</Accordion>
	);
};

export default DescriptionPanel;
