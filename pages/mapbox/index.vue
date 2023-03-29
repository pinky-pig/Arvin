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
    zoom: 15,
    accessToken: MapboxSetting.token,
  })

  const el = document.createElement('div')
  el.innerHTML = '<pop-marker />'
  new mapboxgl.Marker(el)
    .setLngLat([118.888175, 32.048268] as LngLatLike)
    .addTo(map!)
})
onUnmounted(() => {
  map!.remove()
})

watch(() => color.value, () => {
  map?.setStyle(color.value === 'dark' ? MapboxSetting.mapDarkStyle : MapboxSetting.mapLightStyle)
})
</script>

<template>
  <div ref="mapContainer" style="width: 672px; height: 435px;" />
</template>

<style scoped>

</style>
