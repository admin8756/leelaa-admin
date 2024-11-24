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
        v-click-outside="closePicker"
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
            v-for="{ date, type } in calendarDays"
            :key="date.toISOString()"
            class="btn btn-sm btn-ghost h-8"
            :class="[
              type === 'prev' || type === 'next' ? 'text-base-300' : '',
              isSelected(date) ? 'btn-primary' : '',
              isToday(date) ? 'btn-outline' : ''
            ]"
            @click="selectDate(date)"
          >
            {{ date.getDate() }}
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

<script>
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import 'dayjs/locale/zh-cn'

dayjs.extend(weekOfYear)
dayjs.locale('zh-cn')

export default {
  name: 'LeelaaFormDatepicker',

  directives: {
    clickOutside: {
      mounted(el, { value }) {
        el.clickOutsideEvent = (event) => {
          if (!(el === event.target || el.contains(event.target))) {
            value(event)
          }
        }
        document.addEventListener('click', el.clickOutsideEvent)
      },
      unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  },

  props: {
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
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    disabled: {
      type: Boolean,
      default: false
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
      default: '',
      validator: (value) => ['lg', 'sm', 'xs', ''].includes(value)
    },
    align: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'right'].includes(value)
    }
  },

  emits: ['update:modelValue', 'change'],

  setup(props, { emit }) {
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

    const yearOptions = computed(() => {
      const currentYear = dayjs().year()
      return Array.from({ length: 21 }, (_, i) => currentYear - 10 + i)
    })

    const weekDays = ['日', '一', '二', '三', '四', '五', '六']

    const calendarDays = computed(() => {
      const start = currentDate.value.startOf('month').startOf('week')
      const end = currentDate.value.endOf('month').endOf('week')
      const days = []
      let current = start

      while (current.isBefore(end) || current.isSame(end, 'day')) {
        days.push({
          date: current.toDate(),
          type: current.month() === currentDate.value.month() ? 'current'
            : current.month() < currentDate.value.month() ? 'prev' : 'next'
        })
        current = current.add(1, 'day')
      }

      return days
    })

    const displayValue = computed(() => {
      if (!selectedDate.value) return ''
      return selectedDate.value.format(props.format)
    })

    // 方法
    const togglePicker = () => {
      if (!props.disabled) {
        showPicker.value = !showPicker.value
      }
    }

    const closePicker = () => {
      showPicker.value = false
    }

    const prevMonth = () => {
      currentDate.value = currentDate.value.subtract(1, 'month')
    }

    const nextMonth = () => {
      currentDate.value = currentDate.value.add(1, 'month')
    }

    const selectDate = (date) => {
      selectedDate.value = date
      emit('update:modelValue', date)
      emit('change', date)
      closePicker()
    }

    const selectToday = () => {
      const today = dayjs()
      currentDate.value = today
      selectDate(today.toDate())
    }

    const clearDate = () => {
      selectedDate.value = null
      emit('update:modelValue', null)
      emit('change', null)
      closePicker()
    }

    const isSelected = (date) => {
      if (!selectedDate.value) return false
      return date.toISOString() === selectedDate.value.toISOString()
    }

    const isToday = (date) => {
      return dayjs().isSame(date, 'day')
    }

    return {
      showPicker,
      currentYear,
      currentMonth,
      yearOptions,
      weekDays,
      calendarDays,
      displayValue,
      togglePicker,
      closePicker,
      prevMonth,
      nextMonth,
      selectDate,
      selectToday,
      clearDate,
      isSelected,
      isToday
    }
  }
}
</script>
