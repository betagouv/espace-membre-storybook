import type { StorybookConfig } from "@storybook/nextjs";
const webpack = require("webpack");
const fs = require("fs");
const path = require("path");

const config: StorybookConfig = {
    stories: [
        "../stories/**/*.mdx",
        "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-onboarding",
        "@chromatic-com/storybook",
        "@storybook/experimental-addon-test",
    ],
    staticDirs: ["../../public"],
    framework: {
        name: "@storybook/nextjs",
        options: {
            // https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs
            nextConfigPath: path.resolve(__dirname, "../../next.config.js"),
        },
    },
    core: {
        enableCrashReports: false,
        disableTelemetry: true,
    },
    env: (config) => ({
        ...config,
        STORYBOOK_ENVIRONMENT: "true",
        /* 
            STORYBOOK_PROJECT_ROOT is necessay because storybook use
            .git to find projectRoot. But here docs is a git repo as well embedded in espace-membre
            git repo. The git it should find is the espace-membre's one, not docs's one.
            So we set root explicitly using STORYBOOK_PROJECT_ROOT
            However setting it here, it is too late to be used, so we set in in the build command.
            https://github.com/storybookjs/storybook/blob/next/code/core/src/common/utils/paths.ts#L5
        */
        // STORYBOOK_PROJECT_ROOT: path.resolve(__dirname, "../.."),
        APP_BASE_URL: "https://espace-membre.incubateur.net",
        NEXT_PUBLIC_APP_BASE_URL: "https://espace-membre.incubateur.net",
    }),
    webpackFinal: async (config, { configType }) => {
        config.plugins = config.plugins || [];
        // not sure if its prevent hotreloading to work or if there is no hotreloading in storybook
        config.plugins.push(
            new webpack.NormalModuleReplacementPlugin(
                /@\/utils\/url/,
                path.resolve(__dirname, "./mocks/utils/url.ts")
            )
        );
        return config;
    },
};
export default config;
