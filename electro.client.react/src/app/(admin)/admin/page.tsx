"use client";
import { useBreadcrumbs } from "@/hooks/Breadcrumbs/useBreadcrumbs";
import { usePermissionGuard } from "@/hooks/PermissionGuard/usePermissionGuard";
import { FC } from "react";

const AdminPage: FC = () => {
	useBreadcrumbs([
		{ label: "electro", link: "/" },
		{ label: "Panel administratora", link: "/admin" },
	]);
	usePermissionGuard({
		allowedRoles: ["ADMIN"],
		requireAuth: true,
	});

	return <div>admin root page</div>;
};

export default AdminPage;
