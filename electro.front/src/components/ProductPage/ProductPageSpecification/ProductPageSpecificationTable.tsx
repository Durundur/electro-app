import { ProductAttributeResult } from "@/libs/api-contract/api-contract";
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { FC } from "react";

interface ProductPageSpecificationTableProps {
	specification: ProductAttributeResult[];
}

const ProductPageSpecificationTable: FC<ProductPageSpecificationTableProps> = ({ specification }) => {
	return (
		<TableContainer>
			<Table>
				<TableBody>
					{specification.map((row, i) => (
						<TableRow key={`specification-table-row-${i}`} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
							<TableCell
								sx={(theme) => ({
									display: "none",
									[theme.breakpoints.up("md")]: {
										display: "table-cell",
										width: "20%",
									},
								})}
							/>
							<TableCell
								sx={(theme) => ({
									fontWeight: 500,
									[theme.breakpoints.up("md")]: {
										width: "30%",
									},
								})}
							>
								{row.name}
							</TableCell>
							<TableCell align="left">{row.value}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ProductPageSpecificationTable;
