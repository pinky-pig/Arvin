<script setup lang="ts">
const props = defineProps({
  rainSettings: {
    default: {
      intensityValue: 0.4,
      speedValue: 0.25,
      brightnessValue: 0.8,
      normalValue: 0.5,
      zoomValue: 2.61,
      lightningValue: false,
    },
    required: true,
  },
  backgroundSettings: {
    default: {
      blurQualityValue: 16,
      blurValue: 0.5,
      parallaxValue: 1,
      scaleToFillValue: true,
      panningValue: false,
      postProcessingValue: true,
    },
    required: true,
  },
  renderSettings: {
    default: {
      fps: 30,
    },
    required: true,
  },
})

const emits = defineEmits(
  [
    'update:rainSettings',
    'update:backgroundSettings',
    'update:renderSettings',
    'changeBackground',
  ],
)

const rainSettings = computed({
  get() {
    return props.rainSettings
  },
  set(value) {
    emits('update:rainSettings', value)
  },
})
const backgroundSettings = computed({
  get() {
    return props.backgroundSettings
  },
  set(value) {
    emits('update:backgroundSettings', value)
  },
})

const renderSettings = computed({
  get() {
    return props.renderSettings
  },
  set(value) {
    emits('update:renderSettings', value)
  },
})

function changeBackground() {
  emits('changeBackground')
}

interface Setting {
  label: string
  children: {
    label: string
    value: string
    type: 'range' | 'checkbox' | 'button'
    steps?: number
    min?: number
    max?: number
  }[]
}
const settingList = ref<Setting[]>([
  {
    label: '雨滴',
    children: [
      { label: '强度', value: 'intensityValue', type: 'range', steps: 0.01, min: 0, max: 1 },
      { label: '速度', value: 'speedValue', type: 'range', steps: 0.01, min: 0, max: 1 },
      { label: '亮度', value: 'brightnessValue', type: 'range', steps: 0.01, min: 0, max: 1 },
      { label: '一般', value: 'normalValue', type: 'range', steps: 0.01, min: 0, max: 1 },
      { label: '缩放', value: 'zoomValue', type: 'range', steps: 0.01, min: 0, max: 3 },
      { label: '闪电', value: 'lightningValue', type: 'checkbox' },
    ],
  },
  {
    label: '背景',
    children: [
      { label: '模糊质量', value: 'blurQualityValue', type: 'range', steps: 1, min: 1, max: 64 },
      { label: '模糊程度', value: 'blurValue', type: 'range', steps: 0.2, min: 0, max: 10 },
      // { label: '视差', value: 'parallaxValue', type: 'range', steps: 1, min: 0, max: 5 },
      { label: '缩放', value: 'scaleToFillValue', type: 'checkbox' },
      { label: '平移', value: 'panningValue', type: 'checkbox' },
      { label: '滤镜', value: 'postProcessingValue', type: 'checkbox' },

      { label: '自定义背景', value: 'changeBackground', type: 'button' },
    ],
  },
  {
    label: '渲染',
    children: [
      { label: 'FPS', value: 'fps', type: 'range', steps: 15, min: 15, max: 120 },
    ],
  },
])

// 当前的选项卡
const currentItem = ref<Setting>()
// 当前的选项卡的背景颜色
const currentItemBgRef = ref<HTMLElement>()
// 选中当前选项卡
function handleActiveTab(item: Setting, index: number) {
  const animateDom = document.querySelectorAll('.animate-dom')[0] as HTMLElement
  animateDom.classList.remove('animate-jello')
  currentItem.value = item
  currentItemBgRef.value!.style.transform = `translateX(${(document.querySelectorAll('.tab-item')[index] as HTMLElement).offsetLeft}px)`
  animateDom.classList.add('animate-jello')

  nextTick(() => {
    const computedStyle = getComputedStyle((document.querySelector('.tab-panel-dom') as HTMLElement), null)

    if (document.querySelector('.tab-panel-dom')?.scrollHeight === parseInt(computedStyle.paddingTop) + parseInt(computedStyle.paddingBottom)) {
      (document.querySelector('.tab-panel') as HTMLElement).style.height = '0';
      (document.querySelector('.tab-panel') as HTMLElement).style.marginBottom = '0';
      (document.querySelector('.tab-panel') as HTMLElement).style.marginTop = '0'
    }
    else {
      (document.querySelector('.tab-panel') as HTMLElement).style.height = `${document.querySelector('.tab-panel-dom')?.scrollHeight}px`;
      (document.querySelector('.tab-panel') as HTMLElement).style.marginBottom = '10px';
      (document.querySelector('.tab-panel') as HTMLElement).style.marginTop = '5px'
    }
  })
}
</script>

<template>
  <div>
    <!-- <Teleport to="#mainTest"> -->
    <div class="setting-modal flex flex-col ">
      <div
        class="
          tab-panel
          w-full h-0 overflow-hidden
          transition-all
          duration-500
          ease-in-out"
      >
        <div class="tab-panel-dom">
          <div
            v-for="item in currentItem?.children"
            :key="item.label"
            class=" w-full relative my-10px"
          >
            <div v-if="item.type === 'range'">
              <div class=" flex flex-row justify-between px-2">
                {{ item.label }}
                <input v-if="currentItem?.label === '雨滴'" v-model="rainSettings[item.value as keyof typeof rainSettings] " class="slider-number w-45px h-25px text-center text-10px rounded-md" type="text">
                <input v-if="currentItem?.label === '背景'" v-model="backgroundSettings[item.value as keyof typeof backgroundSettings] " class="slider-number w-45px h-25px text-center text-10px rounded-md" type="text">
                <input v-if="currentItem?.label === '渲染'" v-model="renderSettings[item.value as keyof typeof renderSettings] " class="slider-number w-45px h-25px text-center text-10px rounded-md" type="text">
              </div>

              <input v-if="currentItem?.label === '雨滴'" v-model="rainSettings[item.value as keyof typeof rainSettings]" class="slider-bar rounded-md w-full my-10px " :type="item.type" :step="item.steps" :min="item.min" :max="item.max">
              <input v-if="currentItem?.label === '背景'" v-model="backgroundSettings[item.value as keyof typeof backgroundSettings]" class="slider-bar rounded-md w-full my-10px " :type="item.type" :step="item.steps" :min="item.min" :max="item.max">
              <input v-if="currentItem?.label === '渲染'" v-model="renderSettings[item.value as keyof typeof renderSettings]" class="slider-bar rounded-md w-full my-10px " :type="item.type" :step="item.steps" :min="item.min" :max="item.max">
            </div>
            <div v-if="item.type === 'checkbox'" class=" flex flex-row justify-between px-2">
              <span>
                {{ item.label }}
              </span>
              <input v-if="currentItem?.label === '雨滴'" v-model="rainSettings[item.value as keyof typeof rainSettings]" :type="item.type" :step="item.steps" :min="item.min" :max="item.max">
              <input v-if="currentItem?.label === '背景'" v-model="backgroundSettings[item.value as keyof typeof backgroundSettings]" :type="item.type" :step="item.steps" :min="item.min" :max="item.max">
              <input v-if="currentItem?.label === '渲染'" v-model="renderSettings[item.value as keyof typeof renderSettings]" :type="item.type" :step="item.steps" :min="item.min" :max="item.max">
            </div>

            <div v-if="item.type === 'button'" class=" flex flex-row justify-between px-2">
              <div>
                {{ item.label }}
              </div>
              <button
                class="px-4 py-1 rounded inline-block bg-[rgba(0,0,0,0.1)] text-white cursor-pointer hover:bg-[rgba(0,0,0,0.5)] disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50"
                @click="changeBackground"
              >
                上传
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- tab -->
      <div class=" flex flex-row w-full justify-between relative">
        <div
          v-for="item, index in settingList"
          :key="item.label"
          class="tab-item w-60px h-45px grid place-items-center cursor-pointer relative z-1"
          @click="handleActiveTab(item, index)"
        >
          {{ item.label }}
        </div>

        <!-- tab-bg -->
        <div
          v-show="currentItem"
          ref="currentItemBgRef"
          class="
              w-60px h-45px
              absolute top-0 left-0 z-0
              pointer-events-none
              transition-transform
              duration-300
              ease-in-out
            "
        >
          <div class="animate-dom animate-jello  w-full h-full rounded-xl">
              &nbsp;
          </div>
        </div>
      </div>
    </div>
    <!-- </Teleport> -->
  </div>
</template>

<style scoped>
.setting-modal{
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  height: fit-content;
  max-width: calc(100% - 200px);
  min-width: 100px;
  width: 400px;
  border-radius: 20px;
  background-color: rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
  border: 2px solid transparent;
  transition: 0.2s ease-in-out all;
  z-index: 10;
  padding: 10px 20px;
  color: white;
}
.tab-panel {
  border-radius: 10px;
  background-color: rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
}
.tab-panel-dom{
  padding: 10px;
}
.animate-dom{
  background-color: rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
}
.animate-jello {
  animation: jello-horizontal 0.9s both;
}
@keyframes jello-horizontal{
  0% {
    transform: scale3d(1, 1, 1);
  }
  30% {
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}
.slider-number{
  background-color: rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
}
input{
  outline: none;
}
.slider-bar{
  @apply dark:bg-[#e5e7eb];
  margin: auto;
  width: 100%;
  background: #C2C5C7;
  outline: none;
  -webkit-appearance: none;
  /*清除系统默认样式*/
  height: 3px;
  /*横条的高度*/
}
input[type="range"]::-webkit-slider-thumb {
  @apply dark:bg-[#e5e7eb];
  width: 15px;
  height: 15px;
  border-radius: 50%;
  outline: 5px solid #C2C5C790;
  background-color: #ececec;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3),
    0 3px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  -webkit-appearance: none;
  border: 0;
}
</style>
