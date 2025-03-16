import { useCallback } from "react";

interface ScrollOptions {
	behavior?: ScrollBehavior;
	block?: ScrollLogicalPosition;
	offset?: number;
}

const useScrollTo = () => {
	const scrollTo = useCallback((elementId: string, options: ScrollOptions = {}) => {
		const { behavior = "smooth", block = "start", offset = 0 } = options;

		const element = document.getElementById(elementId);
		if (!element) return;

		const elementPosition = element.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.scrollY - offset;

		window.scrollTo({
			top: offsetPosition,
			behavior,
		});
	}, []);

	return scrollTo;
};

export default useScrollTo;
