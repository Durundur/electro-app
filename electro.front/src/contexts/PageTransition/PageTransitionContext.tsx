import React, { createContext, useContext, useState } from "react";

interface PageTransitionContextType {
	isLoading: boolean;
	setIsLoading: (loading: boolean) => void;
	isEnabled: boolean;
	setIsEnabled: (enabled: boolean) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isEnabled, setIsEnabled] = useState(true);

	return <PageTransitionContext.Provider value={{ isLoading, setIsLoading, isEnabled, setIsEnabled }}>{children}</PageTransitionContext.Provider>;
};

export const usePageTransitionContext = () => {
	const context = useContext(PageTransitionContext);
	if (!context) {
		throw new Error("usePageTransitionContext must be used within PageTransitionProvider");
	}
	return context;
};
