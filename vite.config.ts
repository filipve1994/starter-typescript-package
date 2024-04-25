/// <reference types="vitest" />

import {defineConfig} from 'vite';
// import {resolve} from 'node:path';
import * as path from "node:path";
// @ts-ignore
import * as packageJson from "./package.json";
// import {version, name} from "./package.json";
import tsconfigPaths from "vite-tsconfig-paths";

const getPackageName = () => {
    return packageJson.name;
};

const getPackageNameCamelCase = () => {
    try {
        return getPackageName().replace(/-./g, char => char[1].toUpperCase());
    } catch (err) {
        throw new Error("Name property in package.json is missing.");
    }
};

const fileName = {
    es: `${getPackageName()}.mjs`,
    cjs: `${getPackageName()}.cjs`,
    iife: `${getPackageName()}.iife.js`,
};

const formats = Object.keys(fileName) as Array<keyof typeof fileName>;


// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    build: {
        outDir: "./build/dist",
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: getPackageNameCamelCase(),
            formats,
            fileName: format => fileName[format],
        }
    },
    test: {},
    // resolve: {
    //     alias: [
    //         { find: "@", replacement: path.resolve(__dirname, "src") },
    //         { find: "@@", replacement: path.resolve(__dirname) },
    //     ],
    // },
    plugins: [
        tsconfigPaths()
    ]
});