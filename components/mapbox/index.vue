<script setup lang="ts">
// import type { LngLatLike } from 'mapbox-gl'
import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import { MapboxSetting } from '~~/config'

const color = useColorMode()
const router = useRouter()

const mapContainer = ref(null)
let map: mapboxgl.Map | null = null
onMounted(() => {
  map = new mapboxgl.Map({
    container: mapContainer.value!,
    style: color.value === 'dark' ? MapboxSetting.mapDarkStyle : MapboxSetting.mapLightStyle,
    center: [118.888175, 32.048268],
    zoom: 4,
    accessToken: MapboxSetting.token,
  })

  map.on('load', () => {
    const el = document.createElement('div')
    el.innerHTML = `<logo-marker name="${'/logo.svg'}" />`
    new mapboxgl.Marker(el)
      .setLngLat([118.888175, 32.048268] as LngLatLike)
      .addTo(map!)
  })
})
onUnmounted(() => {
  map!.remove()
})

watch(() => color.value, () => {
  // 切换回默认主题
  map?.setStyle(color.value === 'dark' ? MapboxSetting.mapDarkStyle : MapboxSetting.mapLightStyle)
})
function toMapbox() {
  router.push('/mapbox')
}
</script>

<template>
  <Card>
    <div ref="mapContainer" style="width: 100%; height: 100%;pointer-events: none;" />

    <button class="detail-arrow" @click="toMapbox">
      <div class="w-16px h-16px" i-carbon-arrow-up-right />
    </button>
  </Card>
</template>

<style scoped>
.detail-arrow{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  position: absolute;
  right: 12px;
  bottom: 10px;
  color: var(--text-color);
  border-radius: 18px;
  background: var(--card--bg);
  box-shadow: var(--card--border) 0px 0px 0px 2px;
  transition: box-shadow 0.2s ease-out 0s;
}

.detail-arrow:hover{
  cursor: pointer;
  box-shadow: var(--card--border) 0px 0px 0px 5px;
}
</style>
