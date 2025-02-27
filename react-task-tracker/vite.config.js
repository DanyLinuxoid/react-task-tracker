import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import { fileURLToPath, URL } from "url";
import babel from 'vite-plugin-babel';
import { visualizer } from 'rollup-plugin-visualizer';
import { analyzer } from 'vite-bundle-analyzer'
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
    plugins: [
        plugin(),
        analyzer(),
        visualizer({
            open: true,
            filename: 'dist/stats.html',
        }),
        viteCompression({
            algorithm: 'gzip',
        }),
        babel({
            babelConfig: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: [
                    'babel-plugin-react-compiler',
                ]
            }
        }) 
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@css": fileURLToPath(new URL("./src/app/css", import.meta.url)),
            "@root": fileURLToPath(new URL("./", import.meta.url)),
            "@mantine-ui": fileURLToPath(new URL("./src/ui/mantine-ui", import.meta.url)), 
            "@ui": fileURLToPath(new URL("./src/ui", import.meta.url)),
            "@modules": fileURLToPath(new URL("./src/modules", import.meta.url)),
            // vite is unable to import only required icons, hence, when you do 'import {icon1. icon2} from '@tabler/icons-react' -> it imports ALL icons (1K+ http requests), we have fix tho
            // see https://github.com/tabler/tabler-icons/issues/1233#issuecomment-2428245119 for more info
            '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs', 
        }
    },
    build: {
        sourcemap: false,
        minify: 'esbuild',
        target: 'es2015',
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom', 'react-router-dom'],
                    'vendor-mantine': [
                        '@mantine/core',
                        '@mantine/hooks',
                        '@mantine/notifications',
                        '@mantine/carousel'
                    ],
                    'vendor-icons': [
                        '@tabler/icons-react'
                    ],
                    'vendor-utils': [
                        'zustand',
                        'lightweight-charts'
                    ]
                }
            }
        },
        chunkSizeWarningLimit: 1000
    },
    server: {
        port: 49771
    },
    css: {
        modules: {
            localsConvention: "camelCase", 
            generateScopedName: "[local]_[hash:base64:2]"
        }
    }
});
