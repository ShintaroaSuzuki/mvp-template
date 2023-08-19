import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "../schemas/*.graphqls",
    documents: ["src/gql/**/*.graphql"],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        "./src/gql/_generated_/": {
            preset: "client",
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
