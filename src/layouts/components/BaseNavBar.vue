<template>
  <div
    class="navbar bg-base-100 text-base-content flex w-full bg-opacity-95 backdrop-blur transition-all duration-100 [transform:translate3d(0,0,0)] shadow-lg sticky top-0 z-30"
  >
    <!-- 移动端布局 -->
    <div class="navbar-start">
      <div class="dropdown" ref="dropdownRef">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu menu-sm mt-3 z-[999] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li
            v-for="(item, index) in routesList"
            :key="index"
            :class="[
              isActive(item.path) ? 'text-primary font-bold' : '',
              'hover:text-primary transition-colors duration-200'
            ]"
          >
            <a v-if="!item.children" @click="handleMenuClick(item.path)">{{ item.meta.title }}</a>
            <template v-else>
              <a @click="item.children[0]?.meta?.isGroup ? null : handleMenuClick(item.path)">
                {{ item.meta.title }}
              </a>
              <ul v-if="item.children?.length" class="p-2">
                <template v-for="(subItem, subIndex) in item.children" :key="subIndex">
                  <!-- 如果是分组 -->
                  <li v-if="subItem.meta?.isGroup" class="menu-title">
                    <span>{{ subItem.meta.title }}</span>
                    <ul class="pl-2">
                      <li v-for="(groupItem, groupIndex) in subItem.children" :key="groupIndex">
                        <a 
                          :class="[
                            childrenIsActive(groupItem.path) ? 'text-primary font-bold active' : '',
                            'hover:text-primary transition-colors duration-200'
                          ]"
                          @click="handleMenuClick(groupItem.path)"
                        >
                          {{ groupItem.meta.title }}
                        </a>
                      </li>
                    </ul>
                  </li>
                  <!-- 如果不是分组 -->
                  <li v-else>
                    <a 
                      :class="[
                        childrenIsActive(subItem.path) ? 'text-primary font-bold active' : '',
                        'hover:text-primary transition-colors duration-200'
                      ]"
                      @click="handleMenuClick(subItem.path)"
                    >
                      {{ subItem.meta.title }}
                    </a>
                  </li>
                </template>
              </ul>
            </template>
          </li>
        </ul>
      </div>
      <a class="btn btn-ghost text-xl normal-case font-bold">{{ name.toUpperCase() }}</a>
    </div>

    <!-- pc端布局 -->
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li
          v-for="(item, index) in routesList"
          :key="index"
          :class="[
            isActive(item.path) ? 'text-primary font-bold' : '',
            'hover:text-primary transition-colors duration-200'
          ]"
        >
          <a v-if="!item.children" @click="pageTo(item.path)">{{ item.meta.title }}</a>
          <details v-else class="dropdown" @click="handleDetailsClick">
            <summary tabindex="0" role="button">{{ item.meta.title }}</summary>
            <ul tabindex="0" class="p-2 bg-base-100 rounded-box w-52 shadow-lg dropdown-content z-[999] menu">
              <template v-for="(subItem, subIndex) in item.children" :key="subIndex">
                <!-- 如果是分组 -->
                <li v-if="subItem.meta?.isGroup" class="menu-title pt-2 first:pt-0">
                  <span class="text-sm opacity-50">{{ subItem.meta.title }}</span>
                  <ul class="pl-2">
                    <li v-for="(groupItem, groupIndex) in subItem.children" :key="groupIndex">
                      <a 
                        :class="[
                          childrenIsActive(groupItem.path) ? 'text-primary font-bold active' : '',
                          'hover:text-primary transition-colors duration-200'
                        ]"
                        @click="pageTo(groupItem.path)"
                      >
                        {{ groupItem.meta.title }}
                      </a>
                    </li>
                  </ul>
                </li>
                <!-- 如果不是分组 -->
                <li v-else>
                  <a 
                    :class="[
                      childrenIsActive(subItem.path) ? 'text-primary font-bold active' : '',
                      'hover:text-primary transition-colors duration-200'
                    ]"
                    @click="pageTo(subItem.path)"
                  >
                    {{ subItem.meta.title }}
                  </a>
                </li>
              </template>
            </ul>
          </details>
        </li>
      </ul>
    </div>

    <!-- 右侧功能按钮 -->
    <div class="navbar-end">
      <!-- 语言切换 -->
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost" @click="toggleLocale">
          <Icon :icon="locale === 'zh-CN' ? 'twemoji:flag-china' : 'twemoji:flag-united-states'" class="h-5 w-5" />
        </div>
      </div>

      <!-- 主题切换 -->
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost">
          <Icon icon="material-symbols:palette-outline" class="h-5 w-5" />
        </div>
        <div class="dropdown-content z-[999] menu shadow-lg bg-base-200 rounded-box mt-4">
          <div class="w-56 p-2">
            <div class="grid grid-cols-1 gap-2">
              <button
                v-for="theme in THEME_LIST"
                :key="theme"
                class="outline-base-content overflow-hidden rounded-lg text-left"
                :class="{ 'outline outline-2 outline-offset-2': theme === nowTheme }"
                :data-theme="theme"
                @click="saveTheme(theme)"
              >
                <div :style="getThemeStyle(theme)" class="w-full cursor-pointer font-sans">
                  <div class="grid grid-cols-5 grid-rows-3">
                    <div class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                      <div class="flex-grow text-sm font-bold">{{ theme }}</div>
                      <div class="flex flex-shrink-0 flex-wrap gap-1">
                        <div
                          v-for="(color, index) in getThemeColor(theme)"
                          :key="index"
                          class="h-2 w-2 rounded"
                          :style="{ background: color }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 用户菜单 -->
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://api.dicebear.com/6.x/adventurer/svg?seed=Felix" />
          </div>
        </div>
        <ul tabindex="0" class="dropdown-content z-[999] menu p-2 shadow-lg bg-base-200 rounded-box w-52">
          <div class="px-4 py-3">
            <span class="block text-sm font-semibold">修仙者</span>
            <span class="block text-sm text-gray-500 truncate">cultivator@xian.world</span>
          </div>
          <div class="py-1">
            <li>
              <a class="justify-between">
                <div class="flex items-center">
                  <Icon icon="heroicons:user-circle" class="w-5 h-5 mr-2" />
                  个人资料
                </div>
                <span class="badge badge-sm">新</span>
              </a>
            </li>
            <li>
              <a>
                <Icon icon="heroicons:cog-6-tooth" class="w-5 h-5 mr-2" />
                修炼设置
              </a>
            </li>
            <li>
              <a>
                <Icon icon="heroicons:chart-bar" class="w-5 h-5 mr-2" />
                修炼进度
              </a>
            </li>
          </div>
          <div class="py-1">
            <li>
              <a>
                <Icon icon="heroicons:bell" class="w-5 h-5 mr-2" />
                消息通知
                <span class="badge badge-primary badge-sm ml-2">3</span>
              </a>
            </li>
            <li>
              <a>
                <Icon icon="heroicons:book-open" class="w-5 h-5 mr-2" />
                修炼心得
              </a>
            </li>
          </div>
          <div class="py-1">
            <li>
              <a class="text-error" @click="handleLogout">
                <Icon icon="heroicons:arrow-right-on-rectangle" class="w-5 h-5 mr-2" />
                退出登录
              </a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from "vue-i18n"
import { useRouter, useRoute } from "vue-router"
import { THEME_LIST, THEME_DEFAULT } from "@enums"
import { routesList } from "@/router/index.js"
import { name } from "../../../package.json"
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'BaseNavBar'
})

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const dropdownRef = ref(null)
const nowTheme = ref(localStorage.getItem('theme') || THEME_DEFAULT)

// 导航相关
const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const childrenIsActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const pageTo = (to) => {
  if (!to) return
  router.push(to.replace('//', '/'))
}

const handleMenuClick = (path) => {
  if (!path) return
  router.push(path.replace('//', '/'))
}

const handleDetailsClick = (event) => {
  const details = event.currentTarget
  const allDetails = document.querySelectorAll('details')
  
  allDetails.forEach(detail => {
    if (detail !== details) {
      detail.removeAttribute('open')
    }
  })
}

const handleClickOutside = (event) => {
  const dropdown = dropdownRef.value
  if (dropdown && !dropdown.contains(event.target)) {
    const menu = dropdown.querySelector('.dropdown-content')
    if (menu) {
      menu.classList.remove('dropdown-open')
      menu.removeAttribute('open')
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 主题相关
const getThemeStyle = (themeName) => {
  const themeDetail = THEME_DEFAULT[themeName]
  if (!themeDetail) return {}
  return {
    backgroundColor: themeDetail.background,
    color: themeDetail.text
  }
}

const getThemeColor = (themeName) => {
  const themeDetail = THEME_DEFAULT[themeName]
  if (!themeDetail) return []
  return [
    themeDetail.primary,
    themeDetail.secondary,
    themeDetail.accent,
    themeDetail.neutral
  ]
}

const saveTheme = (themeName) => {
  nowTheme.value = themeName
  document.documentElement.setAttribute('data-theme', themeName)
  localStorage.setItem('theme', themeName)
}

// 初始化主题
onMounted(() => {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) saveTheme(savedTheme)
})

// 语言相关
const toggleLocale = () => {
  locale.value = locale.value === 'zh-CN' ? 'en' : 'zh-CN'
  localStorage.setItem('locale', locale.value)
}

// 用户相关
const handleLogout = () => {
  router.push('/login')
}
</script>
