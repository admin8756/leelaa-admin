<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title flex justify-between items-center">
        <span>灵宝档案</span>
        <div class="flex gap-2">
          <select class="select select-sm select-bordered" v-model="sortBy">
            <option value="power">按灵力排序</option>
            <option value="age">按年份排序</option>
            <option value="rarity">按品质排序</option>
          </select>
          <select class="select select-sm select-bordered" v-model="filterType">
            <option value="all">全部类型</option>
            <option value="weapon">攻击法宝</option>
            <option value="defense">防御法宝</option>
            <option value="support">辅助法宝</option>
          </select>
        </div>
      </h2>
      
      <!-- 搜索栏 -->
      <div class="form-control w-full max-w-xs mb-4">
        <div class="input-group">
          <input type="text" placeholder="搜索灵宝..." class="input input-bordered w-full" v-model="searchQuery" />
          <button class="btn btn-square">
            <Icon icon="mdi:search" />
          </button>
        </div>
      </div>
      
      <!-- 数据表格 -->
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>名称</th>
              <th>类型</th>
              <th>品质</th>
              <th>灵力</th>
              <th>年份</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredData" :key="item.id" class="hover">
              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <Icon :icon="item.icon" class="w-full h-full p-2" :class="item.iconColor" />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{{ item.name }}</div>
                    <div class="text-sm opacity-50">{{ item.description }}</div>
                  </div>
                </div>
              </td>
              <td>{{ item.type }}</td>
              <td>
                <div class="rating rating-xs">
                  <input type="radio" class="mask mask-star-2 bg-orange-400" :checked="index < item.rarity" 
                         v-for="index in 5" :key="index" disabled />
                </div>
              </td>
              <td>{{ item.power }}</td>
              <td>{{ item.age }}年</td>
              <td>
                <div :class="{
                  'badge': true,
                  'badge-success': item.status === '正常',
                  'badge-warning': item.status === '修复中',
                  'badge-error': item.status === '损坏'
                }">{{ item.status }}</div>
              </td>
              <td>
                <button class="btn btn-ghost btn-xs" @click="viewDetails(item)">查看</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 详情模态框 -->
      <dialog id="details_modal" class="modal">
        <form method="dialog" class="modal-box">
          <h3 class="font-bold text-lg mb-4">灵宝详情</h3>
          <div v-if="selectedItem">
            <div class="grid grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">名称</span>
                </label>
                <input type="text" :value="selectedItem.name" class="input input-bordered" readonly />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">类型</span>
                </label>
                <input type="text" :value="selectedItem.type" class="input input-bordered" readonly />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">品质</span>
                </label>
                <div class="rating rating-sm">
                  <input type="radio" class="mask mask-star-2 bg-orange-400" 
                         :checked="index < selectedItem.rarity" v-for="index in 5" :key="index" disabled />
                </div>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">状态</span>
                </label>
                <input type="text" :value="selectedItem.status" class="input input-bordered" readonly />
              </div>
              <div class="form-control col-span-2">
                <label class="label">
                  <span class="label-text">描述</span>
                </label>
                <textarea class="textarea textarea-bordered" :value="selectedItem.description" readonly></textarea>
              </div>
            </div>
            <div class="modal-action">
              <button class="btn">关闭</button>
            </div>
          </div>
        </form>
        <form method="dialog" class="modal-backdrop">
          <button>关闭</button>
        </form>
      </dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

// 数据
const sortBy = ref('power')
const filterType = ref('all')
const searchQuery = ref('')
const selectedItem = ref(null)

// 模拟数据
const treasures = [
  {
    id: 1,
    name: '青虹剑',
    type: '攻击法宝',
    description: '上古飞剑，锋利无比',
    rarity: 4,
    power: 1200,
    age: 800,
    status: '正常',
    icon: 'game-icons:sword-brandish',
    iconColor: 'text-blue-500'
  },
  {
    id: 2,
    name: '玄天盾',
    type: '防御法宝',
    description: '坚不可摧的防御法宝',
    rarity: 5,
    power: 1500,
    age: 1200,
    status: '修复中',
    icon: 'game-icons:shield',
    iconColor: 'text-purple-500'
  },
  {
    id: 3,
    name: '五行珠',
    type: '辅助法宝',
    description: '蕴含五行之力',
    rarity: 3,
    power: 800,
    age: 500,
    status: '正常',
    icon: 'game-icons:orb',
    iconColor: 'text-green-500'
  },
  {
    id: 4,
    name: '破天枪',
    type: '攻击法宝',
    description: '可开天辟地的神器',
    rarity: 5,
    power: 2000,
    age: 1500,
    status: '损坏',
    icon: 'game-icons:spear-head',
    iconColor: 'text-red-500'
  },
  {
    id: 5,
    name: '混沌镜',
    type: '防御法宝',
    description: '能够反弹一切攻击',
    rarity: 4,
    power: 1300,
    age: 900,
    status: '正常',
    icon: 'game-icons:mirror',
    iconColor: 'text-yellow-500'
  }
]

// 过滤和排序数据
const filteredData = computed(() => {
  let result = [...treasures]
  
  // 过滤类型
  if (filterType.value !== 'all') {
    const typeMap = {
      weapon: '攻击法宝',
      defense: '防御法宝',
      support: '辅助法宝'
    }
    result = result.filter(item => item.type === typeMap[filterType.value])
  }
  
  // 搜索
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    )
  }
  
  // 排序
  result.sort((a, b) => {
    if (sortBy.value === 'power') return b.power - a.power
    if (sortBy.value === 'age') return b.age - a.age
    if (sortBy.value === 'rarity') return b.rarity - a.rarity
    return 0
  })
  
  return result
})

// 查看详情
const viewDetails = (item) => {
  selectedItem.value = item
  document.getElementById('details_modal').showModal()
}
</script>
