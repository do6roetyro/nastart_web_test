import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import viteImagemin from 'vite-plugin-imagemin';
import htmlMinifier from 'vite-plugin-html-minifier';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imageminSvgo from 'imagemin-svgo';

export default defineConfig({
  root: 'src', // указываем корневую папку для проекта
  plugins: [
    htmlMinifier(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.65, 0.8],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
          {
            name: 'cleanupIDs',
            active: false,
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['jquery', 'bootstrap'],
        },
      },
    },
    minify: 'terser',
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
});