import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import path from 'path'

export default defineConfig({
    plugins: [
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                'pinia'
            ],
            dts: 'src/auto-imports.d.ts',
            dirs: [
                './src/shared/hook'
            ],
            eslintrc: {
                enabled: true,
                filepath: './.eslintrc-auto-import.json',
                globalsPropValue: true,
            }
        }),
        Components({
            dirs: ['src/shared/ui'],
            extensions: ['vue'],
            deep: true,
        }),
        VueMacros.vite({
            plugins: {
                vue: vue({
                    script: {
                        defineModel: true
                    }
                })
            }
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@ui': path.resolve(__dirname, './src/shared/ui'),
            '@store': path.resolve(__dirname, './src/app/store'),
            '@widgets': path.resolve(__dirname, './src/widgets'),
            '@type': path.resolve(__dirname, './src/shared/type'),
            '@entities': path.resolve(__dirname, './src/entities'),
        }
    },
    server: {
        port: 3000,
        strictPort: true
    },
    clearScreen: false,
    css: {
        preprocessorOptions: {
            scss: {
                // additionalData: `@import "@/assets/scss/variables.scss"`
            }
        }
    }
})
