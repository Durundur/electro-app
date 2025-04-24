@echo off

SET CONFIG_FILE=src\libs\api-contract\nswag.json

nswag run %CONFIG_FILE%

npx graphql-codegen --config src/libs/api-contract/codegen.ts