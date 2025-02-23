import { glob } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths'
//import { splitVendorChunkPlugin } from 'vite'

export default defineConfig({
    server: {
        hmr: true,
    },
    publicDir: "public",
    plugins: [
        tsconfigPaths(),
        //splitVendorChunkPlugin(),
        checker({
            typescript: true,
        }),
    ],
    build: {
        sourcemap: process.env.NODE_ENV === 'production' ? false : true,
        rollupOptions: {
            input: Object.fromEntries(
                glob.sync('./src/**/*.{ts,tsx,js,jsx}', { ignore: './src/**/*.d.ts' }).map(file => [
                    // This remove `src/` as well as the file extension from each
                    // file, so e.g. src/nested/foo.js becomes nested/foo
                    path.relative(
                        'src',
                        file.slice(0, file.length - path.extname(file).length)
                    ),
                    // This expands the relative paths to absolute paths, so e.g.
                    // src/nested/foo becomes /project/src/nested/foo.js
                    fileURLToPath(new URL(file, import.meta.url))
                ])
            ),
            output: {
                entryFileNames: '[hash].js',
                dir: "../wwwroot/js",
            }
        },
        manifest: true,
        emptyOutDir: true,
    }
})
