import { useSelector } from "@/libs/Store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const hasRequiredRole = (userRoles: string[] = [], requiredRoles: string[] = []) => {
	if (requiredRoles.length === 0) return true;
	return requiredRoles.some((role) => userRoles.includes(role.toUpperCase()));
};

interface IUsePermissionGuardProps {
	requireAuth?: boolean;
	denyAuth?: boolean;
	allowedRoles?: string[];
	redirectTo?: string;
	customCondition?: () => boolean;
}

export const usePermissionGuard = ({ requireAuth = false, denyAuth = false, allowedRoles = [], redirectTo = "/auth/login", customCondition = () => true }: IUsePermissionGuardProps) => {
	const router = useRouter();
	const { user, auth, isHydrated } = useSelector((state) => state.AuthStore);

	const isAuthenticated = auth?.isAuthenticated ?? false;
	const userRoles = user?.roles?.map((role) => role.toUpperCase()) ?? [];
	const hasAccess = hasRequiredRole(userRoles, allowedRoles.map((role) => role.toUpperCase()));

	useEffect(() => {
		if (!isHydrated) return;

		const isAllowed = requireAuth ? isAuthenticated && hasAccess && customCondition() : true;
		const isDenied = denyAuth && isAuthenticated;

		if (!isAllowed || isDenied) {
			router.replace(redirectTo);
		}
	}, [isAuthenticated, hasAccess, isHydrated]);

	return null;
};
