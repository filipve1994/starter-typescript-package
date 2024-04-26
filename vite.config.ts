/// <reference types="vite/client" />

/// <reference types="vitest" />

import * as path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import tsconfigPaths from 'vite-tsconfig-paths';
// @ts-expect-error
import * as packageJson from './package.json';

const getPackageName = () => packageJson.name;

function getPackageNameCamelCase() {
  try {
    return getPackageName().replace(/-./g, char => char[1].toUpperCase());
  }
  catch (err) {
    throw new Error('Name property in package.json is missing.');
  }
}

const fileName = {
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
  iife: `${getPackageName()}.iife.js`,
};

const formats = Object.keys(fileName) as Array<keyof typeof fileName>;

// https://vitejs.dev/config/
export default defineConfig({
  // base: './',
  build: {
    outDir: './dist',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: getPackageNameCamelCase(),
      // formats: ['es'],
      formats,
      fileName: format => fileName[format],
    },
  },
  // https://github.com/vitest-dev/vitest
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
  },
  // resolve: {
  //     alias: [
  //         { find: "@", replacement: path.resolve(__dirname, "src") },
  //         { find: "@@", replacement: path.resolve(__dirname) },
  //     ],
  // },
  plugins: [
    tsconfigPaths(),
    dts(({ rollupTypes: true })),
  ],
});
