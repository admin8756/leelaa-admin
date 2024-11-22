import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import tailwind from 'tailwindcss';
import tailwindTypography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import autoprefixer from 'autoprefixer';
import VueI18n from '@intlify/unplugin-vue-i18n/vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { VitePWA } from 'vite-plugin-pwa';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import manifest from './src/manifest.json';

// https://vitejs.dev/config/
const __dirname = fileURLToPath(new URL('.', import.meta.url));
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      dts: './src/components.d.ts',
      extensions: ['vue'],
      dirs: ['src/components/'],
    }),
    AutoImport({
      dts: './src/auto-imports.d.ts',
      imports: ['vue', 'pinia', 'vue-router'],
      eslintrc: {
        enabled: false, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    VueI18n({
      runtimeOnly: true,
      defaultSFCLang:'yml',
      compositionOnly: false, 
      fallbackLocale: 'en',
      locale: 'zh-CN',
      fullInstall: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'safari-pinned-tab.svg'],
      manifest,
    }),
  ],
  // 服务设置
  server: {
    host: true, // host设置为true才可以使用network的形式，以ip访问项目
    port: 8087, // 端口号
    open: true, // 自动打开浏览器
    cors: true, // 跨域设置允许
    strictPort: true, // 如果端口已占用直接退出
    proxy: {}, // 接口代理
  },
  build: {
    target: 'esnext',
    // 启用/禁用 gzip 压缩大小报告
    reportCompressedSize: false,
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 2000,
    minify: 'esbuild',
    assetsDir: 'static/assets',
    // 静态资源打包到dist下的不同目录
    rollupOptions: {
      external: ['workbox-window'],
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  css: {
    preprocessorOptions: {},
    postcss: {
      plugins: [
        tailwind({
          daisyui: {
            logs: false,
            themes: ['light', 'dark', 'cupcake', 'retro', 'dim', 'lemonade'],
          },
          content: ['./index.html', './src/**/*.{vue,js,jsx}'],
          plugins: [tailwindTypography, daisyui],
        }),
        autoprefixer,
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@enums': path.resolve(__dirname, './enums'),
      '@hooks': path.resolve(__dirname, './hooks'),
      '@locales': path.resolve(__dirname, './locales'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@mock': path.resolve(__dirname, './mock'),
      '@test': path.resolve(__dirname, './test')
    }
  },
  appType: 'spa',
});
