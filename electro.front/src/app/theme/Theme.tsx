import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";
import { inputsCustomizations } from "./customizations/inputs";
import { componentsCustomizations } from "./customizations/components";
import { typography, palette, shape, transitions } from "./customizations/primitives";

interface ThemeProps {
	children: React.ReactNode;
	themeComponents?: ThemeOptions["components"];
}

export default function Theme(props: ThemeProps) {
	const { children, themeComponents } = props;
	const theme = React.useMemo(() => {
		return createTheme({
			palette,
			typography,
			shape,
			transitions,
			components: {
				...componentsCustomizations,
				...inputsCustomizations,
			},
		});
	}, [themeComponents]);

	return (
		<ThemeProvider theme={theme} disableTransitionOnChange>
			{children}
		</ThemeProvider>
	);
}
