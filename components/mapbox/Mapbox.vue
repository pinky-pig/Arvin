<script setup lang="ts">
import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import { MapboxSetting } from '~~/config/param'
const color = useColorMode()

const mapContainer = ref(null)
let map: mapboxgl.Map | null = null
onMounted(() => {
  map = new mapboxgl.Map({
    container: mapContainer.value!,
    style: color.value === 'dark' ? MapboxSetting.mapDarkStyle : MapboxSetting.mapLightStyle,
    center: [118.888175, 32.048268],
    zoom: 14,
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
</script>

<template>
  <Card>
    <div ref="mapContainer" style="width: 100%; height: 100%;pointer-events: none;" />
  </Card>
</template>

<style scoped>

</style>
