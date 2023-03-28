<script setup lang="ts">
import mapboxgl from 'mapbox-gl'
import { MapboxSetting } from '~~/config/param'

const mapContainer = ref(null)
let map: mapboxgl.Map | null = null
onMounted(() => {
  map = new mapboxgl.Map({
    container: mapContainer.value!,
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [118.888175, 32.048268],
    zoom: 15,
    accessToken: MapboxSetting.token,
  })
  const el = document.createElement('div')
  el.className = 'marker'
  new mapboxgl.Marker(el)
    .setLngLat([118.888175, 32.048268]) // 经纬度坐标值
    .addTo(map)
})
onUnmounted(() => {
  map!.remove()
})
</script>

<template>
  <Card>
    <div ref="mapContainer" style="width: 100%; height: 100vh;" />
  </Card>
</template>

<style scoped>

</style>
