import { FormikProps } from "formik";
import { FC, useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "@/libs/Store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AttributeDefinitionResult, CreateOrUpdateProductCommand } from "@/libs/api-contract/api-contract";
import { fetchAttributesDefinitions } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/thunk";
import { clearAttributesDefinitionsState } from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/slice";

interface AttributesPanelProps {
	formik: FormikProps<CreateOrUpdateProductCommand>;
}

interface AttributeDefinitionRow {
	id: string | undefined;
	rowId: string;
	name: string | undefined;
	type: string | undefined;
	isRequired: string;
	description: string | undefined;
	value: string;
	isPrimary: boolean;
}

const AttributesPanel: FC<AttributesPanelProps> = ({ formik }) => {
	const dispatch = useDispatch();
	const attributesDefinitionsSelector = useSelector((store) => store.AdminProductCatalogNewEdit.attributesDefinitions);
	const attributes = attributesDefinitionsSelector.data?.attributesDefinitions ?? [];
	const selectedGroupId = formik.values.groupId;
	const selectedCategoryId = formik.values.categoryId;
	const selectedSubCategoryId = formik.values.subCategoryId;

	useEffect(() => {
		if (selectedGroupId || selectedCategoryId || selectedSubCategoryId) {
			dispatch(fetchAttributesDefinitions({ groupId: selectedGroupId, categoryId: selectedCategoryId, subCategoryId: selectedSubCategoryId }));
		}
		return () => {
			dispatch(clearAttributesDefinitionsState());
		};
	}, [selectedGroupId, selectedCategoryId, selectedSubCategoryId]);

	const getAttributeDefinitionRow = (attribute: AttributeDefinitionResult, index: number): AttributeDefinitionRow => {
		const attributeInFormik = formik.values.attributes!.find((attr) => attr.id === attribute.id);

		return {
			id: attribute.id,
			rowId: `attribute-definition-row-${index}`,
			name: attribute.name,
			type: attribute.type?.toString(),
			isRequired: attribute.isRequired ? "Tak" : "Nie",
			description: attribute.description,
			value: attributeInFormik?.value!,
			isPrimary: attributeInFormik?.isPrimary!,
		};
	};

	const columns: GridColDef<AttributeDefinitionRow>[] = [
		{ field: "id", headerName: "ID", width: 70, disableColumnMenu: true },
		{ field: "name", headerName: "Nazwa", width: 150, disableColumnMenu: true },
		{ field: "description", headerName: "Opis", width: 150, disableColumnMenu: true },
		{ field: "type", headerName: "Typ", disableColumnMenu: true },
		{ field: "isRequired", headerName: "Czy obowiązkowy", width: 130, disableColumnMenu: true },
		{
			field: "value",
			headerName: "Wartość",
			width: 360,
			sortable: false,
			disableColumnMenu: true,
			editable: true,
		},
		{
			field: "isPrimary",
			headerName: "Atrybut główny",
			width: 150,
			sortable: false,
			disableColumnMenu: true,
			align: "center",
			renderCell: (params) => {
				const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
					const updatedAttributes = formik.values.attributes!.map((attr) => (attr.id === params.row.id ? { ...attr, isPrimary: event.target.checked } : attr));
					formik.setFieldValue("attributes", updatedAttributes);
				};

				return <Checkbox size="small" checked={params.value} onChange={handleChange} inputProps={{ "aria-label": "Atrybut główny" }} />;
			},
		},
	];

	const processRowUpdate = (row: AttributeDefinitionRow) => {
		const updatedAttributes = formik.values.attributes || [];
		const attributeIndex = updatedAttributes.findIndex((attr) => attr.id === row.id);
	
		if (attributeIndex !== -1) {
			updatedAttributes[attributeIndex] = {
				...updatedAttributes[attributeIndex],
				value: row.value,
				isPrimary: row.isPrimary,
			};
		} else {
			updatedAttributes.push({
				id: row.id,
				value: row.value,
				isPrimary: row.isPrimary ?? false,
			});
		}
	
		formik.setFieldValue("attributes", updatedAttributes);
		return row;
	};

	return (
		<Accordion defaultExpanded>
			<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
				Atrybuty
			</AccordionSummary>
			<AccordionDetails>
				{attributes.length ? (
					<DataGrid
						editMode="cell"
						rows={attributes.map((a, i) => getAttributeDefinitionRow(a, i))}
						getRowId={(a) => a.rowId}
						columns={columns}
						hideFooterPagination
						hideFooter
						disableRowSelectionOnClick
						processRowUpdate={processRowUpdate}
					/>
				) : (
					<Typography align="center">Brak definicji atrybutów</Typography>
				)}
			</AccordionDetails>
		</Accordion>
	);
};

export default AttributesPanel;
