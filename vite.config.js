import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-i18n',
        VueRouterAutoImports,
        {
          'vue-router/auto': ['useLink'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/stores',
      ],
      vueTemplate: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'LeeLaa-Admin',
        short_name: 'admin',
        theme_color: '#ffffff',
        lang: "zh-CN",
        scope: "/",
        icons: [
          {
            "src": "/pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "/pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
          }
        ]
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
