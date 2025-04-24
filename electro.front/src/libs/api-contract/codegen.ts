import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	schema: "src\\libs\\api-contract\\schema.graphql",
	generates: {
		"src\\libs\\api-contract\\graphql-api.contract.ts": {
			plugins: ["typescript", "typescript-operations", "typed-document-node"],
		},
	},
};

export default config;
