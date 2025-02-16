import { FC } from "react";
import { Breadcrumbs as MBreadcrumbs } from "@mui/material";
import { NavigateNextOutlined } from "@mui/icons-material";
import { useSelector } from "@/libs/Store";
import Link from "next/link";

const PageBreadcrumbs: FC = () => {
	const breadcrumbsSelector = useSelector((store) => store.LayoutStore.breadcrumbs.items);

	const breadcrumbs = breadcrumbsSelector?.map((b, i) => (
		<Link key={`breadcrumb-item-${i}`} color="inherit" href={b.link ?? ""}>
			{b.label}
		</Link>
	));
	if (breadcrumbs.length <= 0) return <></>;
	return (
		<MBreadcrumbs sx={{ marginBottom: 2 }} separator={<NavigateNextOutlined fontSize="small" />} aria-label="breadcrumb">
			{breadcrumbs}
		</MBreadcrumbs>
	);
};

export default PageBreadcrumbs;
