// import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import tailwind from 'tailwindcss'
import tailwindTypography from '@tailwindcss/typography'
import daisyui from 'daisyui'
import autoprefixer from 'autoprefixer'
// import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from 'vite-plugin-pwa'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite';
// https://vitejs.dev/config/
// const __dirname = path.dirname(fileURLToPath(import.meta.url))
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
      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: false, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),
    // VueI18n({
    //   runtimeOnly: true,
    //   compositionOnly: true,
    //   fullInstall: true,
    //   include: [path.resolve(__dirname, 'locales/**')],
    // }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'leelaa-admin',
        short_name: 'Leelaa-admin',
        theme_color: '#3367D6',
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        lang: "zh-CN",
        scope: "/",
        icons: [{
          src: '/pwa-128x128.png',
          sizes: '128x128',
          type: 'image/png',
        },
        {
          src: '/pwa-144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        }, {
          src: '/pwa-256x256.png',
          sizes: '256x256',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        }, {
          src: '/pwa-1024x1024.png',
          sizes: '1024x1024',
          type: 'image/png',
          purpose: 'any maskable',
        },
        ],
      },
    }),
  ],
  // 服务设置
  server: {
    host: true, // host设置为true才可以使用network的形式，以ip访问项目
    port: 8756, // 端口号
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
      plugins: [tailwind({
        daisyui: {
          logs: true,
          themes: [
            "light",
            "dark",
            "cupcake",
            "retro",
            "dim",
            "lemonade"
          ],
        },
        content: [
          "./index.html",
          "./src/**/*.{vue,js,jsx}",
        ],
        plugins: [tailwindTypography, daisyui],
      }), autoprefixer]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
