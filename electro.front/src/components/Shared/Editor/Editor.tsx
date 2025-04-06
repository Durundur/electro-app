"use client";

import { useEffect, useRef } from "react";

declare global {
	interface Window {
		RichTextEditor: any;
	}
}

interface EditorProps {
	value?: string;
	onChange?: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value = "", onChange }) => {
	const editorRef = useRef<HTMLDivElement>(null);
	const editorInstanceRef = useRef<any>(null);

	useEffect(() => {
		let isEditorMounted = true;

		const initEditor = async () => {
			if (!editorRef.current || editorInstanceRef.current) return;

			try {
				// Load CSS
				const cssLink = document.createElement("link");
				cssLink.rel = "stylesheet";
				cssLink.href = "/richtexteditor/rte_theme_default.css";
				document.head.appendChild(cssLink);

				// Load main script
				const mainScript = document.createElement("script");
				mainScript.src = "/richtexteditor/rte.js";
				document.body.appendChild(mainScript);

				await new Promise<void>((resolve) => {
					mainScript.onload = () => resolve();
				});

				// Load plugins
				const pluginsScript = document.createElement("script");
				pluginsScript.src = "/richtexteditor/plugins/all_plugins.js";
				document.body.appendChild(pluginsScript);

				await new Promise<void>((resolve) => {
					pluginsScript.onload = () => resolve();
				});

				if (isEditorMounted && window.RichTextEditor) {
					editorInstanceRef.current = new window.RichTextEditor(editorRef.current);

					if (value) {
						editorInstanceRef.current.setHTMLCode(value);
					}

					editorInstanceRef.current.attachEvent("change", () => {
						const newValue = editorInstanceRef.current.getHTMLCode();
						onChange?.(newValue);
					});
				}
			} catch (error) {
				console.error("Error initializing editor:", error);
			}
		};

		initEditor();

		return () => {
			isEditorMounted = false;
			if (editorInstanceRef.current) {
				try {
					editorInstanceRef.current.destroy();
				} catch (e) {
					console.error("Error destroying editor:", e);
				}
				editorInstanceRef.current = null;
			}
		};
	}, []);

	useEffect(() => {
		if (editorInstanceRef.current && value !== editorInstanceRef.current.getHTMLCode()) {
			editorInstanceRef.current.setHTMLCode(value);
		}
	}, [value]);

	return <div ref={editorRef} style={{ height: "100%", width: "100%" }} />;
};

export default Editor;
