<script setup>
import router from '@/router/index.js';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
// 退出登录
const logout = () => {
  localStorage.removeItem('token');
  router.replace({ path: '/login' });
};
</script>
<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
      <div class="w-10 rounded-full">
        <img
          alt="Tailwind CSS Navbar component"
          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        />
      </div>
    </div>
    <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
      <li>
        <a class="justify-between">
          个人洞府
          <span class="badge">New</span>
        </a>
      </li>
      <li><a>设置</a></li>
      <li>
        <a @click="logout">{{ t('user.logout') }}</a>
      </li>
    </ul>
  </div>
</template>
