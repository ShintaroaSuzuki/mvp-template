import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "../schemas/*.graphqls",
    documents: ["src/gql/**/*.graphql"],
    ignoreNoDocuments: true,
    generates: {
        "./src/gql/_generated_/graphql.ts": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo",
            ],
            config: {
                withHooks: true,
                reactApolloVersion: 3,
            },
        },
    },
};

export default config;
