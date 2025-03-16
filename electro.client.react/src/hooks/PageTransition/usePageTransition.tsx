import { usePageTransitionContext } from "@/contexts/PageTransition/PageTransitionContext";
import { useEffect } from "react";

interface UsePageTransitionOptions {
	disabled?: boolean;
	debounceTime?: number;
	minLoadingTime?: number;
}

export const usePageTransition = (
	loadingStates: boolean[],
	options: UsePageTransitionOptions = {}
) => {
	const { disabled = false, debounceTime = 100, minLoadingTime = 500 } = options;
	const { setIsLoading, setIsEnabled } = usePageTransitionContext();
	const anyLoading = loadingStates.some(state => state === true);

	useEffect(() => {
		setIsEnabled(!disabled);
	}, [disabled]);

	useEffect(() => {
		if (disabled) return;

		let debounceTimeout: NodeJS.Timeout;
		let minLoadingTimeout: NodeJS.Timeout;

		if (anyLoading) {
			debounceTimeout = setTimeout(() => {
				setIsLoading(true);
			}, debounceTime);
		} else {
			minLoadingTimeout = setTimeout(() => {
				setIsLoading(false);
			}, minLoadingTime);
		}

		return () => {
			clearTimeout(debounceTimeout);
			clearTimeout(minLoadingTimeout);
		};
	}, [anyLoading, disabled, debounceTime, minLoadingTime]);
};
