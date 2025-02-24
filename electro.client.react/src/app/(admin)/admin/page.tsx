"use client";
import { useBreadcrumbs } from "@/hooks/Breadcrumbs/useBreadcrumbs";
import { FC } from "react";

const AdminPage: FC = () => {
	useBreadcrumbs([
		{ label: "electro", link: "/" },
		{ label: "Panel administratora", link: "/admin" },
	]);

	return <div>admin root page</div>;
};

export default AdminPage;
