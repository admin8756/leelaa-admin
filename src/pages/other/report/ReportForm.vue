<template>
  <div class="p-6">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- 基本信息 -->
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">基本信息</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- 妖兽类型 -->
            <leelaa-select
              v-model="formData.type"
              :options="typeOptions"
              label="妖兽类型"
              required
              :error="errors.type"
            >
              <template #option="{ option }">
                <div class="flex items-center gap-2">
                  <div 
                    class="w-4 h-4 rounded-full" 
                    :style="{ backgroundColor: option.color }"
                  ></div>
                  <span>{{ option.label }}</span>
                </div>
              </template>
            </leelaa-select>

            <!-- 危险等级 -->
            <leelaa-select
              v-model="formData.level"
              :options="levelOptions"
              label="危险等级"
              required
              :error="errors.level"
            >
              <template #option="{ option }">
                <div class="flex items-center gap-2">
                  <div 
                    class="w-4 h-4 rounded-full" 
                    :style="{ backgroundColor: option.color }"
                  ></div>
                  <span>{{ option.label }}</span>
                </div>
              </template>
            </leelaa-select>

            <!-- 区域 -->
            <leelaa-select
              v-model="formData.area"
              :options="areaOptions"
              label="区域"
              required
              :error="errors.area"
            />

            <!-- 位置 -->
            <div class="md:col-span-2">
              <leelaa-location
                v-model="formData.location"
                label="位置"
                required
                :error="errors.location"
              />
            </div>

            <!-- 紧急程度 -->
            <leelaa-rate
              v-model="formData.urgency"
              label="紧急程度"
              required
              :error="errors.urgency"
              :max="5"
            />

            <!-- 标签 -->
            <div class="md:col-span-3">
              <leelaa-checkbox-group
                v-model="formData.tags"
                :options="tagOptions"
                label="标签"
                :error="errors.tags"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 详细描述 -->
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">详细描述</h2>
          <div class="space-y-6">
            <!-- 描述 -->
            <leelaa-textarea
              v-model="formData.description"
              label="描述"
              required
              :error="errors.description"
              :rows="4"
            />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- 主图 -->
              <leelaa-camera
                v-model="formData.mainImage"
                label="主图"
                required
                :error="errors.mainImage"
              />

              <!-- 图片集 -->
              <leelaa-upload
                v-model="formData.images"
                label="更多图片"
                :error="errors.images"
                multiple
                accept="image/*"
                :max-files="5"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 威胁评估 -->
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">威胁评估</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- 妖力值 -->
            <leelaa-number
              v-model="formData.power"
              label="妖力值"
              required
              :error="errors.power"
              :min="0"
              :max="100"
            />

            <!-- 威胁度 -->
            <leelaa-number
              v-model="formData.threat"
              label="威胁度"
              required
              :error="errors.threat"
              :min="0"
              :max="100"
            />

            <!-- 标记颜色 -->
            <leelaa-color
              v-model="formData.color"
              label="标记颜色"
              :error="errors.color"
            />
          </div>
        </div>
      </div>

      <!-- 提交信息 -->
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">提交信息</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- 报告人 -->
            <leelaa-input
              v-model="formData.reporter"
              label="报告人"
              required
              :error="errors.reporter"
            />

            <!-- 联系方式 -->
            <leelaa-input
              v-model="formData.contact"
              label="联系方式"
              required
              :error="errors.contact"
            />

            <!-- 签名 -->
            <div class="md:col-span-2">
              <leelaa-signature
                v-model="formData.signature"
                label="签名"
                :error="errors.signature"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex justify-end gap-4">
        <button 
          type="button" 
          class="btn" 
          @click="handleCancel"
        >
          取消
        </button>
        <button 
          type="submit" 
          class="btn btn-primary"
        >
          提交
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  getTypeOptions, 
  getLevelOptions, 
  getAreaOptions,
  // getUrgencyOptions,
  // getStatusOptions,
  getTagOptions,
  getReportDetail 
} from '@/mock/report'

// 导入基础组件
import LeelaaSelect from '@/components/form/basic/leelaa-select.vue'
import LeelaaTextarea from '@/components/form/basic/leelaa-textarea.vue'
import LeelaaNumber from '@/components/form/basic/leelaa-number.vue'
import LeelaaRate from '@/components/form/basic/leelaa-rate.vue'
import LeelaaColor from '@/components/form/basic/leelaa-color.vue'
import LeelaaCheckboxGroup from '@/components/form/basic/leelaa-checkbox-group.vue'

// 导入高级组件
import LeelaaCamera from '@/components/form/advance/leelaa-camera.vue'
import LeelaaUpload from '@/components/form/advance/leelaa-upload.vue'
import LeelaaLocation from '@/components/form/advance/leelaa-location.vue'

const router = useRouter()
const route = useRoute()

// 表单数据
const formData = ref({
  type: '',
  level: '',
  area: '',
  location: { longitude: null, latitude: null },
  description: '',
  mainImage: '',
  images: [],
  urgency: 0,
  tags: [],
  status: 'pending',
  reporter: '',
  reportTime: '',
  signature: '',
  power: 0,
  threat: 0,
  color: '#000000',
  contact: ''
})

// 错误信息
const errors = ref({})

// 选项数据
const typeOptions = ref(getTypeOptions())
const levelOptions = ref(getLevelOptions())
const areaOptions = ref(getAreaOptions())
// const urgencyOptions = ref(getUrgencyOptions())
const tagOptions = ref(getTagOptions())
// const statusOptions = ref(getStatusOptions())

// 加载详情
const loadDetail = async () => {
  const id = Number(route.params.id)
  if (id) {
    const detail = await getReportDetail(id)
    if (detail) {
      formData.value = { ...detail }
    }
  }
}

// 表单验证
const validateForm = () => {
  const newErrors = {}
  
  if (!formData.value.type) {
    newErrors.type = '请选择妖兽类型'
  }
  if (!formData.value.level) {
    newErrors.level = '请选择危险等级'
  }
  if (!formData.value.area) {
    newErrors.area = '请选择区域'
  }
  if (!formData.value.location) {
    newErrors.location = '请输入具体位置'
  }
  if (!formData.value.urgency) {
    newErrors.urgency = '请选择紧急程度'
  }
  if (!formData.value.description) {
    newErrors.description = '请输入描述'
  }
  if (!formData.value.mainImage) {
    newErrors.mainImage = '请上传主图'
  }
  if (!formData.value.reporter) {
    newErrors.reporter = '请输入报告人'
  }
  if (!formData.value.signature) {
    newErrors.signature = '请签名'
  }
  if (!formData.value.contact) {
    newErrors.contact = '请输入联系方式'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// 提交表单
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  try {
    // TODO: 调用API保存数据
    console.log('提交数据:', formData.value)
    router.push('/other/report')
  } catch (error) {
    console.error('保存失败:', error)
  }
}

// 取消
const handleCancel = () => {
  router.push('/other/report')
}

onMounted(() => {
  loadDetail()
})
</script>
