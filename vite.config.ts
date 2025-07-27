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
        }
    }
})
