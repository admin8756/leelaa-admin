import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite';
// https://vitejs.dev/config/
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
  ],
  // 服务设置
  server: {
    host: true, // host设置为true才可以使用network的形式，以ip访问项目
    port: 8756, // 端口号
    open: true, // 自动打开浏览器
    cors: true, // 跨域设置允许
    strictPort: true, // 如果端口已占用直接退出
    // 接口代理
    // proxy: {
    //   '/api': {
    //     // 本地 8000 前端代码的接口 代理到 8888 的服务端口
    //     target: 'http://localhost:8888/',
    //     changeOrigin: true, // 允许跨域
    //     rewrite: (path) => path.replace('/api/', '/'),
    //   },
    // },
  },
  build: {
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
    preprocessorOptions: {
      // 全局引入了 scss 的文件
      scss: {
        additionalData: `
        @import "@/assets/styles/variables.scss";
      `,
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
