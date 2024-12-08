"use client";
import { Accordion, AccordionDetails, AccordionSummary, Button, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FC, useState } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { AddOutlined, DeleteOutlined, EditOutlined } from "@mui/icons-material";
import AttributeDefinitionDialog from "./AttributeDefinitionDialog";
import { AttributeDefinitionCommand, AttributeDefinitionResult } from "@/libs/api-contract/api-contract";

interface AttributeDefinitionRow {
	id: string | undefined;
	rowId: string;
	name: string | undefined;
	type: string | undefined;
	isRequired: string;
	description: string | undefined;
	isFilterable: string;
}

interface AttributeDefinitionPanelProps {
	attributes: AttributeDefinitionResult[];
	onSaveAttribute: (attribute: AttributeDefinitionCommand) => void;
	onDeleteAttribute: (attributeId: string) => void;
}

const AttributeDefinitionPanel: FC<AttributeDefinitionPanelProps> = ({ attributes, onSaveAttribute, onDeleteAttribute }) => {
	const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
	const [openDialog, setOpenDialog] = useState(false);
	const selectedAttribute = attributes.find((_, index) => `attribute-definition-row-${index}` === rowSelectionModel[0]);

	const columns: GridColDef<AttributeDefinitionRow>[] = [
		{ field: "id", headerName: "ID", width: 100, disableColumnMenu: true },
		{ field: "name", headerName: "Nazwa", width: 200, disableColumnMenu: true },
		{ field: "description", headerName: "Opis", width: 150, disableColumnMenu: true },
		{ field: "type", headerName: "Typ", disableColumnMenu: true },
		{ field: "isRequired", headerName: "Czy obowiązkowy", width: 150, disableColumnMenu: true },
		{ field: "isFilterable", headerName: "Dostępny w filtrach", width: 150, disableColumnMenu: true },
	];

	const getAttributeDefinitionRow = (attribute: AttributeDefinitionResult, index: number): AttributeDefinitionRow => {
		return {
			id: attribute.id,
			rowId: `attribute-definition-row-${index}`,
			name: attribute.name,
			type: attribute.type?.toString(),
			isRequired: attribute.isRequired ? "Tak" : "Nie",
			description: attribute.description,
			isFilterable: attribute.isFilterable ? "Tak" : "Nie",
		};
	};

	const handleOpenDialog = (isNew: boolean) => {
		if (isNew) setRowSelectionModel([]);
		setOpenDialog(true);
	};

	const handleSaveAttribute = (attribute: AttributeDefinitionCommand) => {
		onSaveAttribute(attribute);
		setOpenDialog(false);
		setRowSelectionModel([]);
	};

	const handleDeleteAttribute = () => {
		if (selectedAttribute?.id) {
			onDeleteAttribute(selectedAttribute.id);
			setRowSelectionModel([]);
		}
	};

	return (
		<Accordion defaultExpanded>
			<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
				Atrybuty produktów
			</AccordionSummary>
			<AccordionDetails>
				<Stack direction="row" spacing={2} sx={{ marginBottom: 1 }}>
					<Button onClick={() => handleOpenDialog(true)} startIcon={<AddOutlined />} variant="outlined">
						Nowy
					</Button>
					<Button onClick={() => handleOpenDialog(false)} disabled={rowSelectionModel.length !== 1} startIcon={<EditOutlined />} variant="outlined">
						Edycja
					</Button>
					<Button onClick={handleDeleteAttribute} disabled={rowSelectionModel.length !== 1} startIcon={<DeleteOutlined />} variant="outlined">
						Usuń
					</Button>
				</Stack>

				<DataGrid
					rows={attributes.map((a, i) => getAttributeDefinitionRow(a, i))}
					getRowId={(a) => a.rowId}
					columns={columns}
					checkboxSelection
					onRowSelectionModelChange={setRowSelectionModel}
					disableMultipleRowSelection={true}
					rowSelectionModel={rowSelectionModel}
					hideFooterPagination
					hideFooter
					disableRowSelectionOnClick
				/>

				<AttributeDefinitionDialog open={openDialog} onClose={() => setOpenDialog(false)} attribute={selectedAttribute} onSave={handleSaveAttribute} />
			</AccordionDetails>
		</Accordion>
	);
};

export default AttributeDefinitionPanel;
