import {defineConfig, loadEnv} from 'vite'
import {fileURLToPath, URL} from 'node:url'

import react from '@vitejs/plugin-react'

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [react()],
        base: env.VITE_BASE_URL,
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },

        server: {
            port: 3000,
            proxy: {
                '/api': {
                    target: env.VITE_API_BASE_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        }
    }
})
