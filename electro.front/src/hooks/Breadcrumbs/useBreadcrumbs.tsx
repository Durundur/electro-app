import { clearBreadcrumbsItems, setBreadcrumbsItems } from "@/libs/Layout/slice";
import { useDispatch, useSelector } from "@/libs/Store";
import { useEffect, useRef } from "react";

export interface Breadcrumb {
	label: string;
	link?: string;
}

export const useBreadcrumbs = (initialBreadcrumbs: Breadcrumb[] = []) => {
	const dispatch = useDispatch();
	const breadcrumbs = useSelector((state) => state.LayoutStore.breadcrumbs);
	const isFirstRender = useRef(true);

	const updateBreadcrumbs = (newBreadcrumbs: Breadcrumb[]) => {
		if (JSON.stringify(breadcrumbs.items) !== JSON.stringify(newBreadcrumbs)) {
			dispatch(setBreadcrumbsItems(newBreadcrumbs));
		}
	};

	const clearBreadcrumbs = () => {
		dispatch(clearBreadcrumbsItems());
	};

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		updateBreadcrumbs(initialBreadcrumbs);
	}, [initialBreadcrumbs, breadcrumbs]);

	useEffect(() => {
		return () => {
			clearBreadcrumbs();
		};
	}, []);

	return {
		breadcrumbs,
		setBreadcrumbs: updateBreadcrumbs,
		clearBreadcrumbs: clearBreadcrumbs,
	};
};
