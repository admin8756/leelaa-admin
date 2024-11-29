<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>

    <div class="relative">
      <input
        type="text"
        :value="displayValue"
        readonly
        class="input input-bordered w-full cursor-pointer"
        :class="[
          error ? 'input-error' : '',
          size ? `input-${size}` : '',
          disabled ? 'input-disabled' : ''
        ]"
        :placeholder="placeholder"
        :disabled="disabled"
        @click="togglePicker"
      />
      <div class="absolute inset-y-0 right-0 flex items-center pr-3">
        <i class="fas fa-calendar-alt text-gray-400"></i>
      </div>

      <!-- 日期选择面板 -->
      <div
        v-if="showPicker"
        class="absolute z-50 mt-1 p-4 bg-base-100 rounded-lg shadow-lg border border-base-300"
        :class="{ 'right-0': align === 'right' }"
      >
        <!-- 年月选择 -->
        <div class="flex justify-between mb-4">
          <button class="btn btn-sm" @click="prevMonth">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="flex gap-2">
            <select v-model="currentYear" class="select select-sm select-bordered">
              <option v-for="year in yearOptions" :key="year" :value="year">
                {{ year }}年
              </option>
            </select>
            <select v-model="currentMonth" class="select select-sm select-bordered">
              <option v-for="month in 12" :key="month" :value="month">
                {{ month }}月
              </option>
            </select>
          </div>
          <button class="btn btn-sm" @click="nextMonth">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>

        <!-- 星期表头 -->
        <div class="grid grid-cols-7 gap-1 mb-2">
          <div
            v-for="day in weekDays"
            :key="day"
            class="text-center text-sm font-medium py-1"
          >
            {{ day }}
          </div>
        </div>

        <!-- 日期网格 -->
        <div class="grid grid-cols-7 gap-1">
          <button
            v-for="day in daysInMonth"
            :key="day"
            class="btn btn-sm btn-ghost h-8"
            :class="[
              isSelected(day) ? 'btn-primary' : '',
              isToday(day) ? 'btn-outline' : ''
            ]"
            @click="selectDate(day)"
          >
            {{ day }}
          </button>
        </div>

        <!-- 快捷按钮 -->
        <div class="flex justify-between mt-4 pt-4 border-t">
          <button class="btn btn-sm" @click="selectToday">今天</button>
          <button class="btn btn-sm" @click="clearDate">清除</button>
        </div>
      </div>
    </div>

    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Date, String],
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请选择日期'
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    validator(value) {
      return ['lg', 'sm', 'xs'].includes(value)
    }
  },
  align: {
    type: String,
    default: 'left',
    validator(value) {
      return ['left', 'right'].includes(value)
    }
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const showPicker = ref(false)
const currentDate = ref(props.modelValue ? dayjs(props.modelValue) : dayjs())
const selectedDate = ref(props.modelValue ? dayjs(props.modelValue) : null)

// 计算属性
const currentYear = computed({
  get: () => currentDate.value.year(),
  set: (year) => {
    currentDate.value = currentDate.value.year(year)
  }
})

const currentMonth = computed({
  get: () => currentDate.value.month() + 1,
  set: (month) => {
    currentDate.value = currentDate.value.month(month - 1)
  }
})

const displayValue = computed(() => {
  if (!selectedDate.value) return ''
  return selectedDate.value.format('YYYY-MM-DD')
})

const daysInMonth = computed(() => {
  const year = currentDate.value.year()
  const month = currentDate.value.month()
  const daysInMonth = currentDate.value.daysInMonth()
  const firstDayOfMonth = dayjs().year(year).month(month).date(1).day()
  
  const days = []
  let day = 1
  
  for (let i = 0; i < 6; i++) {
    const week = []
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfMonth) {
        week.push(null)
      } else if (day > daysInMonth) {
        week.push(null)
      } else {
        week.push(day)
        day++
      }
    }
    days.push(week)
    if (day > daysInMonth) break
  }
  
  return days
})

const isSelected = computed(() => (day) => {
  if (!selectedDate.value || !day) return false
  return selectedDate.value.date() === day &&
    selectedDate.value.month() === currentDate.value.month() &&
    selectedDate.value.year() === currentDate.value.year()
})

const isToday = computed(() => (day) => {
  return dayjs().date() === day &&
    dayjs().month() === currentDate.value.month() &&
    dayjs().year() === currentDate.value.year()
})

// 方法
const togglePicker = () => {
  showPicker.value = !showPicker.value
}

const selectDate = (day) => {
  if (!day) return
  
  const date = currentDate.value.date(day)
  selectedDate.value = date
  emit('update:modelValue', date.format('YYYY-MM-DD'))
  emit('change', date.format('YYYY-MM-DD'))
  showPicker.value = false
}

const selectToday = () => {
  const today = dayjs()
  currentDate.value = today
  selectDate(today.date())
}

const clearDate = () => {
  selectedDate.value = null
  emit('update:modelValue', null)
  emit('change', null)
  showPicker.value = false
}

const prevMonth = () => {
  currentDate.value = currentDate.value.subtract(1, 'month')
}

const nextMonth = () => {
  currentDate.value = currentDate.value.add(1, 'month')
}

const handleClickOutside = (e) => {
  const target = e.target
  if (!target.closest('.datepicker')) {
    showPicker.value = false
  }
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>
