"use client";
import AdminProductHierarchyPanels from "@/components/Admin/AdminProductHierarchy/AdminProductHierarchyPanels/AdminProductHierarchyPanels";
import AdminProductHierarchySidebar from "@/components/Admin/AdminProductHierarchy/AdminProductHierarchySidebar/AdminProductHierarchySidebar";
import { useBreadcrumbs } from "@/hooks/Breadcrumbs/useBreadcrumbs";
import { Card, Grid2 as Grid } from "@mui/material";
import { FC } from "react";

const ProductHierarchyPage: FC = () => {
	useBreadcrumbs([
		{ label: "electro", link: "/" },
		{ label: "Panel administratora", link: "/admin" },
		{ label: "Hierarchia", link: "/admin/product-hierarchy" },
	]);
	return (
		<Grid container spacing={2}>
			<Grid size={3}>
				<AdminProductHierarchySidebar />
			</Grid>
			<Grid size={9}>
				<AdminProductHierarchyPanels />
			</Grid>
		</Grid>
	);
};

export default ProductHierarchyPage;
