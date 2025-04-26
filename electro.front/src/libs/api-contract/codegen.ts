import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	schema: "src/libs/api-contract/schema.graphql",
	ignoreNoDocuments: true,
	documents: ["src/**/*.tsx", "src/**/*.ts"],
	generates: {
		"src/libs/api-contract/graphql-api-contract/": {
			preset: "client",
			config: {
				documentMode: "string",
			},
		},
	},
};

export default config;
