import autoprefixer from 'autoprefixer'
import customMedia from 'postcss-custom-media'
import postcssGlobalData from '@csstools/postcss-global-data'
import { defineConfig } from 'vite'

export default defineConfig({
   resolve: {
      alias: {
         '@': '/src',
      },
   },
   build: {
      sourcemap: true,
   },
   css: {
      postcss: {
         plugins: [
            postcssGlobalData({
               files: [
                  './src/styles/media.css'
               ]
            }),
            customMedia(),
            autoprefixer,
         ],
      }
   },
});