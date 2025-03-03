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
      rollupOptions: {
         input: {
            main: 'index.html',
            sw: 'src/pages/index/components/sw/sw.ts'
         },
         // output: {
         //    entryFileNames: (chunkInfo) => {
         //       if (chunkInfo.name === 'sw') {
         //          return 'service-worker.js';
         //       }
         //       return '[name].js';
         //    }
         // }
      }
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