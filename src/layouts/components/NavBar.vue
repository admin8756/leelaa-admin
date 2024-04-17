<script setup></script>

<template>
  <div class="navbar bg-base-300 rounded-box">
    <!-- 移动端布局 -->
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a>首页</a></li>
          <li>
            <a href="/about">关于</a>
            <ul class="p-2">
              <li><a href="/about">关于我们</a></li>
              <li><a href="/about">关于后台</a></li>
            </ul>
          </li>
          <li><a href="/login">登录</a></li>
        </ul>
      </div>
      <a class="btn btn-ghost text-xl">Leelaa-admin</a>
    </div>
    <!-- pc端布局 -->
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a>首页</a></li>
        <li>
          <details>
            <summary>关于</summary>
            <ul class="p-2">
              <li><a href="/about">关于我们</a></li>
              <li><a href="/about">关于后台</a></li>
            </ul>
          </details>
        </li>
        <li><a href="/login">登录</a></li>
      </ul>
    </div>
    <div class="navbar-end">
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
              个人主页
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>设置</a></li>
          <li><a>退出登录</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
