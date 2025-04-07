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
		if (!editorRef.current || editorInstanceRef.current) return;

		editorInstanceRef.current = new window.RichTextEditor(editorRef.current);

		if (value) {
			editorInstanceRef.current.setHTMLCode(value);
		}

		editorInstanceRef.current.attachEvent("change", () => {
			const newValue = editorInstanceRef.current.getHTMLCode();
			onChange?.(newValue);
		});

		return () => {
			if (editorInstanceRef.current) {
				try {
					editorInstanceRef.current.delete();
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

	return <div ref={editorRef} style={{ height: "100%", width: "100%", maxHeight: "100vh" }} />;
};

export default Editor;
