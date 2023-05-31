<script setup lang="ts">
import mapboxgl from 'mapbox-gl'
import { addFogToMapbox, addMarkerToMapbox, addlayerToMapbox } from './helps'
import { MapboxSetting } from '~~/config'

const color = useColorMode()

definePageMeta({
  title: 'Mapbox',
  subtitle: '地图组件',
  key: route => route.fullPath,
  keepalive: true,
})
const mapContainer = ref(null)
let map: mapboxgl.Map | null = null

onMounted(() => {
  map = new mapboxgl.Map({
    container: mapContainer.value!,
    style: color.value === 'dark' ? MapboxSetting.mapDarkStyle : MapboxSetting.mapLightStyle,
    center: [118.888175, 32.048268],
    zoom: 0,
    accessToken: MapboxSetting.token,
    antialias: true,
    pitch: 45,
    bearing: -17.6,
  })

  map.on('load', () => {
    addMarkerToMapbox(map!)
    addFogToMapbox(map!)
    addlayerToMapbox(map!)
  })
})
onUnmounted(() => {
  map?.remove()
})
watch(() => color.value, () => {
  map?.setStyle(color.value === 'dark' ? MapboxSetting.mapDarkStyle : MapboxSetting.mapLightStyle)
})

const router = useRouter()
const bubbleCardRef = ref<HTMLElement | null>(null)
function toHome() {
  bubbleCardRef.value && (bubbleCardRef.value as any).bubble(1)

  setTimeout(() => {
    router.push('/')
  }, 600)
}

function locateUser() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords
      // 在地图上添加用户位置标记
      const el = document.createElement('div')
      el.innerHTML = `<pop-marker name="${'/logo.svg'}" />`
      new mapboxgl.Marker(el)
        .setLngLat([longitude, latitude])
        .addTo(map!)
      // 将地图视图移动到用户位置
      map!.flyTo({
        center: [longitude, latitude],
        zoom: 14,
        duration: 10000,
        essential: true,
        pitch: 75,
      })
    },
    (error) => {
      console.error(error)
    },
    { enableHighAccuracy: true },
  )
}

function toEarth() {
  map!.flyTo({
    center: [118.888175, 32.048268],
    zoom: 0,
    duration: 10000,
    essential: true,
    pitch: 75,
  })
}
</script>

<template>
  <BubbleCard ref="bubbleCardRef" :has-animation="true">
    <template #icon>
      <div class="return-arrow" @click="toHome">
        <div i-carbon:direction-loop-left />
      </div>
    </template>
    <template #title>
      Mapbox
    </template>

    <template #operate-button>
      <DarkToggle />
    </template>

    <div
      class="
        mapbox-container
        bg-[var(--card--placeholder-bg)]
        w-full h-full
        flex justify-center items-center
        rounded-3xl
        "
    >
      <div ref="mapContainer" class="map rounded-3xl w-full h-full " />
    </div>

    <div class="bottom w-full flex justify-center items-center">
      <Dockbar>
        <DockbarItem :has-divide-line="false" tooltip="地球模式" @click="toEarth">
          <div i-carbon:earth-southeast-asia class=" text-[var(--dockbar-text)] w-full h-full" />
        </DockbarItem>
        <DockbarItem :has-divide-line="true" tooltip="当前位置" @click="locateUser">
          <div i-carbon:location class=" text-[var(--dockbar-text)] w-full h-full" />
        </DockbarItem>
        <DockbarItem :has-divide-line="false" tooltip="更多">
          <div i-carbon:settings class=" text-[var(--dockbar-text)] w-full h-full" />
        </DockbarItem>
      </Dockbar>
    </div>

    <!-- <div class="menu" /> -->
  </BubbleCard>
</template>

<style scoped>
.map{
  transform: translateY(0); /* ios map 圆角 不生效解决方案 */
  overflow: hidden;
  background-color: var(--card--bg);
  border-color: var(--card--border);
  border-width: 2px;
  border-style: solid;
}
.return-arrow{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  font-size: 14px;
  border-radius: 18px;
  color: var(--text-color);
  background: var(--card--bg);
  box-shadow: var(--card--border) 0px 0px 0px 2px;
  transition: box-shadow 0.2s ease-out 0s;
}
.return-arrow:hover{
  cursor: pointer;
  box-shadow: var(--card--border) 0px 0px 0px 5px;
}
.bottom{
  position: fixed;
  bottom: 30px;
  left: 0px;
  width: 100%;
}
.menu{
  position: fixed;
  bottom: 120px;
  left: 30px;
  width: 300px;
  height: 200px;
  background: var(--dockbar-placeholder-bg);
  border-radius: 20px;
}
</style>
