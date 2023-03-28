<script setup lang="ts">
import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import { MapboxSetting } from '~~/config/param'

const mapContainer = ref(null)
let map: mapboxgl.Map | null = null
onMounted(() => {
  map = new mapboxgl.Map({
    container: mapContainer.value!,
    style: MapboxSetting.mapLightStyle,
    center: [118.888175, 32.048268],
    zoom: 14,
    accessToken: MapboxSetting.token,
  })

  const el = document.createElement('div')
  el.innerHTML = '<logo-marker />'
  new mapboxgl.Marker(el)
    .setLngLat([118.888175, 32.048268] as LngLatLike)
    .addTo(map!)
})
onUnmounted(() => {
  map!.remove()
})

const color = useColorMode()
watch(() => color.value, () => {
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
